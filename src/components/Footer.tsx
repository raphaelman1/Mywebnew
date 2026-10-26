import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MessageCircle, ArrowUpRight, GraduationCap, LifeBuoy, ShieldCheck } from 'lucide-react';

interface FooterProps {
  currentLang: 'sw' | 'en';
  onNavigate: (section: 'home' | 'blog' | 'faq' | 'contact' | string) => void;
}

export default function Footer({ currentLang, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-350 border-t border-slate-800 pt-16 pb-12 rounded-t-[2.5rem] mt-20 relative overflow-hidden">
      {/* Decorative Warm Backglow */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-10 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="p-2 bg-gradient-to-tr from-orange-400 to-amber-500 rounded-xl text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Form Six Helper TZ</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {currentLang === 'sw' 
                ? 'Tovuti ya upendo inayowaongoza vijana waliomaliza Kidato cha Sita kufikia fursa, mikopo ya vyuo (HESLB), NIDA, na maombi ya udahili kwa njia rahisi ya kidigitali.'
                : 'A friendly guide designed to help high school graduates manage and complete their college enrollment tasks, HESLB, RITA, NIDA, and job applications.'}
            </p>

            <div className="flex items-center space-x-2 pt-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
                {currentLang === 'sw' ? 'MKOROGO SAFI • DAIMA NAWE' : 'SECURE • FREE • ALWAYS HERE'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
              {currentLang === 'sw' ? 'HUDUMA MUHIMU' : 'CORE PATHS'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('heslb')} className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  HESLB Loan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('nida')} className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  NIDA Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rita')} className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Birth Cert (RITA)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tcu')} className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Unis (TCU/TAMISEMI)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-350 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Job Vacancies
                </button>
              </li>
            </ul>
          </div>

          {/* Urgent Support / Emergency Links */}
          <div className="space-y-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 font-mono flex items-center gap-1">
              <LifeBuoy className="h-3 w-3 text-orange-400" />
              {currentLang === 'sw' ? 'MSAADA & WASILIANA' : 'SUPPORT DESK'}
            </h4>
            <div className="space-y-3">
              <div className="text-xs text-slate-400">
                {currentLang === 'sw' 
                  ? 'Una swali au umekwama? Pigia au nicheki WhatsApp saa 24/7. Niko hapa kukusaidia Mdogo wangu!'
                  : 'Stuck or confused with procedures? Call or WhatsApp anytime 24/7. Your elder brother has got your back!'}
              </div>

              {/* Display Phone Number Clearly as Requested */}
              <div className="font-mono text-white text-sm font-bold flex items-center gap-2 " id="direct-footer-phone">
                <Phone className="h-4 w-4 text-orange-400 shrink-0" />
                <a href="tel:+255787547236" className="hover:underline hover:text-orange-350">
                  +255 787 547 236
                </a>
              </div>

              {/* Direct Support link easily accessible */}
              <div>
                <button 
                  onClick={() => onNavigate('contact')} 
                  id="footer-support-link"
                  className="w-full py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-white border border-orange-500/30 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {currentLang === 'sw' ? 'Omba Msaada (Free)' : 'Request Support (Free)'}
                </button>
              </div>

              {/* WhatsApp Click Action */}
              <a
                href="https://wa.me/255787547236?text=Habari%20Kaka%20Raphael,%20ninaomba%20msaada%20naona%20swali%20kwenye%20maombi%20yangu."
                target="_blank"
                rel="referrer"
                id="footer-whatsapp-action"
                className="flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Details Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>&copy; {currentYear} Form Six Helper TZ. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-705">|</span>
            <span className="text-slate-300 font-semibold">
              Powered by Sam, and developed by Řalph
            </span>
            <span className="hidden sm:inline text-slate-705">|</span>
            <span className="text-slate-400 font-medium">
              {currentLang === 'sw' 
                ? 'Utulivu na upendo kwa wahitimu wote Tanzania 🇹🇿' 
                : 'Empowering Tanzania high school graduates with care 🇹🇿'}
            </span>
          </div>
          
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-1 rounded-md font-mono">
              V1.2.6-Live
            </span>
            <span className="text-[10px] text-orange-400 bg-orange-500/10 px-2 py-1 rounded-md font-mono font-semibold">
              Support Line: +255 787 547 236
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
