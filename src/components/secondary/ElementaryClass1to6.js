"use client";

import SectionNav from "@/components/secondary/SectionNav";
import FaqItem from "@/components/secondary/FaqItem";
import Container from "@/components/layout/Container";
import Link from "next/link";
import Image from "next/image";
import AcademicsTabs from "@/components/secondary/AcademicsTabs";
import MentorsGrid from "@/components/secondary/MentorsGrid";
import InnovationGallery from "@/components/innovations/InnovationGallery";

/* ─────────────────────────────────────────────────────────────────────────
   IMAGE IMPORTS
───────────────────────────────────────────────────────────────────────── */
import imgHero1 from "@/assets/primary school/1M7A0352.webp";
import imgHero2 from "@/assets/primary school/1M7A0385.webp";
import imgLab1 from "@/assets/primary school/1M7A0406.webp";
import imgLab2 from "@/assets/primary school/1M7A0545.webp";
import imgMaterials1 from "@/assets/primary school/1M7A5936.webp";
import imgMaterials2 from "@/assets/primary school/1M7A5950.webp";
import imgGoingOut1 from "@/assets/primary school/1M7A0559.webp";
import galleryImages from "@/assets/nursery";

/* ─────────────────────────────────────────────────────────────────────────
   DATA STRUCTS
───────────────────────────────────────────────────────────────────────── */
const navItems = [
  { id: "curriculum", label: "Curriculum" },
  { id: "innovation", label: "Innovation" },
  { id: "how-learning-happens", label: "How Learning Happens" },
  { id: "going-outs", label: "Going Outs" },
  { id: "mentors", label: "Mentors" },
  { id: "faq", label: "FAQ" }
];

const achievements = [
  {
    title: "Five Drone Patents Filed",
    body: "Filed with the Government of India by children ages 8–12. One question, 'What do you want your drone to do?', produced five patent applications.",
    accent: "#1f3b82",
    bg: "#EAF4FF"
  },
  {
    title: "Twenty Original Bird Nests",
    body: "Biomimicry Hive lab. Twenty original bird nest designs in a single cycle. Nature as a design teacher.",
    accent: "#0f766e",
    bg: "#F0FDF9"
  },
  {
    title: "Student Seed Bank",
    body: "80–85 seed varieties, student-initiated and student-maintained. Procured, solar-dried, stored. Ongoing.",
    accent: "#7c3aed",
    bg: "#F5F3FF"
  },
  {
    title: "Foundation of the SBB-1 CubeSat",
    body: "Space Lab work at Elementary feeds directly into the Erdkinder-built CubeSat that flew on ISRO's PSLV-C62.",
    accent: "#c2410c",
    bg: "#FFF7ED"
  },
  {
    title: "AMI-Guided Since 2005",
    body: "Blue Blocks operates entirely under AMI standards. Full birth-to-eighteen programme since 2017.",
    accent: "#b91c1c",
    bg: "#FFF1F2"
  },
  {
    title: "Research-Backed Programme",
    body: "Elementary children are participants in peer-reviewed research published by the Blue Blocks Micro Research Institute.",
    accent: "#92400e",
    bg: "#FFFBEB"
  }
];

const stemRows = [
  {
    subject: "Biology & Botany",
    what: "Classify living organisms, study plant and animal anatomy through hands-on specimens, maintain a plant garden as a year-long responsibility, and explore ecosystems through observation and field research. Biology branches into Botany and Zoology as distinct areas of inquiry."
  },
  {
    subject: "Physics",
    what: "Forces, motion, energy, light, electricity, magnetism. Structured experiments. The Innovation Lab and Drone Lab bring these principles into direct application."
  },
  {
    subject: "Chemistry",
    what: "States of matter, reactions, acids/alkalis, chromatography. Lab investigation, children conduct experiments, not watch demonstrations."
  },
  {
    subject: "Geography",
    what: "Physical geography through Montessori materials and field research. Ecosystems, biomes, land and water forms, interdependencies, exploration, human geography, and the relationship between physical geography and human civilisations."
  },
  {
    subject: "History",
    what: "Large-scale physical timelines laid out across the room. Early humans, their lives, their needs. The history of writing, numbers, technology, and the connections between inventions and the societies that produced them."
  }
];

