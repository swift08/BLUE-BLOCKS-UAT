"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * ReadMoreText (block version)
 * - Works with:
 *   1) text: string
 *   2) paras: string[] (multiple paragraphs)
 *   3) children: ReactNode (custom markup)
 *
 * - Shows toggle only if overflow.
 * - Mobile/desktop clamp line counts.
 * - Smooth expand/collapse animation.
 */
export default function ReadMoreText({
  text,
  paras,
  children,

  className = "bb-text",
  paragraphClassName = "",

  desktopLines = 5,
  mobileLines = 3,

  moreLabel = "Read more",
  lessLabel = "Read less",

  allowHtml = false, // for `text` OR for `paras` entries
}) {
  const wrapRef = useRef(null);
  const measureRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [maxH, setMaxH] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const clampLines = isMobile ? mobileLines : desktopLines;
  const clampClass = `bb-clamp bb-clamp--${clampLines}`;

  const mode = useMemo(() => {
    if (Array.isArray(paras)) return "paras";
    if (typeof text === "string") return "text";
    return "children";
  }, [paras, text]);

  // Render content as a single block (so clamp applies to the whole thing)
  const contentNode = useMemo(() => {
    if (mode === "paras") {
      return (
        <div>
          {paras.map((p, idx) =>
            allowHtml ? (
              <p
                key={idx}
                className={paragraphClassName}
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ) : (
              <p key={idx} className={paragraphClassName}>
                {p}
              </p>
            )
          )}
        </div>
      );
    }

    if (mode === "text") {
      return allowHtml ? (
        <div dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <div>{text}</div>
      );
    }

    return <div>{children}</div>;
  }, [mode, paras, text, children, allowHtml, paragraphClassName]);

  // Measure: decide if toggle is needed + set maxHeight for animation
  useLayoutEffect(() => {
    const wrapEl = wrapRef.current;
    const measureEl = measureRef.current;
    if (!wrapEl || !measureEl) return;

    // Measure clamped height (collapsed)
    const clampedHeight = measureEl.getBoundingClientRect().height;

    // Clone without clamp to measure full height
    const clone = measureEl.cloneNode(true);
    clone.className = className; // unclamped
    clone.style.position = "absolute";
    clone.style.visibility = "hidden";
    clone.style.pointerEvents = "none";
    clone.style.height = "auto";
    clone.style.maxHeight = "none";
    clone.style.display = "block";
    clone.style.webkitLineClamp = "unset";
    clone.style.width = `${measureEl.getBoundingClientRect().width}px`;

    wrapEl.appendChild(clone);
    const fullHeight = clone.getBoundingClientRect().height;
    wrapEl.removeChild(clone);

    const needsToggle = fullHeight > clampedHeight + 1;
    setShowToggle(needsToggle);

    if (!needsToggle) {
      setMaxH(null);
      return;
    }

    setMaxH(expanded ? fullHeight : clampedHeight);
  }, [className, clampLines, expanded, contentNode]);

  const toggle = () => setExpanded((v) => !v);

  return (
    <div ref={wrapRef}>
      <div
        className="bb-readmore-wrap"
        style={maxH ? { maxHeight: `${maxH}px` } : undefined}
      >
        <div
          ref={measureRef}
          className={expanded ? className : `${className} ${clampClass}`}
        >
          {contentNode}
        </div>
      </div>

      {showToggle ? (
        <button type="button" className="bb-readmore-btn" onClick={toggle}>
          {expanded ? lessLabel : moreLabel}{" "}
          <span aria-hidden>{expanded ? "↑" : "↓"}</span>
        </button>
      ) : null}
    </div>
  );
}