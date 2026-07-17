"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

const TABS = [
  { id: "toddler", label: "TODDLER & PRE-SCHOOL", sublabel: "15 months – 6 years" },
  { id: "elementary", label: "ELEMENTARY & ERDKINDER", sublabel: "Class 1 – Class 10" },
];

export default function AdmissionsTabJourney({ eyebrow, title, tracks = {} }) {
  const [active, setActive] = useState("toddler");
  const track = tracks[active] || {};

  return (
    <section className="relative overflow-hidden py-20" style={{ backgroundColor: "#FAF9F5" }}>
      {/* Decorative premium elements */}
      <div
        className="absolute top-10 left-10 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, #F3E3CF 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, #E7E8FF 0%, transparent 70%)" }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          {eyebrow ? (
            <div
              className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{
                backgroundColor: "rgba(44,47,143,0.06)",
                color: "#2C2F8F",
                border: "1px solid rgba(44,47,143,0.1)",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          {title ? (
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight whitespace-pre-line">
              {title}
            </h2>
          ) : null}
          {track.intro ? (
            <p className="mt-4 max-w-2xl mx-auto text-slate-600 leading-relaxed text-[15px] text-justify">
              {track.intro}
            </p>
          ) : null}
        </div>

        {/* Tab switcher - out of the box premium styling */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 max-w-2xl mx-auto p-2 rounded-3xl bg-white shadow-xl shadow-slate-100 border border-slate-100">
          {TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                aria-pressed={isActive}
                className="w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 cursor-pointer focus:outline-none"
                style={{
                  backgroundColor: isActive ? "#2C2F8F" : "transparent",
                  color: isActive ? "#ffffff" : "#1e293b",
                  boxShadow: isActive ? "0 10px 25px -5px rgba(44, 47, 143, 0.25)" : "none",
                }}
              >
                <div
                  className="text-xs font-bold tracking-widest uppercase mb-0.5"
                  style={{ color: isActive ? "rgba(255,255,255,0.7)" : "#64748b" }}
                >
                  {tab.label}
                </div>
                <div className="text-sm font-bold">
                  {tab.sublabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Track content */}
        <div key={active} className="animate-fadein">
          {/* Track header */}
          {track.title ? (
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{track.title}</h3>
              {track.description ? (
                <p className="mt-4 text-slate-600 max-w-3xl mx-auto leading-relaxed text-[15px] text-justify">
                  {track.description}
                </p>
              ) : null}
            </div>
          ) : null}

          {/* Steps list using premium timeline-based cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(track.steps || []).map((step, idx) => (
              <StepCard key={idx} step={step} index={idx + 1} />
            ))}
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(15px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein {
          animation: fadein 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </section>
  );
}

function StepCard({ step, index }) {
  return (
    <div
      className="group relative rounded-3xl bg-white border border-slate-100 p-7 shadow-lg shadow-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4 overflow-hidden"
    >
      {/* Giant step index watermark behind the card */}
      <div
        className="absolute top-4 right-6 text-6xl font-black text-slate-100 select-none pointer-events-none transition-colors duration-300 group-hover:text-[#F3E3CF]/30"
        aria-hidden="true"
      >
        0{index}
      </div>

      {/* Step badge */}
      <div
        className="inline-flex items-center justify-center w-10 h-10 rounded-2xl text-sm font-bold shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#2C2F8F", color: "#fff" }}
        aria-hidden
      >
        {index}
      </div>

      {/* Title */}
      <h4 className="font-bold text-slate-900 text-lg leading-snug pr-8">
        {step.title}
      </h4>

      {/* Body description - justified */}
      <p className="text-slate-600 text-sm leading-relaxed flex-1 text-justify">
        {step.text}
      </p>

      {/* Custom premium underline effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to right, #2C2F8F 0%, #F3E3CF 100%)" }}
        aria-hidden
      ></div>
    </div>
  );
}