const mathRows = [
  {
    subject: "Mathematics",
    what: "Hands-on Montessori materials, Stamp Game, Bead Frames, Checkerboard, Fraction Circles, geometric solids. Every mathematical operation has a material form: children can see how fractions work, how binomials work, how algebra takes place. The transition from sensorial to abstract understanding happens through the materials themselves. Repetition is offered through variety, multiplication through multiple materials, not the same worksheet repeated. Geometry connects to history (how were pyramids designed?) and to real life. Math comes alive because children can visualise it."
  }
];

const languageRows = [
  {
    subject: "English",
    what: "Read widely across fiction and non-fiction. Composition, creative writing, grammar through Montessori language materials. Oral presentations through drama and group research. Poetry skills developed across all three languages, not English alone."
  },
  {
    subject: "Hindi",
    what: "Reading, writing, and conversational fluency. Hindi and Telugu are ways to connect to the culture of the land, children understand the place they live in and the people they meet."
  },
  {
    subject: "Telugu",
    what: "Regional language literacy, reading, writing, oral fluency. A connection to local culture and community."
  }
];

const cultureRows = [
  {
    subject: "Art & Design",
    what: "Original works across painting, drawing, design. Art as a historical language, not a craft session."
  },
  {
    subject: "Dance",
    what: "Bharatnatyam under a performer with 30+ years of experience. Movement, storytelling, character work."
  },
  {
    subject: "Drama",
    what: "Script, direct, perform. Integrated into English and cohort projects."
  },
  {
    subject: "Karate",
    what: "7th Dan Black Belt. International Referee. 44+ years. Technique, discipline, philosophy."
  }
];

const academicsTabsData = [
  {
    id: "sciences",
    label: "Sciences & History",
    title: "Explore Sciences & History",
    items: stemRows.map((r) => ({ label: r.subject, detail: r.what }))
  },
  {
    id: "mathematics",
    label: "Mathematics",
    title: "Explore Mathematics",
    items: mathRows.map((r) => ({ label: r.subject, detail: r.what }))
  },
  {
    id: "languages",
    label: "Languages",
    title: "Explore Languages",
    items: languageRows.map((r) => ({ label: r.subject, detail: r.what }))
  },
  {
    id: "culture",
    label: "Culture & Arts",
    title: "Explore Culture & Arts",
    items: cultureRows.map((r) => ({ label: r.subject, detail: r.what }))
  }
];

const innovationLabs = [
  {
    name: "Innovation Lab",
    what: "Sketches to working prototypes. Wood, metal, electronics, recycled materials. Children build prototypes and 3D models from their learning and use the lab to enrich their subject understanding."
  },
  {
    name: "Biomimicry Hive",
    what: "Nature as design teacher. Biodiversity mappings, observations, mimicking models found in nature, nests, homes, shelters. Children learn to see different parts of nature as architects, engineers, and leaders. Twenty original bird nest designs in one cycle. Builds the skillset of a naturalist."
  },
  {
    name: "Seed Bank",
    what: "Children initiated and maintain a seed bank: procuring, solar drying, and storing 80–85 varieties of seed samples. Ongoing, used for learning and research across biology, botany, and ecology."
  },
  {
    name: "Drone Research Lab",
    what: "One question, 'What do you want your drone to do?', produced five patent applications filed with the Govt. of India. Ages 8–12."
  },
  {
    name: "Space Lab",
    what: "Foundation for the satellite programme. Sensor science and engineering that Erdkinder adolescents carry into real payload design."
  }
];

