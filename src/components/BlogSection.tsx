import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, User, ArrowRight, Heart, Share2, CornerDownRight } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data';

interface BlogSectionProps {
  currentLang: 'sw' | 'en';
}

export default function BlogSection({ currentLang }: BlogSectionProps) {
  const [selectedPostId, setSelectedPostId] = React.useState<string | null>(null);
  const [likes, setLikes] = React.useState<{ [id: string]: number }>({
    b1: 24,
    b2: 45,
    b3: 19
  });
  const [userLiked, setUserLiked] = React.useState<{ [id: string]: boolean }>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (userLiked[id]) {
      setLikes({ ...likes, [id]: likes[id] - 1 });
      setUserLiked({ ...userLiked, [id]: false });
    } else {
      setLikes({ ...likes, [id]: likes[id] + 1 });
      setUserLiked({ ...userLiked, [id]: true });
    }
  };

  const handleShare = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `*${currentLang === 'sw' ? post.titleSwahili : post.titleEnglish}* - Soma taarifa hii muhimu hapa Form Six Helper TZ! Changanua na urahisishe maisha yako ya maombi ya chuo na mikopo!`;
    const encoded = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-orange-100 dark:border-slate-800 p-6 sm:p-8 shadow-xs" id="blog-section-wrapper">
      
      {/* Blog Intro info */}
      <div className="max-w-2xl text-left mb-8 font-sans">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-500/10 px-3 py-1 rounded-full font-mono">
          {currentLang === 'sw' ? 'Habari na Tahadhari' : 'News & Alerts'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-850 dark:text-slate-105 tracking-tight mt-2.5 font-sans">
          {currentLang === 'sw' ? 'Taarifa na Habari Mpya (Blog)' : 'Latest Updates & Educational Blog'}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans">
          {currentLang === 'sw' 
            ? 'Pata taarifa za hivi punde kuhusu kufunguliwa kwa mifumo ya HESLB, udahili NECTA, majina ya TCU na miongozo mipya.'
            : 'Stay up-to-date with immediate announcements from TCU, HESLB, NACTE, and selection committees.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Article List */}
        <div className={`lg:col-span-7 space-y-4`}>
          {BLOG_POSTS.map((post) => {
            const isSelected = selectedPostId === post.id;
            return (
              <div
                key={post.id}
                id={`blog-card-${post.id}`}
                onClick={() => setSelectedPostId(post.id)}
                className={`p-5 rounded-2.5xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
                  isSelected 
                    ? 'border-orange-300 dark:border-orange-500/30 bg-orange-500/[0.03] dark:bg-orange-500/10 shadow-md ring-1 ring-orange-200' 
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xs hover:border-orange-150 dark:hover:border-orange-400'
                }`}
              >
                
                {/* Meta details */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap text-xs">
                    <span className="px-2 py-0.5 bg-orange-100/55 dark:bg-orange-500/20 text-orange-850 dark:text-orange-350 border border-orange-200/40 dark:border-orange-500/10 rounded-md font-mono font-bold uppercase tracking-wider text-[10px]">
                      {post.category}
                    </span>

                    <div className="flex items-center space-x-3 text-slate-400 dark:text-slate-500 font-mono text-[10.5px]">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-850 dark:text-slate-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors leading-snug font-sans">
                    {currentLang === 'sw' ? post.titleSwahili : post.titleEnglish}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans line-clamp-2">
                    {currentLang === 'sw' ? post.contentSwahili : post.contentEnglish}
                  </p>
                </div>

                {/* Footer items with likes and shares */}
                <div className="mt-4 pt-4 border-t border-slate-100/60 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-405 font-sans">
                  
                  {/* Author detail */}
                  <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] shrink-0 font-bold border border-white dark:border-slate-800">
                      R
                    </div>
                    <span>{post.author}</span>
                  </div>

                  {/* Actions area */}
                  <div className="flex items-center space-x-3">
                    {/* Like button */}
                    <button
                      onClick={(e) => handleLike(post.id, e)}
                      id={`blog-like-${post.id}`}
                      className={`flex items-center gap-1 transition-colors hover:text-red-500 ${
                        userLiked[post.id] ? 'text-red-500 font-bold' : 'text-slate-450'
                      }`}
                      title="Like article"
                    >
                      <Heart className={`h-4.5 w-4.5 ${userLiked[post.id] ? 'fill-current text-red-500' : ''}`} />
                      <span>{likes[post.id]}</span>
                    </button>

                    {/* Share Button representing Whatsapp share */}
                    <button
                      onClick={(e) => handleShare(post, e)}
                      id={`blog-share-${post.id}`}
                      className="flex items-center gap-1 text-slate-450 hover:text-emerald-600 transition-colors"
                      title="Share to WhatsApp"
                    >
                      <Share2 className="h-4.5 w-4.5" />
                      <span>Share</span>
                    </button>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Right Side: Active Reading Panel with full details */}
        <div className="lg:col-span-5 bg-orange-50/25 dark:bg-slate-900 rounded-2.5xl p-6 border border-orange-100/60 dark:border-slate-800 sticky top-24">
          <AnimatePresence mode="wait">
            {selectedPostId ? (
              (() => {
                const active = BLOG_POSTS.find(b => b.id === selectedPostId);
                if (!active) return null;
                return (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-950/40 text-orange-850 dark:text-orange-355 rounded-md font-bold uppercase text-[9px] tracking-wide">
                        {active.category}
                      </span>
                      <span>{active.date}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 leading-snug font-sans">
                      {currentLang === 'sw' ? active.titleSwahili : active.titleEnglish}
                    </h3>

                    {/* Blog text body */}
                    <div className="text-slate-705 dark:text-slate-250 text-sm leading-relaxed p-4 bg-white dark:bg-slate-950 rounded-2xl border border-orange-50 dark:border-slate-850 shadow-3xs font-sans whitespace-pre-line">
                      {currentLang === 'sw' ? active.contentSwahili : active.contentEnglish}
                      
                      {currentLang === 'sw' && (
                        <div className="mt-4 pt-4 border-t border-dashed border-slate-100 dark:border-slate-800">
                          <span className="font-bold text-slate-450 dark:text-slate-500 text-xs block mb-1 uppercase font-mono">English Translation</span>
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">{active.contentEnglish}</p>
                        </div>
                      )}
                    </div>

                    {/* Older Brother Quote signature */}
                    <div className="p-4 bg-orange-100/40 dark:bg-orange-500/10 rounded-xl border border-orange-200/20 dark:border-orange-500/10 text-xs text-slate-600 dark:text-slate-350 flex items-start gap-2.5">
                      <div className="text-base">🎓</div>
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">{active.author} says:</span>
                        <p className="italic">
                          {currentLang === 'sw' 
                            ? 'Usipate hofu mdogo wangu, nimepita njia hii hii na ninaamini mambo yote yatanyooka. Endelea kufuatilia update zetu za kila wiki!'
                            : 'Do not panic young buddy, I walked down this very path and guarantee everything will fit perfectly. Stay alert for updates!'}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons footer */}
                    <div className="flex gap-2.5 font-sans">
                      <a
                        href="https://wa.me/255787547236?text=Mambo%20vipi%20Kaka%20Raphael!%20Nikasoma%20makala%20yako%20ya%20blog%2520nikapata%20swali%20kuhusu"
                        target="_blank"
                        rel="referrer"
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors font-sans"
                      >
                        Ask on WhatsApp
                      </a>
                      
                      <button
                        onClick={(e) => handleShare(active, e)}
                        className="py-2.5 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-205 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors font-sans"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>

                  </motion.div>
                );
              })()
            ) : (
              <div className="text-center py-16 text-slate-450 font-sans">
                <BookOpen className="h-10 w-10 mx-auto text-slate-300 dark:text-slate-600 mb-2.5" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-250">
                  {currentLang === 'sw' ? 'Soma Makala Kamili hapa' : 'Select an Article to Read'}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  {currentLang === 'sw' 
                    ? 'Bofya kadi mojawapo ya habari upande wa kushoto kusoma maoni na ufafanuzi kamili wa Kaka Raphael.'
                    : 'Click any bulletin item on the left column to view extensive translation and brother advice.'}
                </p>
                
                {/* Automatically highlight first post so they look loaded immediately */}
                <button
                  onClick={() => setSelectedPostId('b1')}
                  className="mt-5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold font-sans transition-colors cursor-pointer"
                >
                  {currentLang === 'sw' ? 'Anza kusoma sasa' : 'Start Reading Now'}
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
