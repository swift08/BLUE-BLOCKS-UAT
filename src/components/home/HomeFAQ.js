"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";

const FAQ_ITEMS = [
  {
    question: "What makes Blue Blocks different from a regular school?",
    answer:
      "Blue Blocks follows the AMI Montessori method, where children choose their own work within a carefully prepared environment. Instead of a single teacher delivering a lesson to the whole class, each child works at their own pace with hands-on materials. Our guides are trained by AMI, and our curriculum is aligned with Cambridge standards — so children get both developmental freedom and academic rigour.",
  },
  {
    question: "What age groups do you admit, and when does admissions open?",
    answer:
      "We welcome children from 18 months through 12 years across four programmes: Infant & Toddler Community, Children’s House, Lower Elementary, and Upper Elementary. Admissions for the next academic year typically open in January. Visit our Admissions page for current availability and to submit an inquiry.",
  },
  {
    question: "How is progress tracked if there are no exams or grades?",
    answer:
      "Each child’s progress is documented through regular observation records, portfolio work samples, and guide assessments. We hold parent-guide conferences twice a year where you receive a detailed narrative report. For our Cambridge-aligned track, formal assessments are introduced at the appropriate developmental stage.",
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section aria-label="Questions Parents Often Ask" className="bg-[#FAF9F6] py-14 sm:py-20 border-t border-neutral-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center pb-10">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
              Questions Parents Often Ask
            </h2>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition hover:bg-neutral-50/70"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-neutral-900 pr-4">
                      {item.question}
                    </span>
                    <span className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-neutral-100 text-neutral-700 text-lg font-light">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-0 border-t border-neutral-100/80 animate-fade-in">
                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mt-4">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer note after FAQs */}
          <div className="mt-8 text-center text-xs sm:text-sm text-neutral-600">
            <span>Have more questions? </span>
            <Link href="/contact-us/" className="font-semibold text-[#0F52BA] underline hover:text-blue-800">
              Contact us
            </Link>
            <span> or </span>
            <Link href="/admissions/#school-visit" className="font-semibold text-[#0F52BA] underline hover:text-blue-800">
              Book a school visit
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
