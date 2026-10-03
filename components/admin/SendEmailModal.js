'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SendEmailModal({
  isOpen,
  onClose,
  initialTo = '',
  initialName = '',
  initialSubject = '',
  onSuccess,
}) {
  const [to, setTo] = useState(initialTo);
  const [clientName, setClientName] = useState(initialName);
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  const [prevProps, setPrevProps] = useState({ initialTo, initialName, initialSubject });
  if (
    prevProps.initialTo !== initialTo ||
    prevProps.initialName !== initialName ||
    prevProps.initialSubject !== initialSubject
  ) {
    setPrevProps({ initialTo, initialName, initialSubject });
    setTo(initialTo);
    setClientName(initialName);
    setSubject(initialSubject);
  }

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    setResult(null);

    try {
      const res = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          clientName,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult({ type: 'success', text: data.message || 'Email sent successfully!' });
        if (onSuccess) onSuccess();
        setTimeout(() => {
          onClose();
          setMessage('');
          setResult(null);
        }, 1800);
      } else {
        setResult({ type: 'error', text: data.error || 'Failed to send email.' });
      }
    } catch (err) {
      setResult({ type: 'error', text: err.message || 'Network error sending email.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden bg-[#080d1e]/95 text-slate-200">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Send Company Email</h3>
              <p className="text-xs text-slate-400">
                Dispatch an official email from 7Hills Web Solutions to a client or prospect
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Result alert */}
        {result && (
          <div
            className={`mt-4 p-3.5 rounded-xl flex items-center gap-2.5 text-xs font-semibold ${
              result.type === 'success'
                ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/20 border border-rose-500/30 text-rose-300'
            }`}
          >
            {result.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{result.text}</span>
          </div>
        )}

        {/* Sender Info Badge */}
        <div className="mt-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Sending from official company ID:
          </span>
          <span className="font-mono text-cyan-300 font-semibold">
            {process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'contact@7hillsweb.com'}
          </span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSend} className="mt-5 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Recipient Email *</label>
              <input
                type="email"
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="client@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Client / Recipient Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold">Subject Line *</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Proposal for your web project - 7Hills Web Solutions"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold">Message Content *</label>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your email body here. It will be professionally styled inside the official 7Hills branded email template with company signature and contact info..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed font-sans"
            />
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Dispatched with official 7Hills corporate signature
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Company Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
