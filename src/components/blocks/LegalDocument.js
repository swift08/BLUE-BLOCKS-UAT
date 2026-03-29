import Container from "@/components/layout/Container";

// very small allowlist for inline HTML (bold + line breaks only)
function sanitizeInlineHtml(input = "") {
  if (typeof input !== "string") return "";

  let s = input;

  // remove script/style blocks (safety)
  s = s.replace(/<\s*(script|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "");

  // remove all tags except: b, strong, br
  s = s.replace(/<\/?(?!b\b|strong\b|br\b)[a-z0-9]+[^>]*>/gi, "");

  // normalize <br>
  s = s.replace(/<br\s*\/?\s*>/gi, "<br/>");

  // strip attributes from allowed tags
  s = s.replace(/<(b|strong)\s+[^>]*>/gi, "<$1>");

  return s;
}

function HtmlLine({ text }) {
  const safe = sanitizeInlineHtml(text);
  if (!safe) return null;

  return (
    <p
      className="text-[0.98rem] leading-7 text-slate-700"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

export default function LegalDocument({
  effectiveDate,
  authorByline = "",
  publishedDate = "",
  intro = [],
  sections = [],
  maxWidth = "56rem",
}) {
  const hasAuthorBlock = Boolean(authorByline || publishedDate);
  const datedValue = publishedDate || effectiveDate || "To be announced";

  const getParagraphGroups = (section) =>
    Object.keys(section || {})
      .filter((k) => /^paragraphs\d*$/.test(k))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((k) => section[k])
      .filter((arr) => Array.isArray(arr) && arr.length);

  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-14">
        <div className="mx-auto" style={{ maxWidth }}>
          {hasAuthorBlock ? (
            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:px-5 sm:py-4">
              {authorByline ? (
                <div className="text-sm text-slate-700">
                  {authorByline}
                </div>
              ) : null}
              <div className="mt-1 text-sm text-slate-700">
                Dated: {datedValue}
              </div>
            </div>
          ) : effectiveDate ? (
            <div className="text-sm text-slate-500 mb-6">
              Effective Date: {effectiveDate}
            </div>
          ) : null}

          {Array.isArray(intro) && intro.length ? (
            <div className="space-y-3">
              {intro.map((p, i) => (
                <HtmlLine key={i} text={p} />
              ))}
            </div>
          ) : null}

          {Array.isArray(sections) && sections.length ? (
            <div className="mt-10 space-y-10">
              {sections.map((sec, idx) => (
                <div key={sec?.id || idx} className="space-y-3">
                  {sec?.title ? (
                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                      {sec.title}
                    </h2>
                  ) : null}

                  {getParagraphGroups(sec).map((group, groupIdx) => (
                    <div key={groupIdx} className="space-y-3">
                      {group.map((p, i) => (
                        <HtmlLine key={`${groupIdx}-${i}`} text={p} />
                      ))}
                    </div>
                  ))}

                  {Array.isArray(sec?.bullets) && sec.bullets.length ? (
                    <ul className="list-disc pl-5 space-y-2 text-slate-700">
                      {sec.bullets.map((b, i) => (
                        <li key={i} className="leading-7">
                          <HtmlLine text={b} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
