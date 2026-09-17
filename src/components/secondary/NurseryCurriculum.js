"use client";

import { useState } from "react";
import SectionNav from "@/components/secondary/SectionNav";
import Container from "@/components/layout/Container";
import Link from "next/link";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────────────────
   DATA STRUCTS
   Matches the anchor links used across the site for nursery school
   What Is Taught, A Typical Day, What Your Child Gains, Our Guides, FAQ
───────────────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "curriculum",  label: "What Is Taught" },
  { id: "day",         label: "A Typical Day" },
  { id: "development", label: "What Your Child Gains" },
  { id: "guides",      label: "Our Guides" },
  { id: "faq",         label: "FAQ" },
];

const highlights = [
  {
    title: "Independent 3-Year-Olds",
    body: "Children dress themselves, prepare food, and care for the environment through real, purposeful daily work.",
    accent: "#1f3b82",
    bg: "#EAF4FF"
  },
  {
    title: "20+ Minute Concentration",
    body: "Sustained, self-chosen focus. What next schools notice first when a Blue Blocks child arrives.",
    accent: "#0f766e",
    bg: "#F0FDF9"
  },
  {
    title: "Writing Before Reading",
    body: "Sandpaper Letters, Moveable Alphabet. The 'explosion into reading' unfolds naturally.",
    accent: "#7c3aed",
    bg: "#F5F3FF"
  },
  {
    title: "Maths Through Materials",
    body: "Golden Beads, Stamp Game, Number Rods. Children hold a thousand before they write it.",
    accent: "#c2410c",
    bg: "#FFF7ED"
  },
  {
    title: "AMI Primary Diploma Guides",
    body: "The internationally recognised Montessori qualification for ages 3–6, awarded by Association Montessori Internationale.",
    accent: "#b91c1c",
    bg: "#FFF1F2"
  },
  {
    title: "Three-Year Continuous Cycle",
    body: "Nursery, PP1, PP2 in one prepared environment. Mixed-age community. Individualised pacing.",
    accent: "#92400e",
    bg: "#FFFBEB"
  }
];

const fiveAreas = [
  { area: "Everyday Life", what: "Independence, self-discipline, coordinated movement through real daily tasks." },
  { area: "Sensorial", what: "Ordered mind, clear perception, the groundwork for logical thought and mathematics." },
  { area: "Mathematics", what: "Concrete-to-abstract number sense, from 1 to 1,000 held in the hand." },
  { area: "Language", what: "Writing before reading; the 'explosion into reading' unfolds naturally." },
  { area: "Culture & Science", what: "Geography, botany, zoology, time, and the world beyond the classroom." }
];

const everydayLife = [
  { activity: "Dressing Frames", what: "Buttons, zips, buckles, laces; mastered through practice on purpose-built frames." },
  { activity: "Care of Environment", what: "Scrub tables, sweep floors, water plants, arrange flowers." },
  { activity: "Food Preparation", what: "Cut fruit, make sandwiches, squeeze juice, set and clear the table." },
  { activity: "Grace & Courtesy", what: "Greeting people, asking to join a group, resolving disagreements." },
  { activity: "Silence Game", what: "Group stillness exercise; builds remarkable concentration in a child as young as three." }
];

const sensorial = [
  { material: "Pink Tower & Brown Stairs", what: "Size, dimensional order, and spatial reasoning." },
  { material: "Geometric Cabinet & Solids", what: "Shape recognition; plane and three-dimensional." },
  { material: "Colour Tablets", what: "Colour identification and grading from darkest to lightest." },
  { material: "Baric, Thermic, Fabric Tablets", what: "Weight, temperature, and texture discrimination through touch." },
  { material: "Sound Cylinders & Bells", what: "Sound matching and musical pitch discrimination." },
  { material: "Stereognostic Bag", what: "Object identification by touch alone." }
];

const maths = [
  { material: "Number Rods & Sandpaper Numbers", what: "Counting 1 to 10; symbol recognition through touch." },
  { material: "Golden Bead Material", what: "Decimal system - 1, 10, 100, 1,000 held in the hand." },
  { material: "Teen & Ten Boards", what: "Building the numbers 11 to 99." },
  { material: "Stamp Game", what: "Addition, subtraction, multiplication, division with concrete tokens." },
  { material: "Bead Chains", what: "Multiplication tables and skip counting made visible." },
  { material: "Fraction Circles", what: "Halves, thirds, tenths; an early meeting with fractions." }
];

