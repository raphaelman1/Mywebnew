-- =========================================================================
-- Form Six Helper TZ - Production Supabase PostgreSQL Schema with RLS
-- =========================================================================

-- 1. Profiles Table (Stores student details linked to authenticated user)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  index_number text,
  school_name text,
  combination text default 'PCM',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable Row Level Security (RLS) on profiles
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 2. Checklists Table (User checklist progress for HESLB, TCU, RITA, NIDA, JOBS)
create table if not exists public.checklists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  item_id text not null,
  completed boolean default false not null,
  updated_at timestamptz default now() not null,
  constraint unique_user_item unique (user_id, item_id)
);

-- Enable RLS on checklists
alter table public.checklists enable row level security;

-- Policies for checklists: Strictly only the owner can read or write
create policy "Users can view their own checklists"
  on public.checklists for select
  using (auth.uid() = user_id);

create policy "Users can insert their own checklists"
  on public.checklists for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own checklists"
  on public.checklists for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own checklists"
  on public.checklists for delete
  using (auth.uid() = user_id);

-- 3. Activity Logs Table (User action audit timeline)
create table if not exists public.activity_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  text_swahili text not null,
  text_english text not null,
  created_at timestamptz default now() not null
);

-- Enable RLS on activity_logs
alter table public.activity_logs enable row level security;

create policy "Users can view their own activities"
  on public.activity_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own activities"
  on public.activity_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own activities"
  on public.activity_logs for delete
  using (auth.uid() = user_id);

-- 4. Contact Messages Table (Persisted inquiries from verified form submissions)
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  service text not null,
  message text not null,
  created_at timestamptz default now() not null
);

-- Enable RLS on contact_messages
alter table public.contact_messages enable row level security;

-- Authenticated users or anonymous callers via service key can insert messages
create policy "Anyone can insert verified contact message"
  on public.contact_messages for insert
  with check (true);

-- 5. Trigger to automatically create profile on auth.user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, index_number, school_name, combination)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'index_number', ''),
    coalesce(new.raw_user_meta_data->>'school_name', ''),
    coalesce(new.raw_user_meta_data->>'combination', 'PCM')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Bind trigger to auth.users table
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Performance Indexes
create index if not exists idx_checklists_user_id on public.checklists(user_id);
create index if not exists idx_activity_logs_user_id on public.activity_logs(user_id);
