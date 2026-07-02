import SectionNav from "@/components/secondary/SectionNav";
import FaqItem from "@/components/secondary/FaqItem";
import Container from "@/components/layout/Container";
import Link from "next/link";
import Image from "next/image";
import heroLeftImg from "@/assets/Secondary School/WhatsApp Image 2026-02-10 at 10.17.51.jpeg";
import heroRightImg from "@/assets/Secondary School/WhatsApp Image 2026-02-06 at 10.32.14.jpeg";
import AcademicsTabs from "@/components/secondary/AcademicsTabs";

import gImg1 from "@/assets/Secondary School/DSC02836.JPG";
import gImg2 from "@/assets/Secondary School/DSC02929.JPG";
import gImg3 from "@/assets/Secondary School/DSC02939.JPG";
import gImg4 from "@/assets/Secondary School/DSC02965.JPG";
import gImg5 from "@/assets/Secondary School/WhatsApp Image 2026-02-03 at 14.41.58 (1).jpeg";
import gImg6 from "@/assets/Secondary School/WhatsApp Image 2026-02-03 at 14.41.58.jpeg";
import gImg7 from "@/assets/Secondary School/WhatsApp Image 2026-02-03 at 14.41.59 (1).jpeg";
import gImg8 from "@/assets/Secondary School/WhatsApp Image 2026-02-03 at 14.41.59.jpeg";
import gImg9 from "@/assets/Secondary School/WhatsApp Image 2026-02-06 at 10.32.05.jpeg";
import gImg10 from "@/assets/Secondary School/WhatsApp Image 2026-02-06 at 10.32.13.jpeg";
import gImg11 from "@/assets/Secondary School/WhatsApp Image 2026-02-06 at 10.32.14 (1).jpeg";
import gImg12 from "@/assets/Secondary School/WhatsApp Image 2026-02-06 at 10.32.14.jpeg";
import gImg13 from "@/assets/Secondary School/WhatsApp Image 2026-02-10 at 10.17.48.jpeg";
import gImg14 from "@/assets/Secondary School/WhatsApp Image 2026-02-10 at 10.17.49.jpeg";
import gImg15 from "@/assets/Secondary School/WhatsApp Image 2026-02-10 at 10.17.52.jpeg";

const galleryImages = [
  gImg1, gImg2, gImg3, gImg4, gImg5, 
  gImg6, gImg7, gImg8, gImg9, gImg10, 
  gImg11, gImg12, gImg13, gImg14, gImg15
];

