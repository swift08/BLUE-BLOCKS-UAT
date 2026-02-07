import Link from "next/link";
import Container from "@/components/layout/Container";

const toneClass = {
  peach: "bg-orange-200/70",
  yellow: "bg-yellow-200/70",
  sky: "bg-sky-200/70",
  navy: "bg-[#1f2a44] text-white"
};

export default function JourneyCards({ title, subText, cards = [] }) {
  return (
    <section className="bg-[#f5efe6]">
      <Container className="py-14">
        {title ? (<h2 className="text-center text-4xl sm:text-5xl font-semibold tracking-wide">
          {title}
        </h2>) : null}
        {subText ? (<h3 className="text-center text-xl sm:text-2xl ">{subText}</h3>) : null}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => (
            <div
              key={c.title}
              className={`rounded-2xl p-5 ${toneClass[c.tone] || "bg-white"} shadow-sm`}
            >
              <div className="flex justify-end gap-3 pb-1">
                {c.tag ? (
                  <span className="text-xs rounded-full px-3 py-1 bg-white/60 text-slate-700">
                    {c.tag}
                  </span>
                ) : null}
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold whitespace-pre-line">
                  {c.title}
                </h3>
              </div>

              <div className="mt-3 text-sm opacity-80">
                The formative years are guided with independence and curiosity.
              </div>

              {c.cta ? (
                <Link
                  href={c.cta.href}
                  className="mt-5 inline-flex items-center text-sm font-medium underline underline-offset-4"
                >
                  {c.cta.label}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
