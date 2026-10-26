import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, Send, ShieldAlert, CheckCircle2, User, Loader2, AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  currentLang: 'sw' | 'en';
}

export default function ContactSection({ currentLang }: ContactSectionProps) {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    service: 'HESLB',
    message: '',
    faxHoneypot: '' // Spam protection honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ name: string; service: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side quick checks
    if (!formState.name.trim() || !formState.phone.trim() || !formState.message.trim()) {
      setErrorMessage(currentLang === 'sw' ? 'Tafadhali jaza nafasi zote zinazohitajika!' : 'Please complete all required fields!');
      return;
    }

    if (formState.message.trim().length < 10) {
      setErrorMessage(currentLang === 'sw' ? 'Ujumbe unapaswa kuwa na maelezo zaidi (angalau herufi 10).' : 'Please describe your query in more detail (min 10 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name.trim(),
          phone: formState.phone.trim(),
          service: formState.service,
          message: formState.message.trim(),
          honeypot: formState.faxHoneypot
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorText = currentLang === 'sw' 
          ? (data.error || 'Imeshindikana kuwasilisha ujumbe. Tafadhali jaribu tena baadae.')
          : (data.errorEn || data.error || 'Failed to submit inquiry. Please retry shortly.');
        setErrorMessage(errorText);
        setIsSubmitting(false);
        return;
      }

      // Truthful success confirmation based on actual server acceptance
      setSuccessInfo({
        name: formState.name.trim(),
        service: formState.service,
        message: currentLang === 'sw' 
          ? (data.message || 'Ujumbe wako umepokelewa kikamilifu kwenye mfumo wetu.')
          : (data.messageEn || 'Your support inquiry has been successfully received in our system.')
      });
      setIsSubmitted(true);
      setFormState({ name: '', phone: '', service: 'HESLB', message: '', faxHoneypot: '' });
    } catch (err: any) {
      console.error('Contact submission network error:', err);
      setErrorMessage(currentLang === 'sw' 
        ? 'Hitilafu ya mtandao: Imeshindikana kuwasilisha ujumbe. Unaweza pia kuwasiliana nasi moja kwa moja kwa WhatsApp hapo pembeni.'
        : 'Network error: Unable to deliver inquiry. You may also reach out directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-orange-100 dark:border-slate-800 p-6 sm:p-8 shadow-xs font-sans" id="contact-section-wrapper">
      
      {/* Contact Header */}
      <div className="max-w-2xl text-left mb-8 font-sans">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-650 dark:text-orange-400 bg-orange-100/50 dark:bg-orange-500/10 px-3 py-1 rounded-full font-mono">
          {currentLang === 'sw' ? 'Wasiliana Nasi' : 'Direct Assistance'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-850 dark:text-slate-100 tracking-tight mt-2.5 font-sans">
          {currentLang === 'sw' ? 'Una Swali Lingine? Tuma Ombi la Msaada' : 'Got Special Problems? Ask Directly'}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans leading-relaxed">
          {currentLang === 'sw' 
            ? 'Usisite kuwasilisha changamoto yako kuhusu mikopo, udahili au vitambulisho. Jaza fomu hii rasmi au piga simu hapo pembeni kwa mwongozo wa bure.'
            : 'Do not stress alone with procedures. Submit this secure inquiry form or call our community support line directly.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Contact Form Card */}
        <div className="lg:col-span-7 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100/80 dark:border-slate-800 rounded-2.5xl p-6 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
              >
                {/* Honeypot field for bot suppression (hidden from humans) */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="fax-field">Leave blank</label>
                  <input
                    id="fax-field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formState.faxHoneypot}
                    onChange={(e) => setFormState({ ...formState, faxHoneypot: e.target.value })}
                  />
                </div>

                {/* Error message */}
                {errorMessage && (
                  <div 
                    role="alert" 
                    aria-live="polite"
                    className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded-xl text-xs font-semibold flex items-center gap-2"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label htmlFor="contact-name-input" className="block text-xs font-bold text-slate-650 dark:text-slate-350 uppercase tracking-wide mb-1.5 font-mono">
                    {currentLang === 'sw' ? 'Majina yako Kamili' : 'Your Full Name(s)'} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      placeholder={currentLang === 'sw' ? 'Mfano: Samuel John Mwakalindile' : 'Enter your legal names'}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-100 text-sm rounded-xl border border-slate-250 dark:border-slate-700 outline-hidden focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:border-orange-500 transition-all font-sans disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Grid phone and service interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-phone-input" className="block text-xs font-bold text-slate-650 dark:text-slate-355 uppercase tracking-wide mb-1.5 font-mono">
                      {currentLang === 'sw' ? 'Namba yako ya Simu' : 'Your Phone Number'} *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        id="contact-phone-input"
                        type="tel"
                        required
                        placeholder="0787 547 236"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-100 text-sm rounded-xl border border-slate-250 dark:border-slate-700 outline-hidden focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:border-orange-500 transition-all font-sans disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* Service interest */}
                  <div>
                    <label htmlFor="contact-service-select" className="block text-xs font-bold text-slate-655 dark:text-slate-355 uppercase tracking-wide mb-1.5 font-mono">
                      {currentLang === 'sw' ? 'Huduma Unayoripoti' : 'Service Group'}
                    </label>
                    <select
                      id="contact-service-select"
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-100 text-sm rounded-xl border border-slate-250 dark:border-slate-700 outline-hidden focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:border-orange-500 transition-all font-sans cursor-pointer disabled:opacity-60"
                    >
                      <option value="HESLB">HESLB Loan</option>
                      <option value="NIDA">NIDA ID</option>
                      <option value="RITA">RITA Birth Cert</option>
                      <option value="TCU">University TCU/TAMISEMI</option>
                      <option value="JOBS">Job Applications</option>
                      <option value="OTHER">{currentLang === 'sw' ? 'Mengineyo (Other)' : 'Other issues'}</option>
                    </select>
                  </div>

                </div>

                {/* Message input */}
                <div>
                  <label htmlFor="contact-message-input" className="block text-xs font-bold text-slate-650 dark:text-slate-355 uppercase tracking-wide mb-1.5 font-mono">
                    {currentLang === 'sw' ? 'Ujumbe / Shida Yako kwa Kina' : 'Core Issue Details'} *
                  </label>
                  <textarea
                    id="contact-message-input"
                    required
                    rows={4}
                    placeholder={currentLang === 'sw' 
                      ? 'Eleza kwa undani swali lako, mfano: cheti changu cha kuzaliwa kinatofautiana herufi moja na cheti cha Form Four...' 
                      : 'Describe your query or error messages in detail...'}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full p-3.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm rounded-xl border border-slate-205 dark:border-slate-700 outline-hidden focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:border-orange-500 transition-all font-sans resize-y disabled:opacity-60"
                  />
                </div>

                {/* Submit button with loading state */}
                <div>
                  <button
                    type="submit"
                    id="submit-query-btn"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center space-x-2 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{currentLang === 'sw' ? 'Inatuma kwenye mfumo...' : 'Submitting inquiry...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{currentLang === 'sw' ? 'Tuma Ombi la Msaada' : 'Send Free Inquiry'}</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-slate-450 italic font-mono text-center mt-2 leading-relaxed">
                  🔐 {currentLang === 'sw' 
                    ? '*Tunajali faragha yako. Taarifa zako zinalindwa na hazishirikiwi na mtu wa tatu.'
                    : '*Strict confidentiality. Your inquiry parameters are handled securely.'}
                </p>

              </motion.form>
            ) : (
              <motion.div
                key="success-banner"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 px-4 space-y-4 font-sans"
              >
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-slate-850 dark:text-slate-100">
                  {currentLang === 'sw' ? '✓ Ombi Lako Limetumwa Kikamilifu!' : '✓ Inquiry Successfully Received!'}
                </h3>
                
                <p className="text-sm text-slate-650 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  {successInfo?.message}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Huduma: <span className="font-bold text-slate-700 dark:text-slate-200">{successInfo?.service}</span>
                </p>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 max-w-xs mx-auto">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSuccessInfo(null);
                    }}
                    id="reset-form-btn"
                    className="text-xs font-bold text-orange-650 dark:text-orange-400 hover:text-orange-750 underline cursor-pointer"
                  >
                    {currentLang === 'sw' ? 'Tuma ujumbe mwingine' : 'Send another inquiry'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Right Side: Direct Fast Contact Details & Phone Cards */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          {/* Quick Info details */}
          <div className="p-6 bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-2.5xl space-y-4 border border-slate-800 shadow-md">
            
            <h3 className="text-base font-bold font-sans text-orange-350">
              {currentLang === 'sw' ? 'Wasiliana kwa Simu' : 'Telephone Community Support'}
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {currentLang === 'sw' 
                ? 'Ikiwa una changamoto ya dharura inayohitaji mwongozo wa haraka, unaweza kupiga simu kwenye namba ya msaada ya kijamii.'
                : 'For urgent matters requiring guidance, you can call the community support line listed below.'}
            </p>

            {/* DIRECT FOOTER PHONE SHOWN AS PROMINENT BUTTON */}
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700/80 flex items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-mono tracking-wide uppercase block">Support Number</span>
                <a 
                  href="tel:+255787547236" 
                  id="direct-phone-call-action" 
                  className="text-base sm:text-lg font-bold font-mono text-white hover:text-orange-400 hover:underline"
                >
                  +255 787 547 236
                </a>
              </div>

              <a
                href="tel:+255787547236"
                className="p-3 bg-orange-600 hover:bg-orange-500 rounded-xl text-white transition-colors cursor-pointer"
                title="Tap to call"
              >
                <Phone className="h-4.5 w-4.5" />
              </a>
            </div>

            {/* Operating time badge */}
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-pulse" />
              <span>{currentLang === 'sw' ? 'Masaa ya Kazi: Jumatatu - Jumapili' : 'Hours: Monday - Sunday'}</span>
            </div>

          </div>

          {/* WhatsApp Direct card */}
          <div className="p-6 bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 dark:border-emerald-900/30 rounded-2.5xl space-y-3.5">
            <h3 className="text-base font-bold font-sans text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp Chat Support</span>
            </h3>

            <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed font-sans">
              {currentLang === 'sw' 
                ? 'Njia rahisi ya kutuma picha au viwambo (screenshots) vya ujumbe wa makosa unaokutana nao kwenye mifumo ya TCU au HESLB.'
                : 'Share screenshots or photos of system error codes directly on WhatsApp for guidance.'}
            </p>

            <a
              href="https://wa.me/255787547236?text=Habari%20Kaka%20Raphael,%20naomba%20msaada%20kuhusu%20maombi"
              target="_blank"
              rel="referrer"
              id="whatsapp-chat-support-direct-btn"
              className="w-full inline-flex items-center justify-center space-x-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>{currentLang === 'sw' ? 'Tuma Screenshot WhatsApp' : 'Chat on WhatsApp Now'}</span>
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>

          {/* Privacy Security Note */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-start space-x-3 text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            <ShieldAlert className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-350 block">
                {currentLang === 'sw' ? 'Angalizo la Usalama (Security Notice)' : 'Security Notice'}
              </span>
              <p>
                {currentLang === 'sw' 
                  ? 'Kamwe usimpe mtu yeyote nywila (password) yako ya chuo au bodi ya mikopo. Malipo yote ya serikali hufanyika kupitia namba rasmi za GePG pekee.'
                  : 'Never share personal passwords. All official government fees are payable solely via generated GePG control numbers.'}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
