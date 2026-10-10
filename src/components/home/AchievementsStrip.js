import Link from "next/link";
import Container from "@/components/layout/Container";

const STATS = [
  {
    number: "1",
    label: "CubeSat in orbit",
  },
  {
    number: "5+",
    label: "Patents & innovations",
  },
  {
    number: "75+",
    label: "Research publications",
  },
  {
    number: "500+",
    label: "Families in the Blue Blocks community",
  },
];

export default function AchievementsStrip() {
  return (
    <section
      aria-label="Blue Blocks by the Numbers"
      className="bg-[#F8FAFC] py-14 sm:py-20 border-y border-neutral-200"
    >
      <Container>
        <div className="text-center max-w-2xl mx-auto pb-10 sm:pb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
            Blue Blocks by the Numbers
          </h2>
        </div>

        {/* 4 Stat Blocks: Desktop 1 row, Mobile 2x2 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-sm"
            >
              <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F52BA]">
                {stat.number}
              </span>
              <span className="text-xs sm:text-sm md:text-base font-medium text-neutral-600 mt-2 max-w-[180px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA link right-aligned */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/achievements/"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-900 hover:text-[#0F52BA] transition"
          >
            <span>Explore all achievements</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
