import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, User } from 'lucide-react';
import { User as UserType } from '../types';

interface AIAssistantProps {
  currentLang: 'sw' | 'en';
  user: UserType | null;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant({ currentLang, user }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: currentLang === 'sw' 
        ? `Habari mdogo wangu! Mimi ni **Kaka Mkuu AI Bot** 👨🏾‍🎓. Nipo hapa kukusaidia kuelewa taratibu za mikopo ya HESLB, vyeti vya RITA, namba za NIDA na udahili wa vyuo vikuu (TCU).\n\nUna swali gani leo nisaidie kukuongoza hatua kwa hatua?`
        : `Hello graduate! I am **Kaka Mkuu AI Bot** 👨🏾‍🎓. Here to assist you with official procedures for HESLB loans, RITA certificates, NIDA cards, and TCU admissions.\n\nWhat would you like clarified today?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input on open and handle Esc key
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: textToSend.trim() };
    const updatedHistory = [...messages, userMessage];
    
    setMessages(updatedHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      // Secure server-side call only (API key never exposed on client)
      // Only sanitized academic background is shared, strictly no PII
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedHistory.slice(-10), // Send last 10 messages max
          academicCombination: user?.combination || 'General'
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorText = currentLang === 'sw'
          ? (data.error || 'Samahani, sijaweza kuwasiliana na mfumo kwa sasa. Tafadhali jaribu tena.')
          : (data.errorEn || data.error || 'Unable to connect to the assistant. Please try again.');
        
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: `⚠️ ${errorText}` }
        ]);
        return;
      }

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.response || 'Samahani, jibu halijapatikana.' }
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: currentLang === 'sw' 
            ? '⚠️ Hitilafu ya mtandao: Mfumo wa msaidizi hauwezi kufikiwa kwa sasa. Tafadhali hakikisha umeunganishwa kwenye mtandao.'
            : '⚠️ Network error: Could not reach the assistant. Please verify your connection.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies = currentLang === 'sw' ? [
    'Nisaidie kuhusu HESLB 🎓',
    'Namba ya NIDA inachelewa? 💳',
    'Vigezo vya RITA ni vipi? 📜',
    `Ushauri wa combo yangu (${user?.combination || 'A-level'}) 💡`
  ] : [
    'HESLB Loan application guide 🎓',
    'How to get NIDA fast? 💳',
    'RITA validation fee & requirements 📜',
    'TCU entry cut-off points 🏫'
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            aria-label={currentLang === 'sw' ? 'Fungua Msaidizi wa AI' : 'Open AI Assistant'}
            className="flex items-center space-x-2 px-4 py-3 sm:px-4.5 sm:py-3.5 bg-[#1b4332] hover:bg-[#112d21] text-white rounded-full shadow-xl cursor-pointer border border-emerald-500/25 group focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
            <span className="font-bold text-xs pr-1 font-mono tracking-wide uppercase">
              {currentLang === 'sw' ? 'Msaidizi wa AI' : 'AI Assistant'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 50, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 240 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-chat-heading"
            className="w-[calc(100vw-32px)] sm:w-[420px] max-w-[440px] h-[520px] max-h-[82vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1b4332] dark:bg-emerald-950 p-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-white/10 text-lg flex items-center justify-center border border-white/10 shadow-xs">
                  👨🏾‍🎓
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 id="ai-chat-heading" className="font-bold text-sm">Kaka Mkuu Assistant</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-emerald-100 font-medium uppercase tracking-wider font-mono">
                    {user ? `Mwanafunzi: ${user.combination}` : 'Mwongozo wa Kidato cha Sita'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label={currentLang === 'sw' ? 'Funga mazungumzo' : 'Close chat'}
                className="p-1.5 hover:bg-white/15 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 dark:bg-slate-950 text-left">
              {messages.map((m, index) => {
                const isAssistant = m.role === 'assistant';
                return (
                  <div 
                    key={index} 
                    className={`flex items-start gap-2.5 ${isAssistant ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center shrink-0 border select-none ${
                      isAssistant 
                        ? 'bg-[#1b4332]/10 border-[#1b4332]/25 dark:bg-emerald-500/10 dark:border-emerald-500/20 text-[#1b4332] dark:text-emerald-300' 
                        : 'bg-emerald-600 border-emerald-500 text-white'
                    }`}>
                      {isAssistant ? '🎓' : <User className="w-3.5 h-3.5" />}
                    </div>
                    
                    <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-3xs ${
                      isAssistant 
                        ? 'bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 text-slate-850 dark:text-slate-100 rounded-tl-none' 
                        : 'bg-[#1b4332] dark:bg-emerald-800 text-white rounded-tr-none'
                    }`}>
                      <p className="whitespace-pre-line font-sans">
                        {m.content.split('**').map((chunk, i) => 
                          i % 2 === 1 ? <strong key={i} className="font-bold text-[#1b4332] dark:text-emerald-300">{chunk}</strong> : chunk
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#1b4332]/10 border border-[#1b4332]/25 dark:bg-emerald-500/10 dark:border-emerald-500/20 text-xs flex items-center justify-center shrink-0">
                    🎓
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl rounded-tl-none p-3 shadow-3xs">
                    <div className="flex space-x-1 items-center py-1">
                      <div className="w-1.5 h-1.5 bg-[#1b4332] dark:bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-[#1b4332] dark:bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 bg-[#1b4332] dark:bg-emerald-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Box */}
            <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 flex gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => handleSendMessage(qr)}
                  className="px-2.5 py-1 bg-white dark:bg-slate-900 hover:bg-[#1b4332]/10 dark:hover:bg-[#1b4332]/30 text-slate-700 dark:text-slate-300 hover:text-[#1b4332] dark:hover:text-[#34d399] rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-bold cursor-pointer transition-colors shrink-0"
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* Footer Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-150 dark:border-slate-850 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder={currentLang === 'sw' ? 'Andika swali lako hapa...' : 'Ask how to apply...'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-slate-100 dark:bg-slate-950 text-xs text-slate-850 dark:text-slate-100 p-2.5 rounded-xl border border-transparent focus:border-slate-200 dark:focus:border-slate-800 focus:bg-white dark:focus:bg-slate-900 outline-hidden transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-sans disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 bg-[#1b4332] hover:bg-[#112d21] dark:bg-emerald-800 dark:hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 dark:disabled:text-slate-600 rounded-xl transition-colors cursor-pointer shrink-0"
                title={currentLang === 'sw' ? 'Tuma swali' : 'Send query'}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
