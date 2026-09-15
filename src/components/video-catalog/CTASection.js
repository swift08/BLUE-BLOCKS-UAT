"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import YoutubeBackground from "./YoutubeBackground";

export default function CTASection({ youtubeId, phone = "+91 9000955053" }) {
  const telHref = `tel:${String(phone).replace(/\s+/g, "")}`;

  return (
    <section id="visit" className="relative overflow-hidden py-12 md:py-16">
      <div className="absolute inset-0 z-0">
        <YoutubeBackground
          youtubeId={youtubeId}
          id="cta-video"
          className="relative h-full w-full opacity-20 grayscale"
          soundButtonClassName="absolute right-10 bottom-10 z-20 flex h-10 w-10 items-center justify-center rounded-full glass-strong shadow-2xl transition-all hover:scale-110 active:scale-95"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vc-background via-vc-background/80 to-deep-blue/40" />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <span className="mb-8 inline-block rounded-full glass-strong px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-sky-blue/90 shadow-xl">
              Admissions
            </span>
            <h2 className="text-balance font-display text-5xl font-black leading-[0.95] tracking-tighter text-white md:text-7xl">
              Ready to <br />
              <span className="bg-gradient-to-r from-sky-blue to-warm bg-clip-text text-transparent">
                visit?
              </span>
            </h2>
            <p className="mt-8 max-w-lg text-lg font-medium leading-relaxed text-vc-foreground/60 md:text-xl">
              Every video you just watched has a next step. Our admissions process starts with a
              Discovery Workshop.
            </p>

            <div className="mt-12 flex flex-col gap-5 sm:flex-row">
              <Link
                href="/admissions/"
                className="group relative overflow-hidden rounded-full bg-sky-blue px-8 py-4 text-center text-sm font-black uppercase tracking-widest text-deep-blue shadow-block transition-all hover:scale-105"
              >
                <div className="absolute inset-0 translate-y-full bg-white opacity-20 transition-transform group-hover:translate-y-0" />
                <span className="relative">REGISTER FOR THE ADMISSION WORKSHOP →</span>
              </Link>
              <a
                href="https://wa.me/919000955053"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full glass-strong px-8 py-4 text-center text-sm font-black uppercase tracking-widest text-white transition-all hover:scale-105 hover:bg-white/10"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {[
              { city: "Gachibowli", line: "The Original Campus", icon: "campus" },
              { city: "Tellapur", line: "Our Future-Forward Hub", icon: "hub" },
            ].map((campus) => (
              <Link
                key={campus.city}
                href="/campus/"
                className="group relative rounded-[2rem] glass-strong p-6 text-left shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/10"
              >
                <div className="mb-3 text-2xl opacity-80 transition-transform group-hover:scale-110 group-hover:rotate-6">
                  {campus.icon === "hub" ? "▲" : "▣"}
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-sky-blue">
                  Hyderabad
                </p>
                <p className="mt-1 font-display text-xl font-bold tracking-tight text-white">
                  {campus.city}
                </p>
                <p className="mt-1 text-[11px] font-medium text-vc-foreground/50">{campus.line}</p>
                <div className="absolute right-8 bottom-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5 text-sky-blue"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            ))}

            <a
              href={telHref}
              className="flex items-center justify-between rounded-[2.5rem] glass-strong p-8 shadow-2xl sm:col-span-2"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm/20 text-xl">
                  ☎
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-vc-foreground/40">
                    Inquiry Line
                  </p>
                  <p className="font-display font-bold text-white">{phone}</p>
                </div>
              </div>
              <div className="h-2 w-2 rounded-full bg-sky-blue animate-pulse" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
