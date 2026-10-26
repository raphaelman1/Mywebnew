import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle, 
  UserCheck, 
  HelpCircle, 
  Sparkles,
  Award,
  ListTodo,
  Smile,
  Copy
} from 'lucide-react';
import { ServiceData } from '../types';

interface ServiceDetailProps {
  key?: React.Key;
  service: ServiceData;
  currentLang: 'sw' | 'en';
  checkedItems: { [itemId: string]: boolean };
  onToggleItem: (serviceId: string, itemId: string) => void;
  onBack: () => void;
}

export default function ServiceDetail({
  service,
  currentLang,
  checkedItems,
  onToggleItem,
  onBack
}: ServiceDetailProps) {
  
  // Calculate specific service statistics for the progress bar
  const totalItems = service.requirements.length;
  const completedItems = service.requirements.filter(req => checkedItems[req.id]).length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const [copiedLink, setCopiedLink] = React.useState(false);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="space-y-8"
      id={`service-detail-${service.id}`}
    >
      
      {/* Back Button & Intro banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          id="detail-back-button"
          className="self-start inline-flex items-center space-x-2 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-[#fff9f5] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-orange-700 dark:hover:text-[#fdba74] rounded-xl text-sm font-semibold border border-orange-100 dark:border-slate-800 shadow-2xs transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{currentLang === 'sw' ? 'Rudi Nyumbani' : 'Back to Home'}</span>
        </button>

        {/* Dynamic status badge */}
        <div className="font-mono text-xs px-3.5 py-1.5 bg-orange-150/40 dark:bg-orange-500/10 text-orange-850 dark:text-orange-350 rounded-full border border-orange-200/40 dark:border-orange-500/10 flex items-center gap-1.5 self-start">
          <Sparkles className="h-3.5 w-3.5 text-orange-500 animate-spin-slow" />
          <span>{currentLang === 'sw' ? 'Mwongozo Unafanya Kazi' : 'Active Helper Mode'}</span>
        </div>
      </div>

      {/* Main Core Detail Box */}
      <div className="bg-gradient-to-br from-white to-orange-50/20 dark:from-slate-900 dark:to-slate-950 rounded-3xl border border-orange-100 dark:border-slate-800 shadow-lg p-6 sm:p-8 relative overflow-hidden">
        
        {/* Accent flags colors corner */}
        <div className="absolute top-0 right-0 h-2 w-48 flex opacity-70">
          <div className="h-full w-1/3 bg-emerald-500" />
          <div className="h-full w-1/6 bg-yellow-400" />
          <div className="h-full w-1/3 bg-black" />
          <div className="h-full w-1/6 bg-sky-500" />
        </div>

        {/* Hero Title & Short Statement */}
        <div className="max-w-3xl">
          <div className="inline-flex py-1 px-3 bg-orange-500/10 text-orange-700 rounded-full text-xs font-bold font-mono tracking-wider uppercase mb-3">
            {service.id}
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-black text-slate-850 dark:text-slate-100 tracking-tight leading-tight">
            {currentLang === 'sw' ? service.titleSwahili : service.titleEnglish}
          </h2>
          
          <div className="mt-4 p-4 sm:p-5 bg-white/80 dark:bg-slate-900/85 rounded-2xl border border-orange-100/50 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <h4 className="font-bold text-orange-850 dark:text-orange-400 flex items-center gap-1 mb-1 font-sans">
              <Smile className="h-5 w-5 text-orange-500" />
              {currentLang === 'sw' ? 'Hili Ni Jambo Gani Mdogo Wangu? (What is this for)' : 'Understanding This Service'}
            </h4>
            <p>{currentLang === 'sw' ? service.purposeSwahili : service.purposeEnglish}</p>
          </div>
        </div>

        {/* Dynamic Welcoming Tracker Progress bar */}
        <div className="mt-8 bg-amber-500/10 dark:bg-amber-500/5 rounded-2xl p-5 border border-amber-500/20 dark:border-amber-500/10 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5 font-sans">
                <ListTodo className="h-4.5 w-4.5 text-orange-500" />
                {currentLang === 'sw' ? 'Orodha yako ya Kukamilisha Maombi' : 'Your Application Progress Tracker'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-sans">
                {currentLang === 'sw' 
                  ? 'Gusa au weka alama ya vema (tick) kwenye mahitaji uliyonayo mkononi ili kuona utayari wako.'
                  : 'Check items as you gather them. Your progress saves automatically in your phone!'}
              </p>
            </div>
            
            <div className="font-mono text-sm font-black text-orange-850 dark:text-orange-350 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-orange-200 dark:border-slate-800 shrink-0 self-start sm:self-center">
              {completedItems}/{totalItems} {currentLang === 'sw' ? 'Imekamilika' : 'Done'} ({progressPercent}%)
            </div>
          </div>

          {/* Progress Bar with Staggered Gradient */}
          <div className="h-3 w-full bg-slate-200/80 dark:bg-slate-850 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4 }}
              className={`h-full bg-gradient-to-r ${
                progressPercent === 100 
                  ? 'from-emerald-500 via-teal-500 to-emerald-600' 
                  : progressPercent > 50 
                    ? 'from-amber-400 to-orange-500' 
                    : 'from-orange-400 to-amber-500'
              }`}
            />
          </div>

          {/* Prompt Message */}
          <p className="text-xs font-mono font-medium text-orange-850 mt-2.5 flex items-center gap-1">
            <span className="text-base">💡</span>
            {progressPercent === 100 
              ? (currentLang === 'sw' ? 'Kazi nzuri sana! Hatua zote za kukusanya nyaraka zimekamilika. Hakikisha sasa unatuma mchango wako mtandaoni!' : 'Awesome work! You are 100% prepared to submit. Go ahead!')
              : progressPercent >= 50
                ? (currentLang === 'sw' ? 'Zaidi ya nusu tayari! Umefanya kazi nzuri, kamilisha yaliyobaki sasa.' : 'More than halfway! Finish the remaining tasks and submit.')
                : (currentLang === 'sw' ? 'Weka vema vigezo uliyonayo mapema Mdogo wangu kabla ya muda wa deadline.' : 'Check your items early to prevent last-minute delays.')}
          </p>
        </div>

      </div>

      {/* Grid: 2 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Requirements Checklist & Steps */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section: Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-orange-100 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold font-sans text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2 border-b border-orange-50 dark:border-slate-800 pb-4">
              <span className="p-1 px-2.5 bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-350 text-xs rounded-lg font-mono">1</span>
              {currentLang === 'sw' ? 'Vigezo na Mahitaji Muhimu (Checklist / Requirements)' : 'Core Checklist & Requirements'}
            </h3>

            <div className="space-y-3.5">
              {service.requirements.map((req) => {
                const isChecked = !!checkedItems[req.id];
                return (
                  <label
                    key={req.id}
                    id={`checkbox-label-${req.id}`}
                    className={`flex items-start space-x-3.5 p-4 rounded-2xl cursor-pointer border transition-all duration-150 select-none ${
                      isChecked 
                        ? 'bg-orange-500/5 dark:bg-orange-500/10 border-orange-300 dark:border-orange-500/30 shadow-2xs' 
                        : 'bg-white dark:bg-slate-900 hover:bg-slate-50/60 dark:hover:bg-slate-800 border-slate-100 dark:border-slate-800 shadow-3xs'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleItem(service.id, req.id)}
                      className="mt-0.5 h-4.5 w-4.5 text-orange-500 focus:ring-orange-500 rounded border-slate-300 cursor-pointer shrink-0"
                    />
                    <div>
                      <span className={`text-sm font-semibold leading-tight ${isChecked ? 'text-slate-800 dark:text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                        {currentLang === 'sw' ? req.textSwahili : req.textEnglish}
                      </span>
                      {currentLang === 'sw' && (
                        <span className="block text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                          {req.textEnglish}
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section: Step by Step Guide */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-orange-100 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold font-sans text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2 border-b border-orange-50 dark:border-slate-800 pb-4">
              <span className="p-1 px-2.5 bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-350 text-xs rounded-lg font-mono">2</span>
              {currentLang === 'sw' ? 'Mwongozo wa Hatua kwa Hatua (Step-by-Step Guide)' : 'Step-by-Step Practical Blueprint'}
            </h3>

            <div className="relative border-l-2 border-orange-100 dark:border-slate-850 ml-3.5 pl-6 space-y-8">
              {service.steps.map((st, i) => (
                <div key={st.stepNumber} className="relative group">
                  
                  {/* Step Number Tracker Badge */}
                  <span className="absolute -left-10 top-0 flex items-center justify-center w-7 h-7 bg-orange-500 hover:bg-orange-600 border-2 border-white rounded-xl text-white font-mono text-xs font-bold shadow-md transition-colors">
                    {st.stepNumber}
                  </span>

                  <div>
                    <h4 className="text-base font-bold text-slate-850 dark:text-slate-100 flex items-center gap-1.5">
                      {currentLang === 'sw' ? st.titleSwahili : st.titleEnglish}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {currentLang === 'sw' ? st.descriptionSwahili : st.descriptionEnglish}
                    </p>
                    
                    {currentLang === 'sw' && (
                      <em className="block text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-mono italic">
                        English: {st.titleEnglish} — {st.descriptionEnglish}
                      </em>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Portal Links & Common Mistakes to Avoid */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Section: Direct Official Government Link */}
          <div className="bg-gradient-to-tr from-slate-900 to-slate-850 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 bg-white/5 rounded-bl-3xl">
              <ExternalLink className="h-5 w-5 text-orange-400" />
            </div>

            <h3 className="text-lg font-bold tracking-tight text-white mb-2 font-sans flex items-center gap-1.5">
              <span>Kiungo Rasmi (Portal Link)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {currentLang === 'sw' 
                ? 'Hakikisha unaingia kupitia mifumo salama ya Serikali (.go.tz) ili kulinda siri zako.'
                : 'Always route via genuine government systems ending with .go.tz to stay secure.'}
            </p>

            {/* Official Endpoint Display address */}
            <div className="mt-5 p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between gap-2 overflow-hidden shadow-2xs">
              <span className="text-xs font-mono text-orange-300 truncate tracking-wide font-semibold">
                {service.officialLink}
              </span>
              <button
                onClick={() => copyToClipboard(service.officialLink)}
                id="copy-portal-link"
                className="p-2 bg-slate-700/60 hover:bg-slate-700 rounded-lg text-slate-300 active:scale-95 transition-all cursor-pointer"
                title={currentLang === 'sw' ? 'Nakili kiungo' : 'Copy link address'}
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
            {copiedLink && (
              <span className="block text-[11px] text-emerald-400 font-mono mt-1 text-right">
                {currentLang === 'sw' ? '✓ Imenakiliwa!' : '✓ Link Copied!'}
              </span>
            )}

            {/* BIG ACTION BUTTON */}
            <div className="mt-5">
              <a
                href={service.officialLink}
                target="_blank"
                rel="referrer"
                id="official-portal-link-btn"
                className="w-full inline-flex items-center justify-center space-x-2 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm rounded-xl tracking-wide shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer text-center"
              >
                <span>{currentLang === 'sw' ? service.linkText : 'Open Official System'}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Government Shield Security Note */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-[10px] text-slate-400 font-normal">
              <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-md font-mono font-semibold">
                SECURE
              </span>
              <span>{currentLang === 'sw' ? 'Tovuti ya Serikali iliyosajiliwa' : 'Official safe system registered in TZ'}</span>
            </div>
          </div>

          {/* Section: Common Mistakes (Makosa ya Kuepuka) */}
          <div className="bg-red-50/55 dark:bg-red-950/10 rounded-3xl border border-red-100 dark:border-red-950/20 p-6 sm:p-7 shadow-xs">
            <h4 className="text-sm font-bold uppercase tracking-wider text-red-800 dark:text-red-400 font-mono flex items-center gap-1.5 mb-4 font-sans">
              <AlertTriangle className="h-4.5 w-4.5 text-red-600 animate-pulse" />
              {currentLang === 'sw' ? 'Makosa ya Kuepuka (Warning)' : 'Avoid These 5 Common Flaws'}
            </h4>

            <ul className="space-y-4 text-xs">
              {(currentLang === 'sw' ? service.mistakesSwahili : service.mistakesEnglish).map((mistake, i) => (
                <li key={i} className="flex space-x-2.5 items-start">
                  <span className="mt-1 h-2 w-2 rounded-full bg-red-650 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed font-sans">
                    {mistake}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-red-100 dark:border-slate-800 text-[11px] text-red-700 dark:text-red-400 italic font-mono font-medium">
              💡 {currentLang === 'sw' 
                ? '*Kumbuka: Makosa kwenye majina huchukua hadi miezi 6 kusahihishwa. Kuwa makini!'
                : '*Pro-tip: Spelling mismatches can lock you out for months. Inspect files meticulously!'}
            </div>
          </div>

          {/* Older Brother advice quote box */}
          <div className="bg-orange-50 dark:bg-slate-900 rounded-3xl border border-orange-100/50 dark:border-slate-800 p-6 shadow-xs text-slate-700 dark:text-slate-300">
            <h4 className="font-bold text-orange-850 dark:text-orange-400 text-sm flex items-center gap-1.5 mb-2 font-sans">
              <UserCheck className="h-4.5 w-4.5 text-orange-500" />
              {currentLang === 'sw' ? 'Ushauri wa Kaka Raphael' : 'Advice from Brother Raphael'}
            </h4>
            <blockquote className="text-xs leading-relaxed italic text-slate-650 dark:text-slate-305 font-sans">
              {currentLang === 'sw' 
                ? '"Mdogo wangu, usifanye maombi ya mkopo au chuo huku una haraka au upo kwenye mazingira ya makelele. Tafuta utulivu, andaa vyeti vyote kwanza kwenye folder moja kwenye simu au kompyuta yako. Ukijipanga vizuri unajiepusha na stress zisizofaa. Nipo hapa kushika mkono wako!"'
                : '"My young sibling, never apply for loans or universities when you are in a rush or noisy environment. Gather all certificates in one digital folder on your phone first. Setting up early keeps stress far away from you. I’m always here to walk with you!"'}
            </blockquote>
            <div className="mt-3.5 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 font-sans border-t border-orange-200/40 dark:border-slate-800 pt-3">
              <span>+255 787 547 236</span>
              <span className="text-orange-650 dark:text-orange-400 font-semibold">{currentLang === 'sw' ? 'Kaka Mkuu TZ' : 'Your Guide Brother'}</span>
            </div>
          </div>

        </div>

      </div>

    </motion.div>
  );
}
