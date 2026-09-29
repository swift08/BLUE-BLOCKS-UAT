import Link from "next/link";
import Image from "next/image";
import PageJsonLd from "@/components/seo/PageJsonLd";
import Container from "@/components/layout/Container";
import AmiStickyNav from "@/components/ami/AmiStickyNav";
import AmiDiplomasTable from "@/components/ami/AmiDiplomasTable";
import AmiEligibilityTable from "@/components/ami/AmiEligibilityTable";
import AmiTrainingCentres from "@/components/ami/AmiTrainingCentres";
import AmiFAQ from "@/components/ami/AmiFAQ";
import { AMI_FAQ_CATEGORIES } from "@/data/ami-faq-data";
import AmiCTA from "@/components/ami/AmiCTA";

export const dynamic = "force-static";

export const metadata = {
  title: "AMI Montessori Teacher Training in India | Centres, Diplomas & Eligibility | Blue Blocks",
  description:
    "Complete guide to AMI Montessori teacher training in India. 7 affiliated centres, 4 diploma levels, eligibility, duration, and career outcomes. Updated September 2026.",
  keywords: [
    "AMI Montessori diploma India",
    "AMI Montessori teacher training in India",
    "Montessori teacher training centres India",
    "Montessori training eligibility",
    "AMI primary diploma India",
  ],
  alternates: {
    canonical: "https://blueblocks.in/ami-montessori-training/",
    languages: {
      "en-in": "https://blueblocks.in/ami-montessori-training/",
      "x-default": "https://blueblocks.in/ami-montessori-training/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/ami-montessori-training/",
    title: "AMI Montessori Teacher Training in India | Centres, Diplomas & Eligibility | Blue Blocks",
    description:
      "Complete guide to AMI Montessori teacher training in India. 7 affiliated centres, 4 diploma levels, eligibility, duration, and career outcomes. Updated September 2026.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "AMI Montessori Teacher Training in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMI Montessori Teacher Training in India | Centres, Diplomas & Eligibility | Blue Blocks",
    description:
      "Complete guide to AMI Montessori teacher training in India. 7 affiliated centres, 4 diploma levels, eligibility, duration, and career outcomes. Updated September 2026.",
  },
};

// 1. FAQPage Schema
const faqQuestions = AMI_FAQ_CATEGORIES.flatMap((cat) => cat.items);
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqQuestions.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answer,
    },
  })),
};

// 2. Organization Schema for each of the 7 training centres
const centresSchema = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "The Montessori Training and Research Trust (MTRT)",
    url: "https://montessorihyderabad.org",
    email: "info@montessorihyderabad.org",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jeedimetla",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Montessori Institute of Bangalore (MIB)",
    url: "https://montessoribangalore.org",
    email: "course@montessoribangalore.org",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Supraja Montessori Study Centre",
    url: "https://suprajamontessori.org",
    email: "admin@suprajamontessori.org",
    address: {
      "@type": "PostalAddress",
      streetAddress: "321, Nehru Nagar, 3rd Main Road, Kottivakkam",
      addressLocality: "Chennai",
      postalCode: "600096",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Kodaikanal AMI Centre for Montessori Studies",
    url: "https://montessori-ami.org/training-programmes/centres/kodaikanal-ami-centre-montessori-studies",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kodaikanal",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "R.T.I. Montessori Training — Sir Ratan Tata Institute",
    url: "https://montessori-mumbai.org",
    email: "enquiries@montessori-mumbai.org",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sir Ratan Tata Institute (Annexe), 30 N.S. Patkar Marg",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Vivek High Montessori Institute (VHMI)",
    url: "https://vivekhighschool.edu.in",
    email: "vhmi@vivekhighschool.edu.in",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chandigarh",
      addressCountry: "IN",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "JFA Montessori Teacher Training Centre (JFA MTTC)",
    url: "https://jainfuturisticacademy.com/mttc",
    email: "mttc.admissions@jfaedu.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
  },
];

