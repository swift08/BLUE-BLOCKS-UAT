"use client";

import { useState } from "react";

export default function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-[var(--bb-radius)] overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-medium text-[#1a1a1a] hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base leading-snug">{q}</span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full bg-[#EAF4FF] flex items-center justify-center transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <svg
            className="w-4 h-4 text-[#1f3b82]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-[#334155] leading-relaxed border-t border-slate-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}
