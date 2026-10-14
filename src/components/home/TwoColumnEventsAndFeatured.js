"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";

const SAMPLE_EVENTS = [
  {
    day: 8,
    monthOffset: 0,
    title: "AMI Orientation for Parents",
    time: "10:00 AM – 12:30 PM",
    slug: "ami-orientation-parents",
    category: "Orientation",
    dotColor: "#0F52BA",
  },
  {
    day: 16,
    monthOffset: 0,
    title: "Student CubeSat Mission Payload Testing",
    time: "02:00 PM – 04:00 PM",
    slug: "cubesat-payload-testing",
    category: "Space Lab",
    dotColor: "#E67E22",
  },
  {
    day: 24,
    monthOffset: 0,
    title: "Admissions Open Day & Campus Walkthrough",
    time: "10:30 AM – 01:00 PM",
    slug: "admissions-open-day",
    category: "Admissions",
    dotColor: "#27AE60",
  },
];

const FEATURED_CARDS = [
  {
    tag: "Blog",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    image: "/home-01/kids-being-part-sunday-school.webp",
    headline: "Biomimicry for Children: Inside the Park Where Families Became Researchers",
    date: "7 October 2026",
    href: "/blog/biomimicry-for-children/",
  },
  {
    tag: "In the News",
    tagColor: "bg-sky-50 text-sky-700 border-sky-200",
    image: "/home/homepage-banner-01.webp",
    headline: "Blue Blocks CubeSat Mission Covered by Times of India",
    date: "January 2026",
    href: "/newsroom/",
  },
  {
    tag: "Announcement",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    image: "/annoucement/0441d9cb-0c60-4c02-b4b6-ed0415e77897.webp",
    headline: "AMI Orientation for Parents — October 2025",
    date: "October 2025",
    href: "/announcement-centre/",
  },
];

const RESEARCH_CARDS = [
  {
    title: "Longitudinal Observation of Executive Function in Montessori",
    author: "Pavan Goyal et al.",
    journal: "Journal of Montessori Research · 2025",
    href: "https://research.blueblocks.in/",
  },
  {
    title: "Adolescent Valorization Through Autonomous Aerospace Engineering",
    author: "Munira Hussain et al.",
    journal: "AMI Scientific Papers · 2026",
    href: "https://research.blueblocks.in/",
  },
  {
    title: "Sensorial Foundations of Abstract Mathematical Cognition",
    author: "Blue Blocks Research Team et al.",
    journal: "Cognitive Development Studies · 2024",
    href: "https://research.blueblocks.in/",
  },
];

