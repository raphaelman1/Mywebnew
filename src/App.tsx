import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Sparkles, 
  Phone, 
  ArrowRight, 
  BookOpen, 
  HelpCircle, 
  MessageSquare, 
  Smile, 
  CheckCircle,
  HelpCircle as HelpIcon,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  Heart,
  UserCheck,
  LogIn,
  LogOut,
  Gamepad2,
  Copy,
  Check,
  Award,
  Clock,
  Briefcase,
  AlertTriangle,
  User as UserIcon,
  Trash2,
  Mail,
  Lock,
  KeyRound,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  X,
  AlertCircle,
  Loader2
} from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import ServiceCard from './components/ServiceCard';
import ServiceDetail from './components/ServiceDetail';
import FAQSection from './components/FAQSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import AIAssistant from './components/AIAssistant';
import BubbleBackground from './components/BubbleBackground';
import { Analytics } from '@vercel/analytics/react';

import { SERVICES, BLOG_POSTS } from './data';
import { User, ActivityLog } from './types';
import {
  isSupabaseConfigured,
  getSupabase,
  signUpWithEmail,
  signInWithEmail,
  signOutUser,
  resetPasswordForEmail,
  resendVerificationEmail,
  fetchUserProfile,
  saveUserProfile,
  fetchUserChecklists,
  syncChecklistItem,
  resetUserChecklists,
  fetchUserActivities,
  recordUserActivity,
  clearUserActivities
} from './lib/supabase';

// Enforce external regex definition to prevent inline JSX slash parsing gotchas
const NECTA_INDEX_REGEX = /^[SP]\d{4}\/\d{4}\/\d{4}$/i;

