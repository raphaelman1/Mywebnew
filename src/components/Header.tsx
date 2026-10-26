import React from 'react';
import { motion } from 'motion/react';
import { Globe, GraduationCap, Sparkles, MessageCircle, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentLang: 'sw' | 'en';
  setLang: (lang: 'sw' | 'en') => void;
  onNavigate: (section: 'home' | 'blog' | 'faq' | 'contact' | string) => void;
  activeSection: string;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export default function Header({ currentLang, setLang, onNavigate, activeSection, theme, setTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleLang = () => {
    setLang(currentLang === 'sw' ? 'en' : 'sw');
  };

  const menuItems = [
    { id: 'home', labelSw: 'Mwanzo', labelEn: 'Home' },
    { id: 'blog', labelSw: 'Habari & Updates', labelEn: 'News & Updates' },
    { id: 'faq', labelSw: 'Maswali (FAQ)', labelEn: 'FAQs' },
    { id: 'contact', labelSw: 'Msaada / Mawasiliano', labelEn: 'Support' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fdfcf8]/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-850 shadow-xs transition-all duration-300">
      {/* Top Banner with TZ Flag Colors as Sleek Strip Line */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/4 bg-emerald-600" /> {/* Green */}
        <div className="h-full w-1/12 bg-yellow-400" /> {/* Yellow Accent */}
        <div className="h-full w-1/4 bg-black" />       {/* Black */}
        <div className="h-full w-1/12 bg-yellow-400" /> {/* Yellow Accent */}
        <div className="h-full w-4/12 bg-sky-500" />     {/* Blue */}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo Brand */}
          <div 
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} 
            className="flex items-center space-x-2 cursor-pointer group"
            id="brand-logo"
          >
            <div className="p-1.5 sm:p-2 bg-[#1b4332] dark:bg-emerald-800 rounded-lg text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="h-4.5 w-4.5 sm:h-5 sm:w-5" id="logo-icon" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-1 font-sans">
                Form Six Helper
                <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 dark:bg-emerald-500/20 text-[#1b4332] dark:text-emerald-300 border border-emerald-500/20 rounded-full font-bold">
                  TZ
                </span>
              </h1>
              <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-wide leading-none">
                {currentLang === 'sw' ? 'Ni rahisi, hatua kwa hatua!' : 'Simple step-by-step assistance!'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 items-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                id={`nav-${item.id}`}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                  activeSection === item.id || (item.id === 'home' && !menuItems.map(m => m.id).includes(activeSection) && activeSection !== 'blog' && activeSection !== 'faq' && activeSection !== 'contact')
                    ? 'bg-[#1b4332]/10 dark:bg-emerald-500/20 text-[#1b4332] dark:text-emerald-300 border border-[#1b4332]/10 dark:border-emerald-500/10 shadow-3xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#1b4332] dark:hover:text-[#34d399] hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
                }`}
              >
                {currentLang === 'sw' ? item.labelSw : item.labelEn}
              </button>
            ))}
          </nav>

          {/* Right Area: Language Switcher & Theme Switcher & Quick WhatsApp Contact */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Theme Toggle Switch */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-1.5 sm:p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-500 dark:text-slate-300 group cursor-pointer border border-transparent dark:border-slate-800"
              title={currentLang === 'sw' ? 'Badili Mwonekano' : 'Toggle Theme'}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-emerald-800 group-hover:scale-105 transition-transform" />
              ) : (
                <Sun className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-amber-300 group-hover:scale-105 transition-transform" />
              )}
            </button>

            {/* Language Switch Dual Toggle Buttons strictly inspired by Bento design */}
            <div className="flex bg-slate-100 dark:bg-slate-900 p-0.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-2xs gap-0.5">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-200 cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-white dark:bg-slate-800 text-[#1b4332] dark:text-emerald-400 border border-slate-200 dark:border-slate-700 shadow-3xs'
                    : 'bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('sw')}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-200 cursor-pointer ${
                  currentLang === 'sw'
                    ? 'bg-white dark:bg-slate-800 text-[#1b4332] dark:text-emerald-400 border border-slate-200 dark:border-slate-700 shadow-3xs'
                    : 'bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
                }`}
              >
                SW
              </button>
            </div>

            {/* Quick Contact Header Accent */}
            <a
              href="https://wa.me/255787547236?text=Habari%20Kaka%20Raphael,%2520naomba%2520msaada%2520kuhusu%2520maombi%2520yangu"
              target="_blank"
              rel="referrer"
              id="header-whatsapp-link"
              className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-[#1b4332] dark:bg-emerald-800 hover:bg-[#112d21] dark:hover:bg-emerald-700 text-white font-extrabold text-[11px] rounded-full shadow-xs transition-transform duration-200 active:scale-95 hover:scale-102"
            >
              <MessageCircle className="h-3 w-3" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-[#1b4332] dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-orange-100 dark:border-slate-800 bg-amber-50/95 dark:bg-slate-900/95 shadow-lg absolute top-full left-0 w-full"
          id="mobile-dropdown-menu"
        >
          <div className="px-4 pt-3 pb-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                id={`mobile-nav-${item.id}`}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-150 ${
                  activeSection === item.id || (item.id === 'home' && !menuItems.map(m => m.id).includes(activeSection) && activeSection !== 'blog' && activeSection !== 'faq' && activeSection !== 'contact')
                    ? 'bg-orange-500/10 dark:bg-emerald-500/20 text-orange-850 dark:text-emerald-300 border border-orange-200/50 dark:border-emerald-800/30 shadow-2xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-orange-650 dark:hover:text-emerald-300 hover:bg-orange-50/50 dark:hover:bg-slate-800/50'
                }`}
              >
                {currentLang === 'sw' ? item.labelSw : item.labelEn}
              </button>
            ))}

            <div className="pt-4 border-t border-orange-100 dark:border-slate-800 flex flex-col space-y-3 px-2">
              <a
                href="https://wa.me/255787547236?text=Habari%20Kaka%20Raphael,%20naomba%20msaada%20kuhusu%20maombi%20yangu"
                target="_blank"
                rel="referrer"
                id="mobile-whatsapp-link"
                className="flex items-center justify-center space-x-2 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-center text-sm shadow-xs transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Msaada wa WhatsApp (+255 787 547 236)</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
