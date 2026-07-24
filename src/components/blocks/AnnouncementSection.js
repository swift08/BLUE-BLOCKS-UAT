"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";

// Helper function to detect and format links inside messages
const formatMessageText = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-600 hover:text-amber-700 underline font-semibold transition-colors duration-150 break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function AnnouncementSection({
  announcements = [],
  // Fallbacks for original props for backward-compatibility
  title = "Build a Career That Shapes the Future",
  badge = "Teacher Training",
  date = "July 25, 2026",
  details = [],
  messages = [],
}) {
  // If announcements array is empty, fall back to individual props
  const list =
    announcements && announcements.length > 0
      ? announcements
      : [{ title, badge, date, details, messages }];

  // Use announcements in configured order
  const sortedList = list;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const changeSlide = (newIndex) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setIsAnimating(false);
    }, 150);
  };

  const handlePrev = () => {
    const newIndex = currentSlide === 0 ? sortedList.length - 1 : currentSlide - 1;
    changeSlide(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentSlide === sortedList.length - 1 ? 0 : currentSlide + 1;
    changeSlide(newIndex);
  };

  const activeAnnouncement = sortedList[currentSlide];
  const hasImage = Boolean(activeAnnouncement?.image);

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #f5efe6 0%, #fcfbf9 60%, #ffffff 100%)",
      }}
    >
      {/* ── Background decorative blobs ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Radial glow — top-left */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "420px",
            height: "420px",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
            borderRadius: "9999px",
          }}
        />
        {/* Radial glow — bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-60px",
            width: "340px",
            height: "340px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)",
            borderRadius: "9999px",
          }}
        />
        {/* Grid dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(15,23,42,0.02) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <Container>
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-12 group">
          {/* ── Left Navigation Arrow (Desktop) ── */}
          {sortedList.length > 1 && (
            <button
              suppressHydrationWarning={true}
              onClick={handlePrev}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 bg-white/90 text-slate-700 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}

          {/* ── Right Navigation Arrow (Desktop) ── */}
          {sortedList.length > 1 && (
            <button
              suppressHydrationWarning={true}
              onClick={handleNext}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 bg-white/90 text-slate-700 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}

          {/* ── Main card ── */}
          {/* ── Main card ── */}
          <div
            className="rounded-3xl border overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 100%)",
              borderColor: "rgba(15, 23, 42, 0.06)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 20px 50px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(255,255,255,0.6) inset",
            }}
          >
            {/* Top accent bar */}
            <div
              style={{
                height: "4px",
                background:
                  "linear-gradient(90deg, #F59E0B 0%, #FBBF24 40%, #60A5FA 100%)",
              }}
            />

            <div className="p-8 sm:p-12 grid grid-cols-1 grid-rows-1">
              {sortedList.map((ann, idx) => {
                const isActive = currentSlide === idx;
                const annHasImage = Boolean(ann?.image);

                return (
                  <div
                    key={idx}
                    className={`col-start-1 row-start-1 transition-all duration-500 ease-out grid grid-cols-1 ${
                      annHasImage ? "lg:grid-cols-12 gap-8 lg:gap-12" : "w-full"
                    } items-center ${
                      isActive
                        ? "opacity-100 scale-100 pointer-events-auto z-10"
                        : "opacity-0 scale-[0.98] pointer-events-none z-0"
                    }`}
                  >
                    {/* ── Text/Details Panel ── */}
                    <div className={annHasImage ? "lg:col-span-7" : "w-full"}>
                      {/* Top badge / Date row */}
                      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                          {/* Pulsing live dot */}
                          <span className="relative flex h-3 w-3">
                            <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                              style={{ background: "#F59E0B" }}
                            />
                            <span
                              className="relative inline-flex rounded-full h-3 w-3"
                              style={{ background: "#D97706" }}
                            />
                          </span>
                          <span
                            className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
                            style={{
                              color: "#B45309",
                              borderColor: "rgba(217,119,6,0.2)",
                              background: "rgba(251,191,36,0.08)",
                            }}
                          >
                            {ann?.badge || badge}
                          </span>
                        </div>

                        {/* Date chip */}
                        <div
                          className="flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border"
                          style={{
                            color: "#64748B",
                            borderColor: "rgba(15, 23, 42, 0.08)",
                            background: "rgba(15, 23, 42, 0.03)",
                          }}
                        >
                          <span>📅</span>
                          <span>{ann?.date || date}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-2"
                        style={{
                          color: "#131313",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {ann?.title || title}
                      </h2>

                      {/* Subtitle if present */}
                      {ann?.subtitle && (
                        <h3
                          className="text-xl sm:text-2xl font-bold tracking-tight mb-4 text-amber-700"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {ann.subtitle}
                        </h3>
                      )}

                      {/* Sub-label */}
                      <p className="text-sm font-medium mb-8 text-slate-500">
                        An invitation for guides, parents & staff
                      </p>

                      {/* ── Detail chips ── */}
                      {(ann?.details || details).length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-8">
                          {(ann?.details || details).map((d, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border"
                              style={{
                                background: "rgba(15, 23, 42, 0.03)",
                                borderColor: "rgba(15, 23, 42, 0.06)",
                              }}
                            >
                              <span className="text-lg">{d.icon}</span>
                              <div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                  {d.label}
                                </div>
                                <div className="text-sm font-semibold text-slate-800">
                                  {d.value}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Divider */}
                      <div
                        className="mb-8"
                        style={{
                          height: "1px",
                          background:
                            "linear-gradient(90deg, transparent, rgba(15, 23, 42, 0.08), transparent)",
                        }}
                      />

                      {/* ── Message paragraphs ── */}
                      <div className="space-y-4">
                        {(ann?.messages || messages).map((msg, mIdx) => (
                          <p key={mIdx} className="text-base leading-relaxed text-slate-600 font-medium">
                            {formatMessageText(msg)}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* ── Image Panel ── */}
                    {annHasImage && (
                      <div className="lg:col-span-5 flex flex-col justify-center items-center mt-6 lg:mt-0">
                        <div
                          className="relative w-full max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md group/img cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                          onClick={() => setModalImage(ann.image)}
                        >
                          <Image
                            src={ann.image}
                            alt={ann.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 400px"
                            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                          />
                          {/* Hover zoom overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-black/80 text-xs text-white font-medium px-4 py-2 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg">
                              🔍 Click to View Full Poster
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Mobile Controls (Arrows below card) ── */}
          {sortedList.length > 1 && (
            <div className="flex md:hidden justify-between items-center mt-6 px-4">
              <button
                suppressHydrationWarning={true}
                onClick={handlePrev}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white/90 text-slate-700 active:bg-slate-100 transition-colors shadow-sm cursor-pointer"
                aria-label="Previous slide"
              >
                ←
              </button>
              <span className="text-xs font-semibold text-slate-500">
                {currentSlide + 1} / {sortedList.length}
              </span>
              <button
                suppressHydrationWarning={true}
                onClick={handleNext}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white/90 text-slate-700 active:bg-slate-100 transition-colors shadow-sm cursor-pointer"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          )}

          {/* ── Indicator Dots ── */}
          {sortedList.length > 1 && (
            <div className="flex justify-center items-center gap-2.5 mt-8">
              {sortedList.map((_, idx) => (
                <button
                  key={idx}
                  suppressHydrationWarning={true}
                  onClick={() => changeSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx
                      ? "w-8 bg-amber-500"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* ── Lightbox Zoom Modal ── */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing
          >
            {/* Close button */}
            <button
              suppressHydrationWarning={true}
              className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2.5 hover:bg-black/80 transition-colors z-10 border border-white/10 shadow-lg cursor-pointer"
              onClick={() => setModalImage(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={modalImage}
              alt="Announcement Poster"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
