"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const ALLOWED_TAGS = new Set(["B", "STRONG", "I", "EM", "A", "BR", "UL", "OL", "LI", "P", "SPAN"]);
const ALLOWED_ATTRS = new Set(["href", "target", "rel"]);

function sanitizeBasicHtml(html) {
  if (!html) return "";
  const tpl = document.createElement("template");
  tpl.innerHTML = String(html);

  // remove scripts/styles
  tpl.content.querySelectorAll("script, style").forEach((n) => n.remove());

  // strip disallowed tags and attributes
  const walker = document.createTreeWalker(tpl.content, NodeFilter.SHOW_ELEMENT);
  const toRemove = [];

  while (walker.nextNode()) {
    const el = walker.currentNode;

    // remove tags not in allowed list (unwrap them)
    if (!ALLOWED_TAGS.has(el.tagName)) {
      toRemove.push(el);
      continue;
    }

    // remove unsafe attrs
    [...el.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      if (!ALLOWED_ATTRS.has(name) && !name.startsWith("data-")) {
        el.removeAttribute(attr.name);
      }
    });

    // protect javascript: links
    if (el.tagName === "A") {
      const href = el.getAttribute("href") || "";
      if (/^\s*javascript:/i.test(href)) el.removeAttribute("href");

      // default safe link behavior
      if (!el.getAttribute("target")) el.setAttribute("target", "_self");
      if (el.getAttribute("target") === "_blank" && !el.getAttribute("rel")) {
        el.setAttribute("rel", "noopener noreferrer");
      }
    }
  }

  // unwrap disallowed nodes
  for (const el of toRemove) {
    const parent = el.parentNode;
    if (!parent) continue;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
  }

  return tpl.innerHTML;
}

export default function ReadMoreBlock({
  readMore, // { enabled?: boolean, labelMore?: string, labelLess?: string, paragraphs?: string[] }
  className = "",
  contentClassName = "text-sm sm:text-base leading-relaxed text-slate-700",
  buttonClassName = "mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80",
  durationMs = 350,
}) {
  const enabled = readMore?.enabled !== false;
  const labelMore = readMore?.labelMore || "Read More";
  const labelLess = readMore?.labelLess || "Read Less";

  const paragraphs = Array.isArray(readMore?.paragraphs) ? readMore.paragraphs : [];
  const hasContent = enabled && paragraphs.some((p) => String(p || "").trim().length > 0);

  const [open, setOpen] = useState(false);
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  const safeParagraphs = useMemo(() => {
    return paragraphs
      .map((p) => sanitizeBasicHtml(p))
      .filter((p) => String(p).trim().length > 0);
  }, [paragraphs]);

  useEffect(() => {
    if (!innerRef.current) return;
    const el = innerRef.current;

    const measure = () => {
      setHeight(el.scrollHeight || 0);
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    return () => ro.disconnect();
  }, [safeParagraphs.length]);

  if (!hasContent) return null;

  return (
    <div className={className}>
      {/* Animated wrapper */}
      <div
        className="overflow-hidden"
        style={{
          maxHeight: open ? `${height}px` : "0px",
          transition: `max-height ${durationMs}ms ease`,
        }}
        aria-hidden={!open}
      >
        <div ref={innerRef} className="pt-1">
          <div className={contentClassName}>
            {safeParagraphs.map((html, idx) => (
              <p
                key={idx}
                className={idx === 0 ? "" : "mt-3"}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Toggle */}
      <button
        type="button"
        className={buttonClassName}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? labelLess : labelMore}
        <span
          className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          aria-hidden="true"
        >▾
        </span>
      </button>
    </div>
  );
}