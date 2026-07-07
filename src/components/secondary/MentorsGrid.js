"use client";

import { useState, useMemo } from "react";

const mentorsData = [
  {
    name: "Kriti Khare",
    quals: "B.Sc. Maths; MCA",
    subject: "Maths",
    category: "STEM & Tech",
    gradient: "from-violet-500 to-indigo-600",
    textColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    name: "Dr. Shobha Ediga",
    quals: "Ph.D. Plant Biotech, UoH; AMI Elem. Asst.",
    subject: "Biology",
    category: "STEM & Tech",
    gradient: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    name: "Kiranmayi R S S",
    quals: "M.Sc. Chemistry; AMI Elem. Asst.",
    subject: "Chemistry",
    category: "STEM & Tech",
    gradient: "from-teal-400 to-cyan-600",
    textColor: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    name: "Mousam Mondal",
    quals: "M.Sc. Theoretical Physics (Gold Medal); M.Sc. Astrophysics, Hertfordshire",
    subject: "Physics",
    category: "STEM & Tech",
    gradient: "from-blue-500 to-indigo-600",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Ranjan Kumar",
    quals: "B.Tech Aeronautical Engineering",
    subject: "Drones",
    category: "STEM & Tech",
    gradient: "from-orange-500 to-amber-600",
    textColor: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    name: "Poulomi Bose",
    quals: "M.A.; B.Ed.; TESOL; Waldorf; IC CBSE, ICSE, ISC",
    subject: "English",
    category: "Languages",
    gradient: "from-pink-500 to-rose-600",
    textColor: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    name: "Shailaja Chimpanna",
    quals: "B.Sc., B.Ed.; AMI Elem. Asst.",
    subject: "Telugu",
    category: "Languages",
    gradient: "from-amber-400 to-orange-600",
    textColor: "text-amber-700",
    bgColor: "bg-amber-50",
  },
  {
    name: "Praveena Reddy Vanga",
    quals: "B.Sc., M.Sc. Computers; AMI Elem. Asst.",
    subject: "Hindi",
    category: "Languages",
    gradient: "from-amber-500 to-red-600",
    textColor: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    name: "Protiti Mookherjee",
    quals: "M.A. Bharatnatyam; 30+ years performing",
    subject: "Dance",
    category: "Arts & Sports",
    gradient: "from-red-500 to-pink-600",
    textColor: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    name: "Ravinder Kumar Hanshi",
    quals: "7th Dan Karate; International Referee; 44+ years",
    subject: "Karate",
    category: "Arts & Sports",
    gradient: "from-slate-700 to-slate-900",
    textColor: "text-slate-700",
    bgColor: "bg-slate-100",
  },
  {
    name: "Joseph",
    quals: "M.P.Ed.; 4+ years",
    subject: "Sports",
    category: "Arts & Sports",
    gradient: "from-sky-500 to-blue-600",
    textColor: "text-sky-600",
    bgColor: "bg-sky-50",
  }
];

const categories = ["All", "STEM & Tech", "Languages", "Arts & Sports"];

const getInitials = (name) => {
  if (!name) return "";
  const clean = name.replace("Dr. ", "").trim();
  const parts = clean.split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export default function MentorsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMentors = useMemo(() => {
    return mentorsData.filter((mentor) => {
      const matchesCategory =
        selectedCategory === "All" || mentor.category === selectedCategory;
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.quals.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-[1.02]"
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:max-w-xs">
          <svg
            className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search guides or subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-full border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm font-bold"
              type="button"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredMentors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => {
            const initials = getInitials(mentor.name);
            const qualsList = mentor.quals.split(";").map((q) => q.trim());

            return (
              <div
                key={mentor.name}
                className="group relative bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-slate-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header (Avatar + Title & Badge) */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${mentor.gradient} flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}
                    >
                      {initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-slate-950 transition-colors leading-tight">
                        {mentor.name}
                      </h3>
                      <span
                        className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${mentor.textColor} ${mentor.bgColor}`}
                      >
                        {mentor.subject}
                      </span>
                    </div>
                  </div>

                  {/* Academic Background / Qualifications */}
                  <div className="border-t border-slate-50 pt-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                      Academic Background
                    </span>
                    <ul className="space-y-2">
                      {qualsList.map((qual, qIdx) => (
                        <li
                          key={qIdx}
                          className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug"
                        >
                          <svg
                            className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 14l9-5-9-5-9 5 9 5z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                            />
                          </svg>
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <svg
            className="w-12 h-12 text-slate-300 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-slate-600 font-medium">
            No mentors found matching &quot;{searchQuery}&quot;
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Try adjusting your search query or filters.
          </p>
        </div>
      )}
    </div>
  );
}
