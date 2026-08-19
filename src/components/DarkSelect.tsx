'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DarkSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  /** Compact variant for inline use (e.g. explorer sort bar) */
  compact?: boolean;
}

export default function DarkSelect({ options, compact, className = '', ...props }: DarkSelectProps) {
  return (
    <div className={`relative ${compact ? 'inline-flex items-center' : ''}`}>
      <select
        {...props}
        className={`
          ${compact
            ? 'bg-transparent outline-none text-xs text-gray-300 pr-5 cursor-pointer appearance-none'
            : 'w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white appearance-none cursor-pointer focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition'
          }
          ${className}
        `.trim().replace(/\s+/g, ' ')}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
            {opt.label}
          </option>
        ))}
      </select>
      {!compact && (
        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      )}
    </div>
  );
}
