"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";

const formatMessageText = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-600 hover:text-amber-700 underline font-semibold transition-colors duration-150 break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function AnnouncementCentreClient({ announcements = [] }) {
  const [selectedBadge, setSelectedBadge] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalImage, setModalImage] = useState(null);

  // Extract unique badges for filtering
  const categories = useMemo(() => {
    const badges = announcements.map((a) => a.badge).filter(Boolean);
    return ["All", ...Array.from(new Set(badges))];
  }, [announcements]);

  // Filter and search announcements
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const matchBadge = selectedBadge === "All" || item.badge === selectedBadge;
      const textToSearch = `${item.title} ${item.subtitle || ""} ${item.messages?.join(" ") || ""}`.toLowerCase();
      const matchSearch = textToSearch.includes(searchQuery.toLowerCase());
      return matchBadge && matchSearch;
    });
  }, [announcements, selectedBadge, searchQuery]);

  // Color mappings for badges
  const getBadgeStyle = (badge) => {
    const normalized = (badge || "").toLowerCase();
    if (normalized.includes("teacher")) {
      return "bg-indigo-50 text-indigo-700 border border-indigo-200";
    }
    if (normalized.includes("caregiver") || normalized.includes("driver")) {
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    }
    if (normalized.includes("special") || normalized.includes("workshop")) {
      return "bg-amber-50 text-amber-700 border border-amber-200";
    }
    if (normalized.includes("annual") || normalized.includes("explore")) {
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    }
    return "bg-blue-50 text-blue-700 border border-blue-200";
  };

  // Helper to extract forms or links for direct button CTAs
  const getCTAButton = (messages = []) => {
    for (const msg of messages) {
      if (msg.includes("https://forms.gle/")) {
        const urlMatch = msg.match(/(https:\/\/forms\.gle\/[^\s]+)/);
        if (urlMatch) return { label: "Register / RSVP Form", url: urlMatch[0] };
      }
      if (msg.includes("zoom.us")) {
        const urlMatch = msg.match(/(https?:\/\/[^\s]+zoom[^\s]+)/);
        if (urlMatch) return { label: "Join Zoom Meeting", url: urlMatch[0] };
      }
    }
    return null;
  };

  return (
    <section className="bg-slate-50/50 py-16 sm:py-20 min-h-screen">
      <Container>
        {/* Search & Filter Bar */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedBadge(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 cursor-pointer ${
                    selectedBadge === cat
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm scale-105"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search announcements..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Announcements Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredAnnouncements.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
              <svg
                className="mx-auto h-12 w-12 text-slate-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-slate-900">No announcements found</h3>
              <p className="mt-1 text-sm text-slate-500">
                Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredAnnouncements.map((item, idx) => {
                const cta = getCTAButton(item.messages);
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                  >
                    {/* Visual poster/image if present */}
                    {item.image && (
                      <div
                        className="relative h-60 w-full overflow-hidden bg-slate-100 cursor-zoom-in"
                        onClick={() => setModalImage(item.image)}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-800 px-3 py-1.5 rounded-full shadow-md">
                            🔍 Click to Enlarge
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-8 sm:p-10 flex-grow flex flex-col">
                      {/* Top Meta info */}
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getBadgeStyle(item.badge)}`}>
                          {item.badge}
                        </span>
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {item.date}
                        </span>
                      </div>

                      {/* Header */}
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-amber-600 transition-colors duration-200">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className={`text-sm font-semibold text-slate-500 uppercase tracking-wider ${item.invitation ? "mb-2" : "mb-6"}`}>
                          {item.subtitle}
                        </p>
                      )}
                      {item.invitation && (
                        <p className="text-xs font-medium text-slate-500 mb-6">
                          {item.invitation}
                        </p>
                      )}

                      {/* Details Pills */}
                      {item.details && item.details.length > 0 && (
                        <div className="flex flex-wrap gap-2.5 mb-6">
                          {item.details.map((d, index) => (
                            <div
                              key={index}
                              className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium"
                            >
                              <span aria-hidden="true" className="text-sm">{d.icon}</span>
                              <span className="text-slate-400 mr-0.5">{d.label}:</span>
                              <span>{d.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Description / Bullet Messages */}
                      <div className="space-y-3.5 text-sm text-slate-600 leading-relaxed mb-8 flex-grow">
                        {item.messages &&
                          item.messages.map((msg, index) => (
                            <div key={index} className="flex gap-2">
                              <span className="text-amber-500 font-semibold">•</span>
                              <p className="flex-1">{formatMessageText(msg)}</p>
                            </div>
                          ))}
                      </div>

                      {/* CTA Button */}
                      {cta && (
                        <div className="mt-auto pt-2">
                          <a
                            href={cta.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-98 font-bold text-sm text-white transition-all duration-200 shadow-md shadow-amber-500/10 cursor-pointer"
                          >
                            {cta.label}
                            <svg
                              className="ml-2 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                              />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>

      {/* Enlarged Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg z-50 border border-white/20"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-full max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
              <Image
                src={modalImage}
                alt="Enlarged Announcement Poster"
                fill
                className="object-contain"
                sizes="(max-w-4xl) 100vw, 80vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
