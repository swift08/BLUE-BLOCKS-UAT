import Image from "next/image";
import Container from "@/components/layout/Container";

export default function AcademicsIntro({
  image, // { src, alt }
  eyebrow,
  spacingTop,
  title,
  subtitle,
  promiseTitle = "The Promise",
  promiseItems = [], // [{ icon, title, text }]
  bg = "#ffffff",
  promiseBg = "#F3E3CF",
  promiseCardBg = "#F7EADB",
  cardTextClassName = "mt-6 max-w-[32rem] text-[1rem] sm:text-[1.05rem] leading-7 text-slate-500",
}) {
  return (
    <section style={{ backgroundColor: bg }} className={`${spacingTop}`}>
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left image */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[1.25rem] bg-slate-100 aspect-[4/3]">
              {image?.src ? (
                <Image
                  src={image.src}
                  alt={image.alt || title || "Academics"}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
              ) : null}
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-6 lg:pt-2">
            {eyebrow ? (
              <div className="inline-flex rounded-full bg-[#EEF0FF] px-4 py-2 text-[0.625rem] font-semibold tracking-[0.14em] uppercase text-[#2C2F8F]">
                {eyebrow}
              </div>
            ) : null}

            {title ? (
              <h2 className="mt-5 text-4xl sm:text-5xl font-semibold text-[#131313] main-title">
                {title}
              </h2>
            ) : null}

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

            {/* Promise box */}
            <div
              className="mt-8 rounded-[1rem] p-6 sm:p-7"
              style={{ backgroundColor: promiseBg }}
            >
              <div className="text-[1.05rem] font-medium text-[#131313]">
                {promiseTitle}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {promiseItems.map((p, idx) => (
                  <div
                    key={`${p.title ?? "promise"}-${idx}`}
                    className="rounded-[0.9rem] p-4 sm:p-5 text-center"
                    style={{ backgroundColor: promiseCardBg }}
                  >
                    {p.icon ? (
                      <div className="mx-auto relative h-10 w-10">
                        <Image
                          src={p.icon}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="40px"
                        />
                      </div>
                    ) : null}

                    {p.title ? (
                      <div className="mt-4 text-[0.95rem] font-medium text-[#131313]">
                        {p.title}
                      </div>
                    ) : null}

                    {p.text ? (
                      <div className="mt-1 text-[0.8rem] leading-5 text-slate-600">
                        {p.text}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