// 3. BreadcrumbList Schema
const breadcrumbSchema = {
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
      name: "What We Do",
      item: "https://blueblocks.in/about-us/",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "AMI Montessori Training",
      item: "https://blueblocks.in/ami-montessori-training/",
    },
  ],
};

const fullSchema = [faqSchema, ...centresSchema, breadcrumbSchema];

export default function AmiMontessoriTrainingPage() {
  return (
    <>
      <PageJsonLd baseId="ami-montessori-training" schema={fullSchema} />

      {/* SECTION 1 — Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FBF7F2] via-[#F3E3CF]/40 to-[#FAF6F0] pt-44 sm:pt-48 md:pt-52 pb-14 sm:pb-20 border-b border-amber-200/50">
        {/* Decorative background subtle glow elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

        <Container>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow badge + breadcrumb */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#2C2F8F]/10 text-[#2C2F8F] border border-[#2C2F8F]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2C2F8F] animate-pulse" />
                  AMI Gold Standard • India Directory
                </span>
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium"
                >
                  <Link href="/" className="hover:text-slate-900 transition-colors">
                    Home
                  </Link>
                  <span>/</span>
                  <Link href="/about-us/" className="hover:text-slate-900 transition-colors">
                    What We Do
                  </Link>
                  <span>/</span>
                  <span className="text-[#2C2F8F] font-semibold">AMI Training</span>
                </nav>
              </div>

              {/* Exact H1 */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                AMI Montessori Teacher Training in India
              </h1>

              {/* Exact Paragraph 1 */}
              <p className="text-base sm:text-lg md:text-xl text-slate-800 leading-relaxed font-normal">
                The AMI diploma is the internationally recognised standard for Montessori teacher training. This page covers every diploma available in India, all seven AMI-affiliated training centres, eligibility, duration, and what an AMI qualification means for your career.
              </p>

              {/* Founder Continuum Card with Exact Paragraph 2 */}
              <div className="p-4 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-amber-200/80 shadow-md shadow-amber-900/5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B74F2A]">
                    THE 0–18 CONTINUUM
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#2C2F8F]">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">0–3</span>
                    <span className="text-slate-300">•</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">3–6</span>
                    <span className="text-slate-300">•</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">6–12</span>
                    <span className="text-slate-300">•</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">12–18</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Blue Blocks Montessori School in Hyderabad is guided by AMI principles across all levels from birth to 18. Our founder Pavan Goyal holds all four AMI diplomas; 0–3, 3–6, 6–12, and 12–18; one of the few educators globally to have completed the full continuum.
                </p>
              </div>

              {/* Exact CTA Button + Secondary Anchor */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <a
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-[#2C2F8F] text-white font-bold text-sm sm:text-base hover:bg-[#1e2060] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-[#2C2F8F]/25 inline-flex items-center justify-center gap-2 text-center"
                >
                  <span>Enquire About Training</span>
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#centres"
                  className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full bg-white text-slate-700 font-semibold text-sm sm:text-base border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm inline-flex items-center justify-center text-center"
                >
                  View 7 Training Centres
                </a>
              </div>
            </div>

            {/* Right Media Column (5 cols) */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              {/* Outer decorative glow and border */}
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl p-2 bg-gradient-to-tr from-amber-200 via-white to-indigo-100 shadow-2xl shadow-slate-900/10">
                <div className="relative rounded-[22px] overflow-hidden bg-slate-900 aspect-[4/3] sm:aspect-[4/3]">
                  <Image
                    src="/images/ami-teacher-training-hero.jpg"
                    alt="Authentic AMI Montessori Teacher Training Environment with Trainee and Materials"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Top-left planes badge */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2C2F8F]" />
                    <span className="text-[11px] font-bold text-slate-800 tracking-wide uppercase">
                      4 Planes (0–18)
                    </span>
                  </div>

                  {/* Top-right authentic badge overlay */}
                  <div className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-bold text-slate-800 tracking-wide uppercase">
                      AMI Accredited
                    </span>
                  </div>

                  {/* Bottom glassmorphic info bar */}
                  <div className="absolute inset-x-3 bottom-3 p-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-white shadow-lg">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white tracking-tight">
                          Association Montessori Internationale
                        </p>
                        <p className="text-[11px] text-amber-200/90 font-medium">
                          Founded 1929 by Dr. Maria Montessori
                        </p>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded bg-white/20 uppercase font-semibold tracking-wider whitespace-nowrap ml-2">
                        110+ Countries
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sticky Anchor Navigation Bar */}
      <AmiStickyNav />

      {/* SECTION 2 — What Is the AMI Diploma? */}
      <section id="what-is-ami" className="py-14 sm:py-18 bg-white scroll-mt-36 sm:scroll-mt-44 border-b border-slate-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What Is the AMI Montessori Diploma?
            </h2>
            <div className="mt-6 space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>
                The AMI diploma is issued by the Association Montessori Internationale — the organisation founded by Dr Maria Montessori in 1929 to protect the integrity of her method. It is the only Montessori teacher qualification issued directly under the authority of the organisation Montessori herself created.
              </p>
              <p>
                An AMI diploma is not a certificate course. It is a rigorous professional qualification spanning nine to twenty-two months of full-time study. Training covers child developmental science, observation methodology, hands-on material mastery, and supervised classroom practice. It is recognised by Montessori schools in over 110 countries.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3 — The Four Diplomas */}
      <AmiDiplomasTable />

      {/* SECTION 4 — What Training Involves */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2C2F8F] block mb-2">
                FOUR PILLARS OF RIGOR
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                What AMI Montessori Training Involves
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                Every AMI diploma programme covers four components regardless of age level.
              </p>
            </div>

            {/* Redesigned 4 Components Cards */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Component 1: Theoretical Study */}
              <div className="relative rounded-2xl bg-white border border-slate-200/90 p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#2C2F8F]/10 text-[#2C2F8F] border border-[#2C2F8F]/20">
                      01 • Theory
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      Foundational Philosophy
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    Theoretical Study
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                    Dr Montessori&apos;s texts on child development, social philosophy, and human tendencies. Developmental science as it relates to each plane of development.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2C2F8F]" />
                  <span>Philosophical foundation & developmental science</span>
                </div>
              </div>

              {/* Component 2: Material Study and Album Preparation */}
              <div className="relative rounded-2xl bg-white border border-amber-200/90 p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
                      02 • Albums
                    </span>
                    <span className="text-xs font-bold text-amber-800">
                      Primary Assessed Work
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    Material Study and Album Preparation
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                    Detailed instruction on every Montessori material — its purpose, its sequence of presentation, and its position in the child&apos;s developmental arc. Trainees prepare a complete written album documenting every presentation. This is the primary assessed work product of the diploma.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B74F2A]" />
                  <span>Complete documented presentations for every material</span>
                </div>
              </div>

              {/* Component 3: Supervised Practice */}
              <div className="relative rounded-2xl bg-white border border-emerald-200/90 p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-200">
                      03 • Practice
                    </span>
                    <span className="text-xs font-bold text-emerald-800">
                      Active Mastery
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    Supervised Practice
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                    Hands-on practice of material presentations under AMI trainer supervision. Presentations are repeated until mastery. This is active, corrected practice — not observation.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Supervised by AMI trainers until presentation mastery</span>
                </div>
              </div>

              {/* Component 4: Classroom Observation */}
              <div className="relative rounded-2xl bg-white border border-sky-200/90 p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sky-100 text-sky-900 border border-sky-200">
                      04 • Field Work
                    </span>
                    <span className="text-xs font-medium text-sky-800">
                      Live Environments
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    Classroom Observation
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                    Verified passive observation hours in accredited AMI Montessori environments. Trainees observe real children working in prepared environments and record what they see systematically.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-sky-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                  <span>Verified observation hours in accredited AMI classrooms</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 5 — Eligibility */}
      <AmiEligibilityTable />

      {/* SECTION 6 — Training Centres */}
      <AmiTrainingCentres />

      {/* SECTION 7 — AMI vs Non-AMI */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AMI vs Non-AMI Montessori Training; What Is the Difference?
            </h2>

            <div className="mt-8 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90">
                <h3 className="text-lg font-bold text-slate-900">Qualification depth</h3>
                <p className="mt-2 text-base text-slate-700 leading-relaxed">
                  An AMI diploma requires nine to twelve months of full-time study, a complete written album of material presentations, supervised practice, and verified observation hours in live AMI environments. It is a professional qualification, not a certificate course.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90">
                <h3 className="text-lg font-bold text-slate-900">School recognition</h3>
                <p className="mt-2 text-base text-slate-700 leading-relaxed">
                  AMI-affiliated schools in India and internationally require an AMI diploma for lead guide positions. If your goal is to work in a school operating authentic AMI Montessori, the AMI diploma is the relevant qualification.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90">
                <h3 className="text-lg font-bold text-slate-900">International career portability</h3>
                <p className="mt-2 text-base text-slate-700 leading-relaxed">
                  An AMI diploma qualifies you to teach in AMI-affiliated schools in over 110 countries. No other Montessori qualification in India offers this.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-50/70 border border-[#2C2F8F]/20">
                <h3 className="text-lg font-bold text-[#2C2F8F]">The honest answer</h3>
                <p className="mt-2 text-base text-slate-800 font-medium leading-relaxed">
                  If you want to work in authentic Montessori, in India or internationally — train with AMI.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 8 — Blue Blocks and AMI Training */}
      <section className="py-14 sm:py-18 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AMI Training and Blue Blocks, Hyderabad
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              Blue Blocks supports aspiring Montessori guides in two ways.
            </p>

            <div className="mt-8 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <h3 className="text-lg font-bold text-[#2C2F8F]">
                  Observation in a Live AMI Environment
                </h3>
                <p className="mt-2 text-base text-slate-700 leading-relaxed">
                  Prospective trainees and current trainees completing observation hours are welcome to apply for observation sessions at Blue Blocks. Our environments cover the full 0–18 continuum — Infant and Toddler, Pre-Primary, Primary, and Secondary, giving trainees access to every age-level environment in one school.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <h3 className="text-lg font-bold text-[#2C2F8F]">Guide Sponsorship</h3>
                <p className="mt-2 text-base text-slate-700 leading-relaxed">
                  Blue Blocks sponsors selected guides through AMI diploma training. Sponsorship is offered to candidates joining the school&apos;s team who are committed to completing the relevant diploma. Enquire through our team via our{" "}
                  <Link
                    href="/careers/"
                    className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060] transition-colors"
                  >
                    Careers page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 9 — SPONSORSHIP */}
      <section id="sponsorship" className="py-16 sm:py-20 bg-slate-50/70 scroll-mt-36 sm:scroll-mt-44 border-b border-slate-200">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#2C2F8F] block mb-2">
                  BLUE BLOCKS SCHOLARSHIP & SPONSORSHIP
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Sponsorship
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Under Preparation
              </span>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    Working on this. Will add here soon.
                  </p>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                    Formal guidelines and application criteria for candidate guide sponsorship are currently in development. If you are an aspiring guide or diploma applicant seeking sponsorship support, please consult our team via the{" "}
                    <Link
                      href="/careers/"
                      className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060] transition-colors"
                    >
                      Careers page
                    </Link>{" "}
                    or connect directly with our training coordinator below.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 10 — FAQ */}
      <AmiFAQ />

      {/* SECTION 11 — CTA */}
      <AmiCTA />
    </>
  );
}
