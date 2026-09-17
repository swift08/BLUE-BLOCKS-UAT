import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import siteData from "@/data/site";
import { normalizeSiteHref } from "@/lib/links";
import FooterNewsletter from "./FooterNewsletter";
import FooterGallerySlider from "./FooterGallerySlider";

export default function Footer() {
  const { footer } = siteData;

  const gallery = Array.isArray(footer.gallery) && footer.gallery.length
    ? footer.gallery
    : [{ src: "/footer-map-img.webp", alt: "Campus" }];

  return (
    <footer className="bg-[#141414] text-white">
      <Container>
        <div className="pt-8 sm:pt-10 lg:pt-12 pb-10">
          {/* MAIN GRID */}
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-6">
            {/* LEFT: GALLERY SLIDER */}
            <div className="overflow-hidden rounded-[1.75rem] bg-[#1c1c1c]">
              <FooterGallerySlider slides={gallery} />
              <div className="h-10 bg-gradient-to-r from-lime-200/30 via-amber-200/25 to-lime-200/30" />
            </div>

            {/* RIGHT: PANEL */}
            <div className="rounded-[1.75rem] bg-[#1c1c1c] p-4 sm:p-5 lg:p-6">
              {/* TOP ROW: about/newsletter + socials */}
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_14rem]">
                {/* About + Newsletter card */}
                <div className="rounded-[1.25rem] bg-[#232323] p-4 sm:p-5 relative z-10">
                  <div className="flex flex-col items-start gap-3">
                    <div className="relative h-10 w-12 overflow-hidden rounded-md bg-white">
                      <Image
                        src="/icon/logo.svg"
                        alt={siteData.site.name || "Blue Blocks"}
                        width={48}
                        height={40}
                        style={{ aspectRatio: "48 / 40" }}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>

                    <p className="text-[0.75rem] leading-5 text-white/65">
                      {footer.aboutText}
                    </p>
                  </div>

                  {/* Newsletter form (Client Component) */}
                  <FooterNewsletter />
                </div>

                {/* Social stack */}
                <div className="hidden lg:flex lg:flex-col lg:gap-3">
                  {footer.socials.map((s) => (
                    <SocialButton key={s.label} item={s} />
                  ))}
                </div>
              </div>

              {/* LINKS GRID */}
              <div className="mt-5 rounded-[1.25rem] bg-transparent">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <FooterColumn title="Quick Links" items={footer.quickLinks || []} />
                  <FooterColumn title="Programs" items={footer.programs || []} />
                  <FooterColumn title="Connect" items={footer.connect || []} />
                </div>
              </div>

              {/* CONTACT PILL */}
              <div className="mt-6 rounded-[1rem] bg-[#2a2a2a] px-4 py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3 text-[0.75rem] text-white/70">
                    <span aria-hidden className="text-white/60">{"\u260E"}</span>
                    <Link className="whitespace-nowrap" href={`tel:${footer.contact.phone}`}>{footer.contact.phone}</Link>
                    <Link className="whitespace-nowrap" href="https://wa.link/vohpxj">{footer.contact.whatsapp}</Link>
                  </div>

                  <div className="flex items-center gap-2 text-[0.75rem] text-white/70">
                    <span aria-hidden className="text-white/60">{"\u2709"}</span>
                    <a
                      className="underline-offset-4 hover:underline"
                      href={`mailto:${footer.contact.email}`}
                    >
                      {footer.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile socials */}
              <div className="mt-5 grid grid-cols-1 gap-3 lg:hidden">
                {footer.socials.map((s) => (
                  <SocialButton key={s.label} item={s} />
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM LEGAL ROW */}
          <div className="mt-6 flex flex-col gap-3 text-[0.75rem] text-white/45 lg:flex-row lg:items-center lg:justify-between">
            <div>{"\u00A9"} 2026 Blue Blocks Montessori School</div>

            <div className="flex items-center gap-2 lg:justify-end">
              <Link className="underline-offset-4 hover:underline" href="/sitemap/">Sitemap</Link>
              <span className="text-white/25">{"\u00B7"}</span>
              <Link className="underline-offset-4 hover:underline" href="/privacy-policy/">Privacy Policy</Link>
              <span className="text-white/25">{"\u00B7"}</span>
              <Link className="underline-offset-4 hover:underline" href="/terms/">Terms of Use</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ------------------------- Sub Components ------------------------- */

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="text-[0.875rem] font-medium text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-[0.75rem] text-white/55">
        {items.map((l) => (
          <li key={l.label}>
            <Link className="hover:text-white/80 transition-colors" href={normalizeSiteHref(l.href)}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialButton({ item }) {
  const href = normalizeSiteHref(item.href);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 items-center justify-between rounded-[0.9rem] bg-[#2a2a2a] px-4 text-[0.875rem] text-white/80 hover:bg-[#303030] transition"
    >
      <span className="flex items-center gap-3">
        <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
          <Image
            src={item.icon}
            alt=""
            width={20}
            height={20}
            style={{ aspectRatio: "1 / 1" }}
            className="object-contain"
          />
        </span>
        {item.label}
      </span>
      <span aria-hidden className="text-white/40">
        {"\u2197"}
      </span>
    </a>
  );
}
