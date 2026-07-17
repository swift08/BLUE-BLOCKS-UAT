"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import Image from "next/image";

/* ------------------------- helpers ------------------------- */
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
      pageUri: context?.pageUri || (typeof window !== "undefined" ? window.location.href : ""),
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

/* ------------------------- icon map ------------------------- */
function ContactIcon({ type }) {
  switch (type) {
    case "email":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case "phone":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 6.29 6.29l1-1.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "chat":
    case "whatsapp":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
}

function getIconType(item) {
  const src = String(item?.icon || "").toLowerCase();
  const label = String(item?.label || "").toLowerCase();
  if (src.includes("email") || label.includes("email") || label.includes("mail")) return "email";
  if (src.includes("phone") || label.includes("phone") || label.includes("call")) return "phone";
  if (src.includes("chat") || label.includes("whatsapp") || label.includes("chat")) return "chat";
  return "info";
}

/* ========================= COMPONENT ========================= */

export default function ContactDetails({ eyebrow, heading, items = [], form }) {
  const fields = useMemo(() => Array.isArray(form?.fields) ? form.fields : [], [form]);
  const hubspot = form?.hubspot || null;

  const initialValues = useMemo(() => {
    const out = {};
    fields.forEach((f) => {
      if (f?.name) out[f.name] = f.defaultValue ?? "";
    });
    return out;
  }, [fields]);

  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  function setField(name, value) {
    setValues((p) => ({ ...p, [name]: value }));
  }

  function validate() {
    const errors = {};
    fields.forEach((f) => {
      const name = f?.name;
      if (!name) return;
      const val = String(values?.[name] ?? "").trim();
      const required = Boolean(f?.required);
      if (required && !val) {
        errors[name] = f?.requiredMessage || "This field is required.";
        return;
      }
      if ((f?.type === "email" || f?.validate === "email") && val && !isEmail(val)) {
        errors[name] = f?.invalidMessage || "Please enter a valid email address.";
      }
    });
    return errors;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const errors = useMemo(() => validate(), [values]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    const touchAll = {};
    fields.forEach((f) => f?.name && (touchAll[f.name] = true));
    setTouched(touchAll);

    const vErrors = validate();
    const hasErrors = Object.keys(vErrors).length > 0;
    if (hasErrors) {
      setStatus({ type: "error", msg: "Please fix the highlighted fields." });
      return;
    }

    if (!hubspot?.portalId || !hubspot?.formId) {
      setStatus({
        type: "error",
        msg: "Form is not configured yet (missing HubSpot portalId/formId).",
      });
      return;
    }

    try {
      setSubmitting(true);

      const payloadFields = fields
        .filter((f) => f?.name)
        .map((f) => ({
          name: f.name,
          value: String(values?.[f.name] ?? "").trim(),
        }));

      await submitToHubSpot({
        portalId: hubspot.portalId,
        formId: hubspot.formId,
        fields: payloadFields,
        context: {
          pageUri: hubspot.pageUri,
          pageName: hubspot.pageName,
        },
      });

      setStatus({ type: "success", msg: form?.successMessage || "Thanks! We'll get back to you shortly." });
      setValues(initialValues);
      setTouched({});
    } catch (err) {
      setStatus({ type: "error", msg: err?.message || "Unable to submit. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f1f3d 0%, #1B3A6B 60%, #2C2F8F 100%)",
        paddingTop: "clamp(60px, 8vw, 100px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(243,227,207,0.06) 0%, transparent 70%)",
          transform: "translate(20%, -20%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(44,47,143,0.15) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* ═══════════════ LEFT PANEL ═══════════════ */}
          <div>
            {/* Eyebrow */}
            {eyebrow ? (
              <div
                className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
                style={{
                  backgroundColor: "rgba(243,227,207,0.12)",
                  color: "#F3E3CF",
                  border: "1px solid rgba(243,227,207,0.2)",
                }}
              >
                {eyebrow}
              </div>
            ) : null}

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              {heading}
            </h2>

            <p className="mt-4 text-white/60 text-[15px] leading-relaxed max-w-sm">
              Reach out on any of the channels below — we typically respond within one business day.
            </p>

            {/* Contact cards */}
            <div className="mt-10 space-y-4">
              {items.map((item, idx) => {
                const iconType = getIconType(item);
                return (
                  <a
                    key={idx}
                    href={item.href || "#"}
                    className="group flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {/* Icon circle */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#F3E3CF]/20"
                      style={{ backgroundColor: "rgba(243,227,207,0.12)", color: "#F3E3CF" }}
                    >
                      <ContactIcon type={iconType} />
                    </div>

                    {/* Text */}
                    <div>
                      <div className="text-xs font-bold tracking-widest uppercase text-white/40 mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-white font-medium text-[15px] group-hover:text-[#F3E3CF] transition-colors duration-200">
                        {item.value}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="ml-auto text-white/20 group-hover:text-[#F3E3CF]/60 transition-colors duration-200" aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* ═══════════════ RIGHT FORM ═══════════════ */}
          <div
            className="rounded-3xl p-7 sm:p-9 shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="mb-7">
              <div className="text-white font-bold text-xl">Send us a message</div>
              <div className="text-white/50 text-sm mt-1">We&apos;ll get back to you within 24 hours.</div>
            </div>

            <form className="space-y-4" onSubmit={onSubmit} noValidate>
              {(fields || []).map((f) => {
                const name = f?.name;
                if (!name) return null;

                const hasError = Boolean(touched?.[name] && errors?.[name]);
                const isFocused = focusedField === name;
                const hasValue = Boolean(String(values?.[name] ?? "").trim());

                const baseInputStyle = {
                  background: "rgba(255,255,255,0.07)",
                  border: hasError
                    ? "1px solid rgba(239,68,68,0.5)"
                    : isFocused
                    ? "1px solid rgba(243,227,207,0.5)"
                    : "1px solid rgba(255,255,255,0.10)",
                  color: "#fff",
                  outline: "none",
                  borderRadius: "12px",
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  transition: "border-color 0.2s, background 0.2s",
                  resize: "vertical",
                };

                const placeholderClass = "contact-placeholder";

                if (f.type === "textarea") {
                  return (
                    <div key={name}>
                      <textarea
                        name={name}
                        suppressHydrationWarning
                        placeholder={f.placeholder}
                        rows={f.rows || 4}
                        value={values?.[name] ?? ""}
                        onChange={(e) => setField(name, e.target.value)}
                        onFocus={() => setFocusedField(name)}
                        onBlur={() => {
                          setFocusedField(null);
                          setTouched((p) => ({ ...p, [name]: true }));
                        }}
                        style={baseInputStyle}
                        required={Boolean(f.required)}
                        className={placeholderClass}
                      />
                      {hasError ? (
                        <p className="mt-1 text-xs text-red-400">{errors[name]}</p>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <div key={name}>
                    <input
                      name={name}
                      type={f.type || "text"}
                      suppressHydrationWarning
                      placeholder={f.placeholder}
                      value={values?.[name] ?? ""}
                      onChange={(e) => setField(name, e.target.value)}
                      onFocus={() => setFocusedField(name)}
                      onBlur={() => {
                        setFocusedField(null);
                        setTouched((p) => ({ ...p, [name]: true }));
                      }}
                      style={baseInputStyle}
                      required={Boolean(f.required)}
                      autoComplete={f.autoComplete || undefined}
                      className={placeholderClass}
                    />
                    {hasError ? (
                      <p className="mt-1 text-xs text-red-400">{errors[name]}</p>
                    ) : null}
                  </div>
                );
              })}

              {/* Status message */}
              {status?.msg ? (
                <div
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{
                    background: status.type === "success"
                      ? "rgba(16,185,129,0.15)"
                      : "rgba(239,68,68,0.15)",
                    border: status.type === "success"
                      ? "1px solid rgba(16,185,129,0.3)"
                      : "1px solid rgba(239,68,68,0.3)",
                    color: status.type === "success" ? "#34d399" : "#f87171",
                  }}
                >
                  {status.msg}
                </div>
              ) : null}

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                suppressHydrationWarning
                className={[
                  "w-full rounded-2xl px-5 py-4 text-sm font-bold tracking-wide transition-all duration-300",
                  submitting
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:opacity-95 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#F3E3CF]/10",
                ].join(" ")}
                style={{
                  background: submitting
                    ? "rgba(243,227,207,0.5)"
                    : "linear-gradient(135deg, #F3E3CF 0%, #e8cda8 100%)",
                  color: "#0f1f3d",
                }}
              >
                {submitting
                  ? (form?.submittingLabel || "Submitting...")
                  : (form?.buttonLabel || "Send Message →")}
              </button>
            </form>
          </div>
        </div>
      </Container>

      {/* Global placeholder color override */}
      <style jsx global>{`
        .contact-placeholder::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }
        .contact-placeholder:focus::placeholder {
          color: rgba(255, 255, 255, 0.20);
        }
      `}</style>
    </section>
  );
}
