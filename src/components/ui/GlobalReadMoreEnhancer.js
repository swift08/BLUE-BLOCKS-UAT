"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * GlobalReadMoreEnhancer
 * - Mount once in app/layout.js.
 * - Scans <main> for .bb-text blocks and applies:
 *   A) Multi-paragraph: show first 2 desktop / 1 mobile, hide rest, toggle.
 *   B) Single long paragraph: clamp to 5 desktop / 3 mobile, toggle if overflow.
 *
 * No component JSX edits required.
 */
export default function GlobalReadMoreEnhancer({
  // selectors
  rootSelector = "main",
  blockSelector = ".bb-text",

  // behavior
  desktopParaVisible = 2,
  mobileParaVisible = 1,
  desktopLines = 5,
  mobileLines = 3,

  // heuristics to avoid touching small UI texts that also have bb-text
  minCharsSinglePara = 220,
  minCharsMultiParaTotal = 140,

  moreLabel = "Read more",
  lessLabel = "Read less",
}) {
  const pathname = usePathname();
  const observerRef = useRef(null);

  useEffect(() => {
    const root = document.querySelector(rootSelector);
    if (!root) return;

    const mq = window.matchMedia("(max-width: 639px)");
    const isMobile = () => mq.matches;

    const processedAttr = "data-bb-rm-processed";

    function clampClass(lines) {
      return `bb-rm-clamp bb-rm-clamp--${lines}`;
    }

    function stripClampClasses(className = "") {
      return className
        .split(/\s+/)
        .filter((c) => !c.startsWith("bb-rm-clamp"))
        .join(" ")
        .trim();
    }

    function setButtonText(btn, expanded) {
      btn.textContent = expanded ? `${lessLabel} ↑` : `${moreLabel} ↓`;
    }

    function createToggleButton(onClick) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bb-rm-btn";
      setButtonText(btn, false);
      btn.addEventListener("click", onClick);
      return btn;
    }

    // Measure overflow for clamped element
    function doesOverflowWhenClamped(targetEl, lines) {
      // apply clamp temporarily
      const original = targetEl.className;
      targetEl.className = `${stripClampClasses(original)} ${clampClass(lines)}`.trim();

      const clampedH = targetEl.getBoundingClientRect().height;

      // clone without clamp to measure full height
      const clone = targetEl.cloneNode(true);
      clone.className = stripClampClasses(original);
      clone.style.position = "absolute";
      clone.style.visibility = "hidden";
      clone.style.pointerEvents = "none";
      clone.style.height = "auto";
      clone.style.maxHeight = "none";
      clone.style.webkitLineClamp = "unset";
      clone.style.display = "block";
      clone.style.width = `${targetEl.getBoundingClientRect().width}px`;

      root.appendChild(clone);
      const fullH = clone.getBoundingClientRect().height;
      root.removeChild(clone);

      // restore original (clamped remains applied by caller if needed)
      targetEl.className = `${stripClampClasses(original)} ${clampClass(lines)}`.trim();

      return { overflow: fullH > clampedH + 1, clampedH, fullH };
    }

    function applyMultiPara(block) {
      const ps = Array.from(block.querySelectorAll(":scope > p"));
      if (ps.length < 2) return false;

      const totalChars = ps.reduce((sum, p) => sum + ((p.textContent || "").trim().length), 0);
      if (totalChars < minCharsMultiParaTotal) return false;

      const visibleCount = isMobile() ? mobileParaVisible : desktopParaVisible;
      if (ps.length <= visibleCount) return false;

      block.setAttribute(processedAttr, "1");

      // hide from visibleCount onward
      const hiddenWrap = document.createElement("div");
      hiddenWrap.className = "bb-rm-hidden";

      for (let i = visibleCount; i < ps.length; i += 1) {
        hiddenWrap.appendChild(ps[i]);
      }
      ps[visibleCount - 1].after(hiddenWrap);

      let expanded = false;
      const btn = createToggleButton(() => {
        expanded = !expanded;
        hiddenWrap.style.display = expanded ? "block" : "none";
        setButtonText(btn, expanded);
      });

      // initial hidden state
      hiddenWrap.style.display = "none";
      block.appendChild(btn);

      return true;
    }

    function applySingleParaClamp(block) {
      // if direct single p exists, clamp that; else clamp block itself
      const ps = Array.from(block.querySelectorAll(":scope > p"));
      const target = ps.length === 1 ? ps[0] : block;

      const textLen = ((target.textContent || "").trim().length);
      if (textLen < minCharsSinglePara) return false;

      const lines = isMobile() ? mobileLines : desktopLines;

      // Wrap for smooth max-height animation
      const wrap = document.createElement("div");
      wrap.className = "bb-rm-wrap";

      const parent = target.parentElement;
      if (!parent) return false;

      // avoid double wrapping
      if (target.parentElement?.classList?.contains("bb-rm-wrap")) return false;

      parent.insertBefore(wrap, target);
      wrap.appendChild(target);

      // apply clamp + detect overflow
      const originalClass = target.className;
      target.className = `${stripClampClasses(originalClass)} ${clampClass(lines)}`.trim();

      const { overflow, clampedH, fullH } = doesOverflowWhenClamped(target, lines);
      if (!overflow) {
        // undo if not needed
        target.className = stripClampClasses(originalClass);
        wrap.replaceWith(target);
        return false;
      }

      block.setAttribute(processedAttr, "1");
      wrap.style.maxHeight = `${clampedH}px`;

      let expanded = false;
      const btn = createToggleButton(() => {
        expanded = !expanded;

        if (expanded) {
          target.className = stripClampClasses(originalClass);
          requestAnimationFrame(() => {
            const expandedH = target.getBoundingClientRect().height;
            wrap.style.maxHeight = `${expandedH}px`;
          });
        } else {
          target.className = `${stripClampClasses(originalClass)} ${clampClass(lines)}`.trim();
          requestAnimationFrame(() => {
            const collapsedH = target.getBoundingClientRect().height;
            wrap.style.maxHeight = `${collapsedH}px`;
          });
        }

        setButtonText(btn, expanded);
      });

      // insert button after wrap
      if (wrap.parentElement) wrap.parentElement.insertBefore(btn, wrap.nextSibling);
      else block.appendChild(btn);

      return true;
    }

    function process() {
      const blocks = Array.from(root.querySelectorAll(blockSelector)).filter(
        (el) => !el.hasAttribute(processedAttr)
      );

      blocks.forEach((block) => {
        // Skip super small blocks to reduce false positives
        const rawLen = ((block.textContent || "").trim().length);
        if (rawLen < 90) return;

        // Prefer multi-para behavior if multiple direct <p>
        const didMulti = applyMultiPara(block);
        if (didMulti) return;

        // Else try single paragraph clamp
        applySingleParaClamp(block);
      });
    }

    // Run once after route renders
    const raf = requestAnimationFrame(process);

    // Observe future changes (lazy loaded sections, CMS blocks, etc.)
    if (observerRef.current) observerRef.current.disconnect();
    const obs = new MutationObserver(() => {
      // Debounce via rAF
      requestAnimationFrame(process);
    });
    obs.observe(root, { childList: true, subtree: true });
    observerRef.current = obs;

    // Re-process when breakpoint changes
    const onMqChange = () => {
      // On breakpoint change, easiest is full reload of processing state.
      // We won’t “unprocess” everything (complex), but we can re-run on new blocks.
      requestAnimationFrame(process);
    };
    mq.addEventListener?.("change", onMqChange);

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      mq.removeEventListener?.("change", onMqChange);
    };
  }, [
    pathname,
    rootSelector,
    blockSelector,
    desktopParaVisible,
    mobileParaVisible,
    desktopLines,
    mobileLines,
    minCharsSinglePara,
    minCharsMultiParaTotal,
    moreLabel,
    lessLabel,
  ]);

  return null;
}