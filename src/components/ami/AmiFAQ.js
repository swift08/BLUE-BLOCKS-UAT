"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import { AMI_FAQ_CATEGORIES } from "@/data/ami-faq-data";

export default function AmiFAQ() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section id="faq" className="py-14 sm:py-18 bg-white scroll-mt-36 sm:scroll-mt-44 border-b border-slate-100">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 space-y-12">
            {AMI_FAQ_CATEGORIES.map((cat, catIdx) => (
              <div key={cat.category} className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#2C2F8F] border-b border-slate-200 pb-2">
                  {cat.category}
                </h3>

                <div className="space-y-3 pt-2">
                  {cat.items.map((item, itemIdx) => {
                    const key = `${catIdx}-${itemIdx}`;
                    const isOpen = Boolean(openItems[key]);

                    return (
                      <div
                        key={item.question}
                        className="rounded-xl border border-slate-200/90 bg-slate-50/50 overflow-hidden transition-all duration-150"
                      >
                        <button
                          type="button"
                          onClick={() => toggleItem(catIdx, itemIdx)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors focus:outline-none group"
                          aria-expanded={isOpen}
                        >
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 pr-4 leading-snug group-hover:text-[#2C2F8F] transition-colors">
                            {item.question}
                          </h4>
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors select-none ${
                              isOpen
                                ? "bg-[#2C2F8F] text-white"
                                : "bg-slate-200/80 text-slate-600 group-hover:bg-[#2C2F8F] group-hover:text-white"
                            }`}
                          >
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-200/50 bg-white">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