const mentors = [
  { name: "Kriti Khare", quals: "B.Sc. Maths; MCA", subject: "Maths" },
  { name: "Dr. Shobha Ediga", quals: "Ph.D. Plant Biotech, UoH; AMI Elem. Asst.", subject: "Biology" },
  { name: "Kiranmayi R S S", quals: "M.Sc. Chemistry; AMI Elem. Asst.", subject: "Chemistry" },
  { name: "Mousam Mondal", quals: "M.Sc. Theoretical Physics (Gold Medal); M.Sc. Astrophysics, Hertfordshire", subject: "Physics" },
  { name: "Ranjan Kumar", quals: "B.Tech Aeronautical Engineering", subject: "Drones" },
  { name: "Poulomi Bose", quals: "M.A.; B.Ed.; TESOL; Waldorf; IC CBSE, ICSE, ISC", subject: "English" },
  { name: "Shailaja Chimpanna", quals: "B.Sc., B.Ed.; AMI Elem. Asst.", subject: "Telugu" },
  { name: "Praveena Reddy Vanga", quals: "B.Sc., M.Sc. Computers; AMI Elem. Asst.", subject: "Hindi" },
  { name: "Protiti Mookherjee", quals: "M.A. Bharatnatyam; 30+ years performing", subject: "Dance" },
  { name: "Ravinder Kumar Hanshi", quals: "7th Dan; International Referee; 44+ years", subject: "Karate" },
  { name: "Joseph", quals: "M.P.Ed.; 4+ years", subject: "Sports" }
];

const faqs = [
  {
    q: "What age is the Elementary programme for?",
    a: "Ages 6 to 12, Grade 1 to Grade 6. A continuous and comprehensive six-year programme. Children aged 6 and 12 work in the same community with the same AMI-certified guides."
  },
  {
    q: "What subjects are taught?",
    a: "Mathematics, Geometry, Biology (branching into Botany and Zoology), Physics, Chemistry, Geography, History, English, Hindi, Telugu, Art & Design, Dance (Bharatnatyam), Drama, Karate. All through hands-on materials and research-based work. Plus Innovation Labs: Drone Research Lab, Biomimicry Hive, Innovation Lab, Space Lab, and a student-maintained Seed Bank."
  },
  {
    q: "How is my child assessed without exams?",
    a: "Progress is tracked through continuous observation by the guide, children's own work journals, portfolios of completed work, and regular individual conferences. Parents receive structured observation-based reports and participate in parent-guide conferences. There are no grades or rankings. The guide maintains detailed records of every concept introduced, practised, and mastered by each child.\n\nNOTE: Based on standard AMI assessment practice. School leadership to confirm specifics: report frequency, format, any internal benchmarks."
  },
  {
    q: "How is this different from a CBSE or ICSE school?",
    a: "In a conventional school, children sit at desks, listen, and are tested on recall. Here, children work with hands-on materials, conduct their own research, plan real-world expeditions, and access Innovation Labs where they build drones, design bird nests, and file patent applications, to understand real-world applications of the concepts they learn. They have the freedom of movement, the freedom to choose what follow-up work they pursue from topics they've learnt, and the ability to build prototypes and 3D models that enrich their subject understanding. The curriculum is not lighter, it is deeper. The Elementary Montessori programme widens and deepens the research mindset, building an explorative skillset that matters beyond grades."
  },
  {
    q: "Can my child join from a regular school?",
    a: "Yes. Children from conventional schools are integrated from day one. No separate transition class. The adjustment takes a few weeks, learning to choose work, manage time, take ownership. Children adapt quickly once the freedom is genuine and the materials are there."
  },
  {
    q: "Why are 6-year-olds and 12-year-olds together?",
    a: "Because that's how children actually learn best. A six-year-old watches a ten-year-old work with the Pythagorean theorem and absorbs, without anyone teaching them, what area and measurement mean. A twelve-year-old explains a concept and discovers they understand it more deeply. Younger children are pulled forward by what they see ahead. Older children solidify knowledge by passing it on. The result, after 17 years of observation, is natural leadership, genuine empathy, and collaboration that same-age classrooms do not produce."
  },
  {
    q: "What happens after Elementary?",
    a: "At 12, children transition to the Erdkinder programme (ages 12–16, Grade 7 to Grade 10) at Blue Blocks. Cambridge Lower Secondary in Grades 7–8, Cambridge IGCSE in Grades 9–10. Same school, same community, globally recognised qualifications. Learn more about Erdkinder → /programs/secondary-school/cambridge-igcse-erdkinder",
    renderA: (
      <>
        At 12, children transition to the Erdkinder programme (ages 12–16, Grade 7 to Grade 10) at Blue Blocks. Cambridge Lower Secondary in Grades 7–8, Cambridge IGCSE in Grades 9–10. Same school, same community, globally recognised qualifications.{" "}
        <Link
          href="/programs/secondary-school/cambridge-igcse-erdkinder/"
          className="text-[#0A4BCE] hover:underline font-semibold"
        >
          Learn more about Erdkinder →
        </Link>
      </>
    )
  },
  {
    q: "Is Blue Blocks AMI-certified?",
    a: "The Montessori curriculum is AMI-certified and the guides are individually AMI-certified diploma-holders. Blue Blocks Montessori School is not yet an AMI-recognised school but operates entirely under AMI standards. Running since 2005; full birth-to-eighteen programme since 2017."
  }
];

