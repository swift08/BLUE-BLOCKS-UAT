"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import siteData from "@/data/site";
import { usePathname } from "next/navigation";
import { normalizeSiteHref } from "@/lib/links";

/* ------------------------- helpers ------------------------- */

const normalizeHref = (href) => {
  return normalizeSiteHref(href);
};

const isValidLinkHref = (href) => {
  const h = String(href || "").trim();
  return Boolean(h);
};

export default function Header({ variant = "dark" }) {
  const { site } = siteData;
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAnnouncementClosed, setIsAnnouncementClosed] = useState(true);

  // Mobile accordion open key (one open at a time)
  const [mobileOpenKey, setMobileOpenKey] = useState("");

  // Read announcement close state
  useEffect(() => {
    const closed = sessionStorage.getItem("announcementClosed") === "true";
    setIsAnnouncementClosed(closed);
  }, []);

  const isLight = variant === "light" && !scrolled;

  const closeAnnouncementBar = () => {
    setIsAnnouncementClosed(true);
    sessionStorage.setItem("announcementClosed", "true");
  };

  // Scroll background change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [menuOpen]);

  // close on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpenKey("");
  }, [pathname]);

  // -------- ACTIVE HELPERS --------
  const isActiveHref = (href) => {
    const h = normalizeHref(href);
    if (!h) return false;
    if (h === "/") return pathname === "/";
    return pathname === h || pathname.startsWith(h + "/");
  };

  const navLinkClass = ({ active = false } = {}) => {
    const base = isLight ? "text-white" : "text-[#131313]";
    const hover = isLight ? "hover:text-indigo-100" : "hover:text-[#000000]";
    const activeCls = isLight
      ? "text-indigo-100 border-b border-white/70"
      : "text-[#0F52BA] border-b border-[#0F52BA]";
    return `transition ${base} ${hover} ${active ? activeCls : ""}`;
  };

  const { megaByLabel, navItems } = useMemo(() => {
    const mm = siteData?.megaMenu || {};
    const map = {};

    const whatWeDo = mm.whatDoWeDo
      ? {
          ...mm.whatDoWeDo,
          label: "What We Do",
          items: Array.isArray(mm.whatDoWeDo.items)
            ? [...mm.whatDoWeDo.items]
            : [],
        }
      : null;

    if (whatWeDo) {
      const hasAmi = whatWeDo.items.some(
        (it) => normalizeHref(it.href) === "/ami-montessori-training/"
      );
      const hasCareers = whatWeDo.items.some((it) => normalizeHref(it.href) === "/careers/");
      const hasVideoCatalog = whatWeDo.items.some(
        (it) => normalizeHref(it.href) === "/video-catalog/"
      );

      if (!hasAmi) {
        whatWeDo.items.push({
          id: "ami-montessori-training",
          title: "AMI Training",
          href: "/ami-montessori-training/",
          description: "AMI-aligned training pathway for guides and educational leaders.",
          image: "/programs/thumb-secondary.webp",
        });
      }

      if (!hasCareers) {
        whatWeDo.items.push({
          id: "careers",
          title: "Careers",
          href: "/careers/",
          description: "Open roles for educators, researchers, and mission-aligned professionals.",
          image: "/programs/thumb-primary.webp",
        });
      }

      if (!hasVideoCatalog) {
        whatWeDo.items.push({
          id: "video-catalog",
          title: "Video Catalog",
          href: "/video-catalog/",
          description: "A cinematic journey through classrooms, labs, farm days, and community life.",
          image: "/programs/thumb-secondary.webp",
        });
      }

    }

    const programs = mm.programs
      ? {
          ...mm.programs,
          items: Array.isArray(mm.programs.items) ? [...mm.programs.items] : [],
          ctaCard: mm.programs.ctaCard
            ? {
                ...mm.programs.ctaCard,
                button: mm.programs.ctaCard.button
                  ? { ...mm.programs.ctaCard.button, label: "Admissions", href: "/admissions/" }
                  : undefined,
              }
            : mm.programs.ctaCard,
        }
      : null;

    if (programs) {
      const hasAmi = programs.items.some(
        (it) => normalizeHref(it.href) === "/ami-montessori-training/"
      );
      if (!hasAmi) {
        programs.items.push({
          id: "ami-montessori-training",
          title: "AMI Teacher Training",
          href: "/ami-montessori-training/",
          description: "Internationally recognised AMI diploma courses and certification across India.",
          image: "/programs/thumb-ami.jpg",
        });
      }
    }

    const innovations = mm.innovations
      ? { ...mm.innovations, items: Array.isArray(mm.innovations.items) ? [...mm.innovations.items] : [] }
      : null;

    if (programs?.label) map[programs.label] = programs;
    if (whatWeDo?.label) map[whatWeDo.label] = whatWeDo;
    if (innovations?.label) map[innovations.label] = innovations;

    const nav = Array.isArray(site?.nav)
      ? site.nav.map((item) => {
          const href = normalizeHref(item?.href);
          let label = item?.label || "";

          if (label === "What do we do" || label === "Who We Are") label = "About";
          if (href === "/about-us") return { ...item, label, href: "/about-us/" };
          return { ...item, label, href };
        })
      : [];

    return { megaByLabel: map, navItems: nav };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const socials = siteData.footer.socials || [];

  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <div
      id="site-header"
      className={`fixed top-0 left-0 right-0 w-full z-[80] transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-white shadow-sm"
          : "bg-white/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none"
      }`}
    >
      {/* Announcement Bar */}
      {!isAnnouncementClosed && (
        <div className="bg-[#B74F2A] text-white text-xs sm:text-sm relative overflow-hidden">
          <Container className="py-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 overflow-hidden">
                {site?.announcements?.length ? (
                  <marquee direction="left">
                    {site.announcements.map((item, idx) => (
                      <span key={idx} className="mr-10">
                        {item.text}
                      </span>
                    ))}
                  </marquee>
                ) : null}
              </div>

              <button
                onClick={closeAnnouncementBar}
                suppressHydrationWarning
                className="px-2 font-semibold"
                aria-label="Close announcement"
              >
                {"\u2715"}
              </button>
            </div>
          </Container>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-transparent">
        <Container className="py-3 sm:py-4 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="relative z-[90] flex items-center">
            <Image
              src={site.logo || "/icon/logo.svg"}
              alt={site.name || "Logo"}
              width={82}
              height={67}
              className="h-12 w-auto object-contain sm:h-14"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            {(navItems || []).map((item, i) => {
              const key = `${item.href || "nohref"}|${item.label || "nolabel"}|${i}`;
              const label = item.label || "";
              const mega = megaByLabel[label];

              // Mega entries (desktop)
              if (mega) {
                const active =
                  isActiveHref(item.href) || (label === "Programs" ? pathname.startsWith("/programs") : false);

                return (
                  <ProgramsMegaMenu
                    key={key}
                    mega={mega}
                    socials={socials}
                    isLight={isLight}
                    isActive={active}
                    className={navLinkClass({ active })}
                  />
                );
              }

              // Normal link
              const active = isActiveHref(item.href);
              const href = normalizeHref(item.href);

              // If href missing, render as plain text (prevents Next <Link> crash)
              if (!isValidLinkHref(href)) {
                return (
                  <span key={key} className={navLinkClass({ active: false })}>
                    {label}
                  </span>
                );
              }

              return (
                <Link key={key} href={href} className={navLinkClass({ active })}>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger — always high-contrast */}
          <button
            type="button"
            className="relative z-[90] md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#141c2f] text-white shadow-md ring-1 ring-black/10"
            onClick={toggleMenu}
            suppressHydrationWarning
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </Container>

        {/* MOBILE FULL-VIEWPORT DRAWER — starts below sticky header so hamburger stays usable */}
        <div
          aria-hidden={!menuOpen}
          onClick={() => setMenuOpen(false)}
          className={[
            "fixed inset-x-0 bottom-0 top-[64px] z-[85] md:hidden bg-black/40",
            "transition-opacity duration-200",
            menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          ].join(" ")}
        />
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={[
            "fixed inset-x-0 bottom-0 top-[64px] z-[86] bg-[#141c2f] md:hidden",
            "transition-transform duration-[220ms] ease-out",
            menuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none",
          ].join(" ")}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full w-full flex-col">
            <div className="m-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-[#273C75] text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 pb-10">
                <MobileNav
                  nav={navItems || []}
                  megaByLabel={megaByLabel}
                  pathname={pathname}
                  isActiveHref={isActiveHref}
                  openKey={mobileOpenKey}
                  setOpenKey={setMobileOpenKey}
                  socials={socials}
                  onNavigate={() => setMenuOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

/* ---------- Mobile menu icons ---------- */

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- PROGRAMS MEGA MENU (DESKTOP ONLY) ---------- */

function ProgramsMegaMenu({ mega, socials, isLight, isActive = false, className = "" }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const items = mega.items || [];
  const viewAll = mega.viewAll;
  const ctaCard = mega.ctaCard;

  const showActive = open || isActive;

  const openActiveCls = showActive
    ? isLight
      ? "text-indigo-100 border-b border-white/70"
      : "text-[#0F52BA] border-b border-[#0F52BA]"
    : "";

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="flex h-full items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        suppressHydrationWarning
        className={`flex items-center gap-1 text-sm font-medium transition ${className} ${openActiveCls}`}
      >
        {mega.label || "Menu"}
        <span className="text-lg">{"\u25BE"}</span>
      </button>

      {/* Mega-menu panel — pure CSS fade+slide (no framer-motion) */}
      <div
        role="region"
        aria-label={`${mega.label || "Menu"} submenu`}
        className={[
          "absolute left-1/2 top-full z-[60] mt-0 w-[min(1152px,calc(100vw-2rem))] -translate-x-1/2 before:content-[''] before:absolute before:bottom-full before:left-0 before:right-0 before:h-12 before:bg-transparent",
          "rounded-2xl border border-slate-100 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]",
          "transition-all duration-[180ms] ease-out origin-top",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-2 pointer-events-none invisible",
        ].join(" ")}
      >
        <div className="grid grid-cols-[4fr_2fr] gap-0">
          {/* LEFT */}
          <div>
            <div className="mb-2 p-5 pb-0 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                
                {viewAll?.href ? (
                  <Link
                    href={normalizeHref(viewAll.href)}
                    className="text-xs font-medium text-[#0E4AA2] hover:underline"
                  >
                    {viewAll.label || "View All"} <span aria-hidden>{"\u2192"}</span>
                  </Link>
                ) : null}
              </p>
            </div>

            <div className="grid grid-cols-2 border-t border-slate-100">
              {items.map((program, idx) => {
                const isSpanTwo = idx === 4 && items.length === 5;
                return (
                  <Link
                    key={`${program.href || program.title || "item"}|${idx}`}
                    href={normalizeHref(program.href)}
                    prefetch={false}
                    className={`flex items-center gap-3.5 p-4 sm:p-5 hover:bg-slate-50 transition-colors ${
                      isSpanTwo
                        ? "col-span-2 border-t border-slate-100 bg-amber-50/30 hover:bg-amber-50/60"
                        : idx % 2 === 0
                        ? "border-r border-b border-slate-100"
                        : "border-b border-slate-100"
                    }`}
                  >
                    <div className="relative h-14 w-18 sm:h-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200 aspect-[80/64]">
                      {program?.video ? (
                        <video
                          src={program.video}
                          className="absolute inset-0 h-full w-full object-cover"
                          muted
                          loop
                          playsInline
                          autoPlay
                          preload="metadata"
                          aria-hidden="true"
                        />
                      ) : program?.image ? (
                        <Image
                          src={program.image}
                          alt={program.title || ""}
                          width={80}
                          height={64}
                          style={{ width: "100%", height: "auto", aspectRatio: "80 / 64" }}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                          img
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        <span>{program?.title}</span>
                      </div>
                      <p className="line-clamp-2 text-xs text-slate-600">{program?.description}</p>
                    </div>

                    {isSpanTwo && (
                      <div className="hidden sm:inline-flex items-center gap-1 shrink-0 px-3 py-1.5 rounded-full bg-white border border-amber-200/80 text-xs font-bold text-[#2C2F8F] shadow-sm">
                        <span>Explore</span>
                        <span aria-hidden>→</span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-between gap-4 p-5 sm:p-6 border-l border-slate-100">
            {ctaCard ? (
              <div className="flex flex-col justify-between space-y-2 bg-[#F3E3CF] rounded-2xl p-5 w-full">
                <div>
                  <p className="text-[1.2rem] mb-4 font-semibold text-slate-900">
                    {ctaCard.title}
                  </p>
                  <p className="text-[0.75rem] text-slate-600">{ctaCard.text}</p>
                </div>

                {ctaCard?.button?.href ? (
                  <Link
                    href={normalizeHref(ctaCard?.button?.href)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#0F52BA] px-4 py-3 text-xs font-medium text-white hover:bg-[#0D47A1]"
                  >
                    {ctaCard?.button?.label}
                  </Link>
                ) : null}
              </div>
            ) : null}

            <div className="mt-2 flex flex-col gap-2">
              {(socials || []).map((s, idx) => {
                const href = normalizeHref(s.href);
                if (!isValidLinkHref(href)) return null;

                return (
                  <Link
                    key={`${s.label || "social"}|${idx}`}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#000000]/5 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                    aria-label={s.label}
                  >
                    <Image
                      src={s.icon}
                      alt={(s.label || "").slice(0, 2)}
                      width={34}
                      height={34}
                      style={{ aspectRatio: "1 / 1" }}
                      className="object-contain"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- MOBILE NAV (MEGA + NORMAL, SAFE HREF) ---------- */

function MobileNav({
  nav,
  megaByLabel,
  pathname,
  isActiveHref,
  openKey,
  setOpenKey,
  socials,
  onNavigate,
}) {
  return (
    <div className="space-y-2 h-full overflow-y-auto overscroll-contain">
      {(nav || []).map((item, idx) => {
        const label = item?.label || "";
        const mega = megaByLabel?.[label];
        const key = `${label}|${idx}`;
        const href = normalizeHref(item?.href);

        // Mega groups (accordion)
        if (mega) {
          const isOpen = openKey === key;

          return (
            <div key={key} className="rounded-xl bg-white/5">
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? "" : key)}
                className="flex w-full items-center justify-between px-4 py-4 text-left"
              >
                <span className="text-sm font-semibold">{label}</span>
                <span className="text-lg">{isOpen ? "-" : "+"}</span>
              </button>

              {/* Mobile accordion — CSS grid-rows transition (no framer-motion) */}
              <div
                className={[
                  "grid transition-[grid-template-rows] duration-[180ms] ease-out border-t border-white/10",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <div className="px-4 py-3 space-y-3">
                    {/* View all */}
                    {mega?.viewAll?.href ? (
                      <Link
                        href={normalizeHref(mega?.viewAll?.href)}
                        onClick={onNavigate}
                        className="block rounded-lg bg-white/10 px-4 py-3 text-sm font-medium hover:bg-white/15"
                      >
                        {mega.viewAll.label || "View All"} <span aria-hidden>{"\u2192"}</span>
                      </Link>
                    ) : null}

                    {/* Mega items */}
                    <div className="space-y-2">
                      {(mega.items || []).map((m, i) => {
                        const mhref = normalizeHref(m?.href);
                        if (!isValidLinkHref(mhref)) return null;

                        return (
                          <Link
                            key={`${mhref}|${i}`}
                            href={mhref}
                            prefetch={false}
                            onClick={onNavigate}
                            className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3 hover:bg-white/10"
                          >
                            <div className="relative h-12 w-14 overflow-hidden rounded-lg bg-white/10 aspect-[56/48]">
                              {m?.video ? (
                                <video
                                  src={m.video}
                                  className="absolute inset-0 h-full w-full object-cover"
                                  muted
                                  loop
                                  playsInline
                                  autoPlay
                                  preload="metadata"
                                  aria-hidden="true"
                                />
                              ) : m?.image ? (
                                <Image
                                  src={m?.image}
                                  alt={m?.title || ""}
                                  width={56}
                                  height={48}
                                  style={{ width: "100%", height: "auto", aspectRatio: "56 / 48" }}
                                  className="h-full w-full object-cover"
                                />
                              ) : null}
                            </div>
                            <div>
                              <div className="text-sm font-semibold">{m?.title}</div>
                              {m?.description ? (
                                <div className="text-xs text-white/65 line-clamp-2">{m?.description}</div>
                              ) : null}
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* CTA */}
                    {mega?.ctaCard?.button?.href ? (
                      <Link
                        href={normalizeHref(mega?.ctaCard?.button?.href)}
                        onClick={onNavigate}
                        className="mt-2 block rounded-xl bg-[#0F52BA] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#0D47A1]"
                      >
                        {mega?.ctaCard?.button?.label}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        // Normal link (safe)
        const active = isActiveHref(href);

        // If href missing, render label as non-click item (prevents Link crash)
        if (!isValidLinkHref(href)) {
          return (
            <div key={key} className="px-4 py-3 text-sm font-semibold text-white/70">
              {label}
            </div>
          );
        }

        return (
          <Link
            key={key}
            href={href}
            onClick={onNavigate}
            className={[
              "block rounded-xl px-4 py-4 text-sm font-semibold",
              active ? "bg-white/10 text-white" : "bg-white/5 hover:bg-white/10",
            ].join(" ")}
          >
            {label}
          </Link>
        );
      })}

      {/* Socials */}
      {(socials || []).length ? (
        <div className="pt-3 sticky bottom-0 bg-[#273C75]">
          <div className="px-2 text-xs font-semibold tracking-[0.18em] uppercase text-white/55">
            Follow
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {(socials || []).map((s, i) => {
              const href = normalizeHref(s.href);
              if (!isValidLinkHref(href)) return null;

              return (
                <a
                  key={`${s.label || "social"}|${i}`}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10"
                  aria-label={s.label}
                >
                  <Image
                    src={s.icon}
                    alt=""
                    width={22}
                    height={22}
                    style={{ aspectRatio: "1 / 1" }}
                    className="object-contain"
                  />
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

