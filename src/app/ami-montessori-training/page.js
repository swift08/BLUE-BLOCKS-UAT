import Link from "next/link";
import PageJsonLd from "@/components/seo/PageJsonLd";
import Container from "@/components/layout/Container";
import StickyPillsNav from "@/components/ui/StickyPillsNav";
import AmiDiplomasTable from "@/components/ami/AmiDiplomasTable";
import AmiEligibilityTable from "@/components/ami/AmiEligibilityTable";
import AmiTrainingCentres from "@/components/ami/AmiTrainingCentres";
import AmiAnnouncements from "@/components/ami/AmiAnnouncements";
import AmiFAQ from "@/components/ami/AmiFAQ";
import { AMI_FAQ_CATEGORIES } from "@/data/ami-faq-data";
import AmiCTA from "@/components/ami/AmiCTA";

const AMI_NAV = [
  { label: "Training Centres", href: "#centres", id: "centres" },
  { label: "Announcements", href: "#announcements", id: "announcements" },
  { label: "What Is AMI", href: "#what-is-ami", id: "what-is-ami" },
  { label: "The Diplomas", href: "#diplomas", id: "diplomas" },
  { label: "Sponsorship", href: "#sponsorship", id: "sponsorship" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
];

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
      <section className="relative bg-[#FAF6F0] pt-36 sm:pt-40 md:pt-44 pb-8 sm:pb-10 border-b border-amber-200/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-5 lg:gap-12 lg:items-end">
            <div className="min-w-0">
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium"
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

              <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-[#2C2F8F]">
                AMI Gold Standard · India Directory
              </p>

              <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl">
                AMI Montessori Teacher Training in India
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
                The AMI diploma is the internationally recognised standard for Montessori teacher training. This page covers every diploma available in India, all seven AMI-affiliated training centres, eligibility, duration, and what an AMI qualification means for your career.
              </p>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-4xl">
                <span className="font-semibold text-slate-800">0–18 continuum:</span>{" "}
                Blue Blocks is guided by AMI principles from birth to 18. Founder Pavan Goyal holds all four AMI diplomas (0–3, 3–6, 6–12, 12–18).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-60">
              <a
                href="#contact"
                className="inline-flex w-full lg:w-auto items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#2C2F8F] text-white text-sm font-bold hover:bg-[#1e2060] transition-colors"
              >
                Enquire About Training
                <span aria-hidden>→</span>
              </a>
              <a
                href="#centres"
                className="inline-flex w-full lg:w-auto items-center justify-center px-5 py-2.5 rounded-full bg-white text-slate-700 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                View 7 Training Centres
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Sticky Anchor Navigation Bar */}
      <StickyPillsNav
        items={AMI_NAV}
        ariaLabel="AMI Training page section navigation"
        defaultActive="centres"
      />

      {/* Training centres first */}
      <AmiTrainingCentres />

      <AmiAnnouncements />

      {/* SECTION 2 — What Is the AMI Diploma? */}
      <section id="what-is-ami" className="py-14 sm:py-18 bg-white scroll-mt-36 sm:scroll-mt-44 border-b border-slate-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What Is the AMI Montessori Diploma?
            </h2>
            <div className="mt-6 space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>
                The AMI diploma is issued by the Association Montessori Internationale — the organisation founded by Dr Maria Montessori in 1929 to protect the integrity of her method. In 2029, AMI celebrates 100 years of thriving existence. It is the only Montessori teacher qualification issued directly under the authority of the organisation Montessori herself created.
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
                      Teaching Practice
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    Classroom Observation &amp; Field Work
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                    Teaching practice is classroom observation and field work. Trainees complete verified observation hours in accredited AMI Montessori environments, watching real children work in prepared environments and recording what they see systematically.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-sky-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                  <span>Classroom observation and field work in accredited AMI classrooms</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 5 — Eligibility */}
      <AmiEligibilityTable />

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
                  Prospective trainees and current trainees completing observation hours are welcome to apply for observation sessions at Blue Blocks. Our environments cover the full 0–18 continuum — Infant and Toddler, Pre-Primary, Primary (Grade 1–6), and Secondary (High School), giving trainees access to every age-level environment in one school.
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#2C2F8F] block mb-2">
              BLUE BLOCKS SCHOLARSHIP & SPONSORSHIP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sponsorship
            </h2>

            <div className="mt-6 rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-sm">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Blue Blocks sponsors selected guides through AMI diploma training. Sponsorship is offered to candidates joining the school&apos;s team who are committed to completing the relevant diploma.
              </p>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Enquire through our{" "}
                <Link
                  href="/careers/"
                  className="text-[#2C2F8F] font-semibold underline underline-offset-2 hover:text-[#1e2060] transition-colors"
                >
                  Careers page
                </Link>
                , or connect with the training coordinator in the contact section below.
              </p>
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