const researchPubs = [
  { title: "Automated Security UAV Patent (ages 8–12)", where: "research.blueblocks.in/patents/automated-security-uav", doi: "DOI: 10.5281/zenodo.18610003" },
  { title: "Borehole Rescue UAV Patent (ages 8–12)", where: "research.blueblocks.in/patents/borehole-rescue-system", doi: "DOI: 10.5281/zenodo.18610200" },
  { title: "Contactless Delivery UAV Patent (ages 8–12)", where: "research.blueblocks.in/patents/contactless-delivery-system", doi: "DOI: 10.5281/zenodo.18610450" },
  { title: "Medical Assistance UAV Patent (ages 8–12)", where: "research.blueblocks.in/patents/autonomous-medical-assistance-system", doi: "DOI: 10.5281/zenodo.18610847" },
  { title: "Health Monitoring UAV Patent (ages 8–12)", where: "research.blueblocks.in/patents/autonomous-health-monitoring-system", doi: "DOI: 10.5281/zenodo.18628995" },
  { title: "Biophilia Drawing Study (ages 6–16)", where: "research.blueblocks.in/publications/biophilia-drawing-study", doi: "" },
  { title: "Meerkat Bio-Leadership (ages 6–10)", where: "research.blueblocks.in/publications/meerkat-bio-leadership", doi: "" },
  { title: "SBB-1 → SBB-2 Announcement (Space Lab foundation)", where: "research.blueblocks.in/missions/sbb-1-to-sbb-2", doi: "" },
  { title: "Blue Blocks Micro Research Institute — Publications Index", where: "research.blueblocks.in/publications", doi: "" }
];

/* ─────────────────────────────────────────────────────────────────────────
   SHARED UI COMPONENT
───────────────────────────────────────────────────────────────────────── */
function InputNeededBadge({ children }) {
  return (
    <div className="mt-6 rounded-[18px] border border-amber-200 bg-amber-50/70 px-5 py-4 shadow-sm">
      <div className="text-sm text-amber-800 font-medium flex items-center gap-2">
        <svg className="w-5 h-5 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>{children}</span>
      </div>
    </div>
  );
}

function PhotoNeededBadge({ children }) {
  return (
    <div className="mt-6 rounded-[18px] border border-slate-200 bg-slate-50/80 px-5 py-4 shadow-sm">
      <div className="text-sm text-slate-500 flex items-center gap-2">
        <svg className="w-5 h-5 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{children}</span>
      </div>
    </div>
  );
}

