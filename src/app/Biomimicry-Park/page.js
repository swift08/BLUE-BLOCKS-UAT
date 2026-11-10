import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Biomimicry Park | Explore Montessori 2026 | Blue Blocks",
  description:
    "Explore Montessori 2026: Biomimicry Park — 28 November 2026 at Blue Blocks Montessori School, Tellapur, Hyderabad.",
  alternates: { canonical: "https://blueblocks.in/Biomimicry-Park/" },
};

const LOOK_FORWARD = [
  {
    title: "Student-led Research",
    body: "Discover the questions, observations and findings of our young researchers.",
  },
  {
    title: "Nature-inspired Models",
    body: "Explore how children have applied principles from nature to human challenges.",
  },
  {
    title: "Interactive Installations",
    body: "Experience fascinating adaptations, behaviours and systems from the natural world.",
  },
  {
    title: "Conversations with Children",
    body: "Hear young researchers share the thinking behind their projects.",
  },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Explore Montessori 2026: Biomimicry Park",
    description:
      "Nature Has Already Solved It. Are We Observing Closely Enough? An annual children's research exhibition on biomimicry.",
    startDate: "2026-11-28T09:00:00+05:30",
    endDate: "2026-11-28T12:30:00+05:30",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    isAccessibleForFree: true,
    url: "https://blueblocks.in/Biomimicry-Park/",
    location: {
      "@type": "Place",
      name: "Blue Blocks Montessori School, Tellapur, Hyderabad",
      address: "Tellapur, Hyderabad",
    },
    organizer: { "@id": "https://blueblocks.in/#organization" },
  },
];

export default function BiomimicryParkPage() {
  return (
    <>
      <PageJsonLd baseId="biomimicry-park" schema={schema} />

      <section className="bg-[#F7F4EE]">
        <Container>
          <div className="relative mx-auto max-w-5xl pb-6 pt-28 sm:pt-32">
            <Image
              src="/explore-montessori/biomimicry-park/hero.png"
              alt="Biomimicry Park — Explore Montessori 2026. Small Observations. Big Discoveries."
              width={1774}
              height={887}
              priority
              className="h-auto w-full"
            />
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-end sm:pr-[4%] lg:pr-[8%]">
              <a
                href="#about"
                className="inline-flex items-center rounded-full bg-[#1A5336] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#143f29]"
              >
                Explore Montessori 2026 →
              </a>
              <Link
                href="/Biomimicry-Park/register/"
                className="inline-flex items-center rounded-full border border-[#1A5336] bg-white px-5 py-2.5 text-sm font-semibold text-[#1A5336] transition hover:bg-[#1A5336]/5"
              >
                Register to Visit →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section id="about" className="scroll-mt-24 bg-white py-14">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6 text-sm leading-7 text-slate-700 sm:text-base">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F52BA]">
              Explore Montessori 2026 · Biomimicry Park
            </p>
            <h1 className="font-serif text-3xl font-semibold text-slate-900 sm:text-5xl">
              Nature Has Already Solved It. Are We Observing Closely Enough?
            </h1>
            <p className="text-slate-600">
              28 November 2026 · 9:00 AM – 12:30 PM · Blue Blocks Montessori School, Tellapur, Hyderabad
            </p>
            <p>The preparations for Explore Montessori 2026 are underway!</p>
            <p>
              This year, our annual research and exhibition event takes on the theme Biomimicry, exploring how
              nature&apos;s designs, behaviours and systems can inspire solutions to human challenges.
            </p>
            <p>
              Over the past few months, children and parents at Blue Blocks have been observing nature,
              investigating questions and translating their discoveries into research papers and 3D models.
            </p>
            <p>
              On 28 November, these investigations will come together at Biomimicry Park, where visitors can
              interact with young researchers, explore nature-inspired innovations and experience installations
              that reveal the remarkable ways nature works.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#F3E3CF] py-14">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl text-slate-900">What Can You Look Forward To?</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {LOOK_FORWARD.map((item) => (
                <li key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="font-serif text-3xl text-slate-900">Join Us at Biomimicry Park</h2>
            <p className="text-sm leading-7 text-slate-700 sm:text-base">
              We invite parents, educators, researchers, students, designers, nature enthusiasts and the wider
              community to be part of Explore Montessori 2026.
            </p>
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
              {[
                ["Date", "Saturday, 28 November 2026"],
                ["Time", "9:00 AM – 12:30 PM"],
                ["Venue", "Blue Blocks Montessori School, Tellapur, Hyderabad"],
                ["Entry", "Free · Prior registration required"],
              ].map(([label, value]) => (
                <div key={label} className="bg-white p-5">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {label}
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-slate-900">{value}</dd>
                </div>
              ))}
            </dl>

            <div id="register" className="scroll-mt-24 flex flex-col gap-4 rounded-lg bg-slate-900 px-5 py-8 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-serif text-2xl italic">Register to visit the Biomimicry Park</p>
                <p className="mt-2 text-xs tracking-wide text-white/70">
                  Free entry · External visitors must register and receive confirmation
                </p>
              </div>
              <Link
                href="/Biomimicry-Park/register/"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1A5336]"
              >
                Register here →
              </Link>
            </div>

            <p className="text-sm leading-7 text-slate-700 sm:text-base">
              Curious to know more about the research behind Biomimicry Park?{" "}
              <Link href="/blog/biomimicry-for-children/" className="font-semibold text-[#0F52BA]">
                Explore our blog →
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
