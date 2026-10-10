import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";

const PROGRAMMES = [
  {
    age: "Ages 18 Months – 3 Years",
    title: "Infant & Toddler Community",
    body: "Gentle introduction to independence, language, and movement in a calm, home-like environment.",
    image: "/home-01/kids-being-part-sunday-school.webp",
    href: "/programs/playgroup/",
  },
  {
    age: "Ages 3 – 6 Years",
    title: "Children’s House",
    body: "Foundational Montessori work across language, mathematics, culture, and sensorial exploration.",
    image: "/home/homepage-banner-01.webp",
    href: "/programs/nursery-school/",
  },
  {
    age: "Ages 6 – 9 Years",
    title: "Lower Elementary",
    body: "Research, collaboration, and abstract thinking introduced through hands-on Montessori materials.",
    image: "/home-01/awards-01-min.webp",
    href: "/programs/primary-school-elementary/",
  },
  {
    age: "Ages 9 – 12 Years",
    title: "Upper Elementary",
    body: "Deep study of the natural world, history, and mathematics through the Great Lessons approach.",
    image: "/home-01/awards-02-min.webp",
    href: "/programs/primary-school-elementary/",
  },
];

export default function FourProgrammes() {
  return (
    <section aria-label="Our Programmes" className="bg-white py-14 sm:py-20 border-t border-neutral-200">
      <Container>
        <div className="text-center max-w-3xl mx-auto pb-10 sm:pb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
            Our Programmes
          </h2>
        </div>

        {/* 4 Cards: Desktop 4 side by side, Mobile 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMMES.map((prog, idx) => (
            <article
              key={idx}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                {/* Image 4:3 ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Age Range Chip overlay */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-neutral-800 shadow-sm">
                      {prog.age}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-neutral-900 leading-snug">
                    {prog.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {prog.body}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={prog.href}
                  className="inline-flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs font-semibold text-neutral-800 transition-all hover:border-[#0F52BA] hover:bg-[#0F52BA] hover:text-white"
                  aria-label={`Learn more about ${prog.title}`}
                >
                  <span>Learn More</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
