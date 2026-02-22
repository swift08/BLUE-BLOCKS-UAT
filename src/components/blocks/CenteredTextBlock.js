import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";

export default function CenteredTextBlock({
  // OLD (keep backward compatible)
  bg = "#EEF7FD",

  // NEW preferred prop
  sectionBg = "",

  title,
  subtitle,
  text,
  textParts = [],
  maxWidth = "56rem",
  align = "center",
}) {
  const resolvedSection = resolveBg(sectionBg || bg);

  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  return (
    <section
      className={["bb-ui", "bb-section", resolvedSection.className].filter(Boolean).join(" ")}
      style={resolvedSection.style}
    >
      <Container className="bb-section__inner">
        <div className={`mx-auto ${alignClass}`} style={{ maxWidth }}>
          {title ? <h2 className="bb-section-title">{title}</h2> : null}
          {subtitle ? <h3 className="bb-subtitle">{subtitle}</h3> : null}

          {Array.isArray(textParts) && textParts.length ? (
            <div className="bb-text">
              {textParts.map((p, idx) =>
                typeof p === "string" ? (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                ) : p && typeof p === "object" && p.bold ? (
                  <p key={idx}>
                    <b>{p.bold}</b>
                  </p>
                ) : null
              )}
            </div>
          ) : text ? (
            <div className="bb-text">
              <p>{text}</p>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}