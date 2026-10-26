import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Fingerprint, FileBadge, Building2, Briefcase, ArrowRight, CheckCircle2, BellRing } from 'lucide-react';
import { ServiceData } from '../types';

interface ServiceCardProps {
  key?: React.Key;
  service: ServiceData;
  currentLang: 'sw' | 'en';
  progressPercent: number; // calculated from local state checkboxes
  completedCount: number;
  totalCount: number;
  onSelect: (id: string) => void;
  className?: string; // custom layout grids from Bento layout
}

export default function ServiceCard({
  service,
  currentLang,
  progressPercent,
  completedCount,
  totalCount,
  onSelect,
  className = ''
}: ServiceCardProps) {

  const getDaysRemaining = (deadlineStr?: string) => {
    if (!deadlineStr) return null;
    const deadlineDate = new Date(deadlineStr);
    let now = new Date();
    if (now.getFullYear() < 2026) {
      now = new Date('2026-05-26T17:02:28Z');
    }
    const dDate = new Date(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate());
    const nDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffTime = dDate.getTime() - nDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining(service.deadline);
  const isUrgent = daysRemaining !== null && daysRemaining >= 0 && daysRemaining <= 7 && (service.id === 'heslb' || service.id === 'tcu');
  
  // Resolve Lucide icons to align with the bento colors/styles
  const renderIcon = (id: string) => {
    switch (id) {
      case 'heslb':
        return <GraduationCap className="h-6 w-6 text-[#1b4332] dark:text-emerald-400" />;
      case 'nida':
        return <Fingerprint className="h-6 w-6 text-yellow-400 dark:text-yellow-300" />;
      case 'rita':
        return <FileBadge className="h-6 w-6 text-pink-700 dark:text-pink-400" />;
      case 'tcu':
        return <Building2 className="h-6 w-6 text-blue-800 dark:text-blue-400" />;
      case 'jobs':
        return <Briefcase className="h-6 w-6 text-orange-700 dark:text-orange-400" />;
      default:
        return <GraduationCap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  // Get localized aesthetic color and border configurations for each distinct bento box
  const getBentoStyles = (id: string) => {
    switch (id) {
      case 'heslb':
        return {
          cardBg: 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-150 dark:border-slate-800 shadow-sm hover:shadow-md relative overflow-hidden',
          iconBg: 'bg-green-100 dark:bg-emerald-900/30',
          badge: 'bg-green-800/15 dark:bg-emerald-500/20 text-[#1b4332] dark:text-emerald-300 font-black',
          progressColor: 'bg-[#1b4332] dark:bg-emerald-500',
          bottomBarBg: 'bg-[#1b4332]/5 dark:bg-emerald-950/40 group-hover:bg-[#1b4332]/10 dark:group-hover:bg-emerald-900/40 border-slate-150 dark:border-slate-800 text-[#1b4332] dark:text-[#34d399]',
          progressLabel: 'text-slate-500 dark:text-slate-400',
          textMuted: 'text-slate-500 dark:text-slate-400'
        };
      case 'tcu':
        return {
          cardBg: 'bg-[#e0f2fe] dark:bg-blue-950/20 border-blue-150 dark:border-blue-900/45 text-blue-955 dark:text-blue-100 shadow-sm hover:shadow-md relative overflow-hidden',
          iconBg: 'bg-white/95 dark:bg-slate-800 shadow-2xs',
          badge: 'bg-white/60 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/30 font-black',
          progressColor: 'bg-blue-600 dark:bg-blue-500',
          bottomBarBg: 'bg-blue-50/40 dark:bg-blue-950/35 group-hover:bg-blue-50/80 dark:group-hover:bg-blue-950/50 border-blue-100/55 dark:border-blue-900/30 text-blue-900 dark:text-blue-400',
          progressLabel: 'text-blue-700/80 dark:text-blue-400',
          textMuted: 'text-blue-750/70 dark:text-blue-300/80'
        };
      case 'nida':
        return {
          cardBg: 'bg-slate-900 dark:bg-[#080e0c] border-slate-800 dark:border-emerald-950/40 text-white shadow-sm hover:shadow-md relative overflow-hidden',
          iconBg: 'bg-white/10 dark:bg-emerald-900/20',
          badge: 'bg-yellow-400 dark:bg-yellow-500/25 text-black dark:text-yellow-300 font-black px-2.5 py-0.5 rounded text-[10px]',
          progressColor: 'bg-yellow-400 dark:bg-yellow-500',
          bottomBarBg: 'bg-slate-800/40 dark:bg-[#0a1310] group-hover:bg-slate-800/70 dark:group-hover:bg-[#11201b] border-slate-800 dark:border-[#10221c] text-yellow-400 dark:text-yellow-300',
          progressLabel: 'text-slate-400 dark:text-slate-400',
          textMuted: 'text-slate-400 dark:text-slate-450'
        };
      case 'rita':
        return {
          cardBg: 'bg-[#fdf2f8] dark:bg-pink-950/20 border-pink-150 dark:border-pink-900/45 text-pink-955 dark:text-pink-100 shadow-sm hover:shadow-md relative overflow-hidden',
          iconBg: 'bg-pink-100 dark:bg-pink-900/30',
          badge: 'bg-pink-200/55 dark:bg-pink-900/30 text-pink-850 dark:text-pink-300 font-black',
          progressColor: 'bg-pink-500 dark:bg-pink-400',
          bottomBarBg: 'bg-pink-100/20 dark:bg-pink-950/35 group-hover:bg-pink-100/40 dark:group-hover:bg-pink-950/50 border-pink-100/55 dark:border-pink-900/30 text-pink-900 dark:text-pink-400',
          progressLabel: 'text-pink-700/80 dark:text-pink-400',
          textMuted: 'text-pink-750/70 dark:text-pink-300/80'
        };
      case 'jobs':
        return {
          cardBg: 'bg-[#fff7ed] dark:bg-orange-950/20 border-orange-150 dark:border-orange-900/45 text-orange-955 dark:text-orange-100 shadow-sm hover:shadow-md relative overflow-hidden',
          iconBg: 'bg-white dark:bg-slate-800 shadow-2xs',
          badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-850 dark:text-orange-350 border border-orange-200/30 dark:border-orange-800/20 font-black',
          progressColor: 'bg-orange-500 dark:bg-orange-400',
          bottomBarBg: 'bg-orange-50/40 dark:bg-orange-950/35 group-hover:bg-orange-50/80 dark:group-hover:bg-orange-950/50 border-orange-100/55 dark:border-orange-900/30 text-orange-900 dark:text-orange-450',
          progressLabel: 'text-orange-800/80 dark:text-orange-400',
          textMuted: 'text-orange-800/70 dark:text-orange-300/80'
        };
      default:
        return {
          cardBg: 'bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800 text-slate-850 dark:text-slate-100 shadow-sm hover:shadow-md',
          iconBg: 'bg-slate-50 dark:bg-slate-800',
          badge: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
          progressColor: 'bg-green-500 dark:bg-emerald-500',
          bottomBarBg: 'bg-slate-50/50 dark:bg-slate-950 group-hover:bg-slate-50 dark:group-hover:bg-slate-900',
          progressLabel: 'text-slate-550 dark:text-slate-400',
          textMuted: 'text-slate-500 dark:text-slate-405'
        };
    }
  };

  const style = getBentoStyles(service.id);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`rounded-3xl border flex flex-col justify-between overflow-hidden relative group cursor-pointer transition-all duration-300 ${style.cardBg} ${className}`}
      onClick={() => onSelect(service.id)}
      id={`service-card-${service.id}`}
    >
      {/* Premium Circular Background Ornament on HESLB matching bento sample */}
      {service.id === 'heslb' && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/60 -mr-12 -mt-12 rounded-full opacity-50 z-0 pointer-events-none" />
      )}

      {/* Card Content wrapper */}
      <div className="p-6 relative z-10 flex-1 flex flex-col justify-between pt-7">
        
        {/* Card Header Info */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${style.iconBg}`}>
              {renderIcon(service.id)}
            </div>
            
            <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full font-mono ${style.badge}`}>
              {service.id === 'heslb' ? 'HESLB LOAN' : service.id === 'tcu' ? 'TCU ADMISSIONS' : service.id.toUpperCase()}
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight mb-2 flex items-center flex-wrap gap-2">
            <span>{currentLang === 'sw' ? service.titleSwahili : service.titleEnglish}</span>
            {isUrgent && (
              <span className="inline-flex items-center gap-1 text-[9px] font-black tracking-wider uppercase px-2 py-0.5 bg-rose-600 text-white rounded-md animate-pulse shadow-xs">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                </span>
                <BellRing className="h-3 w-3 leading-none inline shrink-0" />
                <span>
                  {currentLang === 'sw' ? `Siku ${daysRemaining} bado!` : `${daysRemaining} days left!`}
                </span>
              </span>
            )}
          </h3>
          <p className={`text-xs sm:text-sm font-medium leading-relaxed font-sans line-clamp-3 ${style.textMuted}`}>
            {currentLang === 'sw' ? service.shortDescSwahili : service.shortDescEnglish}
          </p>
        </div>

        {/* Progress Tracker Area (Bento style metrics progress) */}
        <div className="mt-6 pt-5 border-t border-black/5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className={`font-semibold flex items-center gap-1.5 ${style.progressLabel}`}>
              <CheckCircle2 className="h-3.5 w-3.5" />
              {currentLang === 'sw' ? 'Maandalizi yako' : 'Your Progress'}
            </span>
            <span className="font-mono font-bold">
              {completedCount}/{totalCount} ({progressPercent}%)
            </span>
          </div>
          
          {/* Progress bar container */}
          <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full rounded-full ${style.progressColor}`}
            />
          </div>

          <p className="text-[10px] opacity-75 mt-2 font-mono">
            {progressPercent === 100 
              ? (currentLang === 'sw' ? '🎉 Vigezo vyote vimekamilika!' : '🎉 All parameters checked!')
              : progressPercent > 0 
                ? (currentLang === 'sw' ? `${completedCount} kati ya ${totalCount} tayari` : `${completedCount} of ${totalCount} completed`)
                : (currentLang === 'sw' ? 'Hujaanza maandalizi bado' : 'Not started yet')}
          </p>
        </div>

      </div>

      {/* Decorative arrow button at bottom */}
      <div className={`px-6 py-4.5 transition-colors flex items-center justify-between ${style.bottomBarBg}`}>
        <span className="text-xs font-bold tracking-wide font-sans font-semibold">
          {currentLang === 'sw' ? 'Fungua Mwongozo' : 'Open Complete Guide'}
        </span>
        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </div>

    </motion.div>
  );
}
