"use client";

import { useCallback } from "react";
import SectionNav from "@/components/secondary/SectionNav";
import FaqItem from "@/components/secondary/FaqItem";
import Container from "@/components/layout/Container";
import Link from "next/link";
import Image from "next/image";
import AcademicsTabs from "@/components/secondary/AcademicsTabs";

// ── Toddler photo imports ─────────────────────────────────────────────────
import cleaningFloorImg    from "@/assets/toddler/Cleaning The Floor.webp";
import sowingSeedsImg      from "@/assets/toddler/Sowing Seeds.webp";
import cuttingFruitsImg    from "@/assets/toddler/Cutting Fruits.webp";
import buttonFramesImg     from "@/assets/toddler/Button Frames.webp";
import communityMealImg    from "@/assets/toddler/Community Meal.webp";
import cuttingVegImg       from "@/assets/toddler/Cutting Vegetablles.webp";
import dryingClothesImg    from "@/assets/toddler/Drying Clothes.webp";
import eatingImg           from "@/assets/toddler/Eating.webp";
import fasteningImg        from "@/assets/toddler/Fastening Buttons.webp";
import moppingImg          from "@/assets/toddler/Mopping.webp";
import nomenclatureImg     from "@/assets/toddler/Nomenclature Objects.webp";
import openingImg          from "@/assets/toddler/Opening.webp";
import pictureCardsImg     from "@/assets/toddler/Picture Cards.webp";
import screwingImg         from "@/assets/toddler/Screwing.webp";
import showingObjectsImg   from "@/assets/toddler/Showing Objects.webp";
import sweepingImg         from "@/assets/toddler/Sweeping.webp";
import wipingTableImg      from "@/assets/toddler/Wiping table.webp";
import collageImg          from "@/assets/toddler/Collage.webp";
import constructionImg     from "@/assets/toddler/Construction Objects.webp";
import superImposeImg      from "@/assets/toddler/Super ImpositionObjects.webp";
import ik7907Img           from "@/assets/toddler/_IK_7907.webp";
import ik7979Img           from "@/assets/toddler/_IK_7979.webp";
import ik7984Img           from "@/assets/toddler/_IK_7984.webp";
import ik8001Img           from "@/assets/toddler/_IK_8001.webp";
import ik8064Img           from "@/assets/toddler/_IK_8064.webp";

/* ─────────────────────────────────────────────────────────────────────────
   TODDLER NAV ITEMS
   Matches the anchor links used across the site for playgroup
───────────────────────────────────────────────────────────────────────── */
const TODDLER_NAV_ITEMS = [
  { id: "Curriculum",  label: "The Curriculum" },
  { id: "Development", label: "What They Develop" },
  { id: "Day",         label: "A Day in the Community" },
  { id: "Guides",      label: "Prepared Adult" },
  { id: "FAQ",         label: "FAQ" },
];

