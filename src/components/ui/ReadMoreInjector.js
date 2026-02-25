"use client";

import { useEffect, useRef, useState } from "react";

export default function ReadMoreInjector({
  children,
  config,
  // default: first paragraph under bb-text
  selector = ".bb-text p",
  readMoreLabel = "Read More",
  readLessLabel = "Read Less",
  buttonClassName = "mt-3 inline-flex items-center text-sm font-medium underline underline-offset-4 hover:opacity-80",
  moreClassName = "mt-4",
}) {
  const wrapRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const enabled = config?.enabled !== false;
  const moreHtml = (config?.text ?? "").trim();
  const targetSelector = config?.selector || selector;

  const shouldInject = enabled && moreHtml.length > 0;

  // cleanup any previous injection (important when route changes / re-render)
  const cleanup = () => {
    const root = wrapRef.current;
    if (!root) return;
    root.querySelectorAll("[data-readmore-injected='1']").forEach((n) => n.remove());
  };

  useEffect(() => {
    cleanup();
    if (!shouldInject) return;

    const root = wrapRef.current;
    if (!root) return;

    const target = root.querySelector(targetSelector);
    if (!target) return;

    // container for injected UI
    const holder = document.createElement("div");
    holder.setAttribute("data-readmore-injected", "1");

    // more content block (HTML allowed)
    const moreBlock = document.createElement("div");
    moreBlock.setAttribute("data-readmore-more", "1");
    moreBlock.className = moreClassName;
    moreBlock.style.display = expanded ? "block" : "none";
    moreBlock.innerHTML = moreHtml;

    // button
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-readmore-btn", "1");
    btn.className = config?.buttonClassName || buttonClassName;
    btn.textContent = expanded ? (config?.readLessLabel || readLessLabel) : (config?.readMoreLabel || readMoreLabel);

    btn.addEventListener("click", () => {
      setExpanded((v) => !v);
    });

    holder.appendChild(btn);
    holder.appendChild(moreBlock);

    // append after the target paragraph
    target.insertAdjacentElement("afterend", holder);

    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shouldInject,
    targetSelector,
    moreHtml,
    // keep these stable for correct updates
    config?.buttonClassName,
    config?.readMoreLabel,
    config?.readLessLabel,
    buttonClassName,
    moreClassName,
    readMoreLabel,
    readLessLabel,
    expanded,
  ]);

  // update DOM text + visibility when expanded changes
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const btn = root.querySelector("[data-readmore-btn='1']");
    const moreBlock = root.querySelector("[data-readmore-more='1']");
    if (!btn || !moreBlock) return;

    btn.textContent = expanded ? (config?.readLessLabel || readLessLabel) : (config?.readMoreLabel || readMoreLabel);
    moreBlock.style.display = expanded ? "block" : "none";
  }, [expanded, config?.readMoreLabel, config?.readLessLabel, readMoreLabel, readLessLabel]);

  return <div ref={wrapRef}>{children}</div>;
}