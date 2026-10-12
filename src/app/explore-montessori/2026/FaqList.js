"use client";

import { useState } from "react";

export default function FaqList({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="border-t border-neutral-200">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q} className="border-b border-neutral-200">
            <button
              type="button"
              className="flex w-full items-baseline justify-between gap-4 py-4 text-left text-base text-slate-900"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span>{item.q}</span>
              <span className="text-[#0F52BA]" aria-hidden="true">
                {isOpen ? "–" : "+"}
              </span>
            </button>
            {isOpen ? <p className="max-w-3xl pb-4 text-sm leading-7 text-slate-600">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
