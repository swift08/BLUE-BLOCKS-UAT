"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import faqData from "@/data/admissions-faq.json";

export default function AdmissionsFAQ() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (catKey, index) => {
    const key = `${catKey}-${index}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const ADMISSIONS_FAQS = {
    process: faqData.process,
    programmes: faqData.programmes,
  };

  const faqSchema = faqData.schema;

  return (
    <section id="faq" className="scroll-mt-32 py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Column-1 — About the Admissions Process */}
          <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="mb-6 pb-4 border-b border-slate-200/60">
              <h3 className="text-xl font-bold text-slate-900">
                {ADMISSIONS_FAQS.process.category}
              </h3>
            </div>

            <div className="space-y-4">
              {ADMISSIONS_FAQS.process.items.map((item, idx) => {
                const isOpen = !!openItems[`process-${idx}`];
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-slate-200/70 overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem("process", idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                    >
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {item.question}
                      </h3>
                      <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-bold text-sm">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column-2 — About Blue Blocks and Our Programmes */}
          <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="mb-6 pb-4 border-b border-slate-200/60">
              <h3 className="text-xl font-bold text-slate-900">
                {ADMISSIONS_FAQS.programmes.category}
              </h3>
            </div>

            <div className="space-y-4">
              {ADMISSIONS_FAQS.programmes.items.map((item, idx) => {
                const isOpen = !!openItems[`programmes-${idx}`];
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-slate-200/70 overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem("programmes", idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                    >
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {item.question}
                      </h3>
                      <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-bold text-sm">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
