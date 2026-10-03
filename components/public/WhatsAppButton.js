'use client';

import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '919500118875';
  const defaultText = encodeURIComponent('Hi 7Hills Web Solutions, I would like to discuss a web project.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultText}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-40 flex items-center group pointer-events-auto"
    >
      {/* Tooltip on Hover */}
      <span className="hidden sm:inline-block mr-2.5 px-3 py-1.5 rounded-xl bg-[#0D1B2A] text-white text-xs font-semibold border border-emerald-500/30 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat With Us
      </span>

      {/* Button with Pulse Rings */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with 7Hills Web Solutions on WhatsApp"
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400/25 animate-ping pointer-events-none" />
        <MessageSquare className="w-5 h-5 text-white" />
      </a>
    </aside>
  );
}