const readingWriting = [
  { material: "Sound Games", what: "Hearing individual sounds inside words; the foundation of phonemic awareness." },
  { material: "Sandpaper Letters", what: "Sound-to-symbol connection through tracing letters with two fingers." },
  { material: "Metal Insets", what: "Pencil control and the precise hand movement writing requires." },
  { material: "Moveable Alphabet", what: "Building words and sentences before writing by hand." },
  { material: "Grammar Symbols", what: "Colour-coded understanding of nouns, verbs, adjectives; grammar as a game." }
];

const scienceGeography = [
  { area: "Geography", what: "Continents and countries via puzzle maps; world flags; cultural exploration." },
  { area: "Land & Water Forms", what: "Islands, lakes, peninsulas; felt through tactile water trays." },
  { area: "Botany", what: "Leaf identification, real flower dissection, plant anatomy." },
  { area: "Zoology", what: "Animal classification; parts of a fish, a bird, a frog." },
  { area: "Science Experiments", what: "Magnets, floating and sinking, colour mixing." },
  { area: "Time", what: "Days of the week, seasons, personal timeline from the child's own birth." }
];

const assessmentProgress = [
  { mechanism: "Guide's Observation Records", detail: "Systematic tracking of presentations given, materials chosen, and concepts mastered." },
  { mechanism: "Daily Dismissal Observation", detail: "A brief specific note shared with parents at pickup on what the child worked on." },
  { mechanism: "Termly Parent Observations", detail: "Booked classroom observation slots each term to see the child at work in the environment." },
  { mechanism: "Parent–Guide Conferences", detail: "Structured conversation reviewing the child's specific work, choices, and next-cycle direction. Held twice a year in an individualized format." },
  { mechanism: "No Grades or Rankings", detail: "Progress documented in specifics, not comparisons. A detailed child developmental log is maintained." }
];

const scheduleRows = [
  { time: "9:00 AM", what: "Arrival & Settling in", detail: "Child is greeted by their guide, puts bag away, chooses their first piece of work." },
  { time: "9:15 AM - 12:00 PM", what: "Morning Work Cycle", detail: "2.5–3 hours. Child-led. Guide observes and introduces new materials individually or in small groups when ready. No whole-class lessons." },
  { time: "10:30 AM (Flexible)", what: "Snack", detail: "Child decides when to take snack. Self-served from the snack table. Not a group activity." },
  { time: "12:00 PM", what: "Group Time", detail: "Songs, movement, brief gathering. The Silence Game. Walking on the Line." },
  { time: "12:30 PM", what: "Dismissal & Pickup", detail: "Guide shares a brief observation of what the child worked on. Termly classroom observation slots available for parents." }
];

const guideTeam = [
  { id: 1, name: "Guide to be confirmed", qualification: "AMI Primary Diploma (3–6)", role: "Lead Guide" },
  { id: 2, name: "Guide to be confirmed", qualification: "AMI Primary Diploma (3–6)", role: "Guide" },
  { id: 3, name: "Guide to be confirmed", qualification: "AMI Primary Asst. / Diploma", role: "Guide" }
];

const parentGains = [
  { title: "Sustained Concentration", detail: "Sits with one task for twenty minutes or more, not because an adult asks, but because they chose it. Parents regularly hear from their child's next school that theirs is the only one who can work independently for a sustained stretch." },
  { title: "Genuine Independence", detail: "Starts and finishes tasks without being reminded. Works out what needs to happen, in what order, and sees it through." },
  { title: "Controlled Movement", detail: "Hands and mind working together. Handling things gently and with purpose." },
  { title: "Social Grace", detail: "Kindness and patience with children of different ages, developed through daily life in a mixed-age community where older children naturally look after younger ones." }
];

const faqs = [
  {
    q: "What is a Montessori preschool?",
    a: "A Montessori preschool is an early-years environment designed around the child, not the curriculum. Children choose their own work from carefully prepared materials, move at their own pace, and are guided individually rather than taught in whole-class lessons. The approach was developed by Dr Maria Montessori over a century ago and is now practised worldwide, with the Association Montessori Internationale (AMI) as the international standard body."
  },
  {
    q: "What age can my child start at your Montessori preschool?",
    a: "Children can start from 2.5 years. They join the Nursery year between 2.5 and 3, and continue through PP1 and PP2 until age 6. Children joining from other preschools in Hyderabad are welcome at any stage. For younger children (0–3), our Toddler programme is the earlier entry point in the Blue Blocks continuum."
  },
  {
    q: "When should my child start preschool?",
    a: "In the Montessori framework, the ideal starting age is between 2.5 and 3, when children are developmentally ready to work independently in a prepared environment and gain the most from the three-year cycle. Children joining later than 3 also settle in well and benefit from the mixed-age community, but the earlier the start, the fuller the three-year experience."
  },
  {
    q: "What does my child actually learn in Nursery, PP1, and PP2?",
    a: "Five areas of learning. Everyday life skills like dressing, food preparation, and caring for the classroom. Careful observation, learning to sort by size, shape, colour, sound, and texture. Mathematics, from counting to fractions, all taught through hands-on materials. Reading and writing, built from sounds and letters up to whole words and grammar. And science and the world, countries, plants, animals, simple experiments, and an understanding of time."
  },
  {
    q: "How is a Montessori preschool different from a regular preschool or playschool?",
    a: "In a conventional preschool, the teacher leads and the children follow as a group. In a Montessori preschool, the child chooses their own work, moves at their own pace, and is never interrupted mid-activity. The guide introduces new work when the child is ready, individually, not to the whole class. The result is a child who is genuinely independent, not one who has simply memorised more."
  },
  {
    q: "Is Montessori worth the money?",
    a: "What a child gains in three Montessori preschool years, sustained concentration, genuine independence, controlled movement, social grace, an early love of learning, is what parents most often report as the biggest gap in other schools' outputs. The value shows most clearly at the next school, when other parents notice their child struggles with what a Montessori child does naturally. Fees vary; the value is in the outcomes."
  },
  {
    q: "My child already knows how to read. Is a Montessori preschool still right for them?",
    a: "Yes, and often especially so. The Montessori preschool years are not primarily about academics. They build the qualities beneath academic ability: concentration, independence, self-regulation, and the love of learning for its own sake. A child who can read but cannot sustain focus or work without constant adult approval benefits enormously."
  },
  {
    q: "How does a mixed-age Montessori classroom work?",
    a: "Children aged 2.5 to 6 work in the same room. A younger child learns by watching an older one. An older child deepens their own understanding by helping a younger one. Older children look after the younger ones naturally, not because they are told to, but because the environment makes it the obvious thing to do. This is one of the most powerful features of the Montessori model."
  },
  {
    q: "What does a typical day look like?",
    a: "A two-and-a-half to three-hour morning work period where each child chooses their own activities and works at their own pace, takes snack when ready, and joins a brief group gathering before pickup. No bells, no forced group transitions, and a short observation shared with you at the end of each day."
  },
  {
    q: "What comes after the preschool programme?",
    a: "Children move on to our Elementary programme for ages 6 to 12, the same school, the same community, the next stage of an unbroken Montessori journey. The full pathway continues to the Erdkinder programme at Grade 7 (ages 12–16), where children take Cambridge Lower Secondary and Cambridge IGCSE.",
    renderA: (
      <>
        Children move on to our{" "}
        <Link href="/programs/primary-school-elementary/class-1-to-6/" className="text-[#0A4BCE] hover:underline font-semibold">
          Elementary programme
        </Link>{" "}
        for ages 6 to 12, the same school, the same community, the next stage of an unbroken Montessori journey. The full pathway continues to the{" "}
        <Link href="/programs/secondary-school/cambridge-igcse-erdkinder/" className="text-[#0A4BCE] hover:underline font-semibold">
          Erdkinder programme
        </Link>{" "}
        at Grade 7 (ages 12–16), where children take Cambridge Lower Secondary and Cambridge IGCSE.
      </>
    )
  },
  {
    q: "Is Blue Blocks a certified Montessori school in Hyderabad?",
    a: "Blue Blocks is an AMI-guided Montessori school in Hyderabad. Our preschool guides hold the AMI Primary Diploma (3–6). The school has operated since 2005, with the full birth-to-eighteen Montessori programme running since 2017."
  }
];

