"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { PRIMARY_STRIP_LOGOS } from "@/data/newsroom";

export default function MediaMentions({
  title = "Media Mentions",
  viewMoreHref = "/newsroom/",
  viewMoreLabel = "View More",
  logos = PRIMARY_STRIP_LOGOS,
  direction = "ltr",
  speed = 42,
}) {
  const sectionRef = useRef(null);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIntoView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const displayLogos = Array.isArray(logos) && logos.length ? logos : PRIMARY_STRIP_LOGOS;
  // Duplicate array for a seamless, continuous infinite loop
  const tickerLogos = [...displayLogos, ...displayLogos];

  return (
    <section
      ref={sectionRef}
      aria-label="Media Mentions"
      className="relative z-10 border-t border-neutral-200/90 bg-white py-12 sm:py-16"
    >
      <style>{`
        .bb-media-ticker-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          user-select: none;
        }
        .bb-media-ticker-track {
          display: flex;
          align-items: center;
          width: max-content;
          will-change: transform;
          animation: ${direction === "rtl" ? "bb-ticker-rtl" : "bb-ticker-ltr"} ${speed}s linear infinite;
        }
        .bb-media-ticker-wrapper:hover .bb-media-ticker-track,
        .bb-media-ticker-wrapper:active .bb-media-ticker-track,
        .bb-media-ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes bb-ticker-ltr {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes bb-ticker-rtl {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes bb-pointing-arrow {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }
        .bb-pointing-arrow {
          animation: bb-pointing-arrow 1.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .bb-media-ticker-track {
            animation: none;
          }
          .bb-media-ticker-wrapper {
            overflow-x: auto;
          }
          .bb-pointing-arrow {
            animation: none;
          }
        }
        .bb-media-logo-img {
          height: 32px;
          max-height: 38px;
          width: auto;
          max-width: 160px;
          object-fit: contain;
        }
        @media (min-width: 640px) {
          .bb-media-logo-img {
            height: 36px;
            max-height: 44px;
            max-width: 185px;
          }
        }
        @media (min-width: 1024px) {
          .bb-media-logo-img {
            height: 40px;
            max-height: 48px;
            max-width: 210px;
          }
        }
      `}</style>

      {/* Header with Eyebrow, Heading, Helper Line & Attention Pointer */}
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between pb-8 sm:pb-10">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
              {title}
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-neutral-500 font-medium flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-[#0F52BA] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
              <span>Tap on any logo to view the article</span>
            </p>
          </div>

          {/* Right: "Look at all articles 👉" pointing directly to [View More →] */}
          <div className="flex items-center gap-2.5 sm:gap-3 self-start sm:self-auto">
            {/* Attention callout pointing to View More */}
            <div
              className={`inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/80 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-[#0F52BA] shadow-sm transition-all duration-700 ${
                hasScrolledIntoView
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-3 scale-95 pointer-events-none"
              }`}
              role="status"
              aria-live="polite"
            >
              <span>Look at all articles</span>
              <span className="bb-pointing-arrow inline-block font-bold text-sm leading-none" aria-hidden="true">
                👉
              </span>
            </div>

            <Link
              href={viewMoreHref}
              className="group relative inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#0F52BA] hover:shadow-md hover:ring-2 hover:ring-[#0F52BA]/30 hover:ring-offset-2 shrink-0"
              aria-label="View all coverage in Newsroom"
            >
              <span>{viewMoreLabel}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </Container>

      {/* Continuous News Channel Ticker Strip */}
      <div
        className="bb-media-ticker-wrapper relative w-full overflow-hidden py-3 sm:py-4"
        aria-label="Media outlets news ticker"
      >
        {/* Soft edge fade masks on left and right */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent"
          aria-hidden="true"
        />

        <div className="bb-media-ticker-track flex items-center">
          {tickerLogos.map((item, idx) => {
            const logoSrc = item.logo || item.src;
            const outletName = item.outlet || item.alt || "Press mention";
            const articleUrl = item.articleUrl || item.anchorHref || "#";
            const isClone = idx >= displayLogos.length;

            return (
              <a
                key={`${item.id || item.outlet || "media"}-${idx}`}
                href={articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Read ${outletName} article (opens in new tab)`}
                aria-label={`${outletName} press article`}
                tabIndex={isClone ? -1 : 0}
                aria-hidden={isClone ? "true" : undefined}
                className="group/logo flex shrink-0 items-center justify-center px-7 sm:px-9 lg:px-11 py-3 transition-transform duration-200"
              >
                <div className="flex items-center justify-center filter grayscale opacity-70 contrast-90 transition-all duration-300 ease-out group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:contrast-100 group-hover/logo:scale-105">
                  <Image
                    src={logoSrc}
                    alt={outletName}
                    width={Math.max(1, Number(item.width) || 160)}
                    height={44}
                    className="bb-media-logo-img"
                    priority={idx < 6}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}


