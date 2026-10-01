import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import StickyPillsNav from "@/components/ui/StickyPillsNav";
import PageJsonLd from "@/components/seo/PageJsonLd";

const NAV = [
  { label: "What Is Montessori", href: "#what-is", id: "what-is" },
  { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { label: "Four Planes", href: "#four-planes", id: "four-planes" },
  { label: "Glossary", href: "#glossary", id: "glossary" },
  { label: "Blue Blocks and AMI", href: "#blue-blocks-ami", id: "blue-blocks-ami" },
  { label: "FAQ", href: "#faq", id: "faq" },
];

const GLOSSARY = [
  {
    id: "absorbent-mind",
    term: "Absorbent Mind",
    definition:
      "The child's capacity from birth to age six to absorb the environment unconsciously and without effort. The child does not learn by being taught; they construct themselves from what surrounds them.",
  },
  {
    id: "sensitive-periods",
    term: "Sensitive Periods",
    definition:
      "Time-limited windows when a child is drawn intensely to specific learning: language, order, movement. Learning during these windows is effortless; once the window closes, it requires conscious effort.",
  },
  {
    id: "prepared-environment",
    term: "The Prepared Environment",
    definition:
      "A space where every material, surface, and routine has a specific developmental purpose. The environment itself teaches; the adult prepares it and steps back.",
  },
  {
    id: "control-of-error",
    term: "Control of Error",
    definition:
      "Every Montessori material shows the child whether they have succeeded, without teacher intervention. The child sees the mistake and corrects it themselves.",
  },
  {
    id: "work-cycle",
    term: "The Work Cycle",
    definition:
      "The uninterrupted morning period of two and a half to three hours during which children choose and repeat their own work at their own pace. No bells, no forced transitions.",
  },
  {
    id: "cosmic-education",
    term: "Cosmic Education",
    definition:
      "The Primary curriculum (ages 6 to 12) that begins with the universe and works inward. The story of the cosmos comes before geography or history, nothing is taught in isolation.",
  },
  {
    id: "three-period-lesson",
    term: "The Three-Period Lesson",
    definition:
      "The guide's core teaching technique: Period 1 naming, Period 2 recognition, Period 3 recall. Always given individually or in small groups, never to the whole class.",
  },
  {
    id: "valorization",
    term: "Valorization",
    definition:
      "The adolescent's need to prove their worth through real, consequential work, not through praise, but through genuine contribution that matters beyond the classroom.",
  },
  {
    id: "planes-of-development",
    term: "Planes of Development",
    definition:
      "Dr Montessori's four distinct phases of human development, each requiring a different environment. First Plane (0 to 6), Second Plane (6 to 12), Third Plane (12 to 18), Fourth Plane (18 to 24).",
  },
  {
    id: "the-guide",
    term: "The Guide",
    definition:
      "The Montessori term for the teacher. A guide observes, prepares the environment, introduces materials at the right moment, and steps back. The most active person in the room is always the child.",
  },
  {
    id: "grace-and-courtesy",
    term: "Grace and Courtesy",
    definition:
      "The deliberate teaching of social behaviour through precise demonstration: greeting, interrupting politely, resolving disagreement. Practiced until it becomes the child's own.",
  },
  {
    id: "erdkinder",
    term: "The Erdkinder",
    definition:
      'Literally "children of the earth." Dr Montessori\'s vision for adolescents: real economic work in a genuine community. At Blue Blocks: the Micro-Economy, Innovation Labs, and the CubeSat programme.',
  },
  {
    id: "deviations",
    term: "Deviations",
    definition:
      "Behaviours that appear when a child's developmental needs are not met: aggression, withdrawal, poor concentration. Not character flaws, symptoms of an environment that are not serving the child.",
  },
];

const FAQS = [
  {
    q: "Is Montessori only for pre-primary or nursery children?",
    a: "No. The Montessori method spans birth to adulthood across four distinct planes of development. At Blue Blocks, authentic AMI Montessori is practised continuously from 15 months through to 16 years: Infant and Toddler, Pre-Primary, Primary, and Secondary School. The method does not stop at age 6; it deepens.",
  },
  {
    q: "Is Montessori better than traditional school?",
    a: "The Montessori method and traditional schooling are built on different assumptions about how children learn. The research evidence, including longitudinal studies, consistently shows Montessori children develop stronger executive function, academic outcomes, and social skills.",
  },
  {
    q: "What age should my child start Montessori?",
    a: "The earlier the better, within each plane's readiness. The Infant and Toddler environment accepts children from 15 months. The Pre-Primary environment from 2.5 years. A child who starts at 2.5 gains three full years in the first plane, the most sensitive window of human development. A child joining at 5 gains one year. Both benefit; the outcomes differ.",
  },
  {
    q: "Does Montessori prepare children for board exams and traditional universities?",
    a: "Yes. Blue Blocks is affiliated with Cambridge International for Grades 7 through 10, and our children consistently meet or exceed the requirements of all major boards in India. Parents regularly hear from receiving schools that Blue Blocks children are the only ones who can work independently for a sustained period.",
  },
  {
    q: "How do Montessori children adjust to traditional high schools or universities?",
    a: "Exceptionally well. Because they have spent years developing executive function, adaptability, and a genuine love for learning, they view new environments and testing structures simply as new systems to master, rather than threats to fear. They enter the world as capable, self-advocating learners.",
  },
  {
    q: "What does Authentic AMI mean, and why does it matter?",
    a: "Not all schools calling themselves Montessori are equivalent. AMI, the Association Montessori Internationale, is the body Dr Montessori founded to protect the integrity of her method, requiring AMI-trained guides and AMI-standard materials. At Blue Blocks, every lead guide holds the AMI diploma for their age group.",
  },
  {
    q: "Is Montessori too unstructured? Will my child learn discipline?",
    a: "The discipline developed in Montessori is internal, not imposed. A child who chooses their own work, sets their own pace, and sees it through to completion has built the only kind of self-discipline that persists into adulthood.",
  },
];

const QUOTES = [
  {
    name: "Larry Page",
    role: "Co-founder, Google",
    quote:
      "We both went to Montessori school, and I think it was part of that training of being self-motivated, questioning what's going on in the world, doing things a little bit different.",
    source: "Source: ABC News interview with Barbara Walters, 2004",
  },
  {
    name: "Sergey Brin",
    role: "Co-founder, Google",
    quote:
      "I benefited from Montessori education, which in some ways gives the students a lot more freedom to do things at their own pace, to discover. Some of the credit for the willingness to go on your own interests, you can tie that back to that Montessori education.",
    source: "Source: Interview with Evan Williams, 2004",
  },
  {
    name: "Jeff Bezos",
    role: "Founder, Amazon",
    quote:
      "I remember having a little special board that you can use to practice tying your shoes. I have these very clear visual images of tracing out letters on sandpaper.",
    source: "Source: Interview with journalist Steven Levy, Wired Magazine",
  },
  {
    name: "Stephen Curry",
    role: "NBA Champion, Golden State Warriors",
    quote:
      "Montessori gave me a lot of confidence at a young age. I used to love it when I came to school because there was something new I was going to learn every single day.",
    source: "Source: Video interview with the Montessori School of Lake Forest",
  },
  {
    name: "Gabriel Garcia Marquez",
    role: "Nobel Laureate in Literature",
    quote:
      "I do not believe there is a method better than Montessori for making children sensitive to the beauties of the world and awakening their curiosity regarding the secrets of life.",
    source: "Source: Quoted in multiple literary biographies and Montessori alumni documentation",
  },
  {
    name: "Alexander Graham Bell",
    role: "Inventor, Telephone",
    quote:
      "I like the Montessori method. It teaches through play. It makes learning a pleasure. It follows the natural instincts of the human being. The present system casts the brain into a mould. It does not encourage original thought or reasoning.",
    source: "Source: Public statement, documented in AMI historical records",
  },
  {
    name: "Mahatma Gandhi",
    role: "",
    quote:
      "If we are to achieve real peace in the world, we shall have to begin with children.",
    source: "Source: Spoken at a Montessori Teacher Training Centre, London, 1931",
  },
  {
    name: "Peter Drucker",
    role: "Founder of Modern Management",
    quote:
      "For thousands of years people have been talking about improving teaching, to no avail. Montessori actually did it.",
    source: "Source: Documented in Montessori advocacy literature",
  },
];

const RELATED_BLOGS = [
  {
    title:
      "What Project-Based and Experiential Learning Actually Look Like in a Montessori Classroom",
    author: "Pavan Goyal",
    href: "/blog/project-based-learning-montessori-real-life/",
    image: "/programs/the-adolescent-community/image-02.webp",
  },
  {
    title:
      "Raising Curious Children: How does curiosity at age 3 become a project at age 13?",
    author: "Munira Hussain",
    href: "/blog/raising-curious-children-age-3-to-13/",
    image: "/programs/playgroup/image-01.webp",
  },
];

const PLANES = [
  {
    name: "First Plane : The Absorbent Mind (0 to 6 years)",
    command: '"Help me to do it myself."',
    text: "The child absorbs the environment without conscious effort. Language, movement, order, and culture become part of the self before the child is aware of learning. The adult's job is to protect concentration and resist the urge to interfere.",
    explores: [
      { label: "Nursery programme (0 to 3)", href: "/programs/playgroup/" },
      { label: "Pre-Primary programme (3 to 6)", href: "/programs/nursery-school/" },
    ],
  },
  {
    name: "Second Plane — The Reasoning Mind (6 to 12 years)",
    command: '"Help me to understand for myself."',
    text: "The child needs to understand everything, not just experience it. This is the age of imagination, moral awakening, and the passionate sense of justice. The curriculum begins not with the immediate environment but with the universe. Nothing is taught in isolation.",
    explores: [
      {
        label: "Primary programme (6 to 12)",
        href: "/programs/primary-school-elementary/",
      },
    ],
  },
  {
    name: "Third Plane — The Social Mind (12 to 18 years)",
    command: '"Help me to think with society."',
    text: "Dr Montessori called the adolescent a social newborn. The primary need is Valorization: discovering one's own worth through real, consequential work. At Blue Blocks this is the Micro-Economy, the Innovation Labs, and the student-built CubeSat.",
    explores: [
      {
        label: "Secondary School programme (12 to 16)",
        href: "/programs/secondary-school/",
      },
    ],
  },
  {
    name: "Fourth Plane — The Moral Adult (18 to 24 years)",
    command: 'Inner command: "Help me to find my place in the world."',
    text: "The fourth plane is university and early adulthood: the period of finding one's civic and moral role in society. Blue Blocks does not serve the fourth plane directly, but everything the first three planes build is preparation for it. The concentration, the self-direction, the ethical compass, and the love of learning that arrive at adulthood intact.",
    explores: [],
  },
];

const HOW_IT_WORKS = [
  {
    title: "The Prepared Environment",
    text: "Every material and routine has a specific developmental purpose. The environment teaches; the adult steps back.",
  },
  {
    title: "The AMI-Trained Guide",
    text: "A trained observer who knows when to introduce a new material and, equally important, when to wait.",
  },
  {
    title: "The Uninterrupted Work Cycle",
    text: "Two and a half to three hours each morning. No bells, no forced transitions. Concentration cannot form when constantly interrupted.",
  },
  {
    title: "The Mixed-Age Community",
    text: "Children of different ages share the same environment. Younger children learn by watching older ones. Older children consolidate their understanding by helping younger ones. Leadership is not taught as a subject; it emerges naturally from a community that lives it.",
  },
];

export function buildMontessoriSystemSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://blueblocks.in/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Montessori System",
          item: "https://blueblocks.in/montessori-system/",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Montessori Glossary — Terms Every Parent Should Know",
      itemListElement: GLOSSARY.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "DefinedTerm",
          name: item.term,
          description: item.definition,
          url: `https://blueblocks.in/montessori-system/#${item.id}`,
          inDefinedTermSet: "https://blueblocks.in/montessori-system/#glossary",
        },
      })),
    },
  ];
}

