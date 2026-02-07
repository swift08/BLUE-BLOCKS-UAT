import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function InnovationMediaHero({
  spacingTop,
  image,
  title,
  subtitle,
  cardTextClassName = "mt-3 text-white/85 text-xs sm:text-sm leading-relaxed",
  primaryCta,
  secondaryCta,
}) {
  return (
    <section className={`bg-white ${spacingTop}`}>
      <Container className="pb-10 sm:pb-14">
        <div className="relative overflow-hidden rounded-3xl bg-slate-100">
          <div className="relative aspect-[16/10] sm:aspect-[16/8]">
            <Image
              src={image}
              alt={title || "Innovation"}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 640px) 90vw, 100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-6 sm:px-10">
              <div className="max-w-xl">
                <h2 className="text-white text-4xl sm:text-5xl font-semibold main-title">
                  {title}
                </h2>

                {Array.isArray(subtitle) && subtitle.length ? (
                  <div>
                    {subtitle.map((p, idx) =>
                      typeof p === "string" ? (
                        <p
                          className={cardTextClassName}
                          key={idx}
                          dangerouslySetInnerHTML={{ __html: p }}
                        />
                      ) : null
                    )}
                  </div>
                ) : typeof subtitle === "string" ? (
                <p
                  className={cardTextClassName}
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                />) : null}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {primaryCta?.href ? (
                    <Link
                      href={primaryCta.href}
                      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs sm:text-sm font-medium text-slate-900 hover:bg-white/90"
                    >
                      {primaryCta.label}
                    </Link>
                  ) : null}
                  {secondaryCta?.href ? (
                    <Link
                      href={secondaryCta.href}
                      className="inline-flex items-center justify-center rounded-full bg-white/15 px-5 py-2 text-xs sm:text-sm font-medium text-white ring-1 ring-white/25 hover:bg-white/20"
                    >
                      {secondaryCta.label}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
