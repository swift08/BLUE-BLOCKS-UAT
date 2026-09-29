"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";

const TODDLER_STEPS = [
  {
    step: 1,
    title: "Enquiry",
    description: "Fill out our enquiry form or call us to begin the admission process.",
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
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Admission Process
          </h2>
        </div>

        {/* Mobile Tab Toggle */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Column 1 — Toddler & SI Environments */}
          <div className={`${mobileTab === "toddler" ? "block" : "hidden md:block"} flex flex-col h-full`}>
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/70 shadow-sm flex flex-col flex-1">
              <div className="pb-6 mb-6 border-b border-slate-100">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Toddler & SI Environments
                </h3>
              </div>

              <div className="space-y-6 flex-1">
                {TODDLER_STEPS.map((step) => (
                  <StepItem key={step.step} item={step} />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-800">
                  Learn about our{" "}
                  <Link href="/programs/playgroup/" className="text-[#2C2F8F] font-bold hover:underline">
                    Toddler
                  </Link>{" "}
                  and{" "}
                  <Link href="/programs/nursery-school/" className="text-[#2C2F8F] font-bold hover:underline">
                    Pre-Primary
                  </Link>{" "}
                  programmes →
                </p>
              </div>
            </div>
          </div>

          {/* Column 2 — Elementary & Adolescent Environments */}
          <div className={`${mobileTab === "elementary" ? "block" : "hidden md:block"} flex flex-col h-full`}>
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/70 shadow-sm flex flex-col flex-1">
              <div className="pb-6 mb-6 border-b border-slate-100">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Elementary & Adolescent Environments
                </h3>
              </div>

              <div className="space-y-6 flex-1">
                {ELEMENTARY_STEPS.map((step) => (
                  <StepItem key={step.step} item={step} />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-800">
                  Learn about our{" "}
                  <Link
                    href="/programs/primary-school-elementary/"
                    className="text-[#2C2F8F] font-bold hover:underline"
                  >
                    Elementary
                  </Link>{" "}
                  and{" "}
                  <Link href="/programs/secondary-school/" className="text-[#2C2F8F] font-bold hover:underline">
                    Adolescent
                  </Link>{" "}
                  programmes →
                </p>
              </div>
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