export default function MontessoriSystemContent() {
  return (
    <>
      <PageJsonLd baseId="montessori-system" schema={buildMontessoriSystemSchema()} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src="/innovation/innov_hero.webp"
          alt="Montessori classroom at Blue Blocks School Hyderabad"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-950/65" aria-hidden="true" />
        <div className="relative pt-32 sm:pt-36 pb-16 sm:pb-20">
          <Container className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              What Is Montessori Education?
            </h1>
            <blockquote className="mt-8 text-lg sm:text-xl leading-relaxed font-medium text-white/95">
              &ldquo;One test of the correctness of educational procedure is the happiness of
              the child.&rdquo;
            </blockquote>
            <p className="mt-3 text-sm sm:text-base text-white/80">Dr Maria Montessori</p>
            <p className="mt-6 text-base sm:text-lg text-[#F3E3CF] font-semibold">
              A Timeless Method for the Future Human
            </p>
          </Container>
        </div>
      </section>

      <StickyPillsNav
        items={NAV}
        ariaLabel="Montessori System section navigation"
        defaultActive="what-is"
      />

      {/* SECTION 1 — What Is Montessori */}
      <section id="what-is" className="scroll-mt-36 sm:scroll-mt-44 py-14 sm:py-18 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What Is Montessori Education?
            </h2>
            <div className="mt-6 space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>
                Dr Maria Montessori was a physician and a scientist. Through rigorous
                observation of children, she discovered that traditional education, built on
                instruction and forced compliance, obstructs natural human development. She did
                not invent a teaching method; she discovered the exact environmental conditions
                under which children naturally teach themselves.
              </p>
              <p>
                The child is not an empty vessel to be filled. The child is the architect of
                their own intelligence.
              </p>
              <blockquote className="border-l-4 border-[#2C2F8F] pl-4 italic text-slate-800">
                &ldquo;Never help a child with a task at which he feels he can succeed.&rdquo;{" "}
                <span className="not-italic font-medium">Dr Maria Montessori</span>
              </blockquote>
            </div>
            <p className="mt-8 text-sm sm:text-base text-slate-700">
              New to Montessori? Explore our programmes:{" "}
              <Link href="/programs/playgroup/" className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060]">
                Nursery (0 to 3)
              </Link>
              {" | "}
              <Link href="/programs/nursery-school/" className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060]">
                Pre-Primary (3 to 6)
              </Link>
              {" | "}
              <Link href="/programs/primary-school-elementary/" className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060]">
                Primary (6 to 12)
              </Link>
              {" | "}
              <Link href="/programs/secondary-school/" className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060]">
                Secondary (12 to 16)
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — How It Works */}
      <section id="how-it-works" className="scroll-mt-36 sm:scroll-mt-44 py-14 sm:py-18 bg-[#F3E3CF]/40">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How Does Montessori Work?
            </h2>
            <div className="mt-6 space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>
                Traditional education: the teacher holds knowledge, the child receives it.
                Montessori inverts this. AMI-trained Guides prepare a precise environment with
                scientifically designed materials. Children choose their own work, repeat it
                until mastered, correct their own mistakes, and move on when genuinely ready.
              </p>
              <p className="font-semibold text-slate-900">
                This is not unguided play. It is purposeful independence.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {HOW_IT_WORKS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3 — Four Planes */}
      <section id="four-planes" className="scroll-mt-36 sm:scroll-mt-44 py-14 sm:py-18 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center">
              The Four Planes of Development
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed text-center max-w-3xl mx-auto">
              Dr Montessori identified four distinct phases of human development, each requiring
              a completely different environment and a different role from the adult. Blue Blocks
              serves the first three planes, from 15 months to 16 years.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {PLANES.map((plane) => (
                <article
                  key={plane.name}
                  className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-7"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{plane.name}</h3>
                  <p className="mt-3 text-sm font-semibold text-[#2C2F8F]">{plane.command}</p>
                  <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                    {plane.text}
                  </p>
                  {plane.explores.length > 0 ? (
                    <p className="mt-5 text-sm text-slate-700">
                      Explore:{" "}
                      {plane.explores.map((link, i) => (
                        <span key={link.href}>
                          {i > 0 ? " | " : null}
                          <Link
                            href={link.href}
                            className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060]"
                          >
                            {link.label}
                          </Link>
                        </span>
                      ))}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 4 — Glossary */}
      <section id="glossary" className="scroll-mt-36 sm:scroll-mt-44 py-14 sm:py-18 bg-[#EEF7FD]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Montessori Glossary — Terms Every Parent Should Know
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed">
              These are the concepts that underpin everything that happens inside a Blue Blocks
              classroom. Each term was coined by Dr Montessori from her clinical observation of
              children. They are precise, not decorative.
            </p>
            <div className="mt-10 space-y-8">
              {GLOSSARY.map((item) => (
                <div key={item.id} id={item.id} className="scroll-mt-40">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">{item.term}</h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 5 — Blue Blocks, AMI, IMF */}
      <section id="blue-blocks-ami" className="scroll-mt-36 sm:scroll-mt-44 py-14 sm:py-18 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Blue Blocks, AMI, and the Indian Montessori Foundation
            </h2>
            <div className="mt-6 space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>
                Blue Blocks has practised authentic AMI Montessori in Hyderabad since 2009,
                continuously from 15 months to 16 years. Every lead guide holds the AMI diploma
                for their age group.
              </p>
              <p>
                Our founder Pavan Goyal holds all four AMI diplomas (0 to 3, 3 to 6, 6 to 12, and
                12 to 18) and serves as a Trustee of the Indian Montessori Foundation, the
                national body advancing authentic Montessori practice across India.
              </p>
            </div>
            <ul className="mt-6 space-y-2 text-sm sm:text-base">
              <li>
                <a
                  href="https://montessori-india.org/trustees/pavan-goyal-2/"
                  target="_blank"
                  rel="noopener"
                  className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060]"
                >
                  Pavan Goyal on the IMF Trustees page
                </a>
              </li>
              <li>
                <a
                  href="https://montessori-india.org"
                  target="_blank"
                  rel="noopener"
                  className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060]"
                >
                  Indian Montessori Foundation
                </a>
              </li>
              <li>
                <a
                  href="https://montessori-ami.org"
                  target="_blank"
                  rel="noopener"
                  className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060]"
                >
                  Association Montessori Internationale
                </a>
              </li>
            </ul>
            <div className="mt-8 space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>
                Blue Blocks also operates the Blue Blocks Micro Research Institute: a
                longitudinal research programme embedded within the school, tracking how
                innovation capacity develops across the full 0 to 18 developmental arc. Seventeen
                years of continuous observation. Findings re-enter the classroom. Observation
                generates research; research changes practice.
              </p>
              <p>
                <a
                  href="https://research.blueblocks.in"
                  target="_blank"
                  rel="noopener"
                  className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060]"
                >
                  Blue Blocks Micro Research Institute
                </a>
              </p>
              <p>
                Considering becoming a Montessori guide?{" "}
                <Link
                  href="/ami-montessori-training/"
                  className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060]"
                >
                  See our complete guide to AMI Montessori teacher training in India.
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 6 — Montessori for Success */}
      <section className="py-14 sm:py-18 bg-[#F3E3CF]/35">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center">
            Montessori for Success
          </h2>
          <div className="quotes-strip mt-10 flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 md:grid md:grid-cols-3 md:overflow-visible md:gap-6 md:pb-0">
            {QUOTES.map((item) => (
              <div
                key={item.name}
                className="quote-card snap-start shrink-0 w-[85%] md:w-auto md:min-w-0 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm"
              >
                <p className="quote-text text-sm sm:text-base text-slate-800 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="quote-name mt-5 text-sm font-bold text-slate-900">
                  {item.name}
                  {item.role ? ` — ${item.role}` : ""}
                </p>
                <p className="quote-source mt-2 text-xs text-slate-500 italic">{item.source}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 7 — FAQ (CSS accordion; answers always in DOM) */}
      <section id="faq" className="scroll-mt-36 sm:scroll-mt-44 py-14 sm:py-18 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 space-y-3">
              {FAQS.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] open:bg-white open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-4">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug pr-2">
                      {item.q}
                    </h3>
                    <span
                      className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full bg-[#EAF4FF] text-[#1f3b82] flex items-center justify-center text-lg leading-none group-open:rotate-45 transition-transform"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-14 sm:py-18 bg-[#2C2F8F] text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              See It for Yourself
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white/90 leading-relaxed">
              The most accurate way to understand Montessori is to watch it. Sit quietly in the
              corner of a Blue Blocks classroom and observe. The concentration, the calm, the
              children moving with purpose. These cannot be described as well as they can be
              seen.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/admissions/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#2C2F8F] font-bold text-sm hover:bg-[#F3E3CF] transition-colors"
              >
                Book an Admission Workshop
              </Link>
              <Link
                href="/programs/playgroup/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Explore Our Programmes
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* RELATED BLOGS */}
      <section className="py-14 sm:py-18 bg-[#F8FAFC]">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Related blogs
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {RELATED_BLOGS.map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      quality={90}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-[#2C2F8F] transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-500 font-medium">{post.author}</p>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2C2F8F]">
                      <span>Read</span>
                      <span className="group-hover:translate-x-1 transition-transform" aria-hidden>
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
