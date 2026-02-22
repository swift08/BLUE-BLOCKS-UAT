import Container from "@/components/layout/Container";
import Image from "next/image";
import { resolveBg } from "@/lib/ui";

export default function FeatureGrid({
  headline,
  subText,
  items = [],

  // NEW (preferred)
  sectionBg = "",

  // OLD (kept)
  bg = "#ffffff",
}) {
  const resolved = resolveBg(sectionBg || bg);

  return (
    <section
      className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")}
      style={resolved.style}
    >
      <Container className="bb-section__inner">
        {headline ? (
          <h2 className="bb-section-title text-center whitespace-pre-line">{headline}</h2>
        ) : null}
        {subText ? <p className="bb-subtitle text-center mt-3">{subText}</p> : null}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl bg-[#273C75]/5 border border-black/5 p-6"
            >
              <div className="flex justify-end gap-3 pb-1">
                {it.tag ? (
                  <span
                    className="bb-pill"
                    style={{
                      "--bb-pill-bg": "rgba(255,255,255,0.6)",
                      "--bb-pill-border": "transparent",
                      "--bb-pill-text": "inherit",
                    }}
                  >
                    <span className="bb-pill__text">{it.tag}</span>
                  </span>
                ) : null}
                {it.pill ? (
                  <span
                    className="bb-pill"
                    style={{
                      "--bb-pill-bg": "rgba(255,255,255,0.6)",
                      "--bb-pill-border": "transparent",
                      "--bb-pill-text": "inherit",
                    }}
                  >
                    <span className="bb-pill__text">{it.pill}</span>
                  </span>
                ) : null}
              </div>

              {it.icon ? (
                <Image
                  src={it.icon}
                  alt={it.title || ""}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              ) : null}

              <div className="bb-text font-semibold mt-4">{it.title}</div>
              <p className="bb-text mt-2">{it.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}