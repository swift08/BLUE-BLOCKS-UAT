import Container from "@/components/layout/Container";

export default function CenteredTextBlock({
  bg = "#EEF7FD",
  title,
  subtitle,
  text,
  textParts = [],
  maxWidth = "56rem"
}) {
  return (
    <section style={{ backgroundColor: bg }}>
      <Container className="py-14 sm:py-16">
        <div className="mx-auto text-center" style={{ maxWidth }}>
          {title ? (
            <h2 className="text-[2.25rem] sm:text-[3rem] leading-[1.1] font-medium text-[#131313]">
              {title}
            </h2>
          ) : null}

          {subtitle ? (
            <h3 className="text-[1.25rem] sm:text-[2rem] leading-[1.1] text-[#131313] mt-5">
              {subtitle}
            </h3>
          ) : null}

          {Array.isArray(textParts) && textParts.length ? (
              <div className="mt-4 space-y-3 text-slate-700 leading-relaxed">
                {textParts.map((p, idx) =>
                  typeof p === "string" ? (
                    <p
                      key={idx}
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  ) : null
                )}
              </div>
            ) : text ? (
            <p className="mt-4 text-[0.95rem] leading-7 text-slate-600">
              {text}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
