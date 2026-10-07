"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";

const CITIES = [
  { id: "hyderabad", label: "Hyderabad", x: 38.2, y: 66.4, align: "right" },
  { id: "chandigarh", label: "Chandigarh", x: 29.4, y: 23.0, align: "right" },
  { id: "mumbai", label: "Mumbai", x: 18.6, y: 63.5, align: "left" },
  { id: "kolkata", label: "Kolkata", x: 68.0, y: 50.6, align: "right" },
  { id: "bengaluru", label: "Bengaluru", x: 32.0, y: 81.0, align: "left" },
  { id: "chennai", label: "Chennai", x: 40.8, y: 81.3, align: "right" },
  { id: "kodaikanal", label: "Kodaikanal", x: 32.0, y: 91.4, align: "left" },
];

const CENTRES_DATA = {
  hyderabad: {
    city: "Hyderabad",
    name: "The Montessori Training and Research Trust (MTRT)",
    address: "Jeedimetla, Hyderabad, Telangana",
    website: "montessorihyderabad.org",
    websiteUrl: "https://montessorihyderabad.org",
    contact: "info@montessorihyderabad.org",
    courses: [
      "AMI Assistants to Infancy Orientation (0–3)",
      "AMI Primary Diploma (3–6)",
      "AMI Elementary Diploma (6–12) — delivered in partnership with Medha Montessori Institute",
      "AMI Adolescent Orientation (12–18)",
      "AMI Core Principles Certificate",
      "Orientation and Assistants Adjunct courses",
    ],
    mode: "Offline, full-time for all diploma courses",
    schedule:
      "Monday–Friday, approximately late August to April. Current cycle: August 2026 – April 2027.",
    eligibility:
      "Minimum age 20. Bachelor's degree preferred. Working English. Admission by application and interview.",
  },
  bengaluru: {
    city: "Bengaluru",
    name: "Montessori Institute of Bangalore (MIB)",
    address: "Bengaluru, Karnataka",
    website: "montessoribangalore.org",
    websiteUrl: "https://montessoribangalore.org",
    contact: "course@montessoribangalore.org",
    courses: [
      "AMI Assistants to Infancy Diploma (0–3)",
      "AMI Primary Diploma (3–6)",
      "AMI Elementary Diploma (6–12)",
      "Administrator's Course",
      "Orientation and Adjunct courses",
    ],
    mode: "Blended — delivered across scheduled contact modules through the year",
    schedule:
      "Nine to twenty-two months depending on diploma level. Current Pre-Primary Diploma: May 2026 – February 2027. Current 0–3 Diploma: March 2025 – March 2026. Current Elementary Diploma: February 2026 – December 2027.",
    eligibility:
      "Minimum age 20. Bachelor's or postgraduate degree. Interview and reference letters required.",
  },
  chennai: {
    city: "Chennai",
    name: "Supraja Montessori Study Centre (formerly Navadisha Montessori Foundation)",
    displayName: "Supraja Montessori Study Centre",
    subtitle: "(formerly Navadisha Montessori Foundation)",
    address: "321, Nehru Nagar, 3rd Main Road, Kottivakkam, Chennai 600096",
    website: "suprajamontessori.org",
    websiteUrl: "https://suprajamontessori.org",
    contact: "admin@suprajamontessori.org",
    timing: "8:45 AM – 3:15 PM",
    courses: [
      "AMI Assistants to Infancy Diploma (0–3)",
      "AMI Primary Diploma (3–6)",
      "AMI Elementary Diploma (6–12)",
      "AMI Adolescent Diploma (12–18)",
      "Orientation certificates at each level",
      "Refresher courses for existing AMI diploma holders",
    ],
    mode: "Offline, full-time for diploma courses",
    schedule:
      "Annual intake, approximately nine to twelve months per diploma. Confirm current intake dates directly.",
    eligibility:
      "Minimum age 20. Bachelor's degree. Strong spoken and written English. Online application with interview.",
  },
  kodaikanal: {
    city: "Kodaikanal",
    name: "Kodaikanal AMI Centre for Montessori Studies",
    address: "Kodaikanal, Tamil Nadu",
    website: "Confirm via montessori-ami.org/training-programmes/centres/kodaikanal-ami-centre-montessori-studies",
    websiteUrl:
      "https://montessori-ami.org/training-programmes/centres/kodaikanal-ami-centre-montessori-studies",
    isHold: true,
    holdNotice:
      "Contact details being confirmed. Visit montessori-ami.org for current information.",
    coursesNote:
      "Confirm current course offerings directly with the centre — the centre is listed on the AMI global directory. Contact details and current intake to be confirmed before this page goes live.",
  },
  mumbai: {
    city: "Mumbai",
    name: "R.T.I. Montessori Training — Sir Ratan Tata Institute",
    address: "Sir Ratan Tata Institute (Annexe), 30 N.S. Patkar Marg, Mumbai",
    website: "montessori-mumbai.org",
    websiteUrl: "https://montessori-mumbai.org",
    contact: "enquiries@montessori-mumbai.org",
    courses: ["AMI Primary Diploma (3–6)"],
    mode: "Offline, full-time",
    schedule:
      "Annual cycle, approximately nine to twelve months. AMI-affiliated since 1995. India's first AMI-affiliated training centre.",
    eligibility:
      "Standard AMI eligibility. Bachelor's degree preferred. Interview-based admission.",
  },
  chandigarh: {
    city: "Chandigarh",
    name: "Vivek High Montessori Institute (VHMI)",
    address: "Chandigarh",
    website: "vivekhighschool.edu.in",
    websiteUrl: "https://vivekhighschool.edu.in",
    contact: "vhmi@vivekhighschool.edu.in",
    courses: [
      "AMI Primary Diploma (3–6)",
      "AMI Elementary Diploma (6–12)",
    ],
    mode: "Offline, full-time",
    schedule:
      "Annual intake approximately May–January for current cycles. Confirm current-year dates directly.",
    notes:
      "North India's first AMI-affiliated training centre. Vivek High's connection to Montessori education spans over 55 years.",
    eligibility:
      "Standard AMI eligibility. Graduate qualification expected. Interview-based admission.",
  },
  kolkata: {
    city: "Kolkata",
    name: "JFA Montessori Teacher Training Centre (JFA MTTC)",
    address: "Kolkata, West Bengal",
    website: "jainfuturisticacademy.com/mttc",
    websiteUrl: "https://jainfuturisticacademy.com/mttc",
    contact: "mttc.admissions@jfaedu.com",
    courses: [
      "AMI Primary Diploma (3–6)",
      "AMI Elementary Diploma (6–12)",
      "Workshops and seminars for educators and parents",
    ],
    mode: "Offline, full-time",
    schedule: "Annual intake. Confirm exact dates directly.",
    notes:
      "Kolkata's first and only AMI-affiliated training centre. The only AMI centre in North-East India.",
    eligibility: "Standard AMI eligibility. Interview required.",
  },
};