export default function TwoColumnEventsAndFeatured() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState(null);

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const daysInMonth = useMemo(() => {
    return new Date(year, currentDate.getMonth() + 1, 0).getDate();
  }, [year, currentDate]);

  const firstDayIndex = useMemo(() => {
    // 0 = Sunday, we want Monday as 0
    const day = new Date(year, currentDate.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1;
  }, [year, currentDate]);

  const prevMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));
    setSelectedDayEvents(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));
    setSelectedDayEvents(null);
  };

  const daysArray = useMemo(() => {
    const arr = [];
    for (let i = 0; i < firstDayIndex; i++) {
      arr.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const events = SAMPLE_EVENTS.filter((e) => e.day === d && e.monthOffset === 0);
      arr.push({ day: d, events });
    }
    return arr;
  }, [firstDayIndex, daysInMonth]);

  return (
    <section aria-label="Events, Featured Updates and Research" className="bg-[#FAF9F6] py-14 sm:py-20 border-t border-neutral-200">
      <Container>
        {/* Two-Column Section (Section 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Events Calendar */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
                  Events &amp; Announcements
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevMonth}
                  aria-label="Previous month"
                  className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-600 transition"
                >
                  ‹
                </button>
                <span className="text-xs font-semibold text-neutral-700 min-w-[90px] text-center">
                  {monthName} {year}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  aria-label="Next month"
                  className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-600 transition"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-neutral-400 py-3">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
              {daysArray.map((item, idx) => {
                if (!item) {
                  return <div key={`empty-${idx}`} className="h-9 w-full" />;
                }
                const hasEvents = item.events && item.events.length > 0;
                const isSelected = selectedDayEvents?.day === item.day;

                return (
                  <button
                    key={`day-${item.day}`}
                    type="button"
                    onClick={() => {
                      if (hasEvents) {
                        setSelectedDayEvents(item);
                      } else {
                        setSelectedDayEvents(null);
                      }
                    }}
                    className={`relative h-9 w-full rounded-lg flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? "bg-neutral-900 text-white font-bold"
                        : hasEvents
                        ? "bg-blue-50/70 hover:bg-blue-100/80 text-neutral-900 font-semibold"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    <span>{item.day}</span>
                    {hasEvents && (
                      <span className="flex gap-0.5 mt-0.5">
                        {item.events.map((e, ei) => (
                          <span
                            key={ei}
                            className="h-1 w-1 rounded-full"
                            style={{ backgroundColor: isSelected ? "#fff" : e.dotColor || "#0F52BA" }}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Popup / Detail view for selected date */}
            {selectedDayEvents && (
              <div className="mt-5 p-4 rounded-xl bg-[#F0F5FF] border border-[#0F52BA]/20 animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-[#0F52BA]/15">
                  <span className="text-xs font-bold text-[#0F52BA]">
                    {monthName} {selectedDayEvents.day}, {year} Events
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedDayEvents(null)}
                    className="text-xs font-bold text-neutral-400 hover:text-neutral-700"
                    aria-label="Close events details"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-2.5 space-y-2">
                  {selectedDayEvents.events.map((ev, ei) => (
                    <div key={ei} className="flex flex-col gap-0.5">
                      <Link
                        href={`/announcement-centre/#${ev.slug}`}
                        className="text-xs font-semibold text-neutral-900 hover:text-[#0F52BA] transition flex items-center justify-between group"
                      >
                        <span>{ev.title}</span>
                        <span className="text-[11px] text-[#0F52BA] group-hover:translate-x-0.5 transition-transform">→</span>
                      </Link>
                      <span className="text-[11px] text-neutral-500">{ev.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0F52BA]" />
                Click date dots for details
              </span>
              <Link
                href="/announcement-centre/"
                className="font-semibold text-neutral-800 hover:text-[#0F52BA] transition"
              >
                All Announcements →
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Stacked Rows (Section 4 Featured + Recent Research) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* ROW 1 (Section 4): From the Desk of Blue Blocks */}
            <div>
              <div className="flex items-center justify-between pb-3">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900">
                  From the Desk of Blue Blocks
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {FEATURED_CARDS.map((card, idx) => (
                  <article
                    key={idx}
                    className="group flex flex-col justify-between rounded-xl border border-neutral-200/90 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${card.tagColor}`}>
                          {card.tag}
                        </span>
                        <span className="text-[10px] text-neutral-400">{card.date}</span>
                      </div>
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100 my-2">
                        <Image
                          src={card.image}
                          alt={card.headline}
                          fill
                          sizes="(max-width: 640px) 100vw, 30vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="font-serif text-xs sm:text-[13px] font-semibold text-neutral-900 leading-snug line-clamp-2 mt-1">
                        {card.headline}
                      </h4>
                    </div>
                    <div className="mt-3 pt-2 border-t border-neutral-100">
                      <Link
                        href={card.href}
                        className="text-[11px] font-semibold text-neutral-800 hover:text-[#0F52BA] transition inline-flex items-center gap-1 group/btn"
                      >
                        <span>Read more</span>
                        <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* ROW 2: Recent Research */}
            <div>
              <div className="flex items-center justify-between pb-3">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900">
                  Recent Research
                </h3>
                <Link
                  href="https://research.blueblocks.in/"
                  className="text-xs font-semibold text-neutral-600 hover:text-[#0F52BA] transition"
                >
                  All Publications →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {RESEARCH_CARDS.map((res, idx) => (
                  <article
                    key={idx}
                    className="relative flex flex-col justify-between rounded-xl border border-neutral-200/90 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div>
                      {/* Document icon in corner */}
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          Publication
                        </span>
                        <svg
                          className="w-4 h-4 text-neutral-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>

                      <h4 className="font-serif text-xs sm:text-[13px] font-semibold text-neutral-900 leading-snug line-clamp-2">
                        {res.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 mt-1">{res.author}</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{res.journal}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-neutral-100">
                      <Link
                        href={res.href}
                        className="text-[11px] font-semibold text-neutral-800 hover:text-[#0F52BA] transition inline-flex items-center gap-1 group/btn"
                      >
                        <span>Read</span>
                        <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
