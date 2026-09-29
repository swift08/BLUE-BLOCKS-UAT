"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";

const TODDLER_STEPS = [
  {
    step: 1,
    title: "Enquiry",
    description: "Fill out our enquiry form or call us to begin the admission process.",
    cta: { text: "Enquiry Form", href: "#contact" },
  },
  {
    step: 2,
    title: "Admission Workshop",
    description:
      "Attend our Saturday workshop to experience the Montessori environment and understand the programme.",
    linkWord: "Saturday workshop",
    linkHref: "#contact",
  },
  {
    step: 3,
    title: "Child Observation & Application",
    description:
      "For children 2.9 years+, we observe the child in the environment before you submit the Admission Form.",
  },
  {
    step: 4,
    title: "Family Conversation",
    description:
      "Meet our Director of Admissions online to discuss your family's expectations and answer your questions.",
  },
  {
    step: 5,
    title: "Founder Conversation",
    description:
      "Meet our Founder to understand your child's journey and the Blue Blocks approach to education.",
  },
  {
    step: 6,
    title: "Welcome to Blue Blocks",
    description: "Complete the process and begin your child's journey with us.",
  },
];

const ELEMENTARY_STEPS = [
  {
    step: 1,
    title: "Enquiry",
    description: "Fill out our enquiry form or call us to begin the admission process.",
    cta: { text: "Enquiry Form", href: "#contact" },
  },
  {
    step: 2,
    title: "Admission Workshop",
    description:
      "Attend our Saturday workshop to experience the Montessori environment and understand the Elementary programme.",
    linkWord: "Saturday workshop",
    linkHref: "#contact",
  },
  {
    step: 3,
    title: "Child Observation & Application",
    description:
      "Your child spends time in the environment, followed by submission of the completed Admission Form.",
  },
  {
    step: 4,
    title: "Founder Conversation",
    description:
      "Meet Co-founder Pavan Goyal at the Tellapur Campus to understand the 16-year educational journey at Blue Blocks.",
  },
  {
    step: 5,
    title: "Welcome to Blue Blocks",
    description:
      "Complete the process and begin your child's journey of independent learning.",
  },
];

