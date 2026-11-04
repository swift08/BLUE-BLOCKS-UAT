"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TIMESLOTS = ["9:00 am", "10:00 am", "11:00 am"];

const LIKERT = [
  "5- Strongly Agree",
  "4- Agree",
  "3- Neither agree nor disagree",
  "2- Disagree",
  "1- Stronly Disagree",
];

const EXPECT = [
  "Real research",
  "Children's school-style projects",
  "A mix of both",
  "Not sure",
];

const INITIAL = {
  fullName: "",
  profession: "",
  organisation: "",
  contactNumber: "",
  emergencyContact: "",
  email: "",
  timeslot: "",
  bigProblem: "",
  natureInspires: "",
  childrenResearch: "",
  expectToSee: "",
  additionalComments: "",
};

const REQUIRED = [
  "fullName",
  "profession",
  "organisation",
  "contactNumber",
  "emergencyContact",
  "email",
  "timeslot",
  "bigProblem",
  "natureInspires",
  "childrenResearch",
  "expectToSee",
];

const DRAFT_KEY = "biomimicry_park_register_draft";

function track(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    form_name: "biomimicry_park_register",
    ...params,
  });
  window.gtag?.("event", event, {
    event_category: "biomimicry_park_register",
    ...params,
  });
}

function Question({ n, label, required, hint, children, error, htmlFor }) {
  return (
    <motion.fieldset
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className={`relative min-w-0 overflow-hidden rounded-2xl border bg-[#FFFCFA] p-4 sm:p-6 ${
        error ? "border-[#C45C26] shadow-[0_0_0_3px_rgba(196,92,38,0.12)]" : "border-[#1A5336]/25"
      }`}
    >
      <legend className="float-left w-full">
        <span className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#1A5336]/70">
          Question {n}
        </span>
        {htmlFor ? (
          <label
            htmlFor={htmlFor}
            className="mt-2 block break-words font-serif text-lg italic leading-snug text-[#0F3D2E] sm:text-2xl"
          >
            {label}
            {required ? <span className="text-[#C45C26]"> *</span> : null}
          </label>
        ) : (
          <span className="mt-2 block break-words font-serif text-lg italic leading-snug text-[#0F3D2E] sm:text-2xl">
            {label}
            {required ? <span className="text-[#C45C26]"> *</span> : null}
          </span>
        )}
      </legend>
      {hint ? <p className="mt-2 clear-both text-sm leading-6 text-[#6B7280]">{hint}</p> : null}
      <div className="clear-both mt-3 sm:mt-4">{children}</div>
      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 text-sm text-[#C45C26]"
          >
            This question is required.
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.fieldset>
  );
}

function SoftInput({ name, value, onChange, type = "text", error, onFocus, autoComplete }) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      autoComplete={autoComplete}
      className={`w-full max-w-full rounded-xl border-0 bg-[#F3EDE4] px-3 py-3 text-base text-[#0F3D2E] outline-none ring-1 transition placeholder:text-[#0F3D2E]/35 focus:bg-white focus:ring-2 focus:ring-[#1A5336] sm:px-4 sm:py-3.5 sm:text-[15px] ${
        error ? "ring-[#C45C26]" : "ring-transparent"
      }`}
    />
  );
}

function SoftArea({ name, value, onChange, error, rows = 4, onFocus, autoComplete = "off" }) {
  return (
    <textarea
      id={name}
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      autoComplete={autoComplete}
      className={`w-full max-w-full resize-y rounded-xl border-0 bg-[#F3EDE4] px-3 py-3 text-base text-[#0F3D2E] outline-none ring-1 transition placeholder:text-[#0F3D2E]/35 focus:bg-white focus:ring-2 focus:ring-[#1A5336] sm:px-4 sm:py-3.5 sm:text-[15px] ${
        error ? "ring-[#C45C26]" : "ring-transparent"
      }`}
    />
  );
}

