import { createClient, SupabaseClient, User as SupabaseUser, Session } from '@supabase/supabase-js';

// Environment variables for Supabase (standard Vite client env prefixes)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface StudentProfile {
  id?: string;
  fullName: string;
  indexNumber: string;
  schoolName: string;
  combination: string;
  email?: string;
  updatedAt?: string;
}

export interface UserSessionData {
  user: SupabaseUser | null;
  profile: StudentProfile | null;
  isEmailVerified: boolean;
  isConfigured: boolean;
}

// Single-instance Supabase client
let clientInstance: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl.startsWith('https://') && 
    !supabaseUrl.includes('placeholder') &&
    supabaseAnonKey.length > 20
  );
}

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'f6h_auth_session'
      }
    });
  }
  return clientInstance;
}

// Authentication Helpers
export async function signUpWithEmail(
  email: string,
  password: string,
  profile: {
    fullName: string;
    indexNumber: string;
    schoolName: string;
    combination: string;
  }
) {
  const client = getSupabase();
  if (!client) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
  }

  const { data, error } = await client.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        full_name: profile.fullName.trim(),
        index_number: profile.indexNumber.trim().toUpperCase(),
        school_name: profile.schoolName.trim(),
        combination: profile.combination
      },
      emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined
    }
  });

  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const client = getSupabase();
  if (!client) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const { data, error } = await client.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password
  });

  if (error) throw error;
  return data;
}

export async function signOutUser(): Promise<void> {
  const client = getSupabase();
  if (client) {
    await client.auth.signOut();
  }
}

export async function resetPasswordForEmail(email: string): Promise<void> {
  const client = getSupabase();
  if (!client) {
    throw new Error('Supabase is not configured.');
  }

  const { error } = await client.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined
  });

  if (error) throw error;
}

export async function resendVerificationEmail(email: string): Promise<void> {
  const client = getSupabase();
  if (!client) throw new Error('Supabase is not configured.');

  const { error } = await client.auth.resend({
    type: 'signup',
    email: email.trim().toLowerCase()
  });

  if (error) throw error;
}

// Profile and Database Sync Helpers
export async function fetchUserProfile(userId: string): Promise<StudentProfile | null> {
  const client = getSupabase();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('profiles')
      .select('id, full_name, index_number, school_name, combination, updated_at')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.warn('Could not fetch remote profile:', error.message);
      return null;
    }

    if (!data) return null;

    return {
      id: data.id,
      fullName: data.full_name || '',
      indexNumber: data.index_number || '',
      schoolName: data.school_name || '',
      combination: data.combination || 'PCM',
      updatedAt: data.updated_at
    };
  } catch (err) {
    console.warn('Error reading user profile:', err);
    return null;
  }
}

export async function saveUserProfile(userId: string, profile: StudentProfile): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client
      .from('profiles')
      .upsert({
        id: userId,
        full_name: profile.fullName,
        index_number: profile.indexNumber,
        school_name: profile.schoolName,
        combination: profile.combination,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) {
      console.error('Failed to upsert profile:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving user profile:', err);
    return false;
  }
}

// Checklist Cloud Synchronization (Row Level Security protected)
export async function fetchUserChecklists(userId: string): Promise<{ [itemId: string]: boolean }> {
  const client = getSupabase();
  if (!client) return {};

  try {
    const { data, error } = await client
      .from('checklists')
      .select('item_id, completed')
      .eq('user_id', userId);

    if (error) {
      console.warn('Failed to fetch user checklists from cloud:', error.message);
      return {};
    }

    const mapping: { [itemId: string]: boolean } = {};
    if (data && Array.isArray(data)) {
      data.forEach((row: any) => {
        if (row.item_id) {
          mapping[row.item_id] = Boolean(row.completed);
        }
      });
    }
    return mapping;
  } catch (err) {
    console.warn('Error reading checklists:', err);
    return {};
  }
}

export async function syncChecklistItem(userId: string, itemId: string, completed: boolean): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client
      .from('checklists')
      .upsert({
        user_id: userId,
        item_id: itemId,
        completed,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,item_id' });

    if (error) {
      console.warn('Checklist sync error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Checklist sync failed:', err);
    return false;
  }
}

export async function resetUserChecklists(userId: string): Promise<boolean> {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client
      .from('checklists')
      .delete()
      .eq('user_id', userId);

    return !error;
  } catch (err) {
    console.warn('Failed to reset checklists:', err);
    return false;
  }
}

// Activity Log Cloud Sync
export async function fetchUserActivities(userId: string): Promise<Array<{ id: string; textSwahili: string; textEnglish: string; timestamp: string }>> {
  const client = getSupabase();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('activity_logs')
      .select('id, text_swahili, text_english, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      textSwahili: item.text_swahili,
      textEnglish: item.text_english,
      timestamp: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
  } catch (err) {
    return [];
  }
}

export async function recordUserActivity(
  userId: string,
  textSwahili: string,
  textEnglish: string
): Promise<void> {
  const client = getSupabase();
  if (!client) return;

  try {
    await client
      .from('activity_logs')
      .insert({
        user_id: userId,
        text_swahili: textSwahili,
        text_english: textEnglish
      });
  } catch (err) {
    console.warn('Could not persist activity log:', err);
  }
}

export async function clearUserActivities(userId: string): Promise<void> {
  const client = getSupabase();
  if (!client) return;

  try {
    await client
      .from('activity_logs')
      .delete()
      .eq('user_id', userId);
  } catch (err) {
    console.warn('Could not clear activities:', err);
  }
}
