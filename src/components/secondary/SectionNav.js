"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const ACCENT = "#E07B54"; /* warm coral */

function getHeaderHeight() {
  const el =
    document.getElementById("site-header") || document.querySelector("header");
  return el ? Math.ceil(el.getBoundingClientRect().height) : 0;
}

export default function SectionNav({ items }) {
  /* Use passed items; fall back to empty array so nothing crashes */
  const NAV_ITEMS = Array.isArray(items) && items.length > 0 ? items : [];

  const [active, setActive] = useState(NAV_ITEMS[0]?.id ?? "");
  const [headerH, setHeaderH] = useState(0);
  const navRef = useRef(null);
  const observerRef = useRef(null);
  const isClickScrolling = useRef(false);

  /* ── Measure header height (on mount + resize) ───────────────────── */
  useEffect(() => {
    const measure = () => setHeaderH(getHeaderHeight());
    measure();
    window.addEventListener("resize", measure, { passive: true });
    const t = setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  /* ── IntersectionObserver — active section tracking ─────────────── */
  useEffect(() => {
    if (!NAV_ITEMS.length) return;

    const targets = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    if (!targets.length) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -72% 0px", threshold: 0 }
    );

    targets.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(NAV_ITEMS.map(i => i.id))]);

  /* ── Smooth scroll on click ──────────────────────────────────────── */
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActive(id);
    isClickScrolling.current = true;

    const navH = navRef.current?.offsetHeight || 0;
    const hdrH = getHeaderHeight();
    const offset = hdrH + navH + 12;
    const top = window.scrollY + el.getBoundingClientRect().top - offset;

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setTimeout(() => { isClickScrolling.current = false; }, 900);
  }, []);

  if (!NAV_ITEMS.length) return null;

  return (
    <div
      ref={navRef}
      className="sticky left-0 right-0 z-40 bg-white border-b border-slate-100 shadow-sm"
      style={{ top: headerH > 0 ? `${headerH}px` : "80px" }}
      role="navigation"
      aria-label="Page sections"
    >
      <div
        className="mx-auto px-4 sm:px-6"
        style={{ maxWidth: "var(--bb-container)" }}
      >
        <div className="flex items-center justify-between py-4 w-full overflow-x-auto scrollbar-hide">
          {NAV_ITEMS.map(({ id, label }, index) => {
            const isActive = active === id;
            const isLast = index === NAV_ITEMS.length - 1;

            return (
              <div key={id} className={`flex items-center flex-shrink-0 ${isLast ? "" : "flex-1"}`}>
                {/* ── Nav item ─────────────────────────────────────── */}
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => scrollTo(id)}
                  aria-current={isActive ? "location" : undefined}
                  className="flex items-center gap-2.5 group focus:outline-none flex-shrink-0"
                >
                  {/* Radio dot */}
                  <span
                    className="flex-shrink-0 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all duration-200"
                    style={{
                      borderColor: isActive ? ACCENT : "#E2E8F0",
                      backgroundColor: "white",
                    }}
                  >
                    {isActive ? (
                      <span
                        className="w-[8px] h-[8px] rounded-full"
                        style={{ backgroundColor: ACCENT }}
                      />
                    ) : (
                      <span
                        className="w-[8px] h-[8px] rounded-full opacity-0 group-hover:opacity-25 transition-opacity duration-150"
                        style={{ backgroundColor: "#94A3B8" }}
                      />
                    )}
                  </span>

                  {/* Label */}
                  <span
                    className="text-sm font-medium whitespace-nowrap transition-colors duration-200"
                    style={{ color: isActive ? "#334155" : "#94A3B8" }}
                  >
                    {label}
                  </span>
                </button>

                {/* ── Solid connector ─────────────────────────────── */}
                {!isLast && (
                  <div className="flex-1 h-px bg-[#E2E8F0] mx-4 hidden sm:block min-w-[20px]" />
                )}
                {/* spacer on tiny screens */}
                {!isLast && (
                  <div className="sm:hidden mx-3 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