/* ─────────────────────────────────────────────────────────────────────────
   FACTS STRIP DATA
───────────────────────────────────────────────────────────────────────── */
const facts = [
  {
    title: "Ages 1 – 3 Years",
    body: "Readiness is developmental, not exact age-based. A walker ready to explore.",
    accent: "#1f3b82",
    bg: "#EAF4FF",
  },
  {
    title: "1:6 Guide-to-Child Ratio",
    body: "Close supervision, individual attention, and gentle guiding daily.",
    accent: "#0f766e",
    bg: "#F0FDF9",
  },
  {
    title: "AMI-Certified Guides",
    body: "Guides hold the rigorous AMI Assistants to Infancy (0–3) qualification.",
    accent: "#7c3aed",
    bg: "#F5F3FF",
  },
  {
    title: "The Absorbent Mind",
    body: "Peak phase of language, movement, and order absorption.",
    accent: "#c2410c",
    bg: "#FFF7ED",
  },
  {
    title: "Prepared Environment",
    body: "Safe, beautiful, and simple. Child-sized chairs, spoons, and shelves.",
    accent: "#b91c1c",
    bg: "#FFF1F2",
  },
  {
    title: "Toilet Learning",
    body: "Natural curriculum integration from day one. Calm, non-pressured.",
    accent: "#92400e",
    bg: "#FFFBEB",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   PHOTO GALLERY DATA – shown in the strip between hero & nav
───────────────────────────────────────────────────────────────────────── */
const galleryPhotos = [
  { src: communityMealImg,   alt: "Community meal time",          caption: "Community Meal" },
  { src: cuttingVegImg,      alt: "Toddler cutting vegetables",   caption: "Food Preparation" },
  { src: dryingClothesImg,   alt: "Drying clothes activity",      caption: "Care of Environment" },
  { src: fasteningImg,       alt: "Fastening buttons dressing frame", caption: "Self-Care" },
  { src: nomenclatureImg,    alt: "Nomenclature objects",         caption: "Language" },
  { src: pictureCardsImg,    alt: "Picture cards language work",  caption: "Picture Cards" },
  { src: sweepingImg,        alt: "Child sweeping the floor",     caption: "Practical Life" },
  { src: wipingTableImg,     alt: "Wiping the table",             caption: "Care of Environment" },
  { src: constructionImg,    alt: "Construction objects",         caption: "Sensorial" },
  { src: ik7979Img,          alt: "Blue Blocks toddler class",    caption: "In the Environment" },
  { src: ik7984Img,          alt: "Blue Blocks toddler class",    caption: "In the Environment" },
  { src: ik8001Img,          alt: "Blue Blocks toddler class",    caption: "In the Environment" },
];

/* ─────────────────────────────────────────────────────────────────────────
   CURRICULUM TAB DATA
───────────────────────────────────────────────────────────────────────── */
const curriculumTabsData = [
  {
    id: "movement",
    label: "Movement",
    title: "Pillar 01: Movement (Psychomotor Development)",
    items: [
      {
        label: "Concept",
        detail: "The brain develops faster between 1 and 3 years than at any other point in time, and movement is what drives that development. We do not use high chairs or playpens. Instead, the environment allows for free, purposeful movement through low shelves, heavy stools for balance, and materials chosen for fine motor development.",
      },
      {
        label: "Real-World Practice",
        detail: "A toddler who carries a full tray without spilling isn't just developing steady hands. They are developing a steady sense of self.",
      },
      {
        label: "Goal",
        detail: "The goal is not a child who moves gracefully, but a child who moves through the world confidently. When the body knows what it can do, the self knows what it is worth.",
      },
    ],
  },
  {
    id: "practical-life",
    label: "Practical Life",
    title: "Pillar 02: Practical Life (Care of Self & Environment)",
    items: [
      {
        label: "Concept",
        detail: "The deepest need of the child below 3 years of age is not entertainment, but usefulness. In the Toddler Environment, activities are real and purposeful.",
      },
      {
        label: "Activities",
        detail: "Toddlers in our Hyderabad program engage in food preparation (slicing bananas, making lemonade, sandwich making), self-care (washing hands, using dressing frames), and caring for the environment (wiping tables, watering plants).",
      },
      {
        label: "Goal",
        detail: "These activities are planned for the child to believe in their capability and become functionally independent. A child also builds a sense of place, and a child who feels they belong will naturally begin to take care of what belongs to them.",
      },
    ],
  },
  {
    id: "language",
    label: "Language",
    title: "Pillar 03: Language (The Naming of the World)",
    items: [
      {
        label: "Concept",
        detail: "A child below 3 years of age absorbs language effortlessly and without fatigue. At Blue Blocks, we avoid baby talk. Our guides use rich, precise, and scientifically accurate language with every 1–3 year old. Materials include real objects, animal replicas, and books with clear reality-based images.",
      },
      {
        label: "Emotional Regulation",
        detail: "Language at this age is also about emotional regulation. A toddler who doesn't have the words for frustration, hunger, or loneliness has only one tool: the body. The tantrum is not bad behavior, but a child who has run out of words. A toddler given the right words can express needs, feelings, and curiosity rather than resorting to frustration.",
      },
      {
        label: "Goal",
        detail: "Building linguistic architecture by giving the child the precise vocabulary to express their inner world, which works in parallel to help children regulate and express their emotions.",
      },
    ],
  },
  {
    id: "order-routine",
    label: "Order & Routine",
    title: "Pillar 04: Order & Routine (Safety through Predictability)",
    items: [
      {
        label: "Concept",
        detail: "Children don't develop a sense of time; the only reality is now. In a world where everything is new, enormous, and large, one thing that gives a toddler a sense of safety is predictability.",
      },
      {
        label: "Environment",
        detail: "At Blue Blocks, everything has a specific place. The day follows a consistent, unhurried rhythm. For a 1-3 year old, this external order is not a constraint; it is the scaffolding on which they build internal security.",
      },
      {
        label: "Goal",
        detail: "Building inner security by helping the toddler build internal order through consistent external structure. When a toddler knows what comes next, they are free to explore without anxiety.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   WHAT YOUR CHILD DEVELOPS DATA
───────────────────────────────────────────────────────────────────────── */
const developments = [
  {
    title: "Trust",
    body: "Before a child learns anything, they need to feel safe. Through the gentle, consistent presence of their guide, the same face, tone, and unhurried response every day, the toddler builds the inner security that allows them to explore. A child who trusts their environment will try. A child who doesn't, won't.",
    img: ik7907Img,
    imgAlt: "Toddler settled into environment",
  },
  {
    title: "Emotional Development",
    body: "Below age 3, a child cannot yet name what they feel but they feel everything. One of the quietest and most important things in the Toddler Community is that children begin to recognize their own emotional states (Frustrated, Disappointed, Proud, Happy) and find words for them, beginning emotional regulation.",
    img: showingObjectsImg,
    imgAlt: "Guide showing objects to toddler",
  },
  {
    title: "Sense of Responsibility & Belonging",
    body: "A toddler who waters the plants, sets the table, or comforts a crying friend is discovering that they are needed and that their presence makes a difference. This sense of belonging, arrived at through contribution rather than praise, is the earliest form of empathy.",
    img: communityMealImg,
    imgAlt: "Children at community meal",
  },
  {
    title: "Functional Independence",
    body: "The ability to eat, dress, and care for themselves without waiting for an adult, a capability most parents don't expect at this age. Independence at this age isn't about doing things alone. It's about knowing you can.",
    img: eatingImg,
    imgAlt: "Toddler eating independently",
  },
  {
    title: "Concentration",
    body: "Even at 18 months, a toddler can focus deeply when the activity meets their developmental needs. We see it every day: a child returning to the same work four, five, six times, absorbed completely, unbothered by the room around them. This is what children do under the right conditions.",
    img: openingImg,
    imgAlt: "Toddler deeply focused on work",
  },
  {
    title: "Joy",
    body: "Not the joy of being entertained or praised. The quiet, unmistakable joy of having done something by yourself, with your own hands, and knowing it. That is the joy we work for every day.",
    img: ik8064Img,
    imgAlt: "Happy toddler in Montessori class",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   DAILY SCHEDULE DATA
───────────────────────────────────────────────────────────────────────── */
const scheduleRows = [
  {
    time: "9:00 AM",
    label: "Arrival & Settling In",
    desc: "Gentle handover. For new toddlers, a gradual settling-in period begins here.",
    img: ik7907Img,
  },
  {
    time: "9:15 AM",
    label: "The Montessori Work Cycle",
    desc: "Children choose their own activities like food preparation, language materials, or movement work. Uninterrupted. Child-led.",
    img: screwingImg,
  },
  {
    time: "10:15 AM",
    label: "Rhymes Session",
    desc: "Involving Action Words to develop language development, self-expression, and appreciation for rhythmic patterns.",
    img: pictureCardsImg,
  },
  {
    time: "10:30 AM",
    label: "Community Snack",
    desc: "Children set the table and eat together. Real food prepared by the children independently. Dietary requirements accommodated.",
    img: communityMealImg,
  },
  {
    time: "11:00 AM",
    label: "Dismissal",
    desc: "Children prepare themselves to leave by taking up independent actions like putting on shoes, packing their bags.",
    img: fasteningImg,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "What age is right for a Montessori toddler program?",
    a: "Our Toddler Community accepts children from 12 months to 3 years. Readiness is based on development, not exact age. A child who can walk independently and is showing signs of wanting to do things themselves is typically ready. We are happy to discuss readiness during an observation visit.",
  },
  {
    q: "Does my child need to be toilet trained to join?",
    a: "No. Toilet learning is a natural part of our practical life curriculum from day one of joining Blue Blocks. Our guides support this process in a calm, non-pressured way. We ask that children come in easy to remove clothing and that families are working on the same process at home.",
  },
  {
    q: "What if my toddler cries at drop-off?",
    a: "Separation at this age is normal and expected. We never rush it. Our settling-in process is gradual, new children join for shorter sessions first, and parents are welcome to stay until their child is comfortable.",
  },
  {
    q: "How is a Montessori toddler class different from regular preschool?",
    a: "In a conventional preschool, activities are led by the teacher and children participate as a group. In our Montessori toddler class, the child chooses their own work from a prepared environment, works at their own pace, and is never interrupted when they are involved in their activity. The adult observes and supports rather than directs.",
  },
  {
    q: "Are food allergies and dietary needs accommodated?",
    a: "Yes. Food preparation is a central part of our curriculum and we take allergies seriously. Please inform us during the admissions process and we will ensure the snack environment is safe for your child.",
  },
  {
    q: "Is Montessori good for a 2 year-old?",
    a: "The age of 1–3 is arguably when Montessori has its greatest impact. The Absorbent Mind, the child's unique ability to absorb language, movement, and order effortlessly, is at its peak during these years. Starting at 2 means the child benefits from this window fully, rather than beginning after it has passed.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   SHARED UI HELPERS
───────────────────────────────────────────────────────────────────────── */
function SectionHeading({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={centered ? "text-center flex flex-col items-center" : ""}>
      {eyebrow && <p className="bb-eyebrow mb-3 uppercase tracking-wider text-xs font-semibold text-slate-500">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base text-[#475569] leading-relaxed max-w-3xl text-justify sm:text-left">{subtitle}</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────────────── */
export default function PlaygroupProgram() {
  const scrollToTimings = useCallback(() => {
    const el = document.getElementById("Day");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="bb-ui">
      {/* ── HERO SECTION ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-36 sm:pt-44 pb-20"
        style={{
          backgroundColor: "#FAFAFA",
          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <Container className="relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="bg-[#EAF4FF] text-[#1F3B82] text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
            Toddler Community (Ages 1–3)
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto mb-6">
            The Toddler Community
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg font-semibold text-[#C2410C] mb-6">
            First steps toward independence
          </p>

          {/* Paragraph */}
          <p className="text-base sm:text-lg leading-relaxed text-[#475569] max-w-2xl mx-auto mb-10 text-justify sm:text-center">
            A Montessori preschool program for children aged 1–3 in Hyderabad, designed around how toddlers actually learn: by living, moving, and doing. Every chair, spoon, and shelf is proportioned to their size. This is a carefully designed toddler environment where a 2-year-old can say and mean &quot;I can do it myself.&quot;
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-24">
            <Link
              href="/admissions"
              className="bg-[#1F3B82] hover:bg-[#15295c] transition-colors text-white text-sm font-semibold px-8 py-3.5 rounded-full shadow-lg"
            >
              BOOK A FREE OBSERVATION
            </Link>
            <button
              type="button"
              suppressHydrationWarning
              onClick={scrollToTimings}
              className="bg-white hover:bg-slate-50 border border-slate-200 transition-colors text-slate-700 text-sm font-semibold px-8 py-3.5 rounded-full shadow-sm"
            >
              VIEW TIMINGS
            </button>
          </div>
        </Container>

        {/* Floating Side Images (Hidden on small screens) */}
        <div className="absolute top-32 left-4 xl:left-16 2xl:left-24 hidden lg:block z-0 animate-bb-float">
          <div className="w-48 h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-xl relative bg-slate-100">
            <Image
              src={cleaningFloorImg}
              alt="Toddler cleaning the floor"
              fill
              priority
              sizes="(max-width: 1024px) 192px, 224px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute top-32 right-4 xl:right-16 2xl:right-24 hidden lg:block z-0 animate-bb-float-delayed">
          <div className="w-48 h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-xl relative bg-slate-100">
            <Image
              src={sowingSeedsImg}
              alt="Toddler sowing seeds"
              fill
              priority
              sizes="(max-width: 1024px) 192px, 224px"
              className="object-cover"
            />
          </div>
        </div>

        {/* ── QUICK FACTS STRIP ────────────────────────────────────────── */}
        <Container className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {facts.map((fact, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-t-[4px] flex flex-col h-full"
                style={{ borderTopColor: fact.accent }}
              >
                <div className="text-2xl mb-3">👶</div>
                <h2 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{fact.title}</h2>
                <p className="text-xs text-slate-500 leading-relaxed">{fact.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PHOTO GALLERY STRIP ──────────────────────────────────────────── */}
      <section className="bg-white py-14 border-y border-slate-100 overflow-hidden">
        <Container>
          <p className="bb-eyebrow text-xs uppercase tracking-wider text-slate-400 font-semibold mb-8 text-center">
            Life in the Toddler Community
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {galleryPhotos.map((photo, idx) => (
              <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider">{photo.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PARENT QUOTE STRIP ────────────────────────────────────────── */}
      <section className="bg-white py-12 border-b border-slate-100">
        <Container>
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <p className="bb-eyebrow text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">PARENT VOICE</p>
            <blockquote className="text-lg md:text-xl font-medium text-slate-800 italic leading-relaxed max-w-2xl">
              &quot;I came in skeptical — my daughter was 22 months and I wasn&apos;t sure she was ready. By week three she was setting the table at home and asking to water our plants. I left wondering why we don&apos;t design all of childhood this way.&quot;
            </blockquote>
            <cite className="block mt-4 text-sm font-bold text-slate-500 not-italic uppercase tracking-widest">
              — Parent, Blue Blocks Toddler Community
            </cite>
          </div>
        </Container>
      </section>

      {/* ── STICKY SECTION NAV BAR ────────────────────────────────────── */}
      <SectionNav items={TODDLER_NAV_ITEMS} />

      {/* ════════════════════════════════════════════════════════════════
          #curriculum (The Curriculum)
      ════════════════════════════════════════════════════════════════ */}
      <section id="Curriculum" className="bg-[#FAFAFA] py-20 scroll-mt-[200px]">
        <Container>
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-8">
            <div className="w-full lg:w-1/2">
              <div className="border-l-[3px] border-[#C2410C] pl-4 mb-4">
                <p className="text-[#C2410C] text-xs font-bold tracking-wider uppercase">
                  Developmental Pillars
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                  Four Pillars of Development
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-lg mt-6 text-justify">
                Our toddler program is built around four developmental areas, each grounded in Montessori science and tailored for the specific needs of children aged 1 to 3. Rather than teaching abstract concepts, we focus on lived experiences.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src={cuttingFruitsImg}
                  alt="Toddler cutting fruits — food preparation"
                  fill
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Montessori Prepared Classroom
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Tabs */}
          <AcademicsTabs data={curriculumTabsData} />

          {/* Mini photo row — practical life snapshots */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { src: moppingImg,    alt: "Toddler mopping",           label: "Mopping" },
              { src: dryingClothesImg, alt: "Drying clothes",         label: "Drying Clothes" },
              { src: wipingTableImg,alt: "Wiping the table",          label: "Wiping Tables" },
              { src: fasteningImg,  alt: "Fastening buttons",         label: "Dressing Frames" },
            ].map((p, i) => (
              <div key={i} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider">{p.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Settling In Detail Box */}
          <div className="mt-12 bg-[#FFFDF8] rounded-3xl p-8 sm:p-10 border border-[#F2EAE1] shadow-sm flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Settling In: What to Expect</h3>
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                For many families, this is their child&apos;s first step away from home. Our settling-in process is gentle and gradual; we work with you, not around you, to make that transition feel safe for both parent and child.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-3 items-start">
                  <span className="text-[#C2410C] font-bold mt-0.5">•</span>
                  <p className="text-sm text-slate-700">
                    <strong className="font-semibold text-slate-900">Gradual Onboarding:</strong> Toddlers join for shorter sessions during the first one to two weeks.
                  </p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#C2410C] font-bold mt-0.5">•</span>
                  <p className="text-sm text-slate-700">
                    <strong className="font-semibold text-slate-900">Caregiver Presence:</strong> Parents or caregivers are welcome to stay until their child becomes comfortable.
                  </p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#C2410C] font-bold mt-0.5">•</span>
                  <p className="text-sm text-slate-700">
                    <strong className="font-semibold text-slate-900">No Rushed Transitions:</strong> We move at the child&apos;s speed, building trust organically.
                  </p>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-center items-center h-full min-h-[220px]">
                <div className="text-4xl font-black text-[#1F3B82] mb-2">1:6</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Staff to Child Ratio
                </div>
                <div className="w-12 h-px bg-slate-200 mb-4" />
                <h4 className="text-xs font-bold text-slate-900 mb-1">Parent Communication</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed text-center max-w-[200px]">
                  At pickup, your guide shares a brief verbal observation. You will never wonder what happened during their day.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #development (What Your Child Develops)
      ════════════════════════════════════════════════════════════════ */}
      <section id="Development" className="bg-[#FCFBF9] py-20 scroll-mt-[200px]">
        <Container>
          <div className="mb-14">
            <div className="border-l-[3px] border-[#1E6091] pl-4 mb-4">
              <p className="text-[#1E6091] text-xs font-bold tracking-wider uppercase">
                Holistic Growth
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                What Your Child Develops
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-lg mt-6">
              Through their time in the Toddler Community, children develop not just specific skills but a confident way of being in the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developments.map((dev, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col h-full hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-shadow"
              >
                {/* Photo */}
                <div className="relative w-full aspect-[4/3] bg-slate-100">
                  <Image
                    src={dev.img}
                    alt={dev.imgAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="inline-block bg-[#EAF4FF] text-[#1E6091] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                      DEVELOPMENTAL RESULT
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">
                    {dev.title}
                  </h3>
                  <p className="text-sm text-slate-500 flex-grow leading-relaxed text-justify sm:text-left">
                    {dev.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Wide full-bleed photo accent */}
          <div className="mt-14 relative w-full aspect-[21/7] rounded-3xl overflow-hidden shadow-md">
            <Image
              src={superImposeImg}
              alt="Toddler superimposition objects — sensorial work"
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-10 sm:px-16">
              <div>
                <p className="text-white/70 text-xs uppercase tracking-widest font-semibold mb-2">Sensorial Environment</p>
                <p className="text-white text-2xl sm:text-3xl font-black max-w-sm leading-snug">
                  Every material has a purpose. Every purpose has a child.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #day (Daily Rhythm)
      ════════════════════════════════════════════════════════════════ */}
      <section id="Day" className="bg-[#FCFBF9] py-20 scroll-mt-[200px]">
        <Container>
          <div className="mb-12">
            <div className="border-l-[3px] border-[#A16207] pl-4 mb-4">
              <p className="text-[#A16207] text-xs font-bold tracking-wider uppercase">
                Daily rhythm
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                A Day in the Toddler Community
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Schedule Table inside a card */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="flex text-xs font-bold text-slate-400 uppercase tracking-wider p-8 pb-4 border-b border-slate-100">
                <div className="w-1/4">Time</div>
                <div className="w-3/4">Activity & Description</div>
              </div>
              <div className="flex flex-col divide-y divide-slate-50">
                {scheduleRows.map((row, idx) => (
                  <div key={idx} className="flex gap-4 p-6 hover:bg-slate-50/50 transition-colors">
                    <div className="w-1/4 flex-shrink-0">
                      <div className="text-sm font-bold text-slate-900">{row.time}</div>
                    </div>
                    <div className="flex-1 flex gap-4">
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-slate-800 mb-1">{row.label}</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{row.desc}</div>
                      </div>
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden relative bg-slate-100 hidden sm:block">
                        <Image
                          src={row.img}
                          alt={row.label}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Timing Information and Session Details */}
            <div className="flex flex-col gap-8">
              {/* Batch Timings Card */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-8">
                <h3 className="text-[#A16207] text-sm font-bold tracking-wider uppercase mb-4">Batch Timings</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  Our program operates in two batches daily. Each session is an unhurried 2 hours, carefully configured for deep engagement without causing fatigue.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#FFFDF8] border border-[#F2EAE1] rounded-2xl p-4 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Batch 1 (Morning)</span>
                    <strong className="text-[#A16207] text-sm md:text-base font-bold">9:00 AM – 11:00 AM</strong>
                  </div>
                  <div className="bg-[#FFFDF8] border border-[#F2EAE1] rounded-2xl p-4 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Batch 2 (Afternoon)</span>
                    <strong className="text-[#A16207] text-sm md:text-base font-bold">11:15 AM – 1:15 PM</strong>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Snack Note:</div>
                <p className="text-sm text-slate-600 font-medium">Real food prepared independently by the children during community snack time.</p>
              </div>

              {/* Prepared Environment card with photo */}
              <div className="bg-[#FCFBF9] rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src={buttonFramesImg}
                    alt="Button frames dressing activity — Montessori practical life"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-1">Prepared Environment</h3>
                    <p className="text-white/80 text-xs leading-relaxed">
                      Every chair, table, shelf, and utensil is proportioned to the child&apos;s size, allowing them to gain control over their movement.
                    </p>
                  </div>
                </div>

                {/* collage + construction thumbnails */}
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative aspect-video bg-slate-100">
                    <Image
                      src={collageImg}
                      alt="Toddler collage art"
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-video bg-slate-100">
                    <Image
                      src={nomenclatureImg}
                      alt="Nomenclature language objects"
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom photo row: IK series classroom images */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[ik7979Img, ik7984Img, ik8001Img].map((img, idx) => (
              <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                <Image
                  src={img}
                  alt={`Blue Blocks toddler environment ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #guides (Prepared Adult)
      ════════════════════════════════════════════════════════════════ */}
      <section id="Guides" className="bg-[#F3E3CF]/30 py-20 scroll-mt-[200px]">
        <Container>
          <SectionHeading
            eyebrow="The Prepared Adult"
            title="Guided by Observation, Not Instruction"
            subtitle="In the Toddler environment, the adult is not a teacher who delivers lessons. They are a guide who prepares the environment and then steps back. The art of working with 1-3 year olds lies in knowing when to offer help and when to wait."
          />

          {/* Guide photo accent */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {[showingObjectsImg, openingImg, screwingImg].map((img, i) => (
              <div key={i} className="relative aspect-video rounded-2xl overflow-hidden shadow-sm bg-slate-100">
                <Image
                  src={img}
                  alt={`Guide with toddler ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#92400e] mb-2 block">GUIDE SPECIALIZATION</span>
                <h3 className="text-xl font-bold text-slate-900 mb-4">AMI Assistants to Infancy (0–3)</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 text-justify">
                  Our guides undergo the most rigorous training available for early childhood development. They are certified by the Association Montessori Internationale (AMI) specifically for the Assistants to Infancy level, focusing on child development from birth to three years of age.
                </p>
              </div>
              <div>
                <a
                  href="https://montessori-ami.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1f3b82] hover:underline"
                >
                  Learn more about AMI training <span>→</span>
                </a>
              </div>
            </div>

            <div className="bg-[#FFFDF8] rounded-3xl border border-[#F2EAE1] shadow-sm p-8 flex flex-col justify-center">
              <span className="text-3xl mb-4">💬</span>
              <p className="text-sm font-medium text-slate-700 italic leading-relaxed mb-6">
                &quot;I prepare myself through stillness and reflection. My role is to step back when the child is capable, and step in only to offer support — ensuring every child feels safe, respected, and deeply valued.&quot;
              </p>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                — Toddler Guide Commitment
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          #faq (FAQ Accordion)
      ════════════════════════════════════════════════════════════════ */}
      <section id="FAQ" className="bg-[#EAF4FF] py-20 scroll-mt-[200px]">
        <Container>
          <div className="text-center mb-10">
            <p className="bb-eyebrow mb-3 uppercase tracking-wider text-xs font-semibold text-slate-500">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          BOTTOM CTA
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <Container>
          <div className="bg-[#1e293b] rounded-3xl overflow-hidden">
            {/* Full-width classroom photo strip */}
            <div className="relative w-full h-48 sm:h-64">
              <Image
                src={ik8064Img}
                alt="Blue Blocks Montessori toddler classroom"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e293b]" />
            </div>
            <div className="flex flex-col items-center text-center gap-6 p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-black text-white max-w-2xl leading-tight">
                Witness It for Yourself
              </h2>
              <p className="text-slate-300 max-w-xl leading-relaxed text-sm sm:text-base">
                Most people are surprised by what a two-year-old can do when given the right environment. We invite you to come, sit quietly, and watch. Observations are free, unhurried, held at our Hyderabad campus, and require no commitment.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                <Link
                  href="/admissions"
                  className="bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold px-8 py-3.5 rounded-full shadow-md transition-colors"
                >
                  Book a Free Observation →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