export default function BiomimicryParkRegisterForm() {
  const [formData, setFormData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [ready, setReady] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    track("biomimicry_register_view");
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData({ ...INITIAL, ...parsed });
      }
    } catch {
      // ignore bad draft
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || status === "success") return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    } catch {
      // ignore quota errors
    }
  }, [formData, ready, status]);

  const progress = useMemo(() => {
    const filled = REQUIRED.filter((k) => String(formData[k] || "").trim()).length;
    return Math.round((filled / REQUIRED.length) * 100);
  }, [formData]);

  const markStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("biomimicry_register_start");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    markStart();
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
    if (name === "timeslot") track("biomimicry_register_timeslot", { timeslot: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    REQUIRED.forEach((key) => {
      if (!String(formData[key] || "").trim()) nextErrors[key] = true;
    });
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      track("biomimicry_register_validation_error", {
        missing_count: Object.keys(nextErrors).length,
      });
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");
    track("biomimicry_register_submit_attempt", { timeslot: formData.timeslot });

    const messageBody = `
Explore Montessori 2026 - Registration Biomimicry Park

Full name: ${formData.fullName}
Profession / occupation: ${formData.profession}
Organisation / institution: ${formData.organisation}
Contact number (preferably WhatsApp): ${formData.contactNumber}
Emergency Contact (Name & Phone Number): ${formData.emergencyContact}
Email address: ${formData.email}
Choose a Timeslot to attend the event: ${formData.timeslot}
What big problem do you think people will face in the future, and which animal or plant could help us solve it?: ${formData.bigProblem}
What is something in nature that inspires you?: ${formData.natureInspires}
Children can do real, useful scientific research.: ${formData.childrenResearch}
What do you expect to see at this event?: ${formData.expectToSee}
Additional Comments or Special Needs: ${formData.additionalComments || "(none)"}
Submitted: ${new Date().toLocaleString()}
    `.trim();

    try {
      const payload = new FormData();
      payload.append("access_key", "d51706c9-c8f1-4081-956d-254aa31caf8e");
      payload.append("subject", `Biomimicry Park Registration — ${formData.fullName}`);
      payload.append("from_name", formData.fullName);
      payload.append("replyto", formData.email);
      payload.append("message", messageBody);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        try {
          localStorage.removeItem(DRAFT_KEY);
        } catch {
          // ignore
        }
        track("biomimicry_register_submit_success", {
          timeslot: formData.timeslot,
          expect_to_see: formData.expectToSee,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setStatus("error");
        track("biomimicry_register_submit_error");
      }
    } catch {
      setStatus("error");
      track("biomimicry_register_submit_error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="overflow-hidden rounded-[28px] border border-[#1A5336] bg-[#FFFCFA]"
      >
        <div className="h-2 bg-[#1A5336]" />
        <div className="px-6 py-14 text-center sm:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A5336]">Registration received</p>
          <h2 className="mt-5 break-words font-serif text-3xl leading-tight text-[#0F3D2E] sm:text-5xl">
            Thank you, <span className="bg-[#F3D9C4] px-1.5 italic">{formData.fullName}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#4B5563]">
            Your registration for Biomimicry Park on 28-11-2026 ({formData.timeslot}) has been submitted. We will be in
            touch if confirmation is needed.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full min-w-0 space-y-4 sm:space-y-5">
      <div className="sticky top-[4.25rem] z-30 mb-2 overflow-hidden rounded-full bg-[#E8E0D4]/95 p-1 backdrop-blur supports-[backdrop-filter]:bg-[#E8E0D4]/85 sm:top-20">
        <div className="relative h-2 overflow-hidden rounded-full bg-[#D9D0C3]">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-[#1A5336]"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.25 }}
          />
        </div>
        <p className="px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#1A5336]/80">
          {progress}% complete
        </p>
      </div>

      <div className="rounded-2xl border border-[#1A5336] bg-[#FFFCFA] p-4 sm:rounded-[28px] sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A5336]">Event details</p>
        <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#F3EDE4] px-3.5 py-3.5 sm:px-4 sm:py-4">
            <p className="font-serif text-base italic text-[#0F3D2E] sm:text-lg">Event Date:</p>
            <p className="mt-1 text-sm font-semibold text-[#0F3D2E]">28-11-2026</p>
          </div>
          <div className="rounded-2xl bg-[#F3EDE4] px-3.5 py-3.5 sm:px-4 sm:py-4">
            <p className="font-serif text-base italic text-[#0F3D2E] sm:text-lg">Event Timings:</p>
            <p className="mt-1 text-sm leading-6 text-[#0F3D2E]">
              9:00 am - 12:30 am. (Guests are requested to choose a timeslot for entry)
            </p>
          </div>
        </div>
      </div>

      <Question n={1} label="Full name" required htmlFor="fullName" error={errors.fullName}>
        <SoftInput
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onFocus={markStart}
          error={errors.fullName}
          autoComplete="name"
        />
      </Question>

      <Question n={2} label="Profession / occupation" required htmlFor="profession" error={errors.profession}>
        <SoftInput
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          onFocus={markStart}
          error={errors.profession}
          autoComplete="organization-title"
        />
      </Question>

      <Question n={3} label="Organisation / institution" required htmlFor="organisation" error={errors.organisation}>
        <SoftInput
          name="organisation"
          value={formData.organisation}
          onChange={handleChange}
          onFocus={markStart}
          error={errors.organisation}
          autoComplete="organization"
        />
      </Question>

      <Question
        n={4}
        label="Contact number (preferably WhatsApp)"
        required
        htmlFor="contactNumber"
        error={errors.contactNumber}
      >
        <SoftInput
          name="contactNumber"
          type="tel"
          value={formData.contactNumber}
          onChange={handleChange}
          onFocus={markStart}
          error={errors.contactNumber}
          autoComplete="tel"
        />
      </Question>

      <Question
        n={5}
        label="Emergency Contact (Name & Phone Number)"
        required
        htmlFor="emergencyContact"
        error={errors.emergencyContact}
      >
        <SoftInput
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          onFocus={markStart}
          error={errors.emergencyContact}
          autoComplete="off"
        />
      </Question>

      <Question n={6} label="Email address" required htmlFor="email" error={errors.email}>
        <SoftInput
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={markStart}
          error={errors.email}
          autoComplete="email"
        />
      </Question>

      <Question
        n={7}
        label="Choose a Timeslot to attend the event"
        required
        error={errors.timeslot}
      >
        <div id="timeslot" className="grid grid-cols-3 gap-2 sm:gap-3" role="radiogroup" aria-label="Choose a Timeslot to attend the event">
          {TIMESLOTS.map((slot) => {
            const active = formData.timeslot === slot;
            return (
              <label
                key={slot}
                className={`cursor-pointer rounded-xl border px-1.5 py-3 text-center transition sm:rounded-2xl sm:px-4 sm:py-5 ${
                  active
                    ? "border-[#1A5336] bg-[#1A5336] text-white shadow-lg shadow-[#1A5336]/20"
                    : "border-[#1A5336]/20 bg-[#F3EDE4] text-[#0F3D2E] hover:border-[#1A5336]/50"
                }`}
              >
                <input
                  type="radio"
                  name="timeslot"
                  value={slot}
                  checked={active}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="block text-[0.55rem] font-bold uppercase tracking-[0.12em] opacity-70 sm:text-[0.65rem] sm:tracking-[0.16em]">
                  Entry
                </span>
                <span className="mt-1 block font-serif text-sm italic leading-tight sm:text-2xl">{slot}</span>
              </label>
            );
          })}
        </div>
      </Question>

      <Question
        n={8}
        label="What big problem do you think people will face in the future, and which animal or plant could help us solve it?"
        required
        htmlFor="bigProblem"
        error={errors.bigProblem}
      >
        <SoftArea
          name="bigProblem"
          value={formData.bigProblem}
          onChange={handleChange}
          onFocus={markStart}
          error={errors.bigProblem}
        />
      </Question>

      <Question
        n={9}
        label="What is something in nature that inspires you?"
        required
        htmlFor="natureInspires"
        hint="(It could be a plant, an animal, a pattern, or anything you've noticed in the natural world.)"
        error={errors.natureInspires}
      >
        <SoftArea
          name="natureInspires"
          value={formData.natureInspires}
          onChange={handleChange}
          onFocus={markStart}
          error={errors.natureInspires}
        />
      </Question>

      <Question
        n={10}
        label="Children can do real, useful scientific research."
        required
        error={errors.childrenResearch}
      >
        <div id="childrenResearch" className="space-y-2" role="radiogroup" aria-label="Children can do real, useful scientific research.">
          {LIKERT.map((opt, idx) => {
            const active = formData.childrenResearch === opt;
            const fill = ((5 - idx) / 5) * 100;
            return (
              <label
                key={opt}
                className={`block cursor-pointer rounded-2xl border px-3 py-3 transition sm:px-4 ${
                  active
                    ? "border-[#1A5336] bg-[#1A5336]/8"
                    : "border-transparent bg-[#F3EDE4] hover:border-[#1A5336]/30"
                }`}
              >
                <input
                  type="radio"
                  name="childrenResearch"
                  value={opt}
                  checked={active}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex items-center justify-between gap-3">
                  <span className="break-words font-serif text-sm italic text-[#0F3D2E] sm:text-base">{opt}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E5DDD2]">
                  <div
                    className={`h-full rounded-full ${idx === 0 ? "bg-[#1A5336]" : idx >= 3 ? "bg-[#C45C26]" : "bg-[#2F6B4A]"}`}
                    style={{ width: `${fill}%` }}
                  />
                </div>
              </label>
            );
          })}
        </div>
      </Question>

      <Question
        n={11}
        label="What do you expect to see at this event?"
        required
        error={errors.expectToSee}
      >
        <div id="expectToSee" className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3" role="radiogroup" aria-label="What do you expect to see at this event?">
          {EXPECT.map((opt) => {
            const active = formData.expectToSee === opt;
            return (
              <label
                key={opt}
                className={`cursor-pointer rounded-2xl border px-3.5 py-3.5 transition sm:px-4 sm:py-4 ${
                  active
                    ? "border-[#1A5336] bg-[#1A5336] text-white"
                    : "border-[#1A5336]/15 bg-[#F3EDE4] text-[#0F3D2E] hover:border-[#1A5336]/45"
                }`}
              >
                <input
                  type="radio"
                  name="expectToSee"
                  value={opt}
                  checked={active}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="break-words font-serif text-base italic leading-snug sm:text-lg">{opt}</span>
              </label>
            );
          })}
        </div>
      </Question>

      <Question n={12} label="Additional Comments or Special Needs" htmlFor="additionalComments">
        <SoftArea
          name="additionalComments"
          value={formData.additionalComments}
          onChange={handleChange}
          onFocus={markStart}
          rows={3}
        />
      </Question>

      {status === "error" ? (
        <p className="rounded-2xl bg-[#C45C26]/10 px-4 py-3 text-sm text-[#9A3D14]">
          Something went wrong. Please try again.
        </p>
      ) : null}

      <div className="sticky bottom-3 z-20 pb-[max(0.25rem,env(safe-area-inset-bottom))] sm:bottom-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#1A5336] px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#1A5336]/25 transition hover:bg-[#143f29] disabled:opacity-60 sm:py-4"
        >
          {status === "submitting" ? "Submitting…" : "Submit registration →"}
        </button>
      </div>
    </form>
  );
}