const researchPubs = [
  { title: "AMI Talks: From the Absorbent Mind to the Innovative Mind", where: "montessori-ami.org/events/ami-talks-absorbent-mind-innovative-mind", notes: "Hosted on AMI canonical domain; discusses the 0–6 absorbent mind foundation." },
  { title: "Blue Blocks Micro Research Methodology (v1.0)", where: "research.blueblocks.in/publications/methodology-v1", doi: "DOI: 10.5281/zenodo.18584816", notes: "Defines the birth-to-eighteen research framework Pre-Primary sits inside." },
  { title: "Blue Blocks Micro Research Institute: Publications Index", where: "research.blueblocks.in/publications", notes: "Research Publications portal." },
  { title: "Association Montessori Internationale: AMI Primary Diploma (3–6)", where: "montessori-ami.org/training-programmes", notes: "External authority reference for the AMI Primary Diploma credential." }
];

/* ─────────────────────────────────────────────────────────────────────────
   LOCAL HELPER COMPONENTS
───────────────────────────────────────────────────────────────────────── */
function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-12">
      <div className="border-l-[3.5px] border-[#A16207] pl-4">
        {eyebrow && (
          <p className="text-[#A16207] text-xs font-bold tracking-wider uppercase mb-1.5">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-4xl text-justify sm:text-left">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function LocalFaqItem({ q, a, renderA }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-[20px] overflow-hidden bg-white shadow-sm transition-all duration-200 hover:border-slate-300">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors focus:outline-none"
          aria-expanded={open}
        >
          <span className="text-base sm:text-lg leading-snug">{q}</span>
          <span
            className="flex-shrink-0 w-7 h-7 rounded-full bg-[#EAF4FF] flex items-center justify-center transition-transform duration-200"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
            aria-hidden="true"
          >
            <svg
              className="w-4 h-4 text-[#1f3b82]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
        </button>
      </h3>
      {open && (
        <div className="px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-5">
          <p>{renderA || a}</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────── */
export default function NurseryCurriculum() {
  // Generate schema structured data for FAQs
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.q === "What comes after the preschool programme?" 
          ? "Children move on to our Elementary programme for ages 6 to 12, the same school, the same community, the next stage of an unbroken Montessori journey. The full pathway continues to the Erdkinder programme at Grade 7 (ages 12-16), where children take Cambridge Lower Secondary and Cambridge IGCSE." 
          : faq.a
      }
    }))
  };

  return (
    <div className="bg-[#FAF9F6] font-sans antialiased text-slate-800">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Hero Header Area */}
      <section className="relative bg-white pt-36 sm:pt-44 pb-20 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Title & Paragraph */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-[#A16207] text-xs font-bold tracking-widest uppercase block border-b border-[#A16207]/20 pb-2 w-max">
                Pre-Primary Curriculum
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                Nursery, PP1, PP2 Curriculum
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed text-justify sm:text-left">
                Blue Blocks runs a Montessori preschool in Hyderabad for children aged 2.5 to 6, the Nursery, PP1, and PP2 years. The programme spans five areas of learning across a three-year continuous cycle in a mixed-age classroom, guided by AMI-certified diploma-holders. There are no worksheets, no bells, and no whole-class lessons. Each child chooses their own work, repeats it as often as they need, and moves on when ready. Children write before they read, count with hands before they see numerals, and build independence through real tasks like dressing themselves, preparing food, caring for the classroom.
              </p>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <Image
                src="/programs/nursery/pink-tower.webp"
                alt="Montessori Preschool Hyderabad — Blue Blocks children Nursery PP1 PP2 with Pink Tower materials"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Programme Highlights Strip */}
      <section className="py-16 bg-[#F5F2EC] border-y border-slate-200">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div
                    className="w-2.5 h-10 rounded-full mb-6"
                    style={{ backgroundColor: h.accent }}
                  />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{h.title}</h3>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed">{h.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Parent Quote Strip */}
          <div className="mt-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <span className="text-[10px] font-bold text-[#A16207] tracking-widest uppercase block mb-6 text-center">
              WHAT PARENTS OBSERVE
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              <div className="pb-6 lg:pb-0 lg:pr-8">
                <p className="text-base text-slate-600 italic leading-relaxed">
                  &quot;Watching our daughter prepare her own snack, clean her work table, and write stories in cursive at age 5 has been a revelation. Montessori at Blue Blocks isn&apos;t just school; it is life preparation.&quot;
                </p>
                <span className="text-xs font-bold text-slate-400 block mt-4">— Parent of PP2 Child</span>
              </div>
              <div className="pt-6 lg:pt-0 lg:pl-8">
                <p className="text-base text-slate-600 italic leading-relaxed">
                  &quot;The concentration and calm my child has developed is remarkable. He will sit with a math material for 30 minutes, completely absorbed. It&apos;s the best investment we&apos;ve made in his future.&quot;
                </p>
                <span className="text-xs font-bold text-slate-400 block mt-4">— Parent of PP1 Child</span>
              </div>
            </div>
          </div>

          {/* Research Line */}
          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-slate-500">
              Informed by published research from the Blue Blocks Micro Research Institute.{" "}
              <a
                href="https://research.blueblocks.in/publications"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A4BCE] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                Explore <span>→</span>
              </a>
            </p>
          </div>
        </Container>
      </section>

      {/* Sticky Section Navigation */}
      <SectionNav items={NAV_ITEMS} />

      {/* ════════════════════════════════════════════════════════════════
          #curriculum (What Is Taught)
      ════════════════════════════════════════════════════════════════ */}
      <section id="curriculum" className="py-20 scroll-mt-[130px] border-b border-slate-200">
        <Container>
          <SectionHeading
            eyebrow="MONTESSORI PRE-PRIMARY"
            title="What Your Child Learns"
            subtitle="Our Montessori preschool in Hyderabad serves children aged 2.5 to 6 across five areas of learning. Everything is hands-on. There are no worksheets and no rote memorisation. Children work through a three-year programme at their own pace, guided by AMI-certified Montessori guides."
          />

          {/* Five Areas of Learning Table */}
          <div className="mb-16 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg">Five Areas of Learning</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                    <th className="px-6 py-4 w-1/4">Area</th>
                    <th className="px-6 py-4 w-3/4">What It Builds</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fiveAreas.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 text-sm md:text-base">{row.area}</td>
                      <td className="px-6 py-4 text-sm md:text-base text-slate-600 leading-relaxed">{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Everyday Life Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">Everyday Life & Independence</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4 w-1/3">Activity</th>
                      <th className="px-6 py-4 w-2/3">What Children Do</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {everydayLife.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900 text-sm">{row.activity}</td>
                        <td className="px-6 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed">{row.what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sensorial Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">Learning to Observe, Sort, and Think</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4 w-1/3">Material</th>
                      <th className="px-6 py-4 w-2/3">What It Trains</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sensorial.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900 text-sm">{row.material}</td>
                        <td className="px-6 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed">{row.what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Maths Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">How Montessori Teaches Maths</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4 w-1/3">Material</th>
                      <th className="px-6 py-4 w-2/3">What It Teaches</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {maths.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900 text-sm">{row.material}</td>
                        <td className="px-6 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed">{row.what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Language Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">How Montessori Teaches Language</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4 w-1/3">Material</th>
                      <th className="px-6 py-4 w-2/3">What It Builds</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {readingWriting.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900 text-sm">{row.material}</td>
                        <td className="px-6 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed">{row.what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Culture & Science Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">Science, Geography & The World</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4 w-1/3">Area</th>
                      <th className="px-6 py-4 w-2/3">What Children Explore</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {scienceGeography.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900 text-sm">{row.area}</td>
                        <td className="px-6 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed">{row.what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Assessment & Progress Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">Assessment & Progress Tracking</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4 w-1/3">Mechanism</th>
                      <th className="px-6 py-4 w-2/3">Detail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {assessmentProgress.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900 text-sm">{row.mechanism}</td>
                        <td className="px-6 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed">{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #day (A Typical Day)
      ════════════════════════════════════════════════════════════════ */}
      <section id="day" className="py-20 bg-[#FCFBF9] scroll-mt-[130px] border-b border-slate-200">
        <Container>
          <SectionHeading
            eyebrow="DAILY SCHEDULE"
            title="A Typical Day"
            subtitle="The morning work period of 2.5–3 hours is the core of the day. No bells. No group transitions. Each child chooses their own work, repeats it as many times as they need, and moves on when they are ready."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Daily Schedule Table inside a card */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">Daily Schedule Details</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4 w-1/4">Time</th>
                      <th className="px-6 py-4 w-1/4">What Happens</th>
                      <th className="px-6 py-4 w-2/4">Detail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {scheduleRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900 text-sm whitespace-nowrap">{row.time}</td>
                        <td className="px-6 py-4 font-semibold text-slate-700 text-sm">{row.what}</td>
                        <td className="px-6 py-4 text-xs sm:text-sm text-slate-500 leading-relaxed">{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Why 3 Years & Joining Info */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-[#FFFDF8] border border-[#F2EAE1] rounded-3xl p-8 shadow-sm">
                <h3 className="text-slate-900 text-lg font-bold mb-4">Why the 3-Year Cycle Matters</h3>
                <p className="text-sm text-slate-600 leading-relaxed text-justify">
                  A Montessori preschool works as a three-year cycle, not a single year. A child joins at 2.5 to 3 and stays through to 6. In the first year the child orients, learning the environment, the materials, and how the community works. The real intellectual work accelerates in years two and three. A child who leaves after one year has only experienced the beginning. Each stage develops something different: the youngest child learns by watching the older ones, the middle child consolidates by doing, and the oldest child deepens their understanding by teaching the younger ones, consistently the most powerful form of learning there is.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <h3 className="text-slate-900 text-lg font-bold mb-4">Joining from Another Preschool</h3>
                <p className="text-sm text-slate-600 leading-relaxed text-justify mb-4">
                  Children joining our Hyderabad campus from a conventional preschool or playschool are warmly welcomed at any stage. Most three-year-olds settle into the full session within two weeks. Our AMI-certified guides are experienced in supporting this transition gently, without rushing it.
                </p>
                <div className="border-t border-slate-100 pt-4 mt-4 text-xs text-slate-500">
                  For children under 2.5, our Toddler programme (ages 0–3) is the earlier entry point in the Blue Blocks Montessori continuum.{" "}
                  <Link href="/programs/playgroup/montessori-toddler/" className="text-[#0A4BCE] hover:underline font-bold inline-flex items-center gap-0.5">
                    Explore the Toddler programme <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #development (What Your Child Gains)
      ════════════════════════════════════════════─════════════════════ */}
      <section id="development" className="py-20 scroll-mt-[130px] border-b border-slate-200">
        <Container>
          <SectionHeading
            eyebrow="OUTCOMES"
            title="What Your Child Gains in Three Years"
            subtitle="Three years in a Montessori preschool gives a child something a single year cannot. These are the four changes parents notice most, at home, with other children, and when their child moves on to primary school."
          />

          {/* Developments List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {parentGains.map((gain, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="text-xl font-bold text-[#A16207] mb-3">{gain.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-justify sm:text-left">{gain.detail}</p>
              </div>
            ))}
          </div>

          {/* Testimonial Quote */}
          <div className="mt-12 bg-white rounded-3xl border border-[#F2EAE1] bg-gradient-to-r from-[#FFFDF8] to-[#FCFBF9] p-8 shadow-sm relative overflow-hidden">
            <span className="absolute top-4 right-6 text-slate-200/50 text-[10rem] font-serif leading-none select-none pointer-events-none select-none">“</span>
            <div className="relative z-10 max-w-4xl">
              <p className="text-lg font-medium text-slate-700 italic leading-relaxed">
                &quot;I put my son in thinking he&apos;d learn numbers and letters. What I didn&apos;t expect was the phone call from his next school telling me he was the only child in the class who could work independently for more than ten minutes. That&apos;s what three years here actually gave him.&quot;
              </p>
              <span className="text-xs font-bold text-slate-400 block mt-4 uppercase tracking-widest">— Parent, Blue Blocks</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #guides (Our Guides)
      ════════════════════════════════════════════════════════════════ */}
      <section id="guides" className="py-20 bg-[#FCFBF9] scroll-mt-[130px] border-b border-slate-200">
        <Container>
          <SectionHeading
            eyebrow="PREPARED ADULTS"
            title="Our AMI-Certified Montessori Guides"
            subtitle="A Montessori guide's job is not to teach from the front of a room. It is to know each child well enough to introduce the right material at the right moment, and then to step back and let the child's own intelligence do the work. In our Hyderabad Montessori preschool, the most active person in the room is always the child."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Guides Info */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <p className="text-base text-slate-600 leading-relaxed text-justify sm:text-left">
                Our guides hold the AMI Primary Diploma (3–6), the internationally recognised Montessori qualification for this age group, awarded by the Association Montessori Internationale. They are trained in the scientific observation of the child, knowing precisely when to introduce a new material and, equally precisely, when to wait.
              </p>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
                <span className="text-3xl text-emerald-600">🏆</span>
                <div>
                  <h4 className="font-bold text-slate-900">Internationally Standardized Pedagogy</h4>
                  <p className="text-xs text-slate-500 leading-normal mt-0.5">Operated entirely under AMI standards, which provides authentic child-led guidelines.</p>
                </div>
              </div>
            </div>

            {/* Guides Grid / List */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">Guide Team</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4 w-12">#</th>
                      <th className="px-6 py-4">Qualifications</th>
                      <th className="px-6 py-4">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {guideTeam.map((guide, idx) => (
                      <tr key={guide.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-slate-400">{idx + 1}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-slate-900">{guide.name}</div>
                          <div className="text-xs text-slate-500">{guide.qualification}</div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-700 text-sm whitespace-nowrap">{guide.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #faq (FAQ Accordion)
      ════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 scroll-mt-[130px] border-b border-slate-200">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-[#A16207] text-xs font-bold tracking-widest uppercase block mb-2">
              COMMON QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <LocalFaqItem key={idx} q={faq.q} a={faq.a} renderA={faq.renderA} />
            ))}
          </div>
        </Container>
      </section>

      {/* Related Research */}
      <section className="py-20 bg-[#FCFBF9] border-b border-slate-200">
        <Container>
          <div className="max-w-3xl mb-12">
            <span className="text-[#A16207] text-xs font-bold tracking-wider uppercase block mb-2">
              PEDAGOGICAL BACKGROUND
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Related Research
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Canonical institutional sources for the pedagogy and framework referenced above. Links point to Blue Blocks Micro Research Institute and Association Montessori Internationale (AMI) canonical pages.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                    <th className="px-6 py-4 w-1/2">Source & Citation</th>
                    <th className="px-6 py-4 w-1/2">Where to Read</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {researchPubs.map((pub, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 text-sm sm:text-base">{pub.title}</div>
                        {pub.doi && <div className="text-xs text-slate-400 mt-1">{pub.doi}</div>}
                        <div className="text-xs text-slate-400/80 mt-0.5">{pub.notes}</div>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`https://${pub.where}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0A4BCE] hover:underline font-semibold text-xs sm:text-sm break-all"
                        >
                          {pub.where}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] bg-[size:16px_16px]" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">
              See It for Yourself
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              The best way to understand our Montessori preschool in Hyderabad is to see it. Sit quietly in the corner and watch the concentration, the calm, and the children moving with purpose.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                href="/contact/"
                className="bg-[#0A4BCE] hover:bg-[#0840B0] transition-colors text-white font-semibold px-8 py-4 rounded-full w-full sm:w-auto"
              >
                Book a Free Observation →
              </Link>
              <a
                href="#"
                className="bg-transparent hover:bg-white/10 transition-colors border border-white/30 text-white font-semibold px-8 py-4 rounded-full w-full sm:w-auto text-center"
              >
                Download Pre-Primary Programme Guide (PDF)
              </a>
            </div>
            <p className="mt-6 text-slate-500 text-xs sm:text-sm">
              Free, unhurried, and held at our Hyderabad campus.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