/* ─────────────────────────────────────────────────────────────────────────
   ACHIEVEMENT STRIP DATA
───────────────────────────────────────────────────────────────────────── */
const achievements = [
  {
    title: "SBB-1 CubeSat",
    body: "Student-built payload. IN-SPACe authorised. Flew on ISRO's PSLV-C62, 12 January 2026.",
    accent: "#1f3b82",
    bg: "#EAF4FF",
  },
  {
    title: "SBB-2 Announcement",
    body: "Second-generation payload announced April 2026. SBB-1 alumni now mentor the next cohort.",
    accent: "#0f766e",
    bg: "#F0FDF9",
  },
  {
    title: "Five Patents Filed",
    body: "Drone humanitarian technology. Filed with Govt. of India by children ages 8–12.",
    accent: "#7c3aed",
    bg: "#F5F3FF",
  },
  {
    title: "Dream Teachers (Agentic AI)",
    body: "Twelve adolescents built personalised AI tutors. Peer-reviewed preprint, May 2026.",
    accent: "#c2410c",
    bg: "#FFF7ED",
  },
  {
    title: "AMI Talks Podcast",
    body: "From the Absorbent Mind to the Innovative Mind. First students ever featured in AMI Talks.",
    accent: "#b91c1c",
    bg: "#FFF1F2",
  },
  {
    title: "International Recognition",
    body: "30th International Montessori Congress (Mexico). Montessori International Scientific Congress, Nobel Peace Center, Oslo.",
    accent: "#92400e",
    bg: "#FFFBEB",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   SUBJECT TABLE DATA
───────────────────────────────────────────────────────────────────────── */
const stemRows = [
  { subject: "Physics", what: "Forces, energy, light, electricity, magnetism. Build circuits, test predictions." },
  { subject: "Biology", what: "Organ systems, genetics, ecology. Live fish tank and plant nursery year-round." },
  { subject: "Chemistry", what: "Atomic structure, acids and alkalis, reactions, chromatography. Lab-based." },
  { subject: "Mathematics", what: "Number, Algebra, Geometry, Statistics. Real-world problems, Olympiad challenges." },
  { subject: "Drone Engineering", what: "Sugar rockets, biomimetic models, paramotors, wing structures." },
  { subject: "Space Lab", what: "Real satellite payload design. SBB-1 CubeSat on ISRO's PSLV-C62; SBB-2 in concept phase." },
];

const languageRows = [
  { subject: "English", what: "Cambridge framework. Composition, drama, presentations. TESOL mentor with CBSE, ICSE, ISC experience." },
  { subject: "Hindi", what: "Reading, writing, oral fluency." },
  { subject: "Telugu", what: "Regional language literacy." },
];

const cultureRows = [
  { subject: "Art & Design", what: "Original works. IGCSE portfolio assessed by Cambridge examiners." },
  { subject: "Dance", what: "Bharatnatyam. Mentor with 30+ years of performing experience." },
  { subject: "Drama", what: "Script, direct, perform. Integrated with English." },
  { subject: "Karate", what: "7th Dan Black Belt mentor. International Referee. 44+ years experience." },
];

const igcseRows = [
  { code: "Mathematics (0580)", focus: "Extended — algebra, geometry, statistics, problem-solving." },
  { code: "Physics (0625)", focus: "Mechanics, waves, electricity, atomic physics." },
  { code: "Chemistry (0620)", focus: "Bonding, stoichiometry, organic chemistry." },
  { code: "Biology (0610)", focus: "Cells, physiology, genetics, ecosystems." },
  { code: "English (0500)", focus: "First Language — comprehension, directed writing, composition." },
  { code: "Art & Design (0400)", focus: "Portfolio assessed by Cambridge International." },
];

const academicsTabsData = [
  { 
    id: "stem", 
    label: "Grades 7 & 8 STEM", 
    title: "Explore Grades 7 & 8 STEM", 
    items: stemRows.map(r => ({ label: r.subject, detail: r.what })) 
  },
  { 
    id: "languages", 
    label: "Grades 7 & 8 Languages", 
    title: "Explore Grades 7 & 8 Languages", 
    items: languageRows.map(r => ({ label: r.subject, detail: r.what })) 
  },
  { 
    id: "culture", 
    label: "Grades 7 & 8 Culture & Arts", 
    title: "Explore Grades 7 & 8 Culture & Arts", 
    items: cultureRows.map(r => ({ label: r.subject, detail: r.what })) 
  },
  { 
    id: "igcse", 
    label: "Grades 9 & 10 Cambridge IGCSE Core", 
    title: "Explore Grades 9 & 10 Cambridge IGCSE Core", 
    items: igcseRows.map(r => ({ label: r.code, detail: r.focus })) 
  }
];

/* ─────────────────────────────────────────────────────────────────────────
   PROJECTS TABLE
───────────────────────────────────────────────────────────────────────── */
const projectRows = [
  { project: "SBB-1 → SBB-2 Satellite Programme", desc: "SBB-1: student-built 1U CubeSat, IN-SPACe authorised, manifested on ISRO's PSLV-C62. SBB-2 announced April 2026." },
  { project: "Five Patents Filed", desc: "Drone humanitarian technology. Filed with Govt. of India by children ages 8–12." },
  { project: "Dream Teachers (Agentic AI)", desc: "Twelve adolescents built personalised AI tutors. Peer-reviewed preprint May 2026, dataset on Harvard Dataverse." },
  { project: "Drone Engineering", desc: "Sugar rockets, biomimetic models, paramotors, wing structures." },
  { project: "MechaSphere 2.0", desc: "Arduino autonomous vehicle. Obstacle detection. Drone Fest 2025." },
  { project: "Innovision 2050", desc: "Future-home exhibit: holographic TV, hydroponics, smart compost, laser security." },
  { project: "Flipside Research", desc: "Student-designed 25-question instrument. Neurodivergent workspace. Published case study." },
  { project: "Endangered Species", desc: "Upschool + UN + Jane Goodall Institute." },
  { project: "Terra Eutopia", desc: "Paper recycling: pulping, drying, reforming. Circular economy." },
  { project: "English & Art", desc: "Cross-disciplinary output: literary and artistic." },
  { project: "Photography Exhibition", desc: "External assessment by professional artist, art critic, writer." },
  { project: "Sustainability", desc: "Science, geography, design thinking. Ecological challenges." },
  { project: "Interdisciplinary Presentations", desc: "Cross-subject synthesis. Depth, clarity, connection." },
];

/* ─────────────────────────────────────────────────────────────────────────
   DAY SCHEDULE
───────────────────────────────────────────────────────────────────────── */
const scheduleRows = [
  { time: "Morning", what: "[INPUT NEEDED]" },
  { time: "Mid-Morning", what: "[INPUT NEEDED]" },
  { time: "Lunch", what: "[INPUT NEEDED]" },
  { time: "Afternoon", what: "[INPUT NEEDED]" },
  { time: "End of Day", what: "[INPUT NEEDED]" },
];

const admissionSteps = [
  { step: "Step 1", label: "Enquiry", detail: "Form or call." },
  { step: "Step 2", label: "Campus Visit", detail: "Labs, mentors, live session." },
  { step: "Step 3", label: "Assessment", detail: "[INPUT NEEDED]" },
  { step: "Step 4", label: "Enrolment", detail: "[INPUT NEEDED]" },
];

/* ─────────────────────────────────────────────────────────────────────────
   GOING OUTS
───────────────────────────────────────────────────────────────────────── */
const goingOutRows = [
  { type: "Field Research", desc: "Flipside workspace, geological sites, ecological sites. Every visit has a research question." },
  { type: "Professional Encounters", desc: "Professionals visit or host. Peer inquiry, not lecture." },
  { type: "International Conferences", desc: "30th International Montessori Congress (Mexico). Montessori International Scientific Congress at the Nobel Peace Center, Oslo. AMI Talks Podcast (first student presenters in AMI Talks history). Saparya, Explore Montessori, AMI-AGM. Contributors, not observers." },
  { type: "Exhibitions & Cultural", desc: "[INPUT NEEDED]" },
];

/* ─────────────────────────────────────────────────────────────────────────
   MENTORS
───────────────────────────────────────────────────────────────────────── */
const mentors = [
  { num: 1, name: "Kriti Khare", quals: "B.Sc. Maths; MCA", subject: "Maths" },
  { num: 2, name: "Dr. Shobha Ediga", quals: "Ph.D. Plant Biotech, UoH; AMI Elem. Asst.", subject: "Biology" },
  { num: 3, name: "Kiranmayi R S S", quals: "M.Sc. Chemistry; AMI Elem. Asst.", subject: "Chemistry" },
  { num: 4, name: "Mousam Mondal", quals: "M.Sc. Theoretical Physics (Gold Medal); M.Sc. Astrophysics, Hertfordshire", subject: "Physics" },
  { num: 5, name: "Ranjan Kumar", quals: "B.Tech Aeronautical Engineering", subject: "Drones" },
  { num: 6, name: "Poulomi Bose", quals: "M.A.; B.Ed.; TESOL; Waldorf; IC CBSE, ICSE, ISC", subject: "English" },
  { num: 7, name: "Shailaja Chimpanna", quals: "B.Sc., B.Ed.; AMI Elem. Asst.", subject: "Telugu" },
  { num: 8, name: "Praveena Reddy Vanga", quals: "B.Sc., M.Sc. Computers; AMI Elem. Asst.", subject: "Hindi" },
  { num: 9, name: "Protiti Mookherjee", quals: "M.A. Bharatnatyam; 30+ years performing", subject: "Dance" },
  { num: 10, name: "Ravinder Kumar Hanshi", quals: "7th Dan; International Referee; 44+ years", subject: "Karate" },
  { num: 11, name: "Joseph", quals: "M.P.Ed.; 4+ years", subject: "Sports" },
];

/* ─────────────────────────────────────────────────────────────────────────
   FAQ
───────────────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "What age is the Erdkinder programme for?",
    a: "Ages 12 to 16, Grades 7 to 10. Cambridge Lower Secondary (7–8) and Cambridge IGCSE (9–10), integrated with the AMI-certified Montessori adolescent curriculum.",
  },
  {
    q: "Does Blue Blocks prepare for board exams?",
    a: "Yes. Cambridge Checkpoint at Grade 8, IGCSE in six subjects at Grade 10. Students self-assess, peer-review, and are mentor-assessed against the Cambridge Marks Scheme.",
  },
  {
    q: "How is Erdkinder at Blue Blocks different from other Cambridge IGCSE schools?",
    a: "The same cohort that studies IGCSE Physics designed and built a satellite for ISRO, filed patents, and conducted peer-reviewed research. Cambridge curriculum delivered through Montessori adolescent pedagogy — one programme, not two tracks.",
  },
  {
    q: "Can my child join without a Montessori background?",
    a: "Yes. No transition track. Day one with the cohort. Adjustment: a few weeks.",
  },
  {
    q: "What comes after Erdkinder?",
    a: "INPUT NEEDED: +1/+2 pathway before university.",
  },
  {
    q: "Is Blue Blocks an alternative school?",
    a: "Cambridge curriculum with externally marked exams. What is different is real-world application alongside academic standards. One programme.",
  },
  {
    q: "Is Blue Blocks AMI-certified?",
    a: "The Montessori curriculum is AMI-certified and the guides are individually AMI-certified diploma-holders. Blue Blocks Montessori School is not yet an AMI-recognised school but operates entirely under AMI standards. Running since 2005; full birth-to-eighteen programme since 2017.",
  },
  {
    q: "Where can I read the research behind the Erdkinder programme?",
    a: "Published research from the Blue Blocks Micro Research Institute is available at research.blueblocks.in/publications. All records carry DOIs and are openly accessible.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   RELATED RESEARCH
───────────────────────────────────────────────────────────────────────── */
const researchPubs = [
  { pub: "SBB-1 → SBB-2 Announcement", where: "research.blueblocks.in/missions/sbb-1-to-sbb-2/", href: "https://research.blueblocks.in/missions/sbb-1-to-sbb-2/", note: "(landing page pending build)" },
  { pub: "Student-Built Dream Teachers (Agentic AI)", where: "research.blueblocks.in/publications/dream-teachers/", href: "https://research.blueblocks.in/publications/dream-teachers/", note: "(landing page pending build)" },
  { pub: "Flipside Research Case Study", where: "research.blueblocks.in/publications/flipside-case-study", href: "https://research.blueblocks.in/publications/flipside-case-study", note: "" },
  { pub: "Resilience Workshop Case Study", where: "research.blueblocks.in/publications/resilience-workshop", href: "https://research.blueblocks.in/publications/resilience-workshop", note: "" },
  { pub: "Structured Debate Case Study", where: "research.blueblocks.in/publications/structured-debate-side-switch", href: "https://research.blueblocks.in/publications/structured-debate-side-switch", note: "" },
  { pub: "AMI Talks Podcast", where: "montessori-ami.org/events/ami-talks-absorbent-mind-innovative-mind", href: "https://montessori-ami.org/events/ami-talks-absorbent-mind-innovative-mind", note: "" },
  { pub: "Nobel Peace Center / Montessori International Scientific Congress", where: "research.blueblocks.in/newsroom/coverage/nobel-peace-center", href: "https://research.blueblocks.in/newsroom/coverage/nobel-peace-center", note: "" },
  { pub: "BBMRI Publications Index", where: "research.blueblocks.in/publications", href: "https://research.blueblocks.in/publications", note: "" },
];

/* ─────────────────────────────────────────────────────────────────────────
   SHARED UI HELPERS
───────────────────────────────────────────────────────────────────────── */

/** Bordered data table with alternating row shading */
function DataTable({ headers, rows, colWidths = [] }) {
  return (
    <div className="overflow-x-auto rounded-[var(--bb-radius)] border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F3E3CF]/70">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-semibold text-[#1a1a1a] border-b border-slate-200"
                style={colWidths[i] ? { width: colWidths[i] } : undefined}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 text-[#334155] border-b border-slate-100 align-top leading-relaxed"
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

function SectionHeading({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow && <p className="bb-eyebrow mb-3">{eyebrow}</p>}
      <h2 className="bb-section-title">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base text-[#475569] leading-relaxed max-w-3xl">{subtitle}</p>
      )}
    </div>
  );
}

function SubHeading({ children }) {
  return <h3 className="text-xl font-semibold text-[#1f3b82] mb-4">{children}</h3>;
}

function CategoryLabel({ children }) {
  return (
    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1f3b82] mb-3">
      {children}
    </h4>
  );
}

function InputNeededBadge({ children }) {
  return (
    <div className="mt-6 rounded-[var(--bb-radius)] border border-amber-200 bg-amber-50 px-5 py-4">
      <p className="text-sm text-amber-800 font-medium">{children}</p>
    </div>
  );
}

function PhotoNeededBadge({ children }) {
  return (
    <div className="mt-6 rounded-[var(--bb-radius)] border border-slate-200 bg-slate-50 px-5 py-4">
      <p className="text-sm text-slate-500">{children}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────────────── */
export default function CambridgeIgcseErdkinder() {
  return (
    <div className="bb-ui">



      {/* ── NEW HERO SECTION & ACHIEVEMENT STRIP ───────────────────────── */}
      <section 
        className="relative overflow-hidden pt-36 sm:pt-44 pb-20"
        style={{
          backgroundColor: "#FAFAFA",
          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      >
        <Container className="relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="bg-[#EAF4FF] text-[#1F3B82] text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
            Adolescent Programme (Ages 12-16)
          </div>
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto mb-6">
            Erdkinder Cambridge IGCSE
          </h1>
          
          {/* Paragraph */}
          <p className="text-base sm:text-lg leading-relaxed text-[#475569] max-w-2xl mx-auto mb-10 text-justify">
            Blue Blocks runs Cambridge IGCSE in Hyderabad the Montessori way. The Erdkinder programme follows AMI-certified Montessori curriculum standards for adolescents ages 12 to 16, integrated with Cambridge Lower Secondary and Cambridge IGCSE assessments. Running since 2005, full birth-to-eighteen programme since 2017. 1,047 children across the journey; over 45,000 parents engaged through workshops worldwide. Our adolescents have built a CubeSat that flew on ISRO&apos;s PSLV-C62, filed five patents with the Government of India, and authored peer-reviewed research with DOIs. The work below is what students do here.
          </p>

          {/* Button */}
          <button className="bg-[#1F3B82] hover:bg-[#15295c] transition-colors text-white text-sm font-semibold px-8 py-3.5 rounded-full shadow-lg mb-24">
            SCHEDULE A CAMPUS VISIT
          </button>
        </Container>

        {/* Floating Side Images (Hidden on small screens) */}
        <div className="absolute top-32 left-4 xl:left-16 2xl:left-24 hidden lg:block z-0 animate-bb-float">
          <div className="w-48 h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-xl">
            <Image src={heroLeftImg} alt="Student working" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute top-32 right-4 xl:right-16 2xl:right-24 hidden lg:block z-0 animate-bb-float-delayed">
          <div className="w-48 h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-xl">
            <Image src={heroRightImg} alt="Student in lab" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* ── ACHIEVEMENT STRIP CARDS ────────────────────────────────────── */}
        <Container className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            
            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-[4px] border-[#1F3B82] flex flex-col h-full">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">SBB-1 CubeSat</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Student-built payload. IN-SPACe authorised. Flew on ISRO&apos;s PSLV-C62, 12 January 2026.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-[4px] border-[#1F3B82] flex flex-col h-full">
              <div className="text-2xl mb-3">📡</div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">SBB-2 Announcement</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Second-generation payload announced April 2026. SBB-1 alumni now mentor next cohort.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-[4px] border-[#1F3B82] flex flex-col h-full">
              <div className="text-2xl mb-3">📄</div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">Five Patents Filed</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Drone humanitarian technology. Filed with Govt. of India by children ages 8–12.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-[4px] border-[#1F3B82] flex flex-col h-full">
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">Dream Teachers<br/>(Agentic AI)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Twelve adolescents built personalised AI tutors. Peer-reviewed preprint, May 2026.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-[4px] border-[#1F3B82] flex flex-col h-full">
              <div className="text-2xl mb-3">🎙️</div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">AMI Talks Podcast</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                From the Absorbent Mind to the Innovative Mind. First students ever featured in AMI Talks.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-[4px] border-[#1F3B82] flex flex-col h-full">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">International<br/>Recognition</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                30th Montessori Congress (Mexico). Scientific Congress, Nobel Peace Center, Oslo.
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* ── PARENT QUOTE STRIP ────────────────────────────────────────── */}
      <section className="bg-white py-10">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p className="bb-eyebrow mb-4">PARENT VOICES</p>
            <blockquote className="bb-quote text-left max-w-xl mx-auto">
              INPUT NEEDED — 1–2 short parent quotes.
            </blockquote>
          </div>
        </Container>
      </section>
      {/* ── TRACK NAV BAR ──────────────────────────────────────────────── */}
      <SectionNav />


      {/* ── RESEARCH LINE ─────────────────────────────────────────────── */}
      <section className="bg-[#EAF4FF] py-5">
        <Container>
          <p className="text-sm text-center text-[#334155]">
            Informed by published research from the Blue Blocks Micro Research Institute.{" "}
            <a
              href="https://research.blueblocks.in/publications"
              className="font-semibold text-[#1f3b82] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore →
            </a>
          </p>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #academics
      ════════════════════════════════════════════════════════════════ */}
      <section id="academics" className="bg-[#FAFAFA] py-20 scroll-mt-[200px]">
        <Container>
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-8">
            <div className="w-full lg:w-1/2">
              <div className="border-l-[3px] border-[#E07B54] pl-4 mb-4">
                <p className="text-[#E07B54] text-xs font-bold tracking-wider uppercase">
                  Academic Foundation
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                  Cambridge Curriculum
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-lg mt-6">
                We combine the world-recognized Cambridge Lower Secondary (Grades 7-8) and IGCSE (Grades 9-10) syllabi with authentic field investigations, drone design, space labs, and professional research projects. Taught by AMI-certified diploma-holders and Cambridge-trained mentors. Externally marked at Cambridge Checkpoint (Grade 8) and Cambridge IGCSE (Grade 10).
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <Image src={heroRightImg} alt="Academics" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Academics Project Photo (DSC02965.JPG)
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Tabs */}
          <AcademicsTabs data={academicsTabsData} />

          {/* Exam Prep Box */}
          <div className="mt-8 bg-[#FFFDF8] rounded-3xl p-8 sm:p-10 border border-[#F2EAE1] shadow-sm flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold text-slate-900 mb-4">How We Prepare for Exams</h3>
              <p className="text-sm text-slate-700 mb-6">
                Students write their own exam papers first. Monthly tests follow the Cambridge Marks Scheme, assessed three ways:
              </p>
              <ol className="space-y-4 mb-6">
                <li className="flex gap-3 items-start">
                  <span className="text-[#E07B54] font-bold mt-0.5">1.</span>
                  <p className="text-sm text-slate-700"><strong className="font-semibold text-slate-900">Self-assessment</strong> against the Cambridge Marks Scheme</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#E07B54] font-bold mt-0.5">2.</span>
                  <p className="text-sm text-slate-700"><strong className="font-semibold text-slate-900">Peer review</strong> against the same criteria to build evaluative thinking</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#E07B54] font-bold mt-0.5">3.</span>
                  <p className="text-sm text-slate-700"><strong className="font-semibold text-slate-900">Mentor assessment</strong> as the calibrating benchmark</p>
                </li>
              </ol>
              <p className="text-sm text-slate-500 italic">
                The gap between the three evaluations is where real learning happens.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-2xl p-8 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-center items-center h-full min-h-[220px]">
                <div className="text-5xl font-black text-[#E07B54] mb-2">100%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Cambridge Pass Rate
                </div>
                <div className="w-12 h-px bg-slate-200 mb-4" />
                <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                  Over 85% of grades awarded as A* or A in Mathematics, Physics, &amp; Chemistry.
                </p>
              </div>
            </div>
          </div>

        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #projects
      ════════════════════════════════════════════════════════════════ */}
      <section id="projects" className="bg-[#FCFBF9] py-20 scroll-mt-[200px]">
        <Container>
          <div className="mb-14">
            <div className="border-l-[3px] border-[#5D9CC5] pl-4 mb-4">
              <p className="text-[#5D9CC5] text-xs font-bold tracking-wider uppercase">
                Productive Work
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                What Students Build
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-lg mt-6">
              Verifiable institutional record first, classroom work second.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col h-full hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="mb-6">
                <span className="inline-block bg-[#EAF4FF] text-[#5D9CC5] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                  SPACE LAB & PROTOTYPING
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">
                Space Systems & Aeronautical Prototyping
              </h3>
              <p className="text-sm text-slate-500 mb-8 flex-grow leading-relaxed">
                Real satellite payload design, SBB-1 CubeSat integrated on ISRO&apos;s PSLV-C62. Showcased on national television.
              </p>
              <button className="text-[#5D9CC5] text-xs font-bold tracking-wide flex items-center gap-1 uppercase hover:text-[#4a84a8] transition-colors self-start">
                EXPLORE PROJECT <span>&#9656;</span>
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col h-full hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="mb-6">
                <span className="inline-block bg-[#EAF4FF] text-[#5D9CC5] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                  DRONE-BASED HUMANITARIAN TECHNOLOGIES
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">
                Intellectual Property & Indian Patent Filings
              </h3>
              <p className="text-sm text-slate-500 mb-8 flex-grow leading-relaxed">
                Five patents filed with the Government of India. Invented by students aged 8-12.
              </p>
              <button className="text-[#5D9CC5] text-xs font-bold tracking-wide flex items-center gap-1 uppercase hover:text-[#4a84a8] transition-colors self-start">
                EXPLORE PROJECT <span>&#9656;</span>
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col h-full hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="mb-6">
                <span className="inline-block bg-[#EAF4FF] text-[#5D9CC5] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                  SOCIOLOGICAL FIELD RESEARCH
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">
                Scientific Field Investigations & Data Research
              </h3>
              <p className="text-sm text-slate-500 mb-8 flex-grow leading-relaxed">
                Student-designed 25-question psychological research instrument deployed for study in workspaces.
              </p>
              <button className="text-[#5D9CC5] text-xs font-bold tracking-wide flex items-center gap-1 uppercase hover:text-[#4a84a8] transition-colors self-start">
                EXPLORE PROJECT <span>&#9656;</span>
              </button>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col h-full hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="mb-6">
                <span className="inline-block bg-[#EAF4FF] text-[#5D9CC5] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                  STUDENT-RUN PAPER RECYCLING INITIATIVE
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">
                Circular Economics & Student-Led Micro-Business
              </h3>
              <p className="text-sm text-slate-500 mb-8 flex-grow leading-relaxed">
                Pulping, drying, and reforming to study circular economics.
              </p>
              <button className="text-[#5D9CC5] text-xs font-bold tracking-wide flex items-center gap-1 uppercase hover:text-[#4a84a8] transition-colors self-start">
                EXPLORE PROJECT <span>&#9656;</span>
              </button>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col h-full hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="mb-6">
                <span className="inline-block bg-[#EAF4FF] text-[#5D9CC5] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                  COLLABORATIVE PROJECT WITH UPSCHOOL AND UN
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">
                Ecology, Arts & Collaborative Social Action
              </h3>
              <p className="text-sm text-slate-500 mb-8 flex-grow leading-relaxed">
                Studying Javan Rhino, Indian Vulture, and Amur Leopard.
              </p>
              <button className="text-[#5D9CC5] text-xs font-bold tracking-wide flex items-center gap-1 uppercase hover:text-[#4a84a8] transition-colors self-start">
                EXPLORE PROJECT <span>&#9656;</span>
              </button>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col h-full hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="mb-6">
                <span className="inline-block bg-[#EAF4FF] text-[#5D9CC5] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                  AGENTIC AI / PERSONAL TUTORS
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">
                Dream Teachers (Agentic AI)
              </h3>
              <p className="text-sm text-slate-500 mb-8 flex-grow leading-relaxed">
                Twelve adolescents built personalised AI tutors. Peer-reviewed preprint May 2026, dataset on Harvard Dataverse.
              </p>
              <button className="text-[#5D9CC5] text-xs font-bold tracking-wide flex items-center gap-1 uppercase hover:text-[#4a84a8] transition-colors self-start">
                EXPLORE PROJECT <span>&#9656;</span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #gallery
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <Container>
          <div className="mb-10 text-center flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-widest mb-2">
              VISUAL SHOWCASE: Real Student Inventions &amp; Labs
            </h2>
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest max-w-3xl leading-relaxed">
              A VISUAL JOURNEY THROUGH OUR SECONDARY SCHOOL LABS, FIELD RESEARCH SITES, AND SUSTAINABLE BUSINESS MODELS. CLICK ANY IMAGE TO VIEW IN HIGH RESOLUTION.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative bg-slate-100 cursor-pointer">
                <Image src={img} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #day
      ════════════════════════════════════════════════════════════════ */}
      <section id="day" className="bg-[#FCFBF9] py-20 scroll-mt-[200px]">
        <Container>
          <div className="mb-12">
            <div className="border-l-[3px] border-[#DDA343] pl-4 mb-4">
              <p className="text-[#DDA343] text-xs font-bold tracking-wider uppercase">
                Daily Rhythm
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                A Day in Erdkinder
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Schedule Table inside a card */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-8">
              <div className="flex text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 pb-4 border-b border-slate-100">
                <div className="w-1/3">Time</div>
                <div className="w-2/3">What Happens</div>
              </div>
              <div className="flex flex-col gap-6">
                {[
                  {
                    timeLabel: "Morning",
                    timeDetail: "8:30 AM - 11:30 AM",
                    desc: "Morning Work Cycle: Humanities Seminar, Mathematics and Science Work Cycle. Collaborative research in lab spaces."
                  },
                  {
                    timeLabel: "Mid-Morning",
                    timeDetail: "11:30 AM - 1:00 PM",
                    desc: "Micro-Economy Work: Running the school store, marketing, managing the organic farm/plant nursery, drone design prototyping."
                  },
                  {
                    timeLabel: "Lunch",
                    timeDetail: "1:00 PM - 2:00 PM",
                    desc: "Lunch & Community Meeting: Preparing lunch, eating together, followed by group reflection, peer feedback, and community planning."
                  },
                  {
                    timeLabel: "Afternoon",
                    timeDetail: "2:00 PM - 3:30 PM",
                    desc: "Afternoon Specializations: Sports, physical development (karate, basketball, running), and creative arts (Bharatnatyam, drama rehearsals, art portfolio work)."
                  },
                  {
                    timeLabel: "End of Day",
                    timeDetail: "3:30 PM",
                    desc: "Reflection & Clean-Up: Reflective writing, journal entry, clean up of workspace, and dismissal."
                  }
                ].map((row, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-6 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-full sm:w-1/3">
                      <div className="text-sm font-bold text-slate-900">{row.timeLabel}</div>
                    </div>
                    <div className="w-full sm:w-2/3">
                      <div className="text-sm text-slate-600 leading-relaxed">
                        <span className="font-semibold text-slate-700">{row.timeDetail}:</span> {row.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Sports and Settling In */}
            <div className="flex flex-col gap-8">
              {/* Sports Card */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-8">
                <h3 className="text-[#DDA343] text-sm font-bold tracking-wider uppercase mb-4">Sports</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  Part of the daily rhythm. Basketball, Table Tennis, Volleyball, 5K Running, 100m Sprint, Karate.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                    <Image src={galleryImages[5]} alt="Sports activity" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                    <Image src={galleryImages[12]} alt="Sports activity" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Metrics Tracked:</div>
                <p className="text-sm text-slate-600 font-medium">Height, Weight, Flexibility, Sprint Time</p>
              </div>

              {/* Settling In Card */}
              <div className="bg-[#FCFBF9] rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] p-8">
                <h3 className="text-[#2F4E75] text-sm font-bold tracking-wider uppercase mb-3">Settling In</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  New students join from day one. No transition track. Adjustment: a few weeks.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Admissions Process</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "Step 1", label: "Enquiry", detail: "Form submission or phone call." },
                { step: "Step 2", label: "Campus Visit", detail: "Tours of labs, interact with mentors, and view live sessions." },
                { step: "Step 3", label: "Assessment", detail: "Conceptual and skill-based evaluation to identify child's learning stage." },
                { step: "Step 4", label: "Enrolment", detail: "Admission confirmation, onboarding and cohort integration." }
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] p-6 flex flex-col gap-2 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-shadow"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#DDA343] mb-1">{s.step}</span>
                  <span className="font-bold text-slate-900 text-lg">{s.label}</span>
                  <p className="text-sm text-slate-500 leading-relaxed mt-2">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #going-outs
      ════════════════════════════════════════════════════════════════ */}
      <section id="going-outs" className="bg-white bb-section scroll-mt-[200px]">
        <Container>
          <SectionHeading
            eyebrow="GOING OUTS"
            title="Going Outs"
            subtitle="Not field trips. Every visit has a research question."
          />
          <div className="mt-10">
            <DataTable
              headers={["Type", "Description"]}
              colWidths={["25%", "75%"]}
              rows={goingOutRows.map((r) => [r.type, r.desc])}
            />
          </div>
          <PhotoNeededBadge>PHOTO NEEDED: One per type.</PhotoNeededBadge>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #mentors
      ════════════════════════════════════════════════════════════════ */}
      <section id="mentors" className="bg-[#F3E3CF]/30 bb-section scroll-mt-[200px]">
        <Container>
          <SectionHeading
            eyebrow="ERDKINDER MENTORS"
            title="Erdkinder Mentors"
            subtitle="AMI-certified diploma-holders and Cambridge-trained subject specialists, working together."
          />
          <div className="mt-10">
            <DataTable
              headers={["#", "Name", "Qualifications", "Subject"]}
              colWidths={["5%", "20%", "52%", "18%"]}
              rows={mentors.map((m) => [String(m.num), m.name, m.quals, m.subject])}
            />
          </div>
          <PhotoNeededBadge>EACH MENTOR: Photo + 2–3 sentence bio.</PhotoNeededBadge>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #faq
      ════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="bg-[#EAF4FF] bb-section scroll-mt-[200px]">
        <Container>
          <div className="text-center mb-10">
            <p className="bb-eyebrow mb-3">FAQ</p>
            <h2 className="bb-section-title">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400 mt-2">NARENDRA: FAQ schema (application/ld+json).</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          RELATED RESEARCH
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-white bb-section">
        <Container>
          <SectionHeading
            eyebrow="RELATED RESEARCH"
            title="Related Research"
            subtitle="Canonical institutional sources for the work referenced above."
          />
          <div className="mt-10">
            <div className="overflow-x-auto rounded-[var(--bb-radius)] border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F3E3CF]/70">
                    <th className="px-4 py-3 text-left font-semibold text-[#1a1a1a] border-b border-slate-200 w-[40%]">
                      Publication
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-[#1a1a1a] border-b border-slate-200">
                      Where to Read
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {researchPubs.map((r, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                      <td className="px-4 py-3 text-[#334155] border-b border-slate-100 align-top leading-relaxed">
                        {r.pub}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-100 align-top leading-relaxed">
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1f3b82] hover:underline break-all"
                        >
                          {r.where}
                        </a>
                        {r.note && (
                          <span className="text-slate-400 text-xs ml-1">{r.note}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          BOTTOM CTA
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-white pb-16">
        <Container>
          <div className="bb-cta bb-cta--dark">
            <div className="bb-cta__inner flex flex-col items-center text-center gap-6">
              <h2 className="bb-cta-title bb-cta-title--lg text-white max-w-2xl">
                Ready to see the Erdkinder programme?
              </h2>
              <p className="bb-cta__text max-w-xl">
                Schedule a visit to see our labs, meet our mentors, and learn what your child could build.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                <Link href="/admissions" className="bb-btn bb-btn--inverse">
                  Schedule a Campus Visit{" "}
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>
                <a
                  href="/downloads/blueblocks-programme-guide.pdf"
                  className="bb-btn border border-white/30 text-white hover:bg-white/10 transition-colors"
                  download
                >
                  Download Programme Guide (PDF)
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