function DataTable({ headers, rows, colWidths = [] }) {
  return (
    <div className="overflow-x-auto rounded-[18px] border border-slate-200 shadow-sm bg-white my-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F3E3CF]/50">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-5 py-4 text-left font-bold text-[#1a1a1a] border-b border-r border-slate-200 last:border-r-0"
                style={colWidths[i] ? { width: colWidths[i] } : undefined}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-5 py-4 text-[#334155] border-b border-r border-slate-100 last:border-r-0 align-top leading-relaxed"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN ELEMENTARY CLASS 1-6 COMPONENT
───────────────────────────────────────────────────────────────────────── */
export default function ElementaryClass1to6() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="bb-ui min-h-screen bg-[#FDFCF7]">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* ── HERO SECTION ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-x-hidden pt-36 sm:pt-44 pb-32 sm:pb-40"
        style={{
          backgroundColor: "#FDFCF7",
          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      >
        <Container className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-[#FFF2F2] text-[#E27685] text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
            ELEMENTARY PROGRAMME
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto mb-6">
            Montessori Elementary 6-12 | Class 1 to Class 6, Ages 6 to 12
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-[#475569] max-w-3xl mx-auto mb-10 text-justify">
            Blue Blocks runs Montessori Elementary in Hyderabad for children in Grade 1 to Grade 6. An AMI-certified curriculum and AMI-certified guides, in a mixed-age community, across a continuous six-year cycle, no external curriculum until Grade 7. Every subject is learned through Montessori materials and direct experience. Between ages 8 and 12, our children have filed five drone patents, designed twenty original bird nests, and built a seed bank of 80–85 varieties.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-24">
            <Link
              href="/campus/"
              className="bg-[#0A4BCE] hover:bg-[#0840B0] transition-colors text-white text-sm font-semibold px-8 py-3.5 rounded-full shadow-lg"
            >
              BOOK AN OBSERVATION VISIT
            </Link>
          </div>
        </Container>

        {/* Hero Side Images */}
        <div className="absolute top-32 left-4 xl:left-16 2xl:left-24 hidden lg:block z-0 animate-bb-float">
          <div className="w-48 h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-xl relative">
            <Image
              src={imgHero1}
              alt="Montessori Elementary Hyderabad — Blue Blocks children ages 6 to 12 with innovation lab materials"
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="absolute top-32 right-4 xl:right-16 2xl:right-24 hidden lg:block z-0 animate-bb-float-delayed">
          <div className="w-48 h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-xl relative">
            <Image
              src={imgHero2}
              alt="Montessori Elementary Hyderabad — Blue Blocks children ages 6 to 12 with innovation lab materials"
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* ── ACHIEVEMENT STRIP CARDS ────────────────────────────────────── */}
        <Container className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border-t-[4px] flex flex-col h-full hover:shadow-md transition-all duration-200"
                style={{ borderTopColor: item.accent }}
              >
                <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PARENT QUOTE STRIP ────────────────────────────────────────── */}
      <section className="bg-white py-16 border-y border-slate-100">
        <Container className="text-center">
          <p className="bb-eyebrow mb-4">PARENT VOICES</p>
          <InputNeededBadge suppressHydrationWarning>
            INPUT NEEDED — 1–2 short quotes from current Elementary parents.
          </InputNeededBadge>
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-[#0A4BCE] font-semibold">
            <span>Informed by published research from the Blue Blocks Micro Research Institute.</span>
            <a href="https://research.blueblocks.in/publications" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Explore →
            </a>
          </div>
        </Container>
      </section>

      {/* Sticky Navigation Bar */}
      <SectionNav items={navItems} />

      {/* ── CURRICULUM SECTION ────────────────────────────────────────── */}
      <section id="curriculum" className="py-24 bg-[#FDFCF7] scroll-mt-[135px]">
        <Container>
          <div className="max-w-3xl mb-16">
            <span className="bb-eyebrow mb-3 block">STUDY PROGRAMME</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-6">
              What Your Child Studies
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Every subject : mathematics, geometry, science branching into botany and zoology, English, Hindi, Telugu, history, geography, is taught through physical materials and direct experience. Children don&apos;t read about circuits; they build them. They don&apos;t memorise the periodic table; they conduct experiments. They don&apos;t study geography from a textbook; they build landforms, trace river systems, and plan their own research expeditions.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Research is not a separate activity. It percolates into every subject, biology, mathematics, languages, culture, history. Application and research-based work is what children are guided into across the entire curriculum.
            </p>
          </div>

          {/* Interactive Academics Tabs */}
          <AcademicsTabs data={academicsTabsData} />

          {/* Assessment & Progress */}
          <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Assessment & Progress</h3>
            <p className="text-slate-600 leading-relaxed text-justify mb-6">
              There are no board exams at this level. So how do you know your child is learning?
              In the AMI Elementary tradition, assessment is continuous and observation-based, not periodic and test-based. The AMI-certified guide maintains detailed records of every presentation given, every material worked with, and every stage of mastery reached by each child. This is not anecdotal. It is systematic.
            </p>
            <h4 className="text-sm font-bold text-slate-950 mb-4 uppercase tracking-wider">How progress is tracked:</h4>
            <ul className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#C2410C] font-bold">•</span>
                <div>
                  <strong>Guide&apos;s Record-Keeping:</strong> The guide maintains a detailed record of presentations given to each child and work completed, tracking which concepts have been introduced, which are being practised, and which have been mastered.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C2410C] font-bold">•</span>
                <div>
                  <strong>Child&apos;s Work Journal:</strong> Children maintain their own work logs, recording what they chose, what they completed, and what they want to pursue next. This builds metacognitive awareness alongside academic progress.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C2410C] font-bold">•</span>
                <div>
                  <strong>Portfolio of Work:</strong> Completed work, research reports, mathematical operations, maps, timelines, creative writing, art, is collected and reviewed as evidence of development over time.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C2410C] font-bold">•</span>
                <div>
                  <strong>Individual Conferences:</strong> The guide meets with each child regularly to discuss their work, their interests, and their challenges. This is the primary feedback mechanism.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C2410C] font-bold">•</span>
                <div>
                  <strong>Parent Communication:</strong> Progress is shared with parents through structured observation-based reports and parent-guide conferences, not through grades or rankings.
                </div>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* ── INNOVATION SECTION ────────────────────────────────────────── */}
      <section id="innovation" className="py-20 bg-white border-t border-slate-100">
        <Container>
          <div className="max-w-3xl mb-12">
            <span className="bb-eyebrow mb-3 block">HANDS-ON PROJECTS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-6">
              What Children Build
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Children don&apos;t just study science. They apply it. These labs are guided activities where children work on their own ideas and explore their curiosity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {innovationLabs.map((lab, index) => (
              <div key={index} className="bg-[#FDFCF7] border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{lab.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">{lab.what}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#EAF4FF] text-[#1F3B82] rounded-2xl p-5 border border-[#1f3b82]/10 mb-8 text-center text-sm font-semibold">
            Five patents. Twenty bird nests. 80–85 seed varieties. Sugar rockets and biomimetic flying models. Built by 6–12 year olds.
          </div>

          <div className="relative rounded-2xl overflow-hidden h-96 w-full mb-4 group shadow-md border border-slate-100">
            <Image
              src={imgLab1}
              alt="Montessori Elementary Hyderabad — Blue Blocks children ages 6 to 12 working in labs"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-5 py-4 text-center text-xs text-slate-500">
            PHOTO NEEDED: 1–2 images per lab. Seed bank photos especially.
          </div>
        </Container>
      </section>

      {/* ── HOW LEARNING HAPPENS SECTION ─────────────────────────────── */}
      <section id="how-learning-happens" className="py-20 bg-[#FDFCF7] border-t border-slate-100">
        <Container>
          <div className="max-w-3xl mb-16">
            <span className="bb-eyebrow mb-3 block">METHODOLOGY</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
              How Learning Happens
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Hands-On Materials</h3>
              <p className="text-slate-600 leading-relaxed text-justify mb-6">
                Abstract concepts are built, touched, and manipulated. Every mathematical operation has a material form. A child working with Bead Frames understands multiplication physically before writing it. A child building geometric solids understands volume intuitively. The transition from sensorial to abstract understanding happens through the materials, not through explanation.
              </p>
              <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-5 py-4 text-xs text-slate-500">
                PHOTO NEEDED: 2–3 images of children with materials.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden h-60 relative shadow-sm">
                <Image src={imgMaterials1} alt="Montessori materials mathematics" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden h-60 relative shadow-sm">
                <Image src={imgMaterials2} alt="Sensorial math materials" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Mixed-Age Community</h3>
              <p className="text-slate-600 text-sm leading-relaxed text-justify">
                Children aged 6 and 12 work in the same environment. A six-year-old watches a ten-year-old work with the Pythagorean theorem and absorbs, without instruction, what it means for area and measurement, concepts of volume, size, and spatial reasoning becoming visible years before they formally study them. A twelve-year-old explains a concept to a seven-year-old and discovers they understand it more deeply than they thought. Natural leadership, empathy, and collaboration.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-3">The Guide&apos;s Role</h3>
              <p className="text-slate-600 text-sm leading-relaxed text-justify">
                The AMI-certified Elementary guide at Blue Blocks is not a lecturer. They present, provoke curiosity, and step back. The child investigates, discovers, and builds. Ratio: 1:15.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Physical Development</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Physical activity is part of the daily rhythm, not a squeezed period.
              </p>
              <div className="space-y-3 mt-4 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">OUTDOOR</span>
                  <span>Handball, Kho-Kho, Cricket, Football, Basketball, Athletics</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">INDOOR</span>
                  <span>Chess, Carrom</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">MARTIAL ARTS</span>
                  <span>Karate (7th Dan Black Belt, International Referee, 44+ years)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">DANCE</span>
                  <span>Bharatnatyam (30+ years performing experience)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">MINDFULNESS</span>
                  <span>Yoga and mindfulness activities</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">COMPETITIONS</span>
                  <span>Students participate in interschool competitions</span>
                </div>
              </div>
            </div>
          </div>

          <PhotoNeededBadge>
            PHOTO NEEDED: 2–3 sports/activity images.
          </PhotoNeededBadge>
        </Container>
      </section>

      {/* ── GOING OUTS SECTION ────────────────────────────────────────── */}
      <section id="going-outs" className="py-24 bg-white border-t border-slate-100 scroll-mt-[135px]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bb-eyebrow mb-3 block">BEYOND CLASSROOM WALLS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-6">
                Going Outs
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                When a child&apos;s question outgrows the classroom, they plan a Going Out, a small-group expedition to museums, experts, field sites, or community organisations. Children plan the route, prepare questions, manage logistics, and report back. Not a school trip. A child-planned research expedition.
              </p>
              <div className="space-y-4">
                <InputNeededBadge>
                  INPUT NEEDED: 3–5 specific recent examples. Where? What question? What did they bring back?
                </InputNeededBadge>
                <PhotoNeededBadge>
                  PHOTO NEEDED: 1–2 Going Out images.
                </PhotoNeededBadge>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-96 relative shadow-sm border border-slate-100">
              <Image src={imgGoingOut1} alt="Blue Blocks Going Out expedition" className="w-full h-full object-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── GALLERY SECTION ───────────────────────────────────────────── */}
      <section id="gallery" className="scroll-mt-[135px]">
        <InnovationGallery
          eyebrow="CAMPUS GALLERY"
          title="Elementary Campus Gallery"
          items={galleryImages}
          cols={{ base: 2, sm: 3, lg: 4 }}
        />
      </section>

      {/* ── MENTORS SECTION ───────────────────────────────────────────── */}
      <section id="mentors" className="py-24 bg-[#FDFCF7] border-t border-slate-100 scroll-mt-[135px]">
        <Container>
          <div className="max-w-3xl mb-12">
            <span className="bb-eyebrow mb-3 block">EXPERT GUIDES</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-6">
              Elementary Mentors
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Every Elementary guide and mentor at Blue Blocks is an AMI-certified diploma-holder or subject specialist, trained in the Montessori observation tradition. They watch before they intervene. They ask before they tell.
            </p>
          </div>

          <MentorsGrid />
        </Container>
      </section>

      {/* ── FAQ SECTION ───────────────────────────────────────────────── */}
      <section id="faq" className="py-24 bg-white border-t border-slate-100 scroll-mt-[135px]">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="bb-eyebrow mb-3 block">COMMON QUESTIONS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} q={faq.q} a={faq.renderA || faq.a} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── RELATED RESEARCH SECTION ──────────────────────────────────── */}
      <section className="py-24 bg-[#FDFCF7] border-t border-slate-100">
        <Container>
          <div className="max-w-3xl mb-12">
            <span className="bb-eyebrow mb-3 block">ACADEMIC FOUNDATIONS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-6">
              Related Research
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Canonical institutional sources for the work referenced above. Links point to research.blueblocks.in landing pages; DOIs are included for citation. Elementary-age publications marked with age range.
            </p>
          </div>

          <DataTable
            headers={["Publication", "Where to Read"]}
            rows={researchPubs.map((r, idx) => [
              <div key={`pub-title-${idx}`}>
                <span className="font-semibold text-slate-800">{r.title}</span>
                {r.doi && <div className="text-xs text-slate-400 mt-1">{r.doi}</div>}
              </div>,
              <a
                key={`pub-link-${idx}`}
                href={`https://${r.where}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A4BCE] hover:underline font-medium break-all"
              >
                {r.where}
              </a>
            ])}
            colWidths={["50%", "50%"]}
          />
        </Container>
      </section>

      {/* ── BOTTOM CTA SECTION ────────────────────────────────────────── */}
      <section className="bg-slate-950 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] bg-[size:16px_16px]" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">
              See It for Yourself
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10">
              The Elementary environment is a room full of investigation and discovery. To understand what happens when children own their learning, you need to see it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                href="/campus/"
                className="bg-[#0A4BCE] hover:bg-[#0840B0] transition-colors text-white font-semibold px-8 py-4 rounded-full w-full sm:w-auto"
              >
                Book an Observation Visit →
              </Link>
              <a
                href="#"
                className="bg-transparent hover:bg-white/10 transition-colors border border-white/30 text-white font-semibold px-8 py-4 rounded-full w-full sm:w-auto text-center"
              >
                Download Elementary Programme Guide (PDF)
              </a>
            </div>
            <div className="mt-12 text-slate-500 text-xs flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
              <div>
                Transitioning to Secondary?{" "}
                <Link href="/programs/secondary-school/cambridge-igcse-erdkinder/" className="text-[#58A5F3] hover:underline font-semibold">
                  See our Erdkinder (Adolescent) programme →
                </Link>
              </div>
              <div className="hidden sm:block text-slate-700">|</div>
              <div>
                Coming from Pre-Primary?{" "}
                <Link href="/programs/nursery-school/pp1-pp2-lkg-ukg-curriculum/" className="text-[#58A5F3] hover:underline font-semibold">
                  See our Nursery, PP1, PP2 programme →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
