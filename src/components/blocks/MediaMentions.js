import Image from "next/image";
import Link from "next/link";
import { PRIMARY_STRIP_LOGOS } from "@/data/newsroom";

export default function MediaMentions({
  logos = PRIMARY_STRIP_LOGOS,
  direction = "ltr",
  speed = 42,
}) {
  const displayLogos = Array.isArray(logos) && logos.length ? logos : PRIMARY_STRIP_LOGOS;
  // Duplicate array for a seamless, continuous infinite loop
  const tickerLogos = [...displayLogos, ...displayLogos];

  return (
    <section
      aria-label="Press coverage"
      className="relative z-10 border-t border-neutral-200/90 bg-white py-8 sm:py-10"
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
        @media (prefers-reduced-motion: reduce) {
          .bb-media-ticker-track {
            animation: none;
          }
          .bb-media-ticker-wrapper {
            overflow-x: auto;
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
            const isClone = idx >= displayLogos.length;

            return (
              <Link
                key={`${item.id || item.outlet || "media"}-${idx}`}
                href="/newsroom/"
                title={`${outletName} coverage`}
                aria-label={`${outletName} coverage`}
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}


