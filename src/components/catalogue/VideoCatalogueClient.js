"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import {
  videoCatalogueCta,
  videoCatalogueHero,
  videoCatalogueIntro,
  videoCatalogueVideos,
} from "@/data/videoCatalogue";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function PointerLine({ text, whatsappHref }) {
  if (whatsappHref && text.includes("9000955053")) {
    const [before, after] = text.split("9000955053");
    return (
      <span>
        {before}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 decoration-white/40 hover:decoration-white"
        >
          9000955053
        </a>
        {after}
      </span>
    );
  }
  return text;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
    </svg>
  );
}

function MuteIcon({ muted }) {
  return muted ? (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

function VideoPlayer({
  video,
  attachSrc,
  preload,
  isActive,
  muted,
  onToggleMute,
  onPlayingChange,
}) {
  const ref = useRef(null);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const onTime = () => {
      setProgress(el.currentTime);
      setDuration(el.duration || 0);
    };
    const onPlay = () => {
      setPaused(false);
      onPlayingChange?.(true);
    };
    const onPause = () => {
      setPaused(true);
      onPlayingChange?.(false);
    };
    const onMeta = () => setDuration(el.duration || 0);

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("loadedmetadata", onMeta);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("loadedmetadata", onMeta);
    };
  }, [onPlayingChange, attachSrc]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = muted;
  }, [muted]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !attachSrc) return undefined;

    if (prefersReducedMotion()) {
      el.pause();
      return undefined;
    }

    if (isActive) {
      const playPromise = el.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    } else {
      el.pause();
    }
    return undefined;
  }, [isActive, attachSrc]);

  const togglePlay = (event) => {
    event.stopPropagation();
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const onScrub = (event) => {
    event.stopPropagation();
    const el = ref.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setProgress(next);
  };

  if (!video.src) return null;

  return (
    <div className="bb-catalogue-player group absolute inset-0">
      <video
        ref={ref}
        className="h-full w-full cursor-pointer bg-black object-contain lg:object-cover"
        playsInline
        loop
        muted={muted}
        preload={preload}
        src={attachSrc ? video.src : undefined}
        onClick={onToggleMute}
        aria-label={video.title}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-2 pb-2 pt-8 sm:px-3 sm:pb-3 sm:pt-10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-auto flex items-center gap-1.5 text-white sm:gap-2">
          <button
            type="button"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 hover:bg-white/25 sm:h-9 sm:w-9"
            onClick={togglePlay}
            aria-label={paused ? "Play" : "Pause"}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(progress, duration || 0)}
            onChange={onScrub}
            className="bb-catalogue-scrub min-w-0 flex-1"
            aria-label="Seek"
          />

          <span className="w-12 shrink-0 text-right text-[10px] tabular-nums text-white/80 sm:w-16 sm:text-[11px]">
            {formatTime(progress)}
          </span>

          <button
            type="button"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 hover:bg-white/25 sm:h-9 sm:w-9"
            onClick={(event) => {
              event.stopPropagation();
              onToggleMute();
            }}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            <MuteIcon muted={muted} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CopyPanel({ video, tone = "dark", align = "left" }) {
  const isLight = tone === "light";
  const isCenter = align === "center";
  const titleClass = isLight ? "text-slate-900" : "text-white";
  const kickerClass = isLight ? "text-[#0F52BA]" : "text-[#D6E6FF]";
  const bodyClass = isLight ? "text-slate-700" : "text-white/90";
  const pointerClass = isLight ? "text-slate-500" : "text-white/75";

  return (
    <div
      className={[
        "flex h-full min-h-0 w-full flex-col justify-start lg:justify-center",
        isCenter ? "items-center text-center" : "items-start text-left",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {video.kicker ? (
        <p className={`bb-eyebrow ${kickerClass}`}>{video.kicker}</p>
      ) : null}
      <h2
        className={`mt-1.5 text-[1.2rem] font-semibold leading-tight sm:mt-2 sm:text-[1.45rem] lg:mt-3 lg:text-[2rem] ${titleClass}`}
      >
        {video.title}
      </h2>
      <p
        className={`mt-2 text-[13px] leading-6 sm:mt-3 sm:text-[14px] sm:leading-7 lg:mt-4 lg:text-[15px] lg:leading-8 ${bodyClass} ${
          isCenter ? "max-w-2xl" : ""
        }`}
      >
        {video.blurb}
      </p>
      {video.pointers?.length ? (
        <ul
          className={[
            "mt-3 space-y-1.5 text-[11px] leading-5 sm:mt-4 sm:space-y-2 sm:text-[12px] lg:mt-5 lg:text-[13px] lg:leading-6",
            pointerClass,
            isCenter ? "mx-auto w-full max-w-xl text-left" : "w-full",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {video.pointers.map((item) => {
            const cleaned = String(item).replace(/^[•\-\u2022]\s*/, "");
            return (
              <li key={item} className="flex gap-2">
                <span
                  className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70"
                  aria-hidden
                />
                <span>
                  <PointerLine text={cleaned} whatsappHref={video.whatsappHref} />
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default function VideoCatalogueClient() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(() => new Set([0, 1]));
  const heroRef = useRef(null);
  const sectionRefs = useRef([]);

  const toggleMute = useCallback(() => {
    setMuted((value) => !value);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("bb-catalogue-snap");
    return () => {
      document.documentElement.classList.remove("bb-catalogue-snap");
    };
  }, []);

  // Disable page snap once the admissions/CTA section is active so the
  // footer can be reached; restore snap when scrolling back into videos.
  useEffect(() => {
    const lastIndex = videoCatalogueVideos.length - 1;
    if (activeIndex >= lastIndex) {
      document.documentElement.classList.remove("bb-catalogue-snap");
    } else {
      document.documentElement.classList.add("bb-catalogue-snap");
    }
  }, [activeIndex]);

  useEffect(() => {
    setLoaded((prev) => {
      const next = new Set(prev);
      const currentVideo = Math.max(activeIndex, 0);
      next.add(currentVideo);
      next.add(currentVideo + 1);
      if (next.size === prev.size) return prev;
      return next;
    });
  }, [activeIndex]);

  useEffect(() => {
    const nodes = [heroRef.current, ...sectionRefs.current].filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.55)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number(visible.target.getAttribute("data-catalogue-index"));
        if (Number.isFinite(index)) setActiveIndex(index);
      },
      { threshold: [0.55, 0.75, 0.9] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const scrollToVideos = () => {
    document.getElementById("video-1")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bb-catalogue bg-[#141c2f]">
      <section
        ref={heroRef}
        data-catalogue-index={-1}
        className="bb-catalogue-snap relative h-[100svh] overflow-hidden lg:h-auto lg:min-h-[100dvh]"
      >
        <Image
          src="/video-catalogue/hero.webp"
          alt=""
          width={1920}
          height={1080}
          priority
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] sm:object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65 sm:bg-gradient-to-r sm:from-black/65 sm:via-black/35 sm:to-black/10"
          aria-hidden="true"
        />

        <div className="relative flex h-full min-h-0 items-end sm:items-center pt-[4.75rem] pb-8 sm:min-h-[100dvh] sm:pt-28 sm:pb-16">
          <Container className="w-full">
            <div className="flex w-full max-w-[34rem] flex-col items-stretch text-left">
              <h1 className="m-0 text-[1.7rem] font-semibold leading-[1.2] text-white sm:text-[2.75rem] lg:text-[3.1rem]">
                {videoCatalogueHero.title}
              </h1>
              <p className="m-0 mt-3 text-[14px] leading-6 text-white/90 sm:mt-4 sm:text-[17px] sm:leading-8">
                {videoCatalogueHero.subtitle}
              </p>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="bb-btn bb-btn--inverse"
                  onClick={scrollToVideos}
                >
                  {videoCatalogueHero.scrollLabel}
                </button>
              </div>

              <div className="mt-6 border-t border-white/25 pt-5 sm:mt-10 sm:pt-8">
                <h2 className="m-0 text-[1.2rem] font-semibold leading-tight text-white sm:text-[1.75rem]">
                  {videoCatalogueIntro.title}
                </h2>
                <p className="m-0 mt-2 text-[13px] leading-6 text-white/85 sm:mt-3 sm:text-[15px] sm:leading-8">
                  {videoCatalogueIntro.text}
                </p>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {videoCatalogueVideos.map((video, index) => {
        const attachSrc = loaded.has(index);
        const preload =
          index === Math.max(activeIndex, 0) || index === Math.max(activeIndex, 0) + 1
            ? "auto"
            : "none";
        const isLast = !video.src;

        if (isLast) {
          return (
            <section
              key={video.id}
              id={`video-${video.position}`}
              ref={(node) => {
                sectionRefs.current[index] = node;
              }}
              data-catalogue-index={index}
              className="relative overflow-hidden text-white"
            >
              <Image
                src={video.image}
                alt=""
                width={1080}
                height={1920}
                className="absolute inset-0 h-full w-full object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[#0b1224]/82 sm:bg-[#0b1224]/78" aria-hidden="true" />

              <div className="relative flex min-h-[100svh] items-center py-16 sm:min-h-[100dvh] sm:py-20">
                <Container>
                  <div className="mx-auto w-full max-w-2xl rounded-[24px] border border-white/15 bg-[#141c2f]/70 px-5 py-8 text-center backdrop-blur-md sm:max-w-3xl sm:px-10 sm:py-12">
                    <CopyPanel video={video} tone="dark" align="center" />
                    <div className="mt-8 border-t border-white/20 pt-7 sm:mt-10 sm:pt-8">
                      <h3 className="text-[1.35rem] font-semibold text-white sm:text-[1.5rem]">
                        {videoCatalogueCta.title}
                      </h3>
                      <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-7 text-white/85 sm:text-[15px] sm:leading-8">
                        {videoCatalogueCta.text}
                      </p>
                      <Link
                        href={videoCatalogueCta.href}
                        className="bb-btn bb-btn--inverse mt-6 inline-flex max-w-full whitespace-normal px-5 text-center leading-snug"
                      >
                        {videoCatalogueCta.buttonLabel}
                      </Link>
                    </div>
                  </div>
                </Container>
              </div>
            </section>
          );
        }

        return (
          <section
            key={video.id}
            id={`video-${video.position}`}
            ref={(node) => {
              sectionRefs.current[index] = node;
            }}
            data-catalogue-index={index}
            className="bb-catalogue-snap relative h-[100svh] overflow-hidden bg-[#141c2f] text-white lg:h-auto lg:min-h-[100dvh] lg:overflow-visible"
          >
            <div className="flex h-full min-h-0 flex-col lg:min-h-[100dvh] lg:flex-row lg:items-center">
              <div className="relative min-h-0 flex-1 bg-black lg:h-[100dvh] lg:w-[58%] lg:flex-none">
                <div className="absolute inset-0 lg:static lg:flex lg:h-full lg:items-center lg:justify-center lg:px-8 lg:py-20">
                  <div className="relative h-full w-full overflow-hidden bg-black lg:h-[min(85dvh,860px)] lg:w-auto lg:max-w-full lg:aspect-[9/16] lg:rounded-[28px] lg:shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                    <VideoPlayer
                      video={video}
                      attachSrc={attachSrc}
                      preload={preload}
                      isActive={activeIndex === index}
                      muted={muted}
                      onToggleMute={toggleMute}
                    />
                  </div>
                </div>
              </div>

              <div className="max-h-[36svh] shrink-0 overflow-y-auto overscroll-contain border-t border-white/10 bg-[#141c2f] px-4 py-3 lg:max-h-none lg:w-[42%] lg:flex-1 lg:overflow-visible lg:border-t-0 lg:px-12 lg:py-24 lg:flex lg:items-center">
                <div className="w-full max-w-xl">
                  <CopyPanel video={video} />
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
