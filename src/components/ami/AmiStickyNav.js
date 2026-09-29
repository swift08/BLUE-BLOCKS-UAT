"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Container from "@/components/layout/Container";

const NAV_ITEMS = [
  { label: "What Is AMI", href: "#what-is-ami", id: "what-is-ami" },
  { label: "The Diplomas", href: "#diplomas", id: "diplomas" },
  { label: "Training Centres", href: "#centres", id: "centres" },
  { label: "Sponsorship", href: "#sponsorship", id: "sponsorship" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function getHeaderHeight() {
  if (typeof document === "undefined") return 80;
  const el =
    document.getElementById("site-header") || document.querySelector("header");
  return el ? Math.ceil(el.getBoundingClientRect().height) : 80;
}

export default function AmiStickyNav() {
  const [activeSection, setActiveSection] = useState("what-is-ami");
  const [headerH, setHeaderH] = useState(80);
  const navRef = useRef(null);
  const isClickingRef = useRef(false);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const h = getHeaderHeight();
      if (h > 0) setHeaderH(h);
    };

    updateHeaderHeight();

    window.addEventListener("resize", updateHeaderHeight, { passive: true });
    window.addEventListener("scroll", updateHeaderHeight, { passive: true });

    const headerEl = document.getElementById("site-header");
    let resizeObserver;
    if (headerEl && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(headerEl);
    }

    const timer = setTimeout(updateHeaderHeight, 350);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("scroll", updateHeaderHeight);
      if (resizeObserver) resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickingRef.current) return;

      const navH = navRef.current?.offsetHeight || 50;
      const scrollPos = window.scrollY + headerH + navH + 80;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerH]);

  const handleClick = useCallback(
    (e, item) => {
      e.preventDefault();
      const target = document.getElementById(item.id);
      if (!target) return;

      setActiveSection(item.id);
      isClickingRef.current = true;

      const navH = navRef.current?.offsetHeight || 50;
      const totalOffset = headerH + navH + 16;
      const y =
        target.getBoundingClientRect().top + window.pageYOffset - totalOffset;

      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });

      if (typeof window !== "undefined") {
        window.history.pushState(null, "", item.href);
      }

      setTimeout(() => {
        isClickingRef.current = false;
      }, 700);
    },
    [headerH]
  );

  return (
    <div
      ref={navRef}
      role="navigation"
      aria-label="AMI Training page section navigation"
      className="sticky left-0 right-0 w-full z-[70] bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-150"
      style={{ top: `${headerH}px` }}
    >
      <Container className="relative">
        <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-2.5 sm:py-3 gap-2 sm:gap-3 pr-6 md:pr-0">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item)}
                className={`whitespace-nowrap px-3.5 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none min-h-[38px] inline-flex items-center ${
                  isActive
                    ? "bg-[#2C2F8F] text-white shadow-sm shadow-[#2C2F8F]/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/90"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
        {/* Right fade indicator for mobile horizontal scroll */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent md:hidden" />
      </Container>
    </div>
  );
}
