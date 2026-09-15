"use client";

import { useEffect, useRef, useState } from "react";
import { audioStore } from "./audio-store";
import { loadYouTubeAPI } from "./youtube-api";

/**
 * Full-bleed muted YouTube background with optional unmute via audioStore.
 */
export default function YoutubeBackground({
  youtubeId,
  id,
  className = "h-full w-full object-cover opacity-20 grayscale",
  soundButtonClassName,
}) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [isUnmuted, setIsUnmuted] = useState(false);

  useEffect(() => {
    if (!youtubeId || !containerRef.current) return undefined;

    const host = containerRef.current;
    const mount = document.createElement("div");
    mount.style.cssText = "width:100%;height:100%;";
    host.appendChild(mount);

    let player;
    let cancelled = false;

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
              playerRef.current = event.target;
              event.target.mute();
              event.target.playVideo();
              const state = audioStore.getState();
              if (state.soundUnlocked && state.activeVideoId === id) {
                event.target.unMute();
                event.target.setVolume(100);
              }
            },
            onStateChange: (event) => {
              if (event.data === window.YT?.PlayerState?.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
        playerRef.current = player;
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      playerRef.current = null;
      try {
        player?.destroy?.();
      } catch {
        /* ignore */
      }
      host.innerHTML = "";
    };
  }, [id, youtubeId]);

  useEffect(() => {
    return audioStore.subscribe((state) => {
      const shouldUnmute = Boolean(state.soundUnlocked && state.activeVideoId === id);
      setIsUnmuted(shouldUnmute);
      if (!playerRef.current) return;
      if (shouldUnmute) {
        playerRef.current.unMute?.();
        playerRef.current.setVolume?.(100);
        playerRef.current.playVideo?.();
      } else {
        playerRef.current.mute?.();
      }
    });
  }, [id]);

  const toggleSound = () => {
    if (isUnmuted) {
      playerRef.current?.mute?.();
      audioStore.lockSound();
      setIsUnmuted(false);
      return;
    }
    playerRef.current?.unMute?.();
    playerRef.current?.setVolume?.(100);
    playerRef.current?.playVideo?.();
    audioStore.unlockSound(id);
    setIsUnmuted(true);
  };

  return (
    <>
      <div className={`pointer-events-none overflow-hidden ${className}`}>
        <div className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2">
          <div ref={containerRef} className="h-full w-full" />
        </div>
      </div>
      <button
        type="button"
        onClick={toggleSound}
        aria-label={isUnmuted ? "Mute background video" : "Unmute background video"}
        className={
          soundButtonClassName ||
          "absolute right-10 bottom-10 z-20 flex h-12 w-12 items-center justify-center rounded-full glass-strong shadow-2xl transition-all hover:scale-110 active:scale-95"
        }
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
    </>
  );
}
