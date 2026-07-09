"use client";

import { useState } from "react";
import siteData from "@/data/site";

function isEmail(v = "") {
  const s = String(v || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function getHutkCookie() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function hsBaseUrl(region = "") {
  const r = String(region || "").toLowerCase().trim();
  if (!r) return "https://api.hsforms.com";
  return `https://api-${r}.hsforms.com`;
}

async function submitToHubSpot({ portalId, formId, fields, context, region }) {
  const base = hsBaseUrl(region);
  const url = `${base}/submissions/v3/integration/submit/${portalId}/${formId}`;

  const payload = {
    fields: fields.map((f) => ({ name: f.name, value: f.value })),
    context: {
      hutk: getHutkCookie() || undefined,
      pageUri:
        context.pageUri ||
        (typeof window !== "undefined" ? window.location.href : ""),
      pageName: context.pageName || undefined,
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
      msg =
        j.message ||
        j.errors?.[0]?.message ||
        j.errors?.[0]?.error ||
        msg;
      console.error("HubSpot newsletter error:", j);
    } catch (e) {}
    throw new Error(msg);
  }

  return true;
}

export default function FooterNewsletter() {
  const { footer } = siteData;
  const [email, setEmail] = useState("");
  const [newsStatus, setNewsStatus] = useState({ type: "", msg: "" });
  const [newsSubmitting, setNewsSubmitting] = useState(false);

  async function onNewsletterSubmit(e) {
    e.preventDefault();
    setNewsStatus({ type: "", msg: "" });

    const v = String(email || "").trim();
    if (!v) {
      setNewsStatus({ type: "error", msg: "Please enter your email." });
      return;
    }
    if (!isEmail(v)) {
      setNewsStatus({ type: "error", msg: "Please enter a valid email address." });
      return;
    }

    const hs = footer.newsletter.hubspot;
    if (!hs.portalId || !hs.formId) {
      setNewsStatus({
        type: "error",
        msg: "Newsletter is not configured yet (missing HubSpot portalId/formId).",
      });
      return;
    }

    try {
      setNewsSubmitting(true);
      const fieldName = footer.newsletter.emailFieldName || "email";

      await submitToHubSpot({
        region: hs.region,
        portalId: hs.portalId,
        formId: hs.formId,
        fields: [{ name: fieldName, value: v }],
        context: { pageUri: hs.pageUri, pageName: hs.pageName },
      });

      setNewsStatus({
        type: "success",
        msg: footer.newsletter.successMessage || "Subscribed successfully.",
      });
      setEmail("");
    } catch (err) {
      setNewsStatus({
        type: "error",
        msg: err.message || "Unable to subscribe. Please try again.",
      });
    } finally {
      setNewsSubmitting(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={onNewsletterSubmit}
        className="mt-4 flex flex-col gap-3 relative z-10"
        noValidate
      >
        <input
          id="newsletter-email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder={footer.newsletter.placeholder || "Enter Your E-mail"}
          className="h-11 w-full rounded-xl bg-[#3a3a3a] px-4 text-[0.8125rem] text-white placeholder:text-white/45 outline-none ring-1 ring-transparent focus:ring-white/20"
          disabled={newsSubmitting}
          suppressHydrationWarning
        />

        <button
          type="submit"
          disabled={newsSubmitting}
          className={[
            "h-11 w-full rounded-xl bg-white px-4 text-[0.8125rem] font-medium text-[#111] hover:bg-white/90 transition-colors",
            newsSubmitting ? "opacity-70 cursor-not-allowed" : "",
          ].join(" ")}
          suppressHydrationWarning
        >
          <span>
            {newsSubmitting
              ? footer.newsletter.submittingLabel || "Submitting"
              : footer.newsletter.buttonLabel || "Submit"}{" "}
          </span>
          <span aria-hidden>{"\u2192"}</span>
        </button>
      </form>

      {newsStatus.msg ? (
        <div
          className={[
            "mt-3 rounded-xl px-4 py-3 text-[0.8125rem]",
            newsStatus.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700",
          ].join(" ")}
        >
          {newsStatus.msg}
        </div>
      ) : null}
    </div>
  );
}
