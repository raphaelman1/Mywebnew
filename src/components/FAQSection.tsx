import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, MessageSquare, Phone } from 'lucide-react';
import { FAQItem } from '../types';
import { FAQ_ITEMS } from '../data';

interface FAQSectionProps {
  currentLang: 'sw' | 'en';
}

export default function FAQSection({ currentLang }: FAQSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState<'popular' | 'recent'>('popular');

  const categories = ['All', 'HESLB', 'NIDA', 'RITA', 'TCU / HESLB'];

  const filteredFAQ = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0]);
    
    const term = searchTerm.toLowerCase();
    const queryEn = item.questionEnglish.toLowerCase() + ' ' + item.answerEnglish.toLowerCase();
    const querySw = item.questionSwahili.toLowerCase() + ' ' + item.answerSwahili.toLowerCase();
    const matchesSearch = queryEn.includes(term) || querySw.includes(term);

    return matchesCategory && matchesSearch;
  });

  const sortedAndFilteredFAQ = [...filteredFAQ].sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.views || 0) - (a.views || 0);
    } else {
      const dateA = new Date(a.addedDate || '2026-05-01').getTime();
      const dateB = new Date(b.addedDate || '2026-05-01').getTime();
      return dateB - dateA;
    }
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm font-sans" id="faq-section-wrapper">
      
      {/* FAQ Title */}
      <div className="max-w-2xl text-left mb-8 font-sans">
        <span className="text-xs font-bold uppercase tracking-widest text-[#1b4332] dark:text-emerald-400 bg-[#1b4332]/10 dark:bg-emerald-550/10 px-3 py-1 rounded-full font-mono">
          {currentLang === 'sw' ? 'Msaada wa Maswali' : 'Frequently Asked Questions'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1b4332] dark:text-slate-100 tracking-tight mt-2.5">
          {currentLang === 'sw' ? 'Maswali Muhimu Unayoweza Kuuliza (FAQ)' : 'Got Questions? We Have Answers!'}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans md:font-medium">
          {currentLang === 'sw' 
            ? 'Tumekusanya maswali yanayoulizwa mara kwa mara na wadogo zetu waliomaliza form six ili kukuondolea wasiwasi.'
            : 'Find the most requested procedural answers compiled explicitly for Tanzania high school form six leavers.'}
        </p>
      </div>

      {/* Interactive Search Bar & Filters & Sorting Row */}
      <div className="space-y-4 mb-8 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={currentLang === 'sw' ? 'Tafuta maswali ya HESLB, NIDA, vyeti...' : 'Search questions or keywords...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-700 focus:bg-white dark:focus:bg-slate-950 text-sm text-slate-850 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-hidden focus:ring-2 focus:ring-orange-400/50 focus:border-orange-500 transition-all font-sans"
            />
          </div>

          {/* Sorter Selector Button Row */}
          <div className="flex items-center space-x-2 shrink-0 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setSortBy('popular')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                sortBy === 'popular'
                  ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-3xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
              }`}
            >
              <span>🔥</span>
              <span>{currentLang === 'sw' ? 'Maarufu Zaidi' : 'Most Popular'}</span>
            </button>
            <button
              onClick={() => setSortBy('recent')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                sortBy === 'recent'
                  ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-3xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
              }`}
            >
              <span>📅</span>
              <span>{currentLang === 'sw' ? 'Maswali Mapya' : 'Recently Added'}</span>
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase font-mono mr-2">
            {currentLang === 'sw' ? 'Mada (Filter):' : 'Filter by Category:'}
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans transition-all duration-200 shrink-0 cursor-pointer hover:scale-105 active:scale-95 ${
                activeCategory === cat 
                   ? 'bg-[#1b4332] dark:bg-emerald-600 text-white border border-[#1b4332] dark:border-emerald-500 shadow-sm font-semibold' 
                   : 'bg-[#1b4332]/5 dark:bg-emerald-500/10 text-[#1b4332] dark:text-emerald-300 border border-[#1b4332]/10 dark:border-emerald-500/20 hover:bg-[#1b4332]/10 dark:hover:bg-emerald-500/20'
              }`}
            >
              {cat === 'All' ? (currentLang === 'sw' ? 'Mada Zote' : 'All Topics') : cat}
            </button>
          ))}
        </div>

      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3 font-sans">
        {sortedAndFilteredFAQ.length > 0 ? (
          sortedAndFilteredFAQ.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div 
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`border border-slate-200/80 dark:border-slate-800 rounded-2xl transition-all duration-200 ${
                  isExpanded ? 'bg-slate-50/50 dark:bg-slate-900/40 shadow-3xs border-[#1b4332]/35 dark:border-emerald-500/35' : 'bg-white dark:bg-slate-900 hover:bg-slate-50/55 dark:hover:bg-slate-800/60'
                }`}
              >
                
                {/* Header question click zone */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 pr-4 leading-snug">
                    {currentLang === 'sw' ? faq.questionSwahili : faq.questionEnglish}
                  </span>
                  
                  <div className="p-1.5 bg-[#1b4332]/5 dark:bg-emerald-500/10 hover:bg-[#1b4332]/10 rounded-xl text-[#1b4332] dark:text-emerald-350 shrink-0 select-none">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {/* Answer Slide-down Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-slate-650 dark:text-slate-300 text-sm border-t border-slate-100 dark:border-slate-800 leading-relaxed font-sans">
                        <p>{currentLang === 'sw' ? faq.answerSwahili : faq.answerEnglish}</p>
                        
                        {currentLang === 'sw' && (
                          <em className="block text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-2 italic">
                            English translation: {faq.answerEnglish}
                          </em>
                        )}
                        
                        <div className="mt-3.5 pt-3.5 border-t border-slate-100/70 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-450 dark:text-slate-500 font-mono">
                          <span>Idara: <strong className="text-[#1b4332] dark:text-emerald-400 font-semibold">{faq.category}</strong></span>
                          <span>Hali: Active Guide</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })
        ) : (
          <div className="text-center py-12 px-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-sans">
            <HelpCircle className="h-8 w-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-sm font-semibold">
              {currentLang === 'sw' ? 'Hakuna maswali yaliyopatikana!' : 'No matching questions found!'}
            </p>
            <p className="text-xs text-slate-405 dark:text-slate-500 mt-1">
              {currentLang === 'sw' ? 'Jaribu kuandika neno lingine au badilisha kichujio' : 'Try searching for general words like loan, NIDA or Rita'}
            </p>
          </div>
        )}
      </div>

      {/* Interactive Support Pitch at base of FAQs */}
      <div className="mt-8 p-5 bg-gradient-to-tr from-[#1b4332]/5 dark:from-[#1b4332]/10 to-transparent rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-slate-800 dark:text-slate-100">
        <div className="text-center sm:text-left">
          <h4 className="text-sm font-bold text-[#1b4332] dark:text-emerald-400 flex items-center gap-1.5 justify-center sm:justify-start">
            <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
            {currentLang === 'sw' ? 'Hujapata Jibu la Swali Lako?' : 'Still Have Unresolved Issues?'}
          </h4>
          <p className="text-xs text-slate-650 dark:text-slate-405 mt-0.5 font-medium">
            {currentLang === 'sw' 
              ? 'Nipo tayari kukusikiliza na kukuelekeza mwanzo hadi mwisho bila malipo yoyote, nicheki sasa.'
              : 'Our direct contact line is always open. Your elder brother answers calls within minutes.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Support Phone number */}
          <a
            href="tel:+255787547236"
            className="px-3.5 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-[#1b4332] dark:hover:text-[#34d399] font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 shadow-3xs flex items-center gap-1.5 transition-all text-center"
          >
            <Phone className="h-3.5 w-3.5 text-[#1b4332] dark:text-emerald-400" />
            <span>Piga: +255 787 547 236</span>
          </a>
          
          {/* Quick Chat */}
          <a
            href="https://wa.me/255787547236?text=Habari%20Kaka%20Raphael,%20naomba%20usaidizi%20kuhusu%20kuhakiki%20cheti%20changu"
            target="_blank"
            rel="referrer"
            className="px-3.5 py-2 bg-[#1b4332] dark:bg-emerald-600 hover:bg-[#1b4332]/95 dark:hover:bg-emerald-505 active:bg-[#112d21] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all text-center"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-200 dark:text-emerald-350" />
            <span>WhatsApp Chat</span>
          </a>
        </div>
      </div>

    </div>
  );
}