export default function AmiTrainingCentres() {
  const [activeTab, setActiveTab] = useState("hyderabad");
  const [openAccordions, setOpenAccordions] = useState({
    hyderabad: true,
    bengaluru: true,
    chennai: true,
    kodaikanal: true,
    mumbai: true,
    chandigarh: true,
    kolkata: true,
  });

  const tabContainerRef = useRef(null);

  const toggleAccordion = (cityId) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [cityId]: !prev[cityId],
    }));
  };

  const handleSelectCity = (cityId) => {
    setActiveTab(cityId);
    if (!openAccordions[cityId]) {
      setOpenAccordions((prev) => ({ ...prev, [cityId]: true }));
    }
  };

  const currentCentre = CENTRES_DATA[activeTab];
  const isCurrentOpen = !!openAccordions[activeTab];

  return (
    <section id="centres" className="py-14 sm:py-18 bg-slate-50 scroll-mt-36 sm:scroll-mt-44 border-b border-slate-200">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AMI-Affiliated Training Centres in India
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            All seven centres below are listed on the official AMI global training centre directory at montessori-ami.org. This is the complete confirmed list as of September 2026.
          </p>
          <p className="mt-2 text-base text-slate-600 italic">
            Schedules and intake dates change annually. Always confirm directly with the centre before applying.
          </p>

          {/* Map (above the tab bar) — Detailed Authentic Map of India */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-gradient-to-b from-sky-50/70 via-slate-50/40 to-white relative">
            <div className="w-full relative flex items-center justify-center overflow-hidden py-4 px-3 sm:px-6">
              {/* Map container matching SVG aspect ratio 612 / 696 */}
              <div className="relative w-full max-w-[260px] sm:max-w-[300px] aspect-[612/696] flex items-center justify-center mx-auto my-1">
                {/* Official Authentic Map of India */}
                <Image
                  src="/images/india-map.svg"
                  alt="Map of India showing AMI Training Centres"
                  width={612}
                  height={696}
                  priority
                  className="w-full h-full object-contain select-none pointer-events-none drop-shadow-md"
                />

                {/* Interactive HTML City Pins overlaid on exact coordinates */}
                {CITIES.map((c) => {
                  const isSelected = activeTab === c.id;
                  const isLeft = c.align === "left";

                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleSelectCity(c.id)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none cursor-pointer select-none"
                      style={{ left: `${c.x}%`, top: `${c.y}%` }}
                      aria-label={`Select ${c.label} training centre`}
                    >
                      {/* Generous touch / hit target wrapper */}
                      <span className="relative flex items-center justify-center w-8 h-8">
                        {/* Animated pulsing glow when active */}
                        {isSelected && (
                          <span className="absolute w-8 h-8 rounded-full bg-[#2C2F8F]/25 animate-ping pointer-events-none" />
                        )}

                        {/* Pin Dot */}
                        <span
                          className={`relative rounded-full transition-transform duration-150 group-hover:scale-125 shadow-md flex items-center justify-center ${
                            isSelected
                              ? "w-4 h-4 bg-[#2C2F8F] ring-2 ring-white ring-offset-1 ring-offset-[#2C2F8F]"
                              : "w-3.5 h-3.5 bg-red-500 ring-2 ring-white hover:bg-red-600"
                          }`}
                        >
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </span>

                        {/* City Label Badge — Directionally positioned to eliminate overlap */}
                        <span
                          className={`absolute top-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-150 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-sm pointer-events-auto ${
                            isLeft
                              ? "right-full mr-2 sm:mr-2.5"
                              : "left-full ml-2 sm:ml-2.5"
                          } ${
                            isSelected
                              ? "bg-[#2C2F8F] text-white shadow-md shadow-[#2C2F8F]/30 ring-2 ring-white font-bold scale-105"
                              : "bg-white/95 text-slate-800 border border-slate-200/90 group-hover:bg-white group-hover:text-slate-900 group-hover:shadow"
                          }`}
                        >
                          {c.label}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between pointer-events-none text-[11px] sm:text-xs text-slate-500 font-medium">
                <span>Interactive Map: Click a city pin to view training centre details</span>
                <span className="hidden sm:inline">7 AMI Centres Across India</span>
              </div>
            </div>
          </div>

          {/* Tab bar with horizontal scroll on mobile with right-fade gradient */}
          <div id="training-centres-tabs" className="mt-10 relative scroll-mt-36 sm:scroll-mt-44">
            <div
              ref={tabContainerRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pr-6"
            >
              {CITIES.map((city) => {
                const isActive = activeTab === city.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => handleSelectCity(city.id)}
                    type="button"
                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#2C2F8F] text-white shadow-sm shadow-[#2C2F8F]/30"
                        : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {city.label}
                  </button>
                );
              })}
            </div>
            {/* Right fade gradient for horizontal scroll indication */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-slate-50 to-transparent sm:hidden" />
          </div>

          {/* Accordion container for the active centre */}
          <div className="mt-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200">
            {/* Clickable Header Row: min 48px tap height */}
            <button
              type="button"
              onClick={() => toggleAccordion(activeTab)}
              className="w-full min-h-[52px] px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors focus:outline-none"
              aria-expanded={isCurrentOpen}
            >
              <div className="flex items-center gap-3">
                <span className="text-[#2C2F8F] font-bold text-sm select-none">
                  {isCurrentOpen ? "▼" : "▶"}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {currentCentre.city}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                    {currentCentre.displayName || currentCentre.name}
                    {currentCentre.subtitle ? ` ${currentCentre.subtitle}` : ""}
                  </p>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider hidden sm:inline">
                {isCurrentOpen ? "Collapse" : "Expand"}
              </span>
            </button>

            {/* Accordion content */}
            {isCurrentOpen && (
              <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                {currentCentre.isHold ? (
                  /* Kodaikanal Hold Notice per PDF instructions with Website as a Button */
                  <div className="space-y-5 pt-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 pb-3 border-b border-slate-100">
                      <span className="text-sm font-bold text-slate-900 min-w-[90px]">
                        Address:
                      </span>
                      <span className="text-sm sm:text-base text-slate-700">
                        {currentCentre.address}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pb-3 border-b border-slate-100">
                      <span className="text-sm font-bold text-slate-900 min-w-[90px]">
                        Website:
                      </span>
                      <div className="space-y-1.5">
                        <a
                          href={currentCentre.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#2C2F8F] text-white font-semibold text-xs sm:text-sm hover:bg-[#1e2060] transition-all shadow-sm hover:shadow active:scale-95 group w-fit"
                        >
                          <span>Confirm via AMI Global Directory</span>
                          <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden>
                            →
                          </span>
                        </a>
                        <p className="text-xs text-slate-500 font-mono break-all">
                          {currentCentre.website}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-sm leading-relaxed space-y-2">
                      <p className="font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        {currentCentre.holdNotice}
                      </p>
                      <p className="text-xs sm:text-sm text-amber-900/90">
                        {currentCentre.coursesNote}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Mobile View (< sm): Clean stacked spec cards without horizontal table scrolling */}
                    <div className="sm:hidden space-y-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Address
                        </span>
                        <p className="text-sm font-medium text-slate-800">{currentCentre.address}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Website
                        </span>
                        <a
                          href={currentCentre.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-[#2C2F8F] hover:underline break-all"
                        >
                          {currentCentre.website} →
                        </a>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Contact
                        </span>
                        <a
                          href={`mailto:${currentCentre.contact}`}
                          className="text-sm font-bold text-[#2C2F8F] hover:underline break-all"
                        >
                          {currentCentre.contact}
                        </a>
                      </div>

                      {currentCentre.timing && (
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                            Timing
                          </span>
                          <p className="text-sm text-slate-800">{currentCentre.timing}</p>
                        </div>
                      )}

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Courses offered
                        </span>
                        <ul className="space-y-1.5 list-disc list-inside text-sm text-slate-800 mt-1">
                          {currentCentre.courses.map((c, i) => (
                            <li key={i} className="leading-snug">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Mode
                        </span>
                        <p className="text-sm text-slate-800">{currentCentre.mode}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Schedule
                        </span>
                        <p className="text-sm text-slate-800 leading-relaxed">{currentCentre.schedule}</p>
                      </div>

                      {currentCentre.notes && (
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                            Notes
                          </span>
                          <p className="text-sm text-slate-800 leading-relaxed">{currentCentre.notes}</p>
                        </div>
                      )}

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Eligibility
                        </span>
                        <p className="text-sm text-slate-800 leading-relaxed">{currentCentre.eligibility}</p>
                      </div>
                    </div>

                    {/* Desktop/Tablet View (sm+): Structured Specifications Table */}
                    <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 mt-2">
                      <table className="w-full text-left border-collapse min-w-[500px] text-sm">
                        <tbody className="divide-y divide-slate-200">
                          <tr className="bg-white">
                            <td className="py-3.5 px-5 font-semibold text-slate-900 w-1/3 align-top">
                              Address
                            </td>
                            <td className="py-3.5 px-5 text-slate-700 align-top">
                              {currentCentre.address}
                            </td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="py-3.5 px-5 font-semibold text-slate-900 align-top">
                              Website
                            </td>
                            <td className="py-3.5 px-5 text-slate-700 align-top">
                              <a
                                href={currentCentre.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2C2F8F] hover:underline font-medium"
                              >
                                {currentCentre.website}
                              </a>
                            </td>
                          </tr>
                          <tr className="bg-white">
                            <td className="py-3.5 px-5 font-semibold text-slate-900 align-top">
                              Contact
                            </td>
                            <td className="py-3.5 px-5 text-slate-700 align-top">
                              <a
                                href={`mailto:${currentCentre.contact}`}
                                className="text-[#2C2F8F] hover:underline font-medium"
                              >
                                {currentCentre.contact}
                              </a>
                            </td>
                          </tr>
                          {currentCentre.timing && (
                            <tr className="bg-slate-50/50">
                              <td className="py-3.5 px-5 font-semibold text-slate-900 align-top">
                                Timing
                              </td>
                              <td className="py-3.5 px-5 text-slate-700 align-top">
                                {currentCentre.timing}
                              </td>
                            </tr>
                          )}
                          <tr className="bg-white">
                            <td className="py-3.5 px-5 font-semibold text-slate-900 align-top">
                              Courses offered
                            </td>
                            <td className="py-3.5 px-5 text-slate-700 align-top">
                              <ul className="space-y-1.5 list-disc list-inside">
                                {currentCentre.courses.map((c, i) => (
                                  <li key={i} className="leading-snug">
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="py-3.5 px-5 font-semibold text-slate-900 align-top">
                              Mode
                            </td>
                            <td className="py-3.5 px-5 text-slate-700 align-top">
                              {currentCentre.mode}
                            </td>
                          </tr>
                          <tr className="bg-white">
                            <td className="py-3.5 px-5 font-semibold text-slate-900 align-top">
                              Schedule
                            </td>
                            <td className="py-3.5 px-5 text-slate-700 align-top leading-relaxed">
                              {currentCentre.schedule}
                            </td>
                          </tr>
                          {currentCentre.notes && (
                            <tr className="bg-slate-50/50">
                              <td className="py-3.5 px-5 font-semibold text-slate-900 align-top">
                                Notes
                              </td>
                              <td className="py-3.5 px-5 text-slate-700 align-top leading-relaxed">
                                {currentCentre.notes}
                              </td>
                            </tr>
                          )}
                          <tr className="bg-white">
                            <td className="py-3.5 px-5 font-semibold text-slate-900 align-top">
                              Eligibility
                            </td>
                            <td className="py-3.5 px-5 text-slate-700 align-top leading-relaxed">
                              {currentCentre.eligibility}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Source attribution line */}
          <p className="mt-8 text-xs sm:text-sm text-slate-500 text-center">
            Source: AMI Global Training Centre Directory —{" "}
            <a
              href="https://montessori-ami.org/training-programmes/training-centres"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2C2F8F] hover:underline font-medium"
            >
              montessori-ami.org/training-programmes/training-centres
            </a>
            . Last verified: September 2026.
          </p>
        </div>
      </Container>
    </section>
  );
}
