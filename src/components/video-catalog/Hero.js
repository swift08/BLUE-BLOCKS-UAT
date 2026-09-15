"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { audioStore } from "./audio-store";
import FloatingBlocks from "./FloatingBlocks";

export default function Hero({ videoSrc, poster }) {
  const videoRef = useRef(null);
  const [isUnmuted, setIsUnmuted] = useState(false);
  const id = "hero-video";

  useEffect(() => {
    const unsubscribe = audioStore.subscribe((state) => {
      if (state.activeVideoId !== id) {
        setIsUnmuted(false);
        if (videoRef.current) videoRef.current.muted = true;
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleSound = () => {
    const newMuteState = !isUnmuted;
    setIsUnmuted(newMuteState);
    if (videoRef.current) videoRef.current.muted = !newMuteState;
    if (newMuteState) {
      audioStore.unlockSound(id);
    } else {
      audioStore.lockSound();
    }
  };

  return (
    <section
      id="top"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-cosmic"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/80 via-deep-blue/40 to-vc-background" />

        <button
          type="button"
          onClick={toggleSound}
          aria-label={isUnmuted ? "Mute hero video" : "Unmute hero video"}
          className="absolute right-10 bottom-10 z-20 flex h-12 w-12 items-center justify-center rounded-full glass-strong shadow-2xl transition-all hover:scale-110 active:scale-95"
        >
          {isUnmuted ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-6 w-6 text-sky-blue"
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
              className="h-6 w-6 text-white/40"
            >
              <path
                d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="pointer-events-none absolute -top-40 left-1/4 h-[40rem] w-[40rem] rounded-full bg-lilac/20 blur-[150px] animate-pulse-glow" />
      <div
        className="pointer-events-none absolute -bottom-40 right-1/4 h-[40rem] w-[40rem] rounded-full bg-sky-blue/20 blur-[150px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      <FloatingBlocks />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">

        <h1 className="text-balance font-display text-5xl font-black leading-[0.95] tracking-tighter md:text-7xl lg:text-8xl">
          {"A child's journey".split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mr-4 inline-block"
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block bg-gradient-to-r from-sky-blue via-warm to-lilac bg-clip-text text-transparent"
          >
            unfolds here.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mx-auto mt-12 max-w-3xl text-balance text-xl font-medium leading-relaxed text-vc-foreground/60 md:text-2xl"
        >
          From the Pink Tower to the launch pad, from first steps to the confidence of an adolescent.
          Watch what sixteen years of trusted childhood looks like at Blue Blocks Montessori.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <a
            href="#journey"
            className="group relative flex h-20 w-20 items-center justify-center rounded-full glass-strong shadow-block transition-all duration-500 hover:scale-110 hover:bg-sky-blue/20"
            aria-label="Scroll to begin the journey"
          >
            <div className="absolute inset-0 rounded-full bg-sky-blue opacity-10 blur-md animate-pulse" />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-8 w-8 animate-bounce text-sky-blue"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-vc-foreground/40">
            scroll to begin
          </span>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-vc-background via-vc-background/40 to-transparent" />
    </section>
  );
}
