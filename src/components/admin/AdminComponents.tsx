import React from 'react';
import { History } from 'lucide-react';

export function StatsCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white/40 backdrop-blur-2xl p-10 rounded-[48px] border border-cocoa-deep/5 shadow-sm flex items-center justify-between hover:shadow-organic hover:-translate-y-2 transition-all duration-700 group overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-1000">
        <History size={180} className="text-cocoa-deep rotate-12" />
      </div>
      <div className="relative z-10 space-y-3">
        <p className="font-body text-[10px] font-black text-cocoa-deep/20 uppercase tracking-[0.6em] mb-1">{label}</p>
        <p className="text-5xl font-display italic text-cocoa-deep font-black tracking-tighter group-hover:text-burnt-caramel transition-colors">{value}</p>
      </div>
      <div className="relative z-10 size-20 rounded-3xl bg-white border border-cocoa-deep/5 flex items-center justify-center text-botanical-green shadow-sm group-hover:bg-botanical-green group-hover:text-white group-hover:rotate-[360deg] transition-all duration-1000">
        {icon}
      </div>
    </div>
  );
}

export function InputField({ label, value, onChange, icon, type = 'text', placeholder }: { label: string, value: string, onChange: (v: string) => void, icon: React.ReactNode, type?: string, placeholder?: string }) {
  return (
    <div className="space-y-4">
      <label className="font-body text-[9px] font-black text-cocoa-deep/30 uppercase tracking-[0.6em] px-2">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-cocoa-deep/20 group-focus-within:text-burnt-caramel transition-colors">
          {icon}
        </div>
        <input 
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-16 bg-ivory-warm border border-cocoa-deep/5 rounded-[20px] pl-16 pr-8 text-[11px] font-body font-black uppercase tracking-[0.4em] focus:outline-none focus:border-burnt-caramel text-cocoa-deep transition-all shadow-inner placeholder:text-cocoa-deep/10"
          placeholder={placeholder || `ENTER_${label.toUpperCase().replace(/\s+/g, '_')}_ID`}
        />
      </div>
    </div>
  );
}
