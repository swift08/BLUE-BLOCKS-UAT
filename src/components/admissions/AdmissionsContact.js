"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";

/* ------------------------- Helpers ------------------------- */
function isEmail(v = "") {
  const s = String(v || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function getHutkCookie() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

async function submitToHubSpot({ portalId, formId, fields, context }) {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  const payload = {
    fields: fields.map((f) => ({ name: f.name, value: f.value })),
    context: {
      hutk: getHutkCookie() || undefined,
      pageUri:
        context?.pageUri ||
        (typeof window !== "undefined" ? window.location.href : ""),
      pageName: context?.pageName || undefined,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let msg = "Unable to submit. Please try again.";
    try {
      const j = await res.json();
      msg = j?.message || msg;
    } catch (e) {}
    throw new Error(msg);
  }

  return true;
}

const AGE_SUGGESTIONS = [
  "Toddler (15m – 3 yrs)",
  "Pre-Primary (3 – 6 yrs)",
  "Primary (6 – 12 yrs)",
  "Secondary (Class 7 – 10)",
];

export default function AdmissionsContact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    age_of_the_child: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [submitting, setSubmitting] = useState(false);
  const [copiedKey, setCopiedKey] = useState("");

  const hubspot = {
    portalId: "245638953",
    formId: "a17fd9db-ad78-4dbf-8215-a9e29e801bea",
    pageName: "Admissions Page",
    pageUri: "/admissions/",
  };

  const errors = useMemo(() => {
    const errs = {};
    if (!values.name.trim()) errs.name = "Please provide your name";
    if (!values.email.trim()) {
      errs.email = "Please provide your email address";
    } else if (!isEmail(values.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!values.phone.trim()) {
      errs.phone = "Please provide your contact number";
    }
    if (!values.message.trim()) {
      errs.message = "Please share a brief note about your child";
    }
    return errs;
  }, [values]);

  const handleChange = (field, val) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (status.type === "error") setStatus({ type: "", msg: "" });
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleCopy = (text, key) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(""), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      age_of_the_child: true,
      message: true,
    });

    if (Object.keys(errors).length > 0) {
      setStatus({ type: "error", msg: "Please fill in the required fields highlighted below." });
      return;
    }

    try {
      setSubmitting(true);
      setStatus({ type: "", msg: "" });

      const payloadFields = [
        { name: "name", value: values.name },
        { name: "email", value: values.email },
        { name: "phone", value: values.phone },
        { name: "age_of_the_child", value: values.age_of_the_child },
        { name: "message", value: values.message },
      ];

      await submitToHubSpot({
        portalId: hubspot.portalId,
        formId: hubspot.formId,
        fields: payloadFields,
        context: {
          pageUri: hubspot.pageUri,
          pageName: hubspot.pageName,
        },
      });

      if (typeof window !== "undefined" && typeof window.oaiq === "function") {
        window.oaiq("measure", "lead_created", { type: "customer_action" });
      }

      setStatus({
        type: "success",
        msg: "Thank you! Our admissions team has received your details and will connect with you within 24 hours.",
      });
      setValues({
        name: "",
        email: "",
        phone: "",
        age_of_the_child: "",
        message: "",
      });
      setTouched({});
    } catch (err) {
      setStatus({
        type: "error",
        msg: err?.message || "Unable to send your inquiry. Please reach us directly by phone or WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-32 relative py-20 lg:py-28 overflow-hidden bg-[#FAF7F2]"
      style={{
        backgroundImage:
          "radial-gradient(at 0% 0%, rgba(243, 227, 207, 0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(44, 47, 143, 0.05) 0px, transparent 50%)",
      }}
    >
      {/* Subtle architectural ambient geometry */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#E7E8FF]/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#F3E3CF]/40 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-sm"
            style={{
              backgroundColor: "rgba(44,47,143,0.08)",
              color: "#2C2F8F",
              border: "1px solid rgba(44,47,143,0.18)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#B74F2A] animate-pulse" />
            BEGIN YOUR ADMISSIONS JOURNEY
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Ready to Start the Conversation?
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Our admissions process is high-touch, limited, and filled on a first-aligned, first-served basis. Fill out the form below to begin.
          </p>
        </div>

        {/* Master Showcase Card: Split 2-Column Luxury Composition */}
        <div className="rounded-[2.5rem] bg-white border border-slate-200/80 shadow-[0_24px_70px_rgba(15,23,42,0.08)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* ═══════════════ LEFT PANEL: Atmospheric Visual & Direct Lines (5 cols) ═══════════════ */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#111A30] to-[#0A1020] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
              {/* Subtle background stars/mesh */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative z-10">
                {/* Visual Image Card with frosted pill */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-8 shadow-2xl border border-white/10 group">
                  <Image
                    src="/images/admissions-lounge.webp"
                    alt="Blue Blocks Admissions Lounge"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  
                  {/* Floating Pill on image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/95">
                    <span className="font-semibold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                      Admissions Atelier & Campus
                    </span>
                    <span className="text-[11px] font-bold text-[#F3E3CF] bg-[#2C2F8F]/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      15m – 18 yrs
                    </span>
                  </div>
                </div>

                {/* Subheading / Context */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                  Direct Contact & Consultations
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-8">
                  Prefer direct communication before submitting an application? Reach our admissions officers anytime.
                </p>

                {/* 3 Interactive Direct Contact Cards */}
                <div className="space-y-3.5">
                  {/* EMAIL */}
                  <a
                    href="mailto:info@blueblocks.in"
                    className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#2C2F8F]/80 flex items-center justify-center text-[#F3E3CF] shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          EMAIL US
                        </span>
                        <span className="text-sm font-semibold text-white group-hover:text-[#F3E3CF] transition-colors">
                          info@blueblocks.in
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopy("info@blueblocks.in", "email");
                      }}
                      className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
                      title="Copy email"
                    >
                      {copiedKey === "email" ? "Copied!" : "Copy"}
                    </button>
                  </a>

                  {/* PHONE */}
                  <a
                    href="tel:+919000955050"
                    className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#B74F2A]/80 flex items-center justify-center text-white shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          DIRECT PHONE
                        </span>
                        <span className="text-sm font-semibold text-white group-hover:text-[#F3E3CF] transition-colors">
                          +91 9000955050
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-white px-2 py-1 transition-colors">
                      Call ↗
                    </span>
                  </a>

                  {/* WHATSAPP */}
                  <a
                    href="https://wa.me/919000955053"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600/90 flex items-center justify-center text-white shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          WHATSAPP
                        </span>
                        <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                          +91 9000955053
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold px-2 py-1">
                      Chat ↗
                    </span>
                  </a>
                </div>
              </div>

              {/* Bottom Assurance Note */}
              <div className="mt-10 pt-6 border-t border-white/10 text-xs text-slate-400 leading-relaxed flex items-start gap-2.5">
                <svg className="w-4 h-4 text-[#F3E3CF] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>
                  All inquiries are reviewed personally by our admissions directors. We ensure transparent parent-school alignment from day one.
                </span>
              </div>
            </div>

            {/* ═══════════════ RIGHT PANEL: Concierge Inquiry Form (7 cols) ═══════════════ */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 bg-white flex flex-col justify-center">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full bg-[#2C2F8F]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2C2F8F]">
                    ONLINE ADMISSION ENQUIRY
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Get in touch
                </h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                  Share your family&apos;s details to begin the admissions journey and book your parent orientation workshop.
                </p>
              </div>

              {/* Status Notifications */}
              {status.msg && (
                <div
                  className={`p-4 rounded-2xl mb-6 text-sm flex items-start gap-3 ${
                    status.type === "success"
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                      : "bg-rose-50 border border-rose-200 text-rose-800"
                  }`}
                >
                  <span className="text-lg">
                    {status.type === "success" ? "✓" : "⚠️"}
                  </span>
                  <div className="flex-1 font-medium">{status.msg}</div>
                </div>
              )}

              {/* The Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* NAME */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      placeholder="e.g. Ananya Rao"
                      className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                        touched.name && errors.name
                          ? "border-rose-400 ring-2 ring-rose-100"
                          : "border-slate-200 focus:border-[#2C2F8F] focus:ring-2 focus:ring-[#2C2F8F]/10"
                      }`}
                    />
                    {touched.name && errors.name && (
                      <p className="text-xs text-rose-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      placeholder="ananya@example.com"
                      className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                        touched.email && errors.email
                          ? "border-rose-400 ring-2 ring-rose-100"
                          : "border-slate-200 focus:border-[#2C2F8F] focus:ring-2 focus:ring-[#2C2F8F]/10"
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone and Age / Grade */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* PHONE */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Contact Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={values.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                        touched.phone && errors.phone
                          ? "border-rose-400 ring-2 ring-rose-100"
                          : "border-slate-200 focus:border-[#2C2F8F] focus:ring-2 focus:ring-[#2C2F8F]/10"
                      }`}
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* AGE OF CHILD */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Age of the Child / Grade
                    </label>
                    <input
                      type="text"
                      name="age_of_the_child"
                      value={values.age_of_the_child}
                      onChange={(e) => handleChange("age_of_the_child", e.target.value)}
                      placeholder="e.g. 2.5 Years / PP1"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#2C2F8F] focus:ring-2 focus:ring-[#2C2F8F]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Quick Selection Chips for Age Group */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-500 mr-1">Quick Select:</span>
                  {AGE_SUGGESTIONS.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => handleChange("age_of_the_child", sug)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                        values.age_of_the_child === sug
                          ? "bg-[#2C2F8F] text-white border-[#2C2F8F]"
                          : "bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 border-slate-200/60"
                      }`}
                    >
                      {sug}
                    </button>
                  ))}
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={values.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    placeholder="Tell us about your child, current routine, campus preference (Gachibowli or Tellapur), and any questions for the admissions team..."
                    className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none transition-all resize-y ${
                      touched.message && errors.message
                        ? "border-rose-400 ring-2 ring-rose-100"
                        : "border-slate-200 focus:border-[#2C2F8F] focus:ring-2 focus:ring-[#2C2F8F]/10"
                    }`}
                  />
                  {touched.message && errors.message && (
                    <p className="text-xs text-rose-500 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2C2F8F] via-[#1F2570] to-[#2C2F8F] hover:from-[#232675] hover:to-[#232675] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#2C2F8F]/25 hover:shadow-2xl hover:shadow-[#2C2F8F]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <span aria-hidden>→</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 mt-3">
                    By submitting this form, you request an invitation to our next parent orientation session. No commitment is required at this stage.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