export default function App() {
  const [currentLang, setLang] = useState<'sw' | 'en'>('sw');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('f6h_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (_) {}
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('f6h_theme', theme);
    } catch (e) {
      console.error("Theme load failed:", e);
    }
  }, [theme]);

  const [activeSection, setActiveSection] = useState<string>('home'); // section: 'home', 'blog', 'faq', 'contact' or service.id
  const [checkedItems, setCheckedItems] = useState<{ [itemId: string]: boolean }>({});
  
  // High School Student state for personalized experience
  const [user, setUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  
  // Simulated & Live Government Portals status state
  const [portals, setPortals] = useState<any[]>([]);
  const [loadingPortals, setLoadingPortals] = useState(false);
  const [portalTimestamp, setPortalTimestamp] = useState('');
  
  // TCU Points & HESLB Eligibility Calculator states
  const [grade1, setGrade1] = useState('D');
  const [grade2, setGrade2] = useState('D');
  const [grade3, setGrade3] = useState('C');
  
  // Real Authentication state
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authSuccessMessage, setAuthSuccessMessage] = useState<string | null>(null);

  // Student Profile parameters for registration
  const [inputName, setInputName] = useState('');
  const [inputIndexNum, setInputIndexNum] = useState('');
  const [inputSchool, setInputSchool] = useState('');
  const [inputCombination, setInputCombination] = useState('PCM');
  const [inputCustomSchool, setInputCustomSchool] = useState('');
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  
  // Password reset modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetFeedback, setResetFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Email verification resend state
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [resendFeedback, setResendFeedback] = useState<string | null>(null);

  // Supabase Configuration Guide Modal state
  const [showSupabaseGuideModal, setShowSupabaseGuideModal] = useState(false);

  // Copy to clipboard indicator for PS5 contribution
  const [copiedPS5, setCopiedPS5] = useState(false);

  // Custom alert and confirmation modal states
  const [loginError, setLoginError] = useState<string | null>(null);
  const [blockedNavAlert, setBlockedNavAlert] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Pre-filled schools for local Tanzanian context mapped to official NECTA school registration prefix
  const POPULAR_SCHOOLS = [
    { name: 'Tabora Boys Secondary School (S0101)', code: 'S0101' },
    { name: 'Mzumbe Secondary School (S0116)', code: 'S0116' },
    { name: 'Feza Boys Secondary School (S1241)', code: 'S1241' },
    { name: 'Feza Girls Secondary School (S1416)', code: 'S1416' },
    { name: 'Marian Girls High School (S0960)', code: 'S0960' },
    { name: 'Ilboru Secondary School (S0112)', code: 'S0112' },
    { name: 'Kibaha Secondary School (S0119)', code: 'S0119' },
    { name: 'Minaki Secondary School (S0108)', code: 'S0108' },
    { name: 'Tosamaganga Secondary School (S0111)', code: 'S0111' },
    { name: 'Kilakala Secondary School (S0142)', code: 'S0142' },
    { name: 'Weruweru Secondary School (S0156)', code: 'S0156' },
    { name: 'St. Mary\'s Mazinde Juu (S0485)', code: 'S0485' },
    { name: 'Same Secondary School (S0135)', code: 'S0135' },
    { name: 'Loleza Girls Secondary School (S0154)', code: 'S0154' },
    { name: 'Milambo Secondary School (S0103)', code: 'S0103' },
    { name: 'Bagamoyo Secondary School (S0140)', code: 'S0140' },
    { name: 'Machame Girls Secondary School (S0155)', code: 'S0155' },
    { name: 'Ashira Secondary School (S0141)', code: 'S0141' },
    { name: 'Galanos Secondary School (S0113)', code: 'S0113' },
    { name: 'Iyunga Technical Secondary School (S0115)', code: 'S0115' },
    { name: 'Moshi Technical Secondary School (S0117)', code: 'S0117' },
    { name: 'Kibasila Secondary School (S0107)', code: 'S0107' },
    { name: 'Azania Secondary School (S0104)', code: 'S0104' },
    { name: 'Jangwani Secondary School (S0146)', code: 'S0146' },
    { name: 'Tambaza Secondary School (S0106)', code: 'S0106' },
    { name: 'Karatu Secondary School (S0120)', code: 'S0120' },
    { name: 'Nsumba Secondary School (S0105)', code: 'S0105' },
    { name: 'Malangali Secondary School (S0123)', code: 'S0123' },
    { name: 'Ndanda Secondary School (S0125)', code: 'S0125' },
    { name: 'Shinyanga Secondary School (S0134)', code: 'S0134' },
    { name: 'Nyingine / Other', code: '' }
  ];

  const COMBINATIONS = [
    'PCM', 'PCB', 'CBG', 'HKL', 'HGL', 'HGE', 'HGK', 'EGM', 'ECA', 'CBA', 'Other / Nyingine'
  ];

  // Helper to audit government portal reachability without fabricated Math.random() values
  const fetchPortalStatus = async () => {
    setLoadingPortals(true);
    try {
      const res = await fetch('/api/ping-portals');
      if (res.ok) {
        const data = await res.json();
        setPortals(data.portals || []);
        setPortalTimestamp(data.timestamp || '');
      } else {
        // Truthful fallback - never generate fake numbers
        const fallbackPortals = [
          { name: "TCU Admission Portal", url: "https://www.tcu.go.tz", online: false, latency: null, statusText: "Hali haijathibitishwa (Unable to verify)" },
          { name: "HESLB OLAMS Portal", url: "https://olams.heslb.go.tz", online: false, latency: null, statusText: "Hali haijathibitishwa (Unable to verify)" },
          { name: "NIDA Verification System", url: "https://www.nida.go.tz", online: false, latency: null, statusText: "Hali haijathibitishwa (Unable to verify)" },
          { name: "RITA Registration", url: "https://www.rita.go.tz", online: false, latency: null, statusText: "Hali haijathibitishwa (Unable to verify)" }
        ];
        setPortals(fallbackPortals);
        setPortalTimestamp(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.warn("Could not audit government portal reachability:", err);
      const fallbackPortals = [
        { name: "TCU Admission Portal", url: "https://www.tcu.go.tz", online: false, latency: null, statusText: "Hali haijathibitishwa (Unable to verify)" },
        { name: "HESLB OLAMS Portal", url: "https://olams.heslb.go.tz", online: false, latency: null, statusText: "Hali haijathibitishwa (Unable to verify)" },
        { name: "NIDA Verification System", url: "https://www.nida.go.tz", online: false, latency: null, statusText: "Hali haijathibitishwa (Unable to verify)" },
        { name: "RITA Registration", url: "https://www.rita.go.tz", online: false, latency: null, statusText: "Hali haijathibitishwa (Unable to verify)" }
      ];
      setPortals(fallbackPortals);
      setPortalTimestamp(new Date().toLocaleTimeString());
    } finally {
      setLoadingPortals(false);
    }
  };

  // Helper to process restored or active Supabase session
  const handleSupabaseSession = async (session: any) => {
    if (!session?.user) return;
    const authUser = session.user;
    const isVerified = Boolean(authUser.email_confirmed_at);

    // Fetch remote student profile from database
    const remoteProfile = await fetchUserProfile(authUser.id);
    const meta = authUser.user_metadata || {};

    const studentUser: User = {
      id: authUser.id,
      email: authUser.email,
      fullName: remoteProfile?.fullName || meta.full_name || 'Mwanafunzi',
      indexNumber: remoteProfile?.indexNumber || meta.index_number || '',
      schoolName: remoteProfile?.schoolName || meta.school_name || 'Tanzania Secondary School',
      combination: remoteProfile?.combination || meta.combination || 'PCM',
      isLoggedIn: true,
      isEmailVerified: isVerified
    };

    setUser(studentUser);

    if (isVerified) {
      // Cloud synchronization with Row Level Security
      const remoteChecks = await fetchUserChecklists(authUser.id);
      setCheckedItems(remoteChecks);

      const remoteActivities = await fetchUserActivities(authUser.id);
      setActivities(remoteActivities);

      fetchPortalStatus();
    }
  };

  // Session restoration and event listener on mount
  useEffect(() => {
    // 1. Non-sensitive preferences from localStorage
    try {
      const savedLang = localStorage.getItem('f6h_lang');
      if (savedLang === 'en' || savedLang === 'sw') {
        setLang(savedLang);
      }

      // Populate registration form helper fields from previous local preferences safely without treating as verified
      const oldProfileStr = localStorage.getItem('f6h_user');
      if (oldProfileStr) {
        try {
          const oldProfile = JSON.parse(oldProfileStr);
          if (oldProfile && typeof oldProfile === 'object') {
            if (oldProfile.fullName) setInputName(oldProfile.fullName);
            if (oldProfile.indexNumber) setInputIndexNum(oldProfile.indexNumber);
            if (oldProfile.schoolName) {
              setInputSchool(oldProfile.schoolName);
              setSchoolSearchQuery(oldProfile.schoolName);
            }
            if (oldProfile.combination) setInputCombination(oldProfile.combination);
          }
        } catch (_) {}
      }
    } catch (e) {
      console.warn("Storage read failed:", e);
    }

    // 2. Real Supabase Session Restoration
    const client = getSupabase();
    if (client) {
      client.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          handleSupabaseSession(session);
        }
      });

      const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          handleSupabaseSession(session);
        } else {
          setUser(null);
          setCheckedItems({});
          setActivities([]);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  // Sync language to local storage
  const handleSetLang = (lang: 'sw' | 'en') => {
    setLang(lang);
    try {
      localStorage.setItem('f6h_lang', lang);
    } catch (e) {
      console.error(e);
    }
  };

  // Sync checked checklist status to database (when authenticated) and local state
  const handleToggleItem = async (serviceId: string, itemId: string) => {
    const isCompletedNow = !checkedItems[itemId];
    const updated = {
      ...checkedItems,
      [itemId]: isCompletedNow
    };
    setCheckedItems(updated);

    // If authenticated with verified email, synchronize to database with Row Level Security
    if (user?.id && user.isEmailVerified) {
      await syncChecklistItem(user.id, itemId, isCompletedNow);
    }

    // Recent Activities Log
    const service = SERVICES.find(s => s.id === serviceId);
    const item = service?.requirements.find(r => r.id === itemId);
    if (service && item) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
      const stamp = `${dateStr}, ${timeStr}`;

      const textSw = isCompletedNow 
        ? `Umekamilisha: "${item.textSwahili}" kwenye kadi ya ${service.titleSwahili}`
        : `Umeondoa vema: "${item.textSwahili}" kwenye kadi ya ${service.titleSwahili}`;
      const textEn = isCompletedNow 
        ? `Checked: "${item.textEnglish}" under ${service.titleEnglish} checklist`
        : `Unchecked: "${item.textEnglish}" under ${service.titleEnglish} checklist`;

      const newLog: ActivityLog = {
        id: Math.random().toString(36).substring(2, 9),
        textSwahili: textSw,
        textEnglish: textEn,
        timestamp: stamp
      };

      setActivities(prev => [newLog, ...prev].slice(0, 10));

      if (user?.id && user.isEmailVerified) {
        await recordUserActivity(user.id, textSw, textEn);
      }
    }
  };

  // Quick reset all checklist stats triggering custom state dialog
  const handleResetChecklist = () => {
    setShowResetModal(true);
  };

  const executeResetChecklist = async () => {
    setCheckedItems({});
    setActivities([]);
    if (user?.id && user.isEmailVerified) {
      await resetUserChecklists(user.id);
      await clearUserActivities(user.id);
    }
    setShowResetModal(false);
  };

  // Validator for Tanzanian full name registering for NECTA
  const validateNectaName = (name: string): { isValid: boolean; errorSw: string; errorEn: string } => {
    const trimmed = name.trim();
    if (!trimmed) {
      return {
        isValid: false,
        errorSw: 'Tafadhali jaza Jina lako kamili kama lilivyoandikwa NECTA!',
        errorEn: 'Please enter your Full Name exactly as registered with NECTA!'
      };
    }
    
    const nameParts = trimmed.split(/\s+/).filter(p => p.length > 0);
    
    if (nameParts.length < 2) {
      return {
        isValid: false,
        errorSw: 'Tafadhali andika majina yako kamili angalau MAWILI (Mfn: Jina la Kwanza na la Ukoo) jinsi yanavyoonekana kwenye cheti cha Form Four au maandalizi ya NECTA.',
        errorEn: 'Please enter at least TWO registered names (First and Last name) as they appear on your O-Level NECTA records.'
      };
    }

    const invalidCharPattern = /[^A-Za-z.\s'-]/;
    if (invalidCharPattern.test(trimmed)) {
      return {
        isValid: false,
        errorSw: 'Jina lina herufi zisizo sahihi! Majina ya NECTA yanapaswa kuwa na herufi pekee (A-Z) bila alama au namba.',
        errorEn: 'Name contains invalid characters! NECTA names must only contain alphabetic letters and spaces, without numbers or symbols.'
      };
    }
    
    const lowercaseWords = nameParts.filter(word => word.length > 1 && !/^[A-Z]/.test(word));
    if (lowercaseWords.length > 0) {
      return {
        isValid: false,
        errorSw: `Kila jina lazima lianze na HERUFI KUBWA (Mfn: ${nameParts.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}).`,
        errorEn: `Each name must start with a CAPITAL Letter (e.g., ${nameParts.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}).`
      };
    }

    return { isValid: true, errorSw: '', errorEn: '' };
  };

  // Validator for standard NECTA candidate index number: Sxxxx/yyyy/zzzz or Pxxxx/yyyy/zzzz
  const validateNectaIndex = (indexNum: string, chosenSchoolCode?: string): { isValid: boolean; errorSw: string; errorEn: string } => {
    const trimmed = indexNum.trim().toUpperCase();
    if (!trimmed) {
      return {
        isValid: false,
        errorSw: 'Tafadhali jaza Namba ya Mtihani (Index Number)!',
        errorEn: 'Please enter your Form Six Index Number!'
      };
    }

    const nectaFormatRegex = /^[SP]\d{4}\/\d{4}\/\d{4}$/;
    if (!nectaFormatRegex.test(trimmed)) {
      return {
        isValid: false,
        errorSw: 'Format ya Namba ya Index ni batili! Lazima ianzie na S au P, mkwaju, na iwe mfumo sahihi kama S0116/0001/2026 au P0101/0023/2025.',
        errorEn: 'Invalid Index format! Must start with S or P, followed by 4 center digits, slash, 4 candidate digits, slash, and a 4-digit exam year (e.g., S0116/0001/2026).'
      };
    }

    const codeInIndex = trimmed.substring(0, 5);
    if (chosenSchoolCode && chosenSchoolCode !== codeInIndex) {
      return {
        isValid: false,
        errorSw: `Kumbuka: Namba ya shule uliyojaza kwenye Index (${codeInIndex}) hailingani na shule uliyochagua (${chosenSchoolCode}). Tafadhali weka namba inayolingana!`,
        errorEn: `Warning: The school code in your index (${codeInIndex}) does not match the chosen school code (${chosenSchoolCode}). Please ensure compatibility.`
      };
    }

    return { isValid: true, errorSw: '', errorEn: '' };
  };

  // Real Email & Password Sign In Handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setAuthSuccessMessage(null);

    if (!isSupabaseConfigured()) {
      setShowSupabaseGuideModal(true);
      return;
    }

    if (!inputEmail.trim() || !inputPassword.trim()) {
      setLoginError(currentLang === 'sw' ? 'Tafadhali jaza barua pepe na nywila!' : 'Please enter your email and password!');
      return;
    }

    setAuthLoading(true);
    try {
      const data = await signInWithEmail(inputEmail, inputPassword);
      if (data?.session && data?.user) {
        await handleSupabaseSession(data.session);
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      const msg = err?.message || '';
      if (msg.includes('Invalid login credentials')) {
        setLoginError(currentLang === 'sw' 
          ? 'Barua pepe au nywila si sahihi. Tafadhali hakiki tena.' 
          : 'Invalid email or password. Please verify your credentials.');
      } else if (msg.includes('Email not confirmed')) {
        setLoginError(currentLang === 'sw' 
          ? 'Barua pepe yako haijathibitishwa bado. Tafadhali fungua kiungo ulichotumiwa kwenye barua pepe yako.' 
          : 'Email is not verified yet. Please click the link sent to your inbox.');
      } else {
        setLoginError(currentLang === 'sw' ? `Hitilafu ya kuingia: ${msg}` : `Login error: ${msg}`);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Real Registration Handler with Email Verification
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setAuthSuccessMessage(null);

    if (!isSupabaseConfigured()) {
      setShowSupabaseGuideModal(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail.trim())) {
      setLoginError(currentLang === 'sw' ? 'Tafadhali weka barua pepe (email) iliyo sahihi!' : 'Please enter a valid email address!');
      return;
    }

    // Password validation (provider-managed hashing, min 8 chars)
    if (inputPassword.length < 8) {
      setLoginError(currentLang === 'sw' ? 'Nywila lazima iwe na angalau herufi 8!' : 'Password must be at least 8 characters long!');
      return;
    }

    // 1. Strict Name Validation
    const nameValidation = validateNectaName(inputName);
    if (!nameValidation.isValid) {
      setLoginError(currentLang === 'sw' ? nameValidation.errorSw : nameValidation.errorEn);
      return;
    }

    // 2. Strict School Selection
    if (!inputSchool) {
      setLoginError(currentLang === 'sw' ? 'Tafadhali chagua au utafute Shule yako ya sekondari!' : 'Please select or search your High School name!');
      return;
    }

    const schoolChosen = inputSchool === 'Nyingine / Other' ? inputCustomSchool.trim() : inputSchool.trim();
    if (!schoolChosen) {
      setLoginError(currentLang === 'sw' ? 'Tafadhali andika jina la shule yako ya sekondari!' : 'Please type your custom high school name!');
      return;
    }

    // 3. Strict NECTA Index Number Validation
    const selectedSchoolObj = POPULAR_SCHOOLS.find(s => s.name === inputSchool);
    const expectedPrefix = selectedSchoolObj && selectedSchoolObj.code ? selectedSchoolObj.code : undefined;
    const indexValidation = validateNectaIndex(inputIndexNum, expectedPrefix);
    if (!indexValidation.isValid) {
      setLoginError(currentLang === 'sw' ? indexValidation.errorSw : indexValidation.errorEn);
      return;
    }

    setAuthLoading(true);
    try {
      const data = await signUpWithEmail(inputEmail, inputPassword, {
        fullName: inputName.trim(),
        indexNumber: inputIndexNum.trim().toUpperCase(),
        schoolName: schoolChosen,
        combination: inputCombination
      });

      if (data?.user) {
        const isVerified = Boolean(data.user.email_confirmed_at);
        setUser({
          id: data.user.id,
          email: data.user.email,
          fullName: inputName.trim(),
          indexNumber: inputIndexNum.trim().toUpperCase(),
          schoolName: schoolChosen,
          combination: inputCombination,
          isLoggedIn: true,
          isEmailVerified: isVerified
        });

        if (!isVerified) {
          setAuthSuccessMessage(currentLang === 'sw'
            ? `Tumekutumia kiungo cha uthibitisho kwa barua pepe: ${data.user.email}. Tafadhali fungua ili kuwezesha akaunti yako.`
            : `We sent a verification link to: ${data.user.email}. Please verify your email to unlock your dashboard.`);
        } else if (data.session) {
          await handleSupabaseSession(data.session);
        }
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setLoginError(err?.message || (currentLang === 'sw' ? 'Hitilafu wakati wa kusajili akaunti.' : 'Failed to register account.'));
    } finally {
      setAuthLoading(false);
    }
  };

  // Resend email verification
  const handleResendVerification = async () => {
    if (!user?.email) return;
    setIsResendingEmail(true);
    setResendFeedback(null);
    try {
      await resendVerificationEmail(user.email);
      setResendFeedback(currentLang === 'sw' ? '✓ Kiungo kipya kimetumwa kwenye barua pepe yako!' : '✓ A new verification link has been sent to your email!');
    } catch (err: any) {
      setResendFeedback(err?.message || (currentLang === 'sw' ? 'Imeshindikana kutuma tena kwa sasa.' : 'Failed to resend. Please try again.'));
    } finally {
      setIsResendingEmail(false);
    }
  };

  // Re-check email verification status
  const handleRefreshVerification = async () => {
    const client = getSupabase();
    if (client) {
      const { data: { session } } = await client.auth.getSession();
      if (session?.user) {
        await handleSupabaseSession(session);
      }
    }
  };

  // Password Reset Handler
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetLoading(true);
    setResetFeedback(null);
    try {
      await resetPasswordForEmail(resetEmail.trim());
      setResetFeedback({
        type: 'success',
        text: currentLang === 'sw' 
          ? 'Kiungo cha kubadilisha nywila kimetumwa kwenye barua pepe yako!' 
          : 'Password reset link sent to your email address!'
      });
    } catch (err: any) {
      setResetFeedback({
        type: 'error',
        text: err?.message || (currentLang === 'sw' ? 'Imeshindikana kutuma kiungo cha nywila.' : 'Failed to send password reset email.')
      });
    } finally {
      setResetLoading(false);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const executeLogout = async () => {
    try {
      await signOutUser();
    } catch (e) {
      console.warn("Sign out failed:", e);
    }
    setUser(null);
    setCheckedItems({});
    setActivities([]);
    setInputName('');
    setInputEmail('');
    setInputPassword('');
    setInputIndexNum('');
    setInputSchool('');
    setSchoolSearchQuery('');
    setInputCustomSchool('');
    setShowLogoutModal(false);
  };


  // Clear specific activity timeline logs
  const handleClearActivities = () => {
    setActivities([]);
    localStorage.removeItem('f6h_activities');
  };

  // Copy to Clipboard Airtel Money
  const handleCopy = () => {
    navigator.clipboard.writeText('+255787547236');
    setCopiedPS5(true);
    setTimeout(() => setCopiedPS5(false), 2000);
  };

  // Custom navigation trigger
  const handleNavigate = (section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate statistics for each service
  const getServiceStats = (serviceId: string) => {
    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return { percent: 0, completed: 0, total: 0 };
    
    const total = service.requirements.length;
    const completed = service.requirements.filter(req => checkedItems[req.id]).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { percent, completed, total };
  };

  // Calculate aggregated status of preparation across all services
  const getAllRequirementsStats = () => {
    let total = 0;
    let completed = 0;
    SERVICES.forEach(s => {
      total += s.requirements.length;
      completed += s.requirements.filter(req => checkedItems[req.id]).length;
    });
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { percent, completed, total };
  };

  const aggregateStats = getAllRequirementsStats();

  return (
    <div className="min-h-screen bg-transparent text-slate-800 flex flex-col font-sans antialiased selection:bg-orange-250 selection:text-orange-900 selection:font-bold">
      <BubbleBackground />
      
      {/* Header component */}
      <Header 
        currentLang={currentLang} 
        setLang={handleSetLang} 
        onNavigate={handleNavigate} 
        activeSection={activeSection}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Core Viewport Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          
          {/* Active section is HOME Dashboard */}
          {activeSection === 'home' && (
            <motion.div
              key="home-dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12 sm:space-y-16"
              id="home-landing-view"
            >
              
              {/* Conditional Rendering: If Logged In, check email verification gate */}
              {user && user.isLoggedIn ? (
                !user.isEmailVerified ? (
                  /* Dynamic Email Verification Required Card (Gate) */
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-300 dark:border-amber-700/60 shadow-md p-6 sm:p-8 relative overflow-hidden text-left space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-150 dark:border-slate-800">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-2xl shadow-xs border border-amber-500/20 shrink-0">
                          ✉️
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-850 dark:text-slate-100">
                              {user.fullName}
                            </h2>
                            <span className="bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 rounded-full px-2.5 py-0.5 text-[11px] font-black flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                              {currentLang === 'sw' ? 'Inasubiri Uhakiki wa Barua Pepe' : 'Email Verification Required'}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium font-mono mt-0.5">
                            {user.email} • {user.schoolName} ({user.combination})
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>{currentLang === 'sw' ? 'Toka Huduma' : 'Sign Out'}</span>
                      </button>
                    </div>

                    <div className="p-4 sm:p-5 bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/20 dark:border-amber-800/40 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
                        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                        <span>
                          {currentLang === 'sw' 
                            ? 'Uhakiki wa Barua Pepe Unahitajika Kulinda Taarifa Zako' 
                            : 'Verify Your Email to Access Protected Student Features'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-amber-900/80 dark:text-amber-200/80 leading-relaxed font-sans">
                        {currentLang === 'sw'
                          ? `Akaunti yako imeandikishwa rasmi lakini huwezi kufungua dashibodi na checklist za wingu mpaka uthibitishe umiliki wa barua pepe (${user.email || 'yako'}). Tafadhali fungua kikasha chako cha barua pepe (pamoja na folda ya Spam/Junk) na ubofye kiungo cha uthibitisho.`
                          : `Your account was created, but protected student tools, checklist synchronization, and custom trackers remain locked until you verify ownership of ${user.email || 'your email'}. Check your inbox or spam folder and click the verification link.`}
                      </p>
                    </div>

                    {resendFeedback && (
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold rounded-xl flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{resendFeedback}</span>
                      </div>
                    )}

                    {loginError && (
                      <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200 text-xs font-bold rounded-xl flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={handleResendVerification}
                        disabled={isResendingEmail}
                        className="flex-1 py-3 px-4 bg-[#1b4332] hover:bg-[#153427] text-white rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isResendingEmail ? (
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <span>📧 {currentLang === 'sw' ? 'Tuma Tena Kiungo cha Uhakiki' : 'Resend Verification Email'}</span>
                        )}
                      </button>

                      <button
                        onClick={handleRefreshVerification}
                        disabled={authLoading}
                        className="py-3 px-5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2"
                      >
                        <span>🔄 {currentLang === 'sw' ? 'Nimehakiki, Fungua Dashibodi' : "I've Verified, Open Dashboard"}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Dynamic Personalized Student Command Center Card (Verified) */
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 relative overflow-hidden text-left space-y-6 sm:space-y-8">
                    {/* Decorative corner flag strips */}
                    <div className="absolute top-0 right-0 h-2 w-72 flex opacity-85">
                    <div className="h-full w-1/4 bg-emerald-600" />
                    <div className="h-full w-1/12 bg-yellow-400" />
                    <div className="h-full w-1/4 bg-black" />
                    <div className="h-full w-1/12 bg-yellow-400" />
                    <div className="h-full w-1/3 bg-sky-500" />
                  </div>

                  {/* Profile Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#1b4332]/10 dark:bg-emerald-500/10 text-[#1b4332] dark:text-emerald-400 flex items-center justify-center font-bold text-2xl shadow-xs border border-[#1b4332]/5 dark:border-emerald-500/10 shrink-0">
                        👨🏾‍🎓
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-850 dark:text-slate-100">
                            {user.fullName}
                          </h2>
                          <span className="bg-emerald-500/10 dark:bg-emerald-500/25 text-[#1b4332] dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-500/30 rounded-full px-2.5 py-0.5 text-[10px] font-black flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {currentLang === 'sw' ? 'Akaunti Validated' : 'Validated Student'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                          {user.schoolName} • <span className="font-mono bg-slate-100 dark:bg-slate-850 px-1 py-0.5 rounded text-slate-700 dark:text-slate-300 font-bold">{user.indexNumber}</span> • <span className="font-bold text-[#1b4332] dark:text-emerald-400">Mchepuo: {user.combination}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-705 dark:text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>{currentLang === 'sw' ? 'Toka Huduma' : 'Sign Out'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Grid aggregation of indicators and recent activities */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                    
                    {/* Aggregated progress stats bento card */}
                    <div className="lg:col-span-4 bg-[#fcfcfc] dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-3xs flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="px-2 py-0.5 bg-emerald-100/60 dark:bg-emerald-950/50 text-[#1b4332] dark:text-emerald-300 rounded-md font-mono text-[9px] font-bold uppercase tracking-wider inline-block">
                          {currentLang === 'sw' ? 'MAENDELEO YAKO' : 'CUMULATIVE PROGRESS'}
                        </span>
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                          {currentLang === 'sw' ? 'Kiashiria cha Utayari wako' : 'Admission readiness'}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal font-sans">
                          {currentLang === 'sw' 
                            ? 'Asilimia huongezeka unapoweka vema (ticking) mahitaji kwenye miongozo ya huduma 5 chini.'
                            : 'Calculates verification checklist status indicators across all essential services.'}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                        <div className="flex justify-between items-center text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
                          <span>{currentLang === 'sw' ? 'Vitu Tayari' : 'Verified tasks'}</span>
                          <span className="bg-emerald-50 dark:bg-emerald-950/45 px-2 py-1.5 rounded-lg border border-emerald-500/10 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[10.5px]">
                            {aggregateStats.completed}/{aggregateStats.total} {currentLang === 'sw' ? 'Hatua' : 'Steps'}
                          </span>
                        </div>

                        {/* Large dashboard progress bar */}
                        <div className="h-4 w-full bg-slate-150 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-3xs">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${aggregateStats.percent}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-[#128c7e]"
                          />
                        </div>

                        <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 pt-1">
                          <Award className="h-3.5 w-3.5 text-[#1b4332] shrink-0" />
                          <span className="font-semibold italic truncate">
                            {aggregateStats.percent === 100 
                              ? (currentLang === 'sw' ? 'Hongera sana! Uko 100% tayari!' : 'Splendid! You are 100% prepared!')
                              : (currentLang === 'sw' ? `Kamilisha vigezo mapema!` : `${aggregateStats.total - aggregateStats.completed} steps remaining.`)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline of Realtime Recent Activities Log */}
                    <div className="lg:col-span-4 bg-[#fcfcfc] dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-3xs flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-slate-700 dark:text-slate-300 font-bold" />
                          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest font-mono">
                            {currentLang === 'sw' ? 'Kumbukumbu (Logs)' : 'Recent Activities'}
                          </h3>
                        </div>
                        {activities.length > 0 && (
                          <button 
                            onClick={handleClearActivities}
                            className="text-[9px] text-slate-450 hover:text-red-650 flex items-center gap-1 font-mono hover:underline cursor-pointer"
                            title={currentLang === 'sw' ? 'Futa kumbukumbu' : 'Clear timeline logs'}
                          >
                            <Trash2 className="h-2.5 w-2.5" />
                            {currentLang === 'sw' ? 'Futa' : 'Clear'}
                          </button>
                        )}
                      </div>

                      {/* Log feed list */}
                      <div className="flex-1 overflow-y-auto max-h-[140px] space-y-2 pr-1 font-sans text-left">
                        {activities.length === 0 ? (
                           <div className="h-full flex flex-col items-center justify-center text-center py-4">
                             <span className="text-xl mb-1 opacity-80">📋</span>
                             <p className="text-[10px] text-slate-400 dark:text-slate-450">
                              {currentLang === 'sw' 
                                ? 'Hakuna kumbukumbu bado. Gonga vema miongozo chini!'
                                : 'Checklist is clean. Toggle items down below to register logs.'}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {activities.slice(0, 5).map((item, index) => (
                              <div key={item.id || index} className="flex space-x-1.5 items-start text-[11px] border-l border-[#1b4332]/20 dark:border-emerald-500/20 pl-2">
                                <span className="text-[9px] bg-[#1b4332]/5 dark:bg-emerald-500/10 text-[#1b4332] dark:text-emerald-300 font-mono px-1 py-0.2 rounded shrink-0">
                                  {item.timestamp.split(',')[1] || item.timestamp}
                                </span>
                                <p className="text-slate-600 dark:text-slate-300 font-medium leading-tight">
                                  {currentLang === 'sw' ? item.textSwahili : item.textEnglish}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Live Government Portal Status Checker (Cool Automation) */}
                    <div className="lg:col-span-4 bg-[#fcfcfc] dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-3xs flex flex-col justify-between text-left">
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                          <div className="flex items-center space-x-1.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest font-mono">
                              {currentLang === 'sw' ? 'Hali ya Mifumo (Live)' : 'Portal Servers'}
                            </h3>
                          </div>
                          <button 
                            onClick={fetchPortalStatus}
                            disabled={loadingPortals}
                            className="text-[10px] text-[#1b4332] dark:text-emerald-450 hover:text-black dark:hover:text-white font-semibold font-mono disabled:text-slate-400 cursor-pointer"
                          >
                            {loadingPortals ? '...' : (currentLang === 'sw' ? 'Muhu' : 'Sync')}
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 font-sans leading-tight">
                          {currentLang === 'sw' 
                            ? 'Ukaguzi wa kuishi wa seva za serikali kuzuia usumbufu.'
                            : 'Real-time response audit of central regulatory platform directories.'}
                        </p>

                        <div className="space-y-1.5 text-[11px]">
                          {portals.length === 0 ? (
                            <div className="py-2 text-center text-slate-400">
                              <button 
                                onClick={fetchPortalStatus}
                                className="px-2.5 py-1 bg-[#1b4332]/5 dark:bg-emerald-500/10 text-[#1b4332] dark:text-emerald-355 text-[10px] font-bold rounded-lg border border-[#1b4332]/10 dark:border-emerald-500/10 hover:bg-[#1b4332]/10 transition-colors cursor-pointer"
                              >
                                {currentLang === 'sw' ? 'Pakua Hali ya Seva Live' : 'Test Server Speed'}
                              </button>
                            </div>
                          ) : (
                            portals.map((srv, idx) => (
                              <div key={idx} className="flex justify-between items-center pb-1 border-b border-slate-100/30 dark:border-slate-800/40 last:border-0 last:pb-0">
                                <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[130px] font-sans text-[10.5px]">{srv.name}</span>
                                <div className="flex items-center space-x-1.5 shrink-0">
                                  {srv.online ? (
                                    <>
                                      <span className="text-[9px] text-[#1b4332] dark:text-emerald-400 font-mono leading-none bg-emerald-500/10 px-1 py-0.2 rounded-sm font-semibold">
                                        {srv.latency ? `${srv.latency}ms` : 'Online'}
                                      </span>
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-[9px] text-red-700 font-mono leading-none bg-red-500/10 px-1 py-0.2 rounded-sm font-semibold">
                                        Down
                                      </span>
                                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    </>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-150 dark:border-slate-800 text-[9px] text-slate-400 font-mono flex justify-between items-center leading-none">
                        <span>Checked: {portalTimestamp || 'No data'}</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold font-mono uppercase tracking-wider">{currentLang === 'sw' ? 'Tayari' : 'Standby'}</span>
                      </div>
                    </div>

                  </div>

                  {/* Combination-based Personalised Academic Guidance */}
                  <div className="bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl p-4 sm:p-5 border border-amber-500/15 dark:border-amber-500/20 text-left space-y-2">
                    <h4 className="text-sm font-bold text-[#1b4332] dark:text-[#34d399] flex items-center gap-1.5">
                      <Sparkles className="h-4.5 w-4.5 text-yellow-500 animate-pulse" />
                      <span>{currentLang === 'sw' ? `Ushauri wa Kitaaluma kwa Wasomi wa ${user.combination}` : `Personalized Advice for ${user.combination} Candidates`}</span>
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      {user.combination === 'PCM' || user.combination === 'PCB' || user.combination === 'CBG' || user.combination === 'CBA' ? (
                        currentLang === 'sw'
                          ? `Mdogo wangu unayesoma sayansi (${user.combination}), bodi ya mikopo (HESLB) inakupa kipaumbele kikubwa sana kwenye mikopo ikilinganishwa na kozi za afya au uhandisi. Hakikisha cheti cha kuzaliwa RITA hakina kukosewa herufi hata moja na weka kipaumbele TCU mapema kwenye vyuo vikubwa kama UDSM, UDOM ama SUA!`
                          : `As a Science student (${user.combination}), HESLB grants high priorities for loan approvals, particularly in medical sciences, engineering, and digital information technology. Ensure your e-RITA validation letter matches your NECTA spelling precisely to avoid delays!`
                      ) : user.combination === 'HKL' || user.combination === 'HGL' || user.combination === 'HGK' ? (
                        currentLang === 'sw'
                          ? `Kwa mchepuo wako wa Sanaa (${user.combination}), angazia kozi nzuri zenye soko la ajira kama Sheria (Law), Kitabu cha Sheria na Lugha, Elimu (Education) au Sayansi ya Jamii na Maendeleo ya Jamii. Hakikisha TCU Guidebook umeisoma mapema ili kujua points za cut-off maana ushindani ni mkubwa!`
                          : `With your Arts combo background (${user.combination}), target competitive programs with rich market options like Law, Education, or Development Studies. Always review the TCU and direct university prospectus early to grasp the minimum required entry points!`
                      ) : user.combination === 'HGE' || user.combination === 'EGM' || user.combination === 'ECA' ? (
                        currentLang === 'sw'
                          ? `Mchepuo wako wa Biashara au Uchumi (${user.combination}) ni bora mno! Vyuo vingi kama Mzumbe University au UDSM vina ofa kubwa za Udhibiti wa Fedha (Finance), Uhasibu (Accounting), Uchumi au Usimamizi wa Biashara. Hakikisha maandalizi yako kadi za mikopo na NIDA viko tayari mwanafunzi wetu!`
                          : `Your business background combination (${user.combination}) is stellar. Universities like Mzumbe, IFM, or UDSM have robust allocations for Banking, Accounting, Finance, or Economic Policy courses. Fast-track your e-RITA letter and NIDA verification status early!`
                      ) : (
                        currentLang === 'sw'
                          ? `Karibu sana ${user.fullName}! Mchepuo uliyosoma una upana mkubwa wa fursa. Pitia kwa umakini kijitabu cha mwongozo wa TCU uweke vipaumbele vya kozi ambazo unakidhi vigezo kwa asilima 100 kulingana na muhtasari wako wa points.`
                          : `Welcome aboard! Your graduate combination has widespread academic programs. Deliberately inspect the official TCU guidebook to find the precise fields matching your total ACSEE point counts.`
                      )}
                    </p>
                  </div>

                  {/* NECTA Results Points & HESLB Loan Eligibility Predictor (Cool Automation) */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs text-left grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden" id="cta-predictor-card">
                    {/* Left Column: Grade selects */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 bg-[#1b4332]/10 dark:bg-emerald-500/20 text-[#1b4332] dark:text-emerald-300 border border-[#1b4332]/15 dark:border-emerald-500/10 rounded-md font-mono text-[9px] font-bold uppercase tracking-wider inline-block">
                          {currentLang === 'sw' ? 'KIKOKOTOO CHA TCU & HESLB' : 'TCU POINTS & LOAN ELIGIBILITY'}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-[#1b4332] dark:text-emerald-400">
                          {currentLang === 'sw' ? 'Kikokotoo cha Pointi & Mkopo' : 'Points & Loan Predictor Indicator'}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal font-sans">
                          {currentLang === 'sw' 
                            ? 'Ingiza madaraja yako ya masomo makuu matatu ya Kidato cha Sita (Advanced Level Grades) uone pointi yako ya TCU na asilimia ya mkopo!'
                            : 'Input your three ACSEE primary grade letters below to compute estimated university entry points and loan priority probability.'}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3 items-center">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-700 dark:text-slate-350 font-mono uppercase bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded mb-1">{currentLang === 'sw' ? 'Somo la 1' : 'Subject 1'}</label>
                          <select 
                            value={grade1} 
                            onChange={(e) => setGrade1(e.target.value)} 
                            className="bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 p-2 rounded-xl cursor-pointer w-20"
                          >
                            {['A', 'B', 'C', 'D', 'E', 'S', 'F'].map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-slate-700 dark:text-slate-350 font-mono uppercase bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded mb-1">{currentLang === 'sw' ? 'Somo la 2' : 'Subject 2'}</label>
                          <select 
                            value={grade2} 
                            onChange={(e) => setGrade2(e.target.value)} 
                            className="bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 p-2 rounded-xl cursor-pointer w-20"
                          >
                            {['A', 'B', 'C', 'D', 'E', 'S', 'F'].map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-slate-700 dark:text-slate-350 font-mono uppercase bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded mb-1">{currentLang === 'sw' ? 'Somo la 3' : 'Subject 3'}</label>
                          <select 
                            value={grade3} 
                            onChange={(e) => setGrade3(e.target.value)} 
                            className="bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 p-2 rounded-xl cursor-pointer w-20"
                          >
                            {['A', 'B', 'C', 'D', 'E', 'S', 'F'].map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Calculations outcome and prediction dials */}
                    <div className="bg-[#1b4332]/5 dark:bg-emerald-500/10 p-4 rounded-2xl border border-[#1b4332]/10 dark:border-emerald-500/10 flex flex-col justify-between">
                      {(() => {
                        const gMap: { [key: string]: number } = { A: 5, B: 4, C: 3, D: 2, E: 1, S: 0.5, F: 0 };
                        const points = gMap[grade1] + gMap[grade2] + gMap[grade3];
                        
                        // Compute eligibility percentage
                        let eligibility = 50;
                        let adviceSw = '';
                        let adviceEn = '';
                        
                        const isScience = ['PCM', 'PCB', 'CBG', 'CBA'].includes(user?.combination || '');
                        const isEconomics = ['EGM', 'ECA', 'HGE'].includes(user?.combination || '');
 
                        if (points >= 12) {
                          eligibility = isScience ? 98 : isEconomics ? 92 : 88;
                          adviceSw = 'Kaka Mkuu anasema: Hongera sana! Una pointi za daraja la juu na kipaumbele chako cha mkopo ni cha juu mno. Vyuo vikuu vitashindana kukupata, mdogo wangu!';
                          adviceEn = 'Brother Raphael says: Marvelous score! Your priority indexing is top-tier and admissions across universities are automatically green-lit.';
                        } else if (points >= 7) {
                          eligibility = isScience ? 88 : isEconomics ? 81 : 75;
                          adviceSw = 'Kaka Mkuu anasema: Pointi zako ni nzuri sana kwa udahili wa kozi nyingi za kiushindani. Bodi ya Mikopo itakupa kipaumbele kikubwa ukiambatanisha vyeti vilivyohakikiwa na RITA na NIDA mapema.';
                          adviceEn = 'Brother Raphael says: Solid principal pass points. You have clear access into high-demand courses. File with your RITA letters early.';
                        } else if (points >= 3.5) {
                          eligibility = isScience ? 72 : isEconomics ? 65 : 55;
                          adviceSw = 'Kaka Mkuu anasema: Pointi zako zinaruhusu kujiunga na digrii vyuo vingi vya serikali. Hakikisha umechagua kozi zenye kipaumbele cha taifa kama Elimu na Sayansi iti upate mkopo kwa haraka!';
                          adviceEn = 'Brother Raphael says: Pass is sufficient for direct degree entry. Focus priorities on national shortage areas to leverage higher loan thresholds.';
                        } else {
                          eligibility = 30;
                          adviceSw = 'Kaka Mkuu anasema: Kwa alama hizi, ushauri mzuri ni kuingia kwa ngazi ya Diploma (Stashahada) ya miaka miwili ya TCU kwanza kama daraja, utafika tu mdogo wangu!';
                          adviceEn = 'Brother Raphael says: We highly recommend using a Diploma bridging path to transition safely into subsequent full undergraduate slots.';
                        }
 
                        return (
                          <div className="space-y-3">
                            <div className="flex justify-between items-center pb-2 border-[#1b4332]/10 dark:border-emerald-500/20 border-b">
                              <div className="text-left">
                                <p className="text-[9px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400">{currentLang === 'sw' ? 'Jumla ya Pointi' : 'Total TCU Points'}</p>
                                <h4 className="text-sm font-bold font-mono text-[#1b4332] dark:text-emerald-300">{points} Points</h4>
                              </div>
                              <div className="text-right">
                                <p className="text-[9px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400">{currentLang === 'sw' ? 'Nafasi ya Mkopo' : 'Loan Priority'}</p>
                                <h4 className="text-sm font-mono font-bold text-[#1b4332] dark:text-emerald-300">{eligibility}% chance</h4>
                              </div>
                            </div>
                            
                            <div className="space-y-1 text-left">
                              <span className="text-[9px] font-bold uppercase tracking-wide bg-[#1b4332]/10 dark:bg-emerald-500/20 text-[#1b4332] dark:text-emerald-300 px-1.5 py-0.5 rounded-sm inline-block font-mono">
                                {currentLang === 'sw' ? 'Mrejesho wa Kaka Mkuu' : 'Raph Verdict Advice'}
                              </span>
                              <p className="text-[10.5px] text-[#1b4332] dark:text-emerald-300 font-sans leading-normal font-medium leading-relaxed">
                                {currentLang === 'sw' ? adviceSw : adviceEn}
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                </div>
              )) : (
                /* Classic Welcoming Hero Banner with Sign Up / Student Login form right beside it */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Column: Greeting Banner */}
                  <div className="lg:col-span-7 bg-gradient-to-br from-amber-500/10 via-orange-400/[0.04] to-white dark:from-slate-900 dark:via-slate-900/40 dark:to-slate-950 rounded-3xl p-6 sm:p-8 border border-orange-100 dark:border-slate-800 shadow-md flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#1b4332]/10 dark:bg-emerald-500/10 border border-[#1b4332]/15 dark:border-emerald-500/20 text-[#1b4332] dark:text-[#34d399] rounded-full text-xs font-bold font-mono">
                        <Sparkles className="h-3.5 w-3.5 text-[#1b4332] dark:text-[#34d399] animate-pulse" />
                        <span>{currentLang === 'sw' ? 'Uongozi na Mpango wa Kidigitali' : 'Step-by-Step Graduate Kit'}</span>
                      </div>

                      <h2 className="text-3xl sm:text-4.5xl font-bold text-slate-850 dark:text-slate-100 tracking-tight leading-tight">
                        {currentLang === 'sw' ? 'Karibu Sana, Mdogo Wangu! 🇹🇿' : 'Welcome to Your Success Path, Friend! 🇹🇿'}
                      </h2>

                      <p className="text-sm sm:text-base text-slate-650 dark:text-slate-300 leading-relaxed font-sans max-w-2xl">
                        {currentLang === 'sw' 
                          ? 'Hongera sana kwa kufika hatua hii kubwa ya kumaliza Kidato cha Sita! Usipate tabu ya kukimbia huku na huko kwenye ofisi. Nimekuandalia mwongozo rahisi, hatua kwa hatua, kukuongoza maombi yote mtandaoni.'
                          : 'You made it through Form Six examinations! Avoid running physically from office to office. Use our free, interactive guides and checklists to process your loans, NIDA, and university admission sheets smoothly.'}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-orange-100/65 dark:border-slate-800/80 space-y-4 text-left">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-[#1b4332]/10 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-800 dark:text-slate-200 text-sm border border-[#1b4332]/15 dark:border-slate-700">
                          👨🏾‍🎓
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {currentLang === 'sw' ? 'Brother Raphael (Kaka Mkuu)' : 'Brother Raphael (Your Guide)'}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {currentLang === 'sw' ? 'Mwongozo wa vitendo kwa wanafunzi wa Kidato cha Sita Tanzania.' : 'Practical guidance for Tanzanian Form Six graduates.'}
                          </p>
                        </div>
                      </div>

                      <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-mono text-emerald-600 dark:text-[#34d399] bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 font-bold shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>USHAURI KUPITIA WHATSAPP: +255 787 547 236</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Real Email/Password Authentication Box */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs font-sans text-left flex flex-col justify-between">
                    <div>
                      {/* Tabs: Sign In vs Register */}
                      <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl mb-4 border border-slate-200/60 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('signin');
                            setLoginError(null);
                            setAuthSuccessMessage(null);
                          }}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                            authMode === 'signin'
                              ? 'bg-white dark:bg-slate-700 text-[#1b4332] dark:text-emerald-400 shadow-xs'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          {currentLang === 'sw' ? 'Ingia (Sign In)' : 'Sign In'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('register');
                            setLoginError(null);
                            setAuthSuccessMessage(null);
                          }}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                            authMode === 'register'
                              ? 'bg-white dark:bg-slate-700 text-[#1b4332] dark:text-emerald-400 shadow-xs'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          {currentLang === 'sw' ? 'Unda Akaunti' : 'Create Account'}
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 pb-2 mb-3 border-b border-slate-100 dark:border-slate-800">
                        <LogIn className="h-4.5 w-4.5 text-[#1b4332] dark:text-emerald-400" />
                        <h3 className="text-base sm:text-lg font-bold text-slate-850 dark:text-slate-100">
                          {authMode === 'signin'
                            ? (currentLang === 'sw' ? 'Ingia kwenye Akaunti Yako' : 'Sign In to Your Account')
                            : (currentLang === 'sw' ? 'Jisajili kama Mwanafunzi' : 'Register Student Account')}
                        </h3>
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                        {authMode === 'signin'
                          ? (currentLang === 'sw' 
                              ? 'Weka barua pepe na nywila yako kufungua dashibodi yako na orodha zilizohifadhiwa.'
                              : 'Enter your verified email and password to access your student dashboard and checklists.')
                          : (currentLang === 'sw'
                              ? 'Unda akaunti salama ya mwanafunzi. Barua pepe itathibitishwa kabla ya kuruhusu ufikiaji wa dashibodi.'
                              : 'Create your verified student account. An email confirmation link is sent to activate your account.')}
                      </p>

                      {/* Error Banner */}
                      {loginError && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 mb-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs font-bold rounded-xl flex items-start gap-2"
                        >
                          <AlertTriangle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                          <span>{loginError}</span>
                        </motion.div>
                      )}

                      {/* Success Banner */}
                      {authSuccessMessage && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 mb-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-xl flex items-start gap-2"
                        >
                          <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                          <span>{authSuccessMessage}</span>
                        </motion.div>
                      )}

                      {/* Sign In Form */}
                      {authMode === 'signin' ? (
                        <form onSubmit={handleSignIn} className="space-y-3.5">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-mono">
                              {currentLang === 'sw' ? 'Barua Pepe (Email)' : 'Email Address'}
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="mf: mwanafunzi@example.com"
                              value={inputEmail}
                              onChange={(e) => setInputEmail(e.target.value)}
                              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-250 dark:border-slate-700 focus:ring-1 focus:ring-[#1b4332] dark:focus:ring-emerald-500 focus:border-[#1b4332] dark:focus:border-emerald-500 outline-hidden placeholder:text-slate-400 dark:bg-slate-800 dark:text-slate-200 font-sans"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                                {currentLang === 'sw' ? 'Nywila (Password)' : 'Password'}
                              </label>
                              <button
                                type="button"
                                onClick={() => {
                                  setResetEmail(inputEmail);
                                  setResetFeedback(null);
                                  setShowForgotModal(true);
                                }}
                                className="text-[11px] text-[#1b4332] dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
                              >
                                {currentLang === 'sw' ? 'Umesahau nywila?' : 'Forgot password?'}
                              </button>
                            </div>
                            <input
                              type="password"
                              required
                              placeholder="••••••••"
                              value={inputPassword}
                              onChange={(e) => setInputPassword(e.target.value)}
                              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-250 dark:border-slate-700 focus:ring-1 focus:ring-[#1b4332] dark:focus:ring-emerald-500 focus:border-[#1b4332] dark:focus:border-emerald-500 outline-hidden placeholder:text-slate-400 dark:bg-slate-800 dark:text-slate-200 font-sans"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full mt-2 py-3 bg-[#1b4332] hover:bg-[#153427] text-white rounded-2xl text-xs sm:text-sm font-black shadow-md cursor-pointer transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {authLoading ? (
                              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <LogIn className="h-4 w-4" />
                                <span>{currentLang === 'sw' ? 'Ingia Kwenye Dashibodi' : 'Sign In to Dashboard'}</span>
                              </>
                            )}
                          </button>
                        </form>
                      ) : (
                        /* Register Form */
                        <form onSubmit={handleRegister} className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-mono">
                                {currentLang === 'sw' ? 'Barua Pepe' : 'Email'}
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                                className="w-full text-xs p-2.5 rounded-xl border border-slate-250 dark:border-slate-700 focus:ring-1 focus:ring-[#1b4332] dark:focus:ring-emerald-500 outline-hidden placeholder:text-slate-400 dark:bg-slate-800 dark:text-slate-200"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-mono">
                                {currentLang === 'sw' ? 'Nywila (Min 8)' : 'Password (8+)'}
                              </label>
                              <input
                                type="password"
                                required
                                minLength={8}
                                placeholder="••••••••"
                                value={inputPassword}
                                onChange={(e) => setInputPassword(e.target.value)}
                                className="w-full text-xs p-2.5 rounded-xl border border-slate-250 dark:border-slate-700 focus:ring-1 focus:ring-[#1b4332] dark:focus:ring-emerald-500 outline-hidden placeholder:text-slate-400 dark:bg-slate-800 dark:text-slate-200"
                              />
                            </div>
                          </div>

                          {/* Name Input */}
                          <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-mono">
                              {currentLang === 'sw' ? 'Jina Kamili (NECTA Certificate)' : 'Full Name (NECTA)'}
                            </label>
                            <input
                              type="text"
                              required
                              placeholder={currentLang === 'sw' ? 'Mf: Neema Saimon Kisingo' : 'Ex: Neema Saimon Kisingo'}
                              value={inputName}
                              onChange={(e) => setInputName(e.target.value)}
                              className="w-full text-xs p-2.5 rounded-xl border border-slate-250 dark:border-slate-700 focus:ring-1 focus:ring-[#1b4332] dark:focus:ring-emerald-500 outline-hidden placeholder:text-slate-400 dark:bg-slate-800 dark:text-slate-200 font-sans"
                            />
                            {inputName.trim() && !validateNectaName(inputName).isValid && (
                              <p className="text-[10px] text-amber-600 mt-1 font-medium bg-amber-500/5 p-1 rounded-sm border border-amber-250/20">
                                ⚠️ {currentLang === 'sw' ? validateNectaName(inputName).errorSw : validateNectaName(inputName).errorEn}
                              </p>
                            )}
                          </div>

                          {/* Searchable School Autocomplete Pick */}
                          <div className="relative">
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-mono">
                              {currentLang === 'sw' ? 'Shule ya Sekondari' : 'High School Name'}
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                placeholder={currentLang === 'sw' ? 'Tafuta shule au kituo, mf: Tabora, S0116...' : 'Search school or centre code, e.g. Tabora, S0116...'}
                                value={schoolSearchQuery}
                                onFocus={() => setShowSchoolDropdown(true)}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setSchoolSearchQuery(val);
                                  setInputSchool(val);
                                  setShowSchoolDropdown(true);
                                }}
                                className="w-full text-xs p-2.5 rounded-xl border border-slate-250 dark:border-slate-700 focus:ring-1 focus:ring-[#1b4332] dark:focus:ring-emerald-500 outline-hidden placeholder:text-slate-400 bg-white dark:bg-slate-800 dark:text-slate-200"
                              />
                              {schoolSearchQuery && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSchoolSearchQuery('');
                                    setInputSchool('');
                                  }}
                                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 font-bold text-base cursor-pointer"
                                >
                                  ×
                                </button>
                              )}
                            </div>

                            {showSchoolDropdown && (
                              <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 text-left divide-y divide-slate-100 dark:divide-slate-700 font-sans">
                                {(() => {
                                  const query = schoolSearchQuery.trim().toLowerCase();
                                  const filtered = POPULAR_SCHOOLS.filter(sc =>
                                    sc.name.toLowerCase().includes(query) ||
                                    sc.code.toLowerCase().includes(query)
                                  );

                                  if (filtered.length === 0) {
                                    return (
                                      <div
                                        onClick={() => {
                                          setInputSchool('Nyingine / Other');
                                          setInputCustomSchool(schoolSearchQuery);
                                          setShowSchoolDropdown(false);
                                        }}
                                        className="p-2.5 text-xs text-slate-500 hover:bg-slate-50 cursor-pointer font-medium"
                                      >
                                        ✨ {currentLang === 'sw' ? 'Sajili kama shule:' : 'Use custom school:'} "{schoolSearchQuery}"
                                      </div>
                                    );
                                  }

                                  return filtered.map(sc => (
                                    <div
                                      key={sc.name}
                                      onClick={() => {
                                        setInputSchool(sc.name);
                                        setSchoolSearchQuery(sc.name);
                                        setShowSchoolDropdown(false);

                                        if (sc.code) {
                                          const cleanIdx = inputIndexNum.trim().toUpperCase();
                                          if (!cleanIdx || cleanIdx === 'S' || cleanIdx.length < 5) {
                                            setInputIndexNum(sc.code + '/');
                                          } else {
                                            const codeMatch = cleanIdx.match(/^(S\d{4}|\w\d{4})(.*)$/);
                                            if (codeMatch) {
                                              setInputIndexNum(sc.code + codeMatch[2]);
                                            } else {
                                              setInputIndexNum(sc.code + '/' + cleanIdx);
                                            }
                                          }
                                        } else {
                                          setInputSchool('Nyingine / Other');
                                        }
                                      }}
                                      className="p-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 cursor-pointer flex justify-between items-center"
                                    >
                                      <span className="font-semibold">{sc.name}</span>
                                      {sc.code && (
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-350 px-1.5 py-0.5 rounded-sm font-mono font-bold">
                                          {sc.code}
                                        </span>
                                      )}
                                    </div>
                                  ));
                                })()}
                              </div>
                            )}
                          </div>

                          {/* Custom School Input when Other selected */}
                          {inputSchool === 'Nyingine / Other' && (
                            <div className="space-y-1">
                              <label className="block text-xs font-bold text-amber-700 uppercase tracking-wider font-mono">
                                {currentLang === 'sw' ? 'Andika Jina la Shule' : 'Custom School Name'}
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="E.g., Kibasila Secondary"
                                value={inputCustomSchool}
                                onChange={(e) => setInputCustomSchool(e.target.value)}
                                className="w-full text-xs p-2 rounded-xl border border-slate-250 dark:border-slate-700 focus:ring-1 focus:ring-[#1b4332] outline-hidden bg-amber-50/10"
                              />
                            </div>
                          )}

                          {/* Form Six Index & Combination */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-7">
                              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-mono">
                                {currentLang === 'sw' ? 'Index ya NECTA' : 'NECTA Index'}
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="S0116/0023/2026"
                                value={inputIndexNum}
                                onChange={(e) => setInputIndexNum(e.target.value)}
                                className="w-full text-xs p-2.5 rounded-xl border border-slate-250 dark:border-slate-700 focus:ring-1 focus:ring-[#1b4332] dark:focus:ring-emerald-500 outline-hidden font-mono uppercase"
                              />
                              {inputIndexNum.trim() && !NECTA_INDEX_REGEX.test(inputIndexNum.trim()) && (
                                <p className="text-[10px] text-amber-600 mt-1 font-mono bg-amber-500/5 p-1 rounded-sm border border-amber-250/15">
                                  ⚠️ S0116/0001/2026
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-5">
                              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-mono">
                                Combo
                              </label>
                              <select
                                value={inputCombination}
                                onChange={(e) => setInputCombination(e.target.value)}
                                className="w-full text-xs p-2.5 rounded-xl border border-slate-250 dark:border-slate-700 focus:ring-1 focus:ring-[#1b4332] dark:focus:ring-emerald-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer h-[38px]"
                              >
                                {COMBINATIONS.map(cb => (
                                  <option key={cb} value={cb}>{cb}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full mt-2 py-3 bg-[#1b4332] hover:bg-[#153427] text-white rounded-2xl text-xs sm:text-sm font-black shadow-md cursor-pointer transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {authLoading ? (
                              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4" />
                                <span>{currentLang === 'sw' ? 'Kamilisha Usajili wa Mwanafunzi' : 'Complete Registration'}</span>
                              </>
                            )}
                          </button>
                        </form>
                      )}

                      {/* Supabase status indicator footer */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5 font-medium">
                          <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured() ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                          {isSupabaseConfigured() 
                            ? (currentLang === 'sw' ? 'Database & Auth: Imeunganishwa' : 'Database & Auth: Connected')
                            : (currentLang === 'sw' ? 'Hali: Supabase haijaunganishwa' : 'Status: Supabase not linked')}
                        </span>
                        {!isSupabaseConfigured() && (
                          <button
                            type="button"
                            onClick={() => setShowSupabaseGuideModal(true)}
                            className="text-[#1b4332] dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
                          >
                            {currentLang === 'sw' ? 'Mwongozo wa Setup' : 'Setup Guide'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* SECTION: BENTO GRID DASHBOARD */}
              <div className="space-y-12 sm:space-y-16">
                  <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1b4332] font-sans flex items-center gap-2">
                       Chagua Huduma Hapa Chini
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium font-sans">
                      {currentLang === 'sw' 
                        ? 'Mwongozo na orodha ya mahitaji ya kidijitali kujiandaa na chuo au ajira.'
                        : 'Interactive step-guides and digital lists to prepare for university or careers.'}
                    </p>
                  </div>

                  {aggregateStats.completed > 0 && (
                    <button
                      onClick={handleResetChecklist}
                      id="reset-overall-checklist"
                      className="text-xs text-[#1b4332] hover:text-black border border-[#1b4332]/20 hover:bg-slate-100 font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer self-start sm:self-center"
                    >
                      {currentLang === 'sw' ? 'Futa maendeleo' : 'Reset Progress'}
                    </button>
                  )}
                </div>

                {/* Highly structured Bento Grid layout aligned to the 12-column spec */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
                  {SERVICES.map((srv) => {
                    const stats = getServiceStats(srv.id);
                    const bentoColSpan = srv.id === 'heslb' 
                      ? 'md:col-span-12 lg:col-span-7' 
                      : srv.id === 'tcu'
                        ? 'md:col-span-6 lg:col-span-5'
                        : srv.id === 'rita'
                          ? 'md:col-span-6 lg:col-span-4'
                          : srv.id === 'nida'
                            ? 'md:col-span-6 lg:col-span-4'
                            : 'md:col-span-6 lg:col-span-4'; // 'jobs'
                    
                    return (
                      <ServiceCard
                        key={srv.id}
                        service={srv}
                        currentLang={currentLang}
                        progressPercent={stats.percent}
                        completedCount={stats.completed}
                        totalCount={stats.total}
                        className={bentoColSpan}
                        onSelect={handleNavigate}
                      />
                    );
                  })}

                  {/* Row 3 - Column Span 8: Aesthetic full-width horizontal Support banner matching bento style */}
                  <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-gradient-to-br from-[#128c7e] to-[#075e54] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-center shadow-lg shadow-teal-900/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 -mr-16 -mt-16 rounded-full opacity-30 z-0 pointer-events-none" />
                    
                    <div className="max-w-xl space-y-2 relative z-10 text-left">
                      <span className="px-2.5 py-0.5 bg-white/20 text-white border border-white/25 rounded-md font-mono text-[9px] font-bold uppercase tracking-wider inline-block">
                        {currentLang === 'sw' ? 'MSAADA ZAIDI' : 'EXTRA SUPPORT'}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold leading-tight font-sans">
                        {currentLang === 'sw' ? 'Je, unahitaji msaada zaidi au ushauri?' : 'Need some extra advice or help?'}
                      </h4>
                      <p className="text-xs sm:text-sm text-emerald-100 font-sans leading-relaxed">
                        {currentLang === 'sw' 
                          ? 'Tuma picha au maelezo ya tatizo lako la maombi moja kwa moja WhatsApp kwa msaada wa haraka usiolipishwa kutoka kwa Brother Raphael.'
                          : 'Send screenshot errors directly on WhatsApp. Your elder brother Raphael will guide you step-by-step for free!'}
                      </p>
                    </div>

                    <div className="mt-6 md:mt-0 relative z-10 shrink-0 w-full md:w-auto">
                      <a
                        href="https://wa.me/255787547236?text=Habari%20Kaka%20Raphael,%20nikutani%20na%20tatizo%2520kwenye%20maombi%20yangu"
                        target="_blank"
                        rel="referrer"
                        id="widget-whatsapp-link"
                        className="w-full md:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 bg-white text-[#128c7e] hover:bg-emerald-50 rounded-2xl font-black text-sm shadow-xl hover:scale-[1.01] active:scale-95 transition-all duration-150 cursor-pointer text-center"
                      >
                        <MessageSquare className="h-4.5 w-4.5" />
                        <span>{currentLang === 'sw' ? 'Tuma WhatsApp' : 'WhatsApp Support'} (+255 787 547 236)</span>
                      </a>
                    </div>
                  </div>

                  {/* Row 3 - Column Span 4: Interactive Airtel Money PS5 Support Card */}
                  <div className="col-span-1 md:col-span-12 lg:col-span-4 bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
                    {/* Background game controller decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 -mr-10 -mt-10 rounded-full opacity-40 z-0 pointer-events-none" />
                    
                    <div className="space-y-4 text-left relative z-10">
                      <div className="flex justify-between items-start">
                        <span className="bg-purple-900/65 text-purple-200 border border-purple-500/30 text-[9px] font-bold tracking-widest font-mono uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Gamepad2 className="h-3 w-3 animate-bounce" />
                          <span>PS5 Fund 🎮</span>
                        </span>
                        <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-[9px] px-2 py-0.5 rounded font-bold font-mono">
                          AIRTEL MONEY
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white tracking-tight lead-tight">
                        {currentLang === 'sw' ? 'Support ya PS5 kwa Brother' : 'Support Brother\'s PS5 Goal'}
                      </h3>

                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        {currentLang === 'sw' 
                          ? 'Marafiki zangu! Kama mwongozo huu umeondoa stress na kukuepusha na upotevu wa pesa, mchangie mdogo wenu Brother Raphael kupata PlayStation 5. Soda yoyote inasaidia!'
                          : 'Hey friends! If these guides saved you hefty cyber cafe fees & school application errors, consider supporting Brother Raphael\'s PS5 fund! Every soda contributes.'}
                      </p>

                      {/* Generated Premium PS5 Console Image */}
                      <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-inner max-h-[145px] select-none">
                        <img 
                          src="/src/assets/images/ps5_1tb_console_1779813503045.png" 
                          alt="PlayStation 5 Slim 1TB Console"
                          referrerPolicy="no-referrer"
                          className="w-full h-32 object-cover transform hover:scale-105 transition-transform duration-300 pointer-events-none"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-2 text-center">
                          <span className="text-[9.5px] text-white opacity-95 font-mono tracking-widest uppercase font-bold">🎯 Slim 1TB Edition Console</span>
                        </div>
                      </div>

                      {/* Airtel Money Payment details box */}
                      <div className="p-3 bg-slate-850 rounded-xl border border-slate-800/80 space-y-1 text-xs">
                        <p className="text-[9px] text-[#fec89a] uppercase font-bold tracking-tight font-mono">
                          Airtel Money Agent & Personal No:
                        </p>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-white text-sm font-bold tracking-wide">
                            +255 787 547 236
                          </span>
                          <button 
                            onClick={handleCopy}
                            className="p-1 px-2.5 bg-slate-800 hover:bg-slate-755 text-xs text-slate-300 rounded-lg flex items-center gap-1 active:scale-95 transition-all cursor-pointer font-bold border border-slate-700"
                            title={currentLang === 'sw' ? 'Nakili namba' : 'Copy payment number'}
                          >
                            {copiedPS5 ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-400" />
                                <span className="text-[10px] text-emerald-400">Ok!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-2.5 w-2.5" />
                                <span className="text-[10px]">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono italic">
                          Name: <span className="text-white font-semibold">RAPHAEL HARUNI</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800/80 space-y-2 relative z-10">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>Fund Target Progression:</span>
                        <span className="text-[#fec89a] font-bold">10.2% (TZS 185,000 / 1,800,000)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-750">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '10.2%' }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-purple-500 to-orange-400"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* OVERALL GRADUATION PREPAREDNESS PROGRESS PANEL */}
              <div className="bg-linear-to-tr from-[#1b4332]/5 to-[#1b4332]/[0.01] dark:from-slate-900 dark:to-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-3xs flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                <div className="space-y-1.5 text-center md:text-left">
                  <h4 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 font-sans">
                    {currentLang === 'sw' ? '🩺 Kiashiria chako cha Matayarisho Kidato cha Sita' : '🎓 Your Overall College Admission readiness'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                    {currentLang === 'sw' 
                      ? 'Orodha hii inakokotoa utayari wa nyaraka zako zote zilizowekewa vema katika mifumo 5 hapo juu.'
                      : 'Accumulated check parameters across all Form Six auxiliary services.'}
                  </p>
                </div>

                <div className="w-full md:w-80 space-y-2">
                  <div className="flex justify-between text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    <span>{currentLang === 'sw' ? 'Nyaraka zote' : 'All parameters'}</span>
                    <span>{aggregateStats.completed}/{aggregateStats.total} ({aggregateStats.percent}%)</span>
                  </div>
                  
                  {/* Aggregated Track progress bar */}
                  <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      key="aggregated-progress"
                      initial={{ width: 0 }}
                      animate={{ width: `${aggregateStats.percent}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-orange-400 via-emerald-600 to-[#1b4332]"
                    />
                  </div>
                  
                  <p className="text-[10px] text-slate-500 italic font-mono text-center md:text-right">
                    {aggregateStats.percent === 100 
                      ? (currentLang === 'sw' ? '🙌 Hongera sana upo 100% Tayari!' : '🙌 Ready 100% for the next adventure!')
                      : (currentLang === 'sw' ? 'Weka vema vigezo zaidi kufikia 100%' : 'Check off more parameters')}
                  </p>
                </div>
              </div>

              {/* LATEST BLOG SHORTCUT PREVIEW */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                
                {/* News & Updates Preview Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-[#1b4332] dark:text-emerald-300 bg-[#1b4332]/10 dark:bg-emerald-500/20 px-2.5 py-1 rounded-full">
                      {currentLang === 'sw' ? 'TAARIFA MPYA' : 'NEWS BULLETIN'}
                    </span>
                    <h4 className="text-xl font-bold mt-3 text-slate-800 dark:text-slate-100">
                      {currentLang === 'sw' ? 'Blog & Taarifa za Uhakiki' : 'Announcements & Updates Portal'}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans leading-relaxed">
                      {currentLang === 'sw' 
                        ? 'Jipatie mwanga kuhusu tarehe za mwisho za kuwasilisha maombi ya mikopo HESLB na udahili TCU round ya kwanza.'
                        : 'Catch up on operational announcements and high school deadlines straight from central servers.'}
                    </p>
                    
                    {/* Latest Article teaser */}
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-left">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 block mb-1">Latest Article • May 26, 2026</span>
                      <strong className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 block hover:text-[#1b4332] dark:hover:text-[#34d399] transition-colors cursor-pointer" onClick={() => handleNavigate('blog')}>
                        {currentLang === 'sw' ? BLOG_POSTS[1].titleSwahili : BLOG_POSTS[1].titleEnglish}
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigate('blog')}
                    id="home-goto-blog"
                    className="mt-6 w-full py-2.5 bg-[#1b4332]/10 dark:bg-[#1b4332]/20 hover:bg-[#1b4332]/15 text-[#1b4332] dark:text-emerald-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <span>{currentLang === 'sw' ? 'Fungua Blog na Updates' : 'View Announcements'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* FAQ Help Shortcut Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xs">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-[#1b4332] dark:text-emerald-300 bg-[#1b4332]/10 dark:bg-emerald-500/20 px-2.5 py-1 rounded-full">
                      {currentLang === 'sw' ? 'MISAADA YA HARAKA' : 'KNOWLEDGE HUB'}
                    </span>
                    <h4 className="text-xl font-bold mt-3 text-slate-800 dark:text-slate-100">
                      {currentLang === 'sw' ? 'Maswali yanayoulizwa Sana (FAQ)' : 'Common Troubleshooter Guidance'}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans leading-relaxed">
                      {currentLang === 'sw' 
                        ? 'Maswali ya "Je naweza kusahihisha jina?", "Inachukua siku ngapi e-RITA?", "Boom hutolewa lini chuoni?" yamejibiwa yote hapa.'
                        : 'Instantly search solutions to issues surrounding registry number lost sheets or wrong combination values.'}
                    </p>

                    {/* Quick Question Preview */}
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-left">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 block mb-1">Common Question</span>
                      <strong className="text-xs sm:text-sm text-slate-850 dark:text-slate-200 block">
                        {currentLang === 'sw' ? 'Je boom la chuo ni kiasi gani kwa siku?' : 'How much is the HESLB daily boom allowance?'}
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigate('faq')}
                    id="home-goto-faq"
                    className="mt-6 w-full py-2.5 bg-[#128c7e]/10 dark:bg-[#128c7e]/20 hover:bg-[#128c7e]/15 text-[#128c7e] dark:text-teal-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <span>{currentLang === 'sw' ? 'Soma Maswali na Majibu' : 'Review FAQs'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            </motion.div>
          )}

          {/* Section: Selected Service Detail View */}
          {SERVICES.map(s => s.id).includes(activeSection) && (
            (() => {
              const service = SERVICES.find(s => s.id === activeSection);
              if (!service) return null;
              return (
                <ServiceDetail
                  key={service.id}
                  service={service}
                  currentLang={currentLang}
                  checkedItems={checkedItems}
                  onToggleItem={handleToggleItem}
                  onBack={() => setActiveSection('home')}
                />
              );
            })()
          )}

          {/* Section: Blog updates */}
          {activeSection === 'blog' && (
            <motion.div
              key="blog-section"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <BlogSection currentLang={currentLang} />
            </motion.div>
          )}

          {/* Section: FAQ */}
          {activeSection === 'faq' && (
            <motion.div
              key="faq-section"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <FAQSection currentLang={currentLang} />
            </motion.div>
          )}

          {/* Section: Contact */}
          {activeSection === 'contact' && (
            <motion.div
              key="contact-section"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <ContactSection currentLang={currentLang} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* AIAssistant Integration */}
      {user && user.isLoggedIn && (
        <AIAssistant currentLang={currentLang} user={user} />
      )}

      {/* Floating emergency support indicator, shifts position left when logged in to not overlap with AIAssistant */}
      <div className={`fixed bottom-6 ${user && user.isLoggedIn ? 'left-6' : 'right-6'} z-40 hidden sm:block`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-900 border border-slate-800 text-white p-3 pr-4 rounded-full shadow-lg flex items-center space-x-2.5 whitespace-nowrap"
          id="sticky-support-bubble"
        >
          <a
            href="tel:+255787547236"
            className="p-1.5 bg-orange-500 rounded-full text-white cursor-pointer animate-pulse"
            title="Piga simu sasa"
          >
            <Phone className="h-4 w-4" />
          </a>
          <div className="text-left">
            <span className="text-[9px] text-slate-400 block font-mono font-medium leading-none">Need assistance?</span>
            <span className="text-xs font-bold font-mono tracking-wide">+255 787 547 236</span>
          </div>
        </motion.div>
      </div>

      {/* Footer component */}
      <Footer currentLang={currentLang} onNavigate={handleNavigate} />

      {/* CUSTOM DIALOG MODALS - Non-blocking React equivalents to window.confirm/alert inside iframe */}
      <AnimatePresence>
        {/* Navigation block warning modal */}
        {blockedNavAlert && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-150 shadow-xl text-center space-y-4 font-sans text-left"
            >
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto text-xl">
                🔒
              </div>
              <h4 className="text-base font-bold text-slate-850 text-center">
                {currentLang === 'sw' ? 'Mwanzo Unahitajika' : 'Action Required'}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed text-center">
                {blockedNavAlert}
              </p>
              <button
                onClick={() => setBlockedNavAlert(null)}
                className="w-full py-2.5 bg-[#1b4332] hover:bg-[#112d21] text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                {currentLang === 'sw' ? 'Nimeelewa' : 'Got it'}
              </button>
            </motion.div>
          </div>
        )}

        {/* Reset progress confirm modal */}
        {showResetModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-150 shadow-xl text-center space-y-4 font-sans text-left"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 text-red-650 flex items-center justify-center mx-auto text-xl font-bold">
                🗑️
              </div>
              <h4 className="text-base font-bold text-slate-850 text-center">
                {currentLang === 'sw' ? 'Futa Maendeleo?' : 'Reset All Progress?'}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed text-center">
                {currentLang === 'sw' 
                  ? 'Je una uhakika unataka kufuta maendeleo yako yote na kuanza upya? Hatua hii hairejesheki.'
                  : 'Are you sure you want to clear your verified checklists and recent logs? This action cannot be undone.'}
              </p>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-200"
                >
                  {currentLang === 'sw' ? 'Ghairi' : 'Cancel'}
                </button>
                <button
                  onClick={executeResetChecklist}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-red-900/10"
                >
                  {currentLang === 'sw' ? 'Futa Kila Kitu' : 'Yes, Reset'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Logout confirm modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[#2px] z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-150 shadow-xl text-center space-y-4 font-sans text-left"
            >
              <div className="w-12 h-12 rounded-full bg-[#1b4332]/10 border border-[#1b4332]/20 text-[#1b4332] flex items-center justify-center mx-auto text-xl">
                🚪
              </div>
              <h4 className="text-base font-bold text-slate-850 text-center">
                {currentLang === 'sw' ? 'Toka kwenye Akaunti?' : 'Sign Out?'}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed text-center">
                {currentLang === 'sw' 
                  ? 'Je una uhakika unataka kutoka kwenye akaunti yako? Maendeleo yako yamehifadhiwa salama kwenye mfumo.'
                  : 'Are you sure you want to sign out from your account? Your progress is safely synchronized.'}
              </p>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-705 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-200"
                >
                  {currentLang === 'sw' ? 'Ghairi' : 'Cancel'}
                </button>
                <button
                  onClick={executeLogout}
                  className="flex-1 py-2.5 bg-[#1b4332] hover:bg-[#112d21] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-emerald-900/10"
                >
                  {currentLang === 'sw' ? 'Toka Sasa' : 'Yes, Sign Out'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 max-w-md w-full border border-slate-150 dark:border-slate-800 shadow-xl space-y-4 font-sans text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#1b4332]/10 dark:bg-emerald-500/20 text-[#1b4332] dark:text-emerald-400 flex items-center justify-center text-lg font-bold">
                    🔑
                  </div>
                  <h4 className="text-base font-bold text-slate-850 dark:text-slate-100">
                    {currentLang === 'sw' ? 'Badilisha Nywila' : 'Reset Password'}
                  </h4>
                </div>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold cursor-pointer"
                >
                  ×
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {currentLang === 'sw'
                  ? 'Weka anwani ya barua pepe uliyojisajili nayo. Tutakutumia kiungo salama chenye uhalali wa muda mfupi kubadili nywila yako.'
                  : 'Enter the email address registered with your student account. A secure, expiring single-use reset link will be sent to your inbox.'}
              </p>

              {resetFeedback && (
                <div className={`p-3 rounded-xl text-xs font-bold border flex items-center gap-2 ${
                  resetFeedback.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                    : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800 text-red-800 dark:text-red-200'
                }`}>
                  {resetFeedback.type === 'success' ? '✓' : '⚠️'} {resetFeedback.text}
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 font-mono">
                    {currentLang === 'sw' ? 'Barua Pepe (Email)' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-250 dark:border-slate-700 focus:ring-1 focus:ring-[#1b4332] dark:focus:ring-emerald-500 outline-hidden dark:bg-slate-800 dark:text-slate-200"
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    {currentLang === 'sw' ? 'Funga' : 'Close'}
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 py-2.5 bg-[#1b4332] hover:bg-[#153427] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {resetLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>{currentLang === 'sw' ? 'Tuma Kiungo' : 'Send Reset Link'}</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Supabase Setup Guide Modal */}
        {showSupabaseGuideModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-slate-150 dark:border-slate-800 shadow-xl space-y-4 font-sans text-left max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[#1b4332] dark:text-emerald-400 flex items-center justify-center text-lg font-bold">
                    ⚡
                  </div>
                  <h4 className="text-base font-bold text-slate-850 dark:text-slate-100">
                    {currentLang === 'sw' ? 'Mwongozo wa Supabase & Auth' : 'Supabase Auth & Database Setup'}
                  </h4>
                </div>
                <button
                  onClick={() => setShowSupabaseGuideModal(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold cursor-pointer"
                >
                  ×
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentLang === 'sw'
                  ? 'Mfumo wa Form Six Helper TZ unatumia Supabase Auth na PostgreSQL yenye Row Level Security (RLS) kuhakikisha akaunti na orodha za wanafunzi zinalindwa kwa viwango vya juu vya usalama.'
                  : 'Form Six Helper TZ uses Supabase Auth and PostgreSQL with Row Level Security (RLS) to ensure student data and application checklists are protected with industry standards.'}
              </p>

              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <p className="font-bold text-[#1b4332] dark:text-emerald-400">
                    1. Unda Mradi kwenye Supabase (Create Project)
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Tembelea <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">supabase.com</a> na ufungue New Project (free tier).
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <p className="font-bold text-[#1b4332] dark:text-emerald-400">
                    2. Endesha Schema ya Database (Run SQL Migration)
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Kwenye Supabase SQL Editor, nakili na uendeshe faili la <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded font-mono text-[10px]">supabase/schema.sql</code> lililomo kwenye mradi huu. Hili litaunda majedwali ya <code className="font-mono text-[10px]">profiles</code>, <code className="font-mono text-[10px]">checklists</code>, na <code className="font-mono text-[10px]">activity_logs</code> pamoja na sera za RLS.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <p className="font-bold text-[#1b4332] dark:text-emerald-400">
                    3. Weka Vigezo vya Mazingira (Environment Variables)
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    VITE_SUPABASE_URL=https://your-project.supabase.co<br />
                    VITE_SUPABASE_ANON_KEY=your-anon-key
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowSupabaseGuideModal(false)}
                  className="w-full py-2.5 bg-[#1b4332] hover:bg-[#153427] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  {currentLang === 'sw' ? 'Nimeelewa' : 'Understood'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Analytics />
    </div>
  );
}
