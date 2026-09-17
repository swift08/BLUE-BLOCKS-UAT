"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { audioStore } from "./audio-store";
import { loadYouTubeAPI } from "./youtube-api";

const toneClasses = {
  calm: "from-deep-blue via-vc-background to-vc-background",
  playful: "from-vc-background via-deep-blue to-vc-background",
  energy: "from-vc-background via-vc-background to-deep-blue",
  aspire: "from-deep-blue via-vc-background to-vc-background",
  warm: "from-vc-background via-deep-blue/60 to-vc-background",
};

export default function Chapter({
  id,
  index,
  eyebrow,
  title,
  subtitle,
  intro,
  pointers,
  image,
  videoSrc,
  youtubeId,
  poster,
  imageAlt,
  slides,
  tone = "calm",
  reverse = false,
  originalRatio = false,
  decoration,
}) {
  const ref = useRef(null);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const ytContainerRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const controlRef = useRef({ play() {}, pause() {}, mute() {}, unmute() {}, seek() {} });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yImg = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const [isHovered, setIsHovered] = useState(false);
  const [isUnmuted, setIsUnmuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [shouldLoadPlayer, setShouldLoadPlayer] = useState(false);
  const [showPoster, setShowPoster] = useState(Boolean(youtubeId && poster));
  const [isBuffering, setIsBuffering] = useState(false);

  const hasVideo = Boolean(videoSrc || youtubeId);
  const hasSideContent =
    (pointers && pointers.length > 0) || (slides && slides.length > 0);

  controlRef.current = {
    play() {
      if (youtubeId) {
        ytPlayerRef.current?.playVideo?.();
        return;
      }
      videoRef.current?.play()?.then(() => setIsPlaying(true)).catch(() => {});
    },
    pause() {
      if (youtubeId) {
        ytPlayerRef.current?.pauseVideo?.();
        return;
      }
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    },
    mute() {
      if (youtubeId) {
        ytPlayerRef.current?.mute?.();
        return;
      }
      if (videoRef.current) videoRef.current.muted = true;
    },
    unmute() {
      if (youtubeId) {
        ytPlayerRef.current?.unMute?.();
        ytPlayerRef.current?.setVolume?.(100);
        return;
      }
      if (videoRef.current) videoRef.current.muted = false;
    },
    seek(seconds) {
      if (youtubeId) {
        ytPlayerRef.current?.seekTo?.(seconds, true);
        return;
      }
      if (videoRef.current) videoRef.current.currentTime = seconds;
    },
  };

  // Only mount a YouTube iframe when this chapter is near the viewport.
  useEffect(() => {
    if (!youtubeId || !mediaRef.current) return undefined;

    const node = mediaRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadPlayer(true);
        }
      },
      { rootMargin: "280px 0px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [youtubeId]);

  useEffect(() => {
    if (!youtubeId || !shouldLoadPlayer || !ytContainerRef.current) return undefined;

    const container = ytContainerRef.current;
    container.innerHTML = "";
    const mount = document.createElement("div");
    mount.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
    container.appendChild(mount);

    let player;
    let cancelled = false;
    setIsBuffering(true);

    loadYouTubeAPI()
      .then((YT) => {
        if (cancelled) return;
        player = new YT.Player(mount, {
          videoId: youtubeId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            loop: 1,
            playlist: youtubeId,
            fs: 0,
            iv_load_policy: 3,
            disablekb: 1,
            cc_load_policy: 0,
            enablejsapi: 1,
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
          },
          events: {
            onReady: (event) => {
              ytPlayerRef.current = event.target;
              event.target.mute();
              try {
                const dur = event.target.getDuration?.() || 0;
                if (dur > 0) setDuration(dur);
              } catch {
                /* ignore */
              }
              const state = audioStore.getState();
              const visible = (audioStore.visibility.get(id) || 0) > 0.15;
              if (state.focusedId === id || visible) {
                event.target.playVideo();
              }
              if (state.soundUnlocked && state.focusedId === id) {
                event.target.unMute();
                event.target.setVolume(100);
              }
            },
            onStateChange: (event) => {
              const YT = window.YT;
              if (!YT?.PlayerState) return;
              const code = event.data;
              if (code === YT.PlayerState.BUFFERING) {
                setIsBuffering(true);
              }
              if (code === YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setIsBuffering(false);
                setShowPoster(false);
              }
              if (code === YT.PlayerState.PAUSED) {
                setIsPlaying(false);
                setIsBuffering(false);
              }
              if (code === YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
        ytPlayerRef.current = player;
      })
      .catch(() => {
        setIsBuffering(false);
      });

    return () => {
      cancelled = true;
      ytPlayerRef.current = null;
      try {
        player?.destroy?.();
      } catch {
        /* player may already be gone */
      }
      container.innerHTML = "";
    };
  }, [id, youtubeId, shouldLoadPlayer]);

  useEffect(() => {
    if (!youtubeId || !shouldLoadPlayer) return undefined;
    const interval = window.setInterval(() => {
      const player = ytPlayerRef.current;
      if (!player?.getCurrentTime) return;
      const current = player.getCurrentTime() || 0;
      const dur = player.getDuration() || 0;
      setCurrentTime(current);
      setDuration(dur);
      if (dur > 0) setProgress((current / dur) * 100);
    }, 250);
    return () => window.clearInterval(interval);
  }, [youtubeId, shouldLoadPlayer]);

  useEffect(() => {
    if (!hasVideo) return undefined;

    const apply = (state) => {
      const focused = state.focusedId === id;
      const ratio = audioStore.visibility.get(id) || 0;
      const visible = ratio > 0.15;
      const shouldHaveSound = Boolean(
        state.soundUnlocked && (focused || state.activeVideoId === id)
      );

      setIsUnmuted(shouldHaveSound);
      if (shouldHaveSound) {
        ytPlayerRef.current?.unMute?.();
        ytPlayerRef.current?.setVolume?.(100);
        if (videoRef.current) videoRef.current.muted = false;
      } else {
        ytPlayerRef.current?.mute?.();
        if (videoRef.current) videoRef.current.muted = true;
      }

      if (focused || (visible && !state.focusedId)) {
        controlRef.current.play();
      } else {
        controlRef.current.pause();
      }
    };

    apply(audioStore.getState());
    return audioStore.subscribe(apply);
  }, [hasVideo, id]);

  const toggleSound = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const player = ytPlayerRef.current;
    if (isUnmuted) {
      player?.mute?.();
      if (!youtubeId && videoRef.current) videoRef.current.muted = true;
      audioStore.lockSound();
      setIsUnmuted(false);
      return;
    }
    // Must unmute + play in the same user gesture for browsers/YouTube.
    if (youtubeId) {
      player?.unMute?.();
      player?.setVolume?.(100);
      player?.playVideo?.();
    } else if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play()?.catch(() => {});
    }
    audioStore.unlockSound(id);
    setIsUnmuted(true);
  };

  const togglePlay = (event) => {
    if (event) event.stopPropagation();
    if (isPlaying) {
      controlRef.current.pause();
      setIsPlaying(false);
    } else {
      controlRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(current);
    setDuration(dur);
    if (dur > 0) {
      setProgress((current / dur) * 100);
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!duration) return;
    const newPercent = parseFloat(e.target.value);
    const newTime = (newPercent / 100) * duration;
    controlRef.current.seek(newTime);
    setProgress(newPercent);
    setCurrentTime(newTime);
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  useEffect(() => {
    if (!hasVideo || !mediaRef.current) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          audioStore.reportVisibility(id, entry.intersectionRatio);
        });
      },
      { threshold: [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1] }
    );

    observer.observe(mediaRef.current);
    return () => {
      observer.disconnect();
      audioStore.reportVisibility(id, 0);
    };
  }, [hasVideo, id]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-x-clip bg-gradient-to-b ${toneClasses[tone]} py-10 sm:py-8 md:py-12`}
    >
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -left-24 top-20 h-[30rem] w-[30rem] rounded-full bg-sky-blue/10 blur-[140px]"
      />
      <motion.div
        style={{ y: yImg }}
        className="pointer-events-none absolute -right-24 bottom-20 h-[30rem] w-[30rem] rounded-full bg-lilac/10 blur-[140px]"
      />
      {decoration}

      <div className="container relative mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 max-w-4xl sm:mb-8"
        >
          <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-6">
            <span className="block-3d flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sky-blue font-display text-base font-bold text-deep-blue shadow-lg sm:h-14 sm:w-14 sm:rounded-2xl sm:text-xl">
              {index}
            </span>
            <div className="flex min-w-0 items-center gap-3">
              <div className="hidden h-px w-8 bg-sky-blue/40 sm:block" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-blue/70 sm:text-sm sm:tracking-[0.4em]">
                {eyebrow}
              </span>
            </div>
          </div>
          <h2 className="text-balance font-display text-[1.65rem] font-extrabold leading-[1.1] tracking-tight sm:text-3xl md:text-5xl md:leading-[1.05]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 font-display text-base font-semibold leading-snug text-sky-blue/90 sm:mt-3 sm:text-xl md:text-2xl">
              {subtitle}
            </p>
          ) : null}
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-vc-foreground/70 sm:mt-6 sm:text-lg md:text-xl">
            {intro}
          </p>
        </motion.div>

        <div
          className={
            hasSideContent
              ? `grid gap-16 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`
              : "flex justify-center"
          }
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 80 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]"
          >
            <div
              className={`relative rounded-[1.5rem] glass-strong p-2 shadow-2xl transition-all duration-700 group-hover:shadow-sky-blue/20 ${originalRatio || youtubeId ? "" : "aspect-video"}`}
            >
              <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-white/5 to-transparent" />
              <div
                ref={mediaRef}
                className={`relative overflow-hidden rounded-[1.25rem] ${youtubeId ? "yt-reel aspect-[9/16] bg-black" : originalRatio ? "" : "aspect-video"}`}
              >
                {youtubeId ? (
                  <>
                    {shouldLoadPlayer ? (
                      <div
                        ref={ytContainerRef}
                        className="yt-player-host pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
                      />
                    ) : null}
                    {poster ? (
                      <Image
                        src={poster}
                        alt={imageAlt || title}
                        width={360}
                        height={640}
                        sizes="(max-width: 640px) 280px, 360px"
                        priority={index === "01"}
                        style={{ aspectRatio: "9 / 16" }}
                        className={`absolute inset-0 z-[5] h-full w-full object-cover transition-opacity duration-500 ${
                          showPoster ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ) : null}
                    {showPoster && shouldLoadPlayer ? (
                      <div className="pointer-events-none absolute inset-0 z-[6] flex items-center justify-center bg-black/20">
                        <div
                          className="h-9 w-9 animate-spin rounded-full border-2 border-white/25 border-t-sky-blue"
                          aria-hidden
                        />
                      </div>
                    ) : null}
                    {/* Blocks YouTube chrome clicks; our controls sit above */}
                    <button
                      type="button"
                      onClick={(e) => {
                        if (!shouldLoadPlayer) {
                          e.stopPropagation();
                          setShouldLoadPlayer(true);
                          return;
                        }
                        togglePlay(e);
                      }}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      className="absolute inset-0 z-10 cursor-pointer bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        if (!shouldLoadPlayer) {
                          e.stopPropagation();
                          setShouldLoadPlayer(true);
                          return;
                        }
                        togglePlay(e);
                      }}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      className={`absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass-strong shadow-xl transition-opacity duration-300 hover:scale-110 active:scale-95 sm:h-16 sm:w-16 ${
                        isPlaying || isBuffering
                          ? "pointer-events-none opacity-0"
                          : "pointer-events-auto opacity-100"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-6 w-6 text-white">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </button>
                  </>
                ) : videoSrc ? (
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    poster={poster}
                    muted={!isUnmuted}
                    loop
                    playsInline
                    preload="metadata"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onClick={togglePlay}
                    className={`h-full w-full cursor-pointer ${originalRatio ? "object-contain" : "object-cover"} transition-transform duration-[2000ms] group-hover:scale-105`}
                  />
                ) : (
                  <Image
                    src={image || poster}
                    alt={imageAlt || title}
                    width={560}
                    height={840}
                    style={{ aspectRatio: "560 / 840" }}
                    className={`h-full w-full ${originalRatio ? "object-contain" : "object-cover"} transition-transform duration-[2000ms] group-hover:scale-105`}
                  />
                )}

                <div
                  className={`pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-deep-blue/30 via-transparent to-transparent transition-opacity duration-700 ${isHovered ? "opacity-20" : "opacity-40"}`}
                />
              </div>

              {hasVideo ? (
                <div className="relative z-10 mt-3 flex items-center gap-2 px-1 pb-1 pr-14 sm:pr-16">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full glass text-white hover:text-sky-blue"
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3.5 w-3.5">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={toggleSound}
                    aria-label={isUnmuted ? "Mute video" : "Unmute video"}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full glass-strong transition-transform hover:scale-110 active:scale-95"
                  >
                    {isUnmuted ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="h-4 w-4 text-sky-blue"
                      >
                        <path
                          d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="h-4 w-4 text-white/70"
                      >
                        <path
                          d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progress}
                    onChange={handleSeek}
                    aria-label="Video scrubber"
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-sky-blue focus:outline-none"
                  />

                  <span className="whitespace-nowrap text-[10px] font-medium text-vc-foreground/70">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              ) : null}
            </div>

            <motion.div
              style={{ rotate }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none block-3d absolute -bottom-4 -right-2 z-0 h-12 w-12 rounded-2xl bg-warm/80 backdrop-blur-xl sm:-bottom-6 sm:-right-4 sm:h-16 sm:w-16"
            />
            <motion.div
              style={{ rotate }}
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="pointer-events-none block-3d absolute -top-3 -left-2 z-0 h-8 w-8 rounded-xl bg-lilac/80 backdrop-blur-xl sm:-top-4 sm:-left-4 sm:h-10 sm:w-10"
            />
          </motion.div>

          {hasSideContent ? (
            <div className="flex flex-col gap-6">
              {pointers && pointers.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, x: reverse ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-3xl glass p-7 transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 hover:shadow-xl"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-sky-blue">
                        Pointers
                      </span>
                    </div>
                    <ul className="space-y-4">
                      {pointers.map((pointer, pi) => (
                        <li
                          key={pi}
                          className="flex items-start gap-3.5 text-base font-medium leading-relaxed text-vc-foreground/85 md:text-lg"
                        >
                          <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-sky-blue shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                          <span>{pointer}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : (
                (slides || []).map((slide, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: reverse ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative rounded-3xl glass p-7 transition-all duration-500 hover:scale-[1.03] hover:bg-white/10 hover:shadow-xl"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-sky-blue">
                          {slide.subtitle}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-sky-blue">
                        {slide.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-vc-foreground/60">{slide.body}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