export default function AdmissionsProcess() {
  const [mobileTab, setMobileTab] = useState("toddler");

  return (
    <section id="process" className="scroll-mt-32 py-16 sm:py-24 bg-[#FAF9F5] border-b border-slate-200/60">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            className="inline-flex px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{
              backgroundColor: "rgba(44,47,143,0.08)",
              color: "#2C2F8F",
              border: "1px solid rgba(44,47,143,0.15)",
            }}
          >
            ADMISSIONS PROCESS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            From Enquiry to Admission,<br className="hidden sm:inline" /> We’re With You!
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Our structured pathways ensure every family and child experiences the Montessori environment and establishes meaningful alignment before joining.
          </p>
        </div>

        {/* Mobile Tab Toggle Buttons (Hidden on desktop) */}
        <div className="md:hidden flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm w-full max-w-md">
            <button
              type="button"
              onClick={() => setMobileTab("toddler")}
              className={`flex-1 py-3 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 text-center ${
                mobileTab === "toddler"
                  ? "bg-[#2C2F8F] text-white shadow-md shadow-[#2C2F8F]/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Toddler & Pre-Primary
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("elementary")}
              className={`flex-1 py-3 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 text-center ${
                mobileTab === "elementary"
                  ? "bg-[#2C2F8F] text-white shadow-md shadow-[#2C2F8F]/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Elementary & Adolescent
            </button>
          </div>
        </div>

        {/* Desktop Side-by-Side Columns / Mobile Toggle View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Column 1: Toddler & Pre-Primary */}
          <div className={`${mobileTab === "toddler" ? "block" : "hidden md:block"} flex flex-col h-full`}>
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/70 shadow-sm flex flex-col flex-1">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                <div>
                  <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-[#B74F2A] bg-[#B74F2A]/10 px-2.5 py-1 rounded-full mb-2">
                    Ages 15 Months – 6 Years
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Toddler & Pre-Primary Environments
                  </h3>
                </div>
                <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-[#2C2F8F]/5 items-center justify-center text-[#2C2F8F] font-bold text-lg">
                  6 Steps
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-6 flex-1">
                {TODDLER_STEPS.map((step) => (
                  <StepItem key={step.step} item={step} />
                ))}
              </div>

              {/* Column 1 Footer Cross-link */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-slate-200/60 text-sm">
                  <span className="font-semibold text-slate-800">Learn about our programmes: </span>
                  <Link
                    href="/programs/playgroup/"
                    className="text-[#2C2F8F] font-bold hover:underline"
                  >
                    Toddler
                  </Link>
                  <span className="text-slate-400"> and </span>
                  <Link
                    href="/programs/nursery-school/"
                    className="text-[#2C2F8F] font-bold hover:underline"
                  >
                    Pre-Primary
                  </Link>
                  <span className="text-[#2C2F8F] font-bold ml-1">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Elementary & Adolescent */}
          <div className={`${mobileTab === "elementary" ? "block" : "hidden md:block"} flex flex-col h-full`}>
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/70 shadow-sm flex flex-col flex-1">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                <div>
                  <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-[#2C2F8F] bg-[#2C2F8F]/10 px-2.5 py-1 rounded-full mb-2">
                    Class 1 – Class 10 (Cambridge IGCSE)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Elementary & Adolescent Environments
                  </h3>
                </div>
                <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-[#2C2F8F]/5 items-center justify-center text-[#2C2F8F] font-bold text-lg">
                  5 Steps
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-6 flex-1">
                {ELEMENTARY_STEPS.map((step) => (
                  <StepItem key={step.step} item={step} />
                ))}
              </div>

              {/* Column 2 Footer Cross-link */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-slate-200/60 text-sm">
                  <span className="font-semibold text-slate-800">Learn about our programmes: </span>
                  <Link
                    href="/programs/primary-school-elementary/"
                    className="text-[#2C2F8F] font-bold hover:underline"
                  >
                    Elementary
                  </Link>
                  <span className="text-slate-400"> and </span>
                  <Link
                    href="/programs/secondary-school/"
                    className="text-[#2C2F8F] font-bold hover:underline"
                  >
                    Adolescent
                  </Link>
                  <span className="text-[#2C2F8F] font-bold ml-1">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parent Testimonial / Community Highlight (Slot for Pending Content) */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/70 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#2C2F8F] mb-1">
                Parent Perspectives & Saturday Workshops
              </p>
              <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed">
                “Attending the Saturday workshop helped us understand our role as parents in supporting self-directed learning. The admissions journey felt like a true partnership from day one.”
              </p>
              <span className="text-xs text-slate-500 mt-2 block font-medium">
                — Blue Blocks Parent Community
              </span>
            </div>
            <div className="shrink-0 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C2F8F] text-white text-xs sm:text-sm font-semibold hover:bg-[#232675] transition-colors"
              >
                Book Saturday Workshop →
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StepItem({ item }) {
  const renderDescription = () => {
    if (item.linkWord && item.linkHref) {
      const parts = item.description.split(item.linkWord);
      return (
        <p className="text-slate-600 text-sm leading-relaxed mt-1">
          {parts[0]}
          <a
            href={item.linkHref}
            className="text-[#2C2F8F] font-semibold underline decoration-[#2C2F8F]/40 underline-offset-2 hover:decoration-[#2C2F8F] transition-colors"
          >
            {item.linkWord}
          </a>
          {parts[1]}
        </p>
      );
    }
    return <p className="text-slate-600 text-sm leading-relaxed mt-1">{item.description}</p>;
  };

  return (
    <div className="flex items-start gap-4">
      {/* Numbered step indicator */}
      <div className="shrink-0 w-10 h-10 rounded-2xl bg-[#2C2F8F] text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-[#2C2F8F]/20">
        {item.step}
      </div>
      <div className="flex-1">
        <h4 className="text-base font-bold text-slate-900 leading-snug">
          Step {item.step} — {item.title}
        </h4>
        {renderDescription()}
      </div>
    </div>
  );
}
