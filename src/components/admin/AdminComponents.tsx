import React from 'react';

export function StatsCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-gold-soft/10 shadow-2xl flex items-center justify-between hover:border-gold-soft/20 transition-all duration-300 group relative">
      <div className="space-y-1">
        <p className="text-[10px] font-black text-gold-soft/40 uppercase tracking-[0.2em]">{label}</p>
        <p className="text-3xl font-display font-black text-gold-soft">{value}</p>
      </div>
      <div className="size-12 rounded-xl bg-gold-soft/5 border border-gold-soft/10 flex items-center justify-center transition-all duration-300 group-hover:bg-gold-soft group-hover:text-black">
        {icon}
      </div>
    </div>
  );
}

export function InputField({ label, value, onChange, icon, type = 'text', placeholder }: { label: string, value: string, onChange: (v: string) => void, icon: React.ReactNode, type?: string, placeholder?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gold-soft/40 uppercase tracking-widest px-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-soft/20 group-focus-within:text-gold-soft transition-colors">
          {icon}
        </div>
        <input 
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-14 bg-black/40 border border-gold-soft/10 rounded-xl pl-12 pr-4 text-sm focus:outline-none focus:border-gold-soft focus:bg-black/60 text-gold-soft transition-all placeholder:text-gold-soft/10"
          placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
        />
      </div>
    </div>
  );
}
