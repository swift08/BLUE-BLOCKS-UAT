import PageHero from "@/components/blocks/PageHero";
import Container from "@/components/layout/Container";
import PageJsonLd from "@/components/seo/PageJsonLd";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata = {
  title: "AMI Montessori Teacher Training Course & Certification | Blue Blocks",
  description:
    "Discover the Association Montessori Internationale (AMI) teacher training programme at Blue Blocks. Learn about upcoming orientation sessions, eligibility criteria, and how to become a certified Montessori guide.",
  keywords: [
    "AMI Montessori teacher training Hyderabad",
    "Montessori training course",
    "become a Montessori teacher",
    "AMI Montessori certification",
    "Montessori teacher diploma",
    "Blue Blocks training",
  ],
  alternates: {
    canonical: "https://blueblocks.in/ami-training/",
    languages: {
      "en-in": "https://blueblocks.in/ami-training/",
      "x-default": "https://blueblocks.in/ami-training/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/ami-training/",
    title: "AMI Montessori Teacher Training Course & Certification | Blue Blocks",
    description:
      "Join the internationally recognized AMI Montessori Teacher Training Programme. Explore upcoming orientation schedules, application details, and career pathways.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "AMI Montessori Teacher Training at Blue Blocks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMI Montessori Teacher Training | Blue Blocks",
    description:
      "Transform your career with the globally recognized AMI Montessori Teacher Training program. Online orientation starts soon.",
  },
};

const amiSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "AMI Montessori Teacher Training Programme",
    "description": "Internationally recognized Association Montessori Internationale (AMI) teacher training programme facilitating the certification of Montessori guides for toddler, primary, and elementary age groups.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Blue Blocks Montessori School",
      "sameAs": "https://blueblocks.in"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online and In-Person",
      "startDate": "2026-07-25",
      "name": "AMI Montessori Teacher Training Orientation",
      "location": {
        "@type": "VirtualLocation",
        "url": "https://us06web.zoom.us/j/87583580035?pwd=oABUayMzYb1HbrNGI73FTBBXnyfAgT.1"
      }
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://blueblocks.in/" },
      { "@type": "ListItem", "position": 2, "name": "AMI Training", "item": "https://blueblocks.in/ami-training/" }
    ]
  }
];

export default function AmiTrainingPage() {
  return (
    <>
      <PageJsonLd baseId="ami-training" schema={amiSchema} />

      <PageHero
        title="AMI Teacher Training"
        subtitle="Embark on a transformative journey to become a certified Montessori guide."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "AMI Training" },
        ]}
        bg={{
          base: "#F3E3CF",
          leftArc: "/ui/arc-left.webp",
          rightArc: "/ui/arc-right.webp",
        }}
      />

      {/* Intro Section */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <span className="text-amber-600 font-bold uppercase tracking-wider text-xs block mb-3">
              Association Montessori Internationale
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              The Gold Standard of Montessori Education
            </h2>
            <div className="text-slate-700 space-y-6 leading-relaxed">
              <p>
                The Association Montessori Internationale (AMI) was founded by Dr. Maria Montessori in 1929 to protect, maintain, and propagate the scientific integrity of her pedagogical principles. Today, an AMI diploma is internationally recognized, enabling you to teach at premier Montessori environments anywhere in the world.
              </p>
              <p>
                At Blue Blocks, we believe that education is not about filling a vessel, but about supporting the self-construction of the child. Our training programs prepare adults to become scientific observers, guiding children with respect and understanding. Led by Pavan Goyal—one of the few educators globally holding all four AMI diplomas (0-18 age group)—our programs are designed to inspire a new generation of teachers.
              </p>
            </div>

            {/* Quick Links Group */}
            <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold text-amber-600">
              <Link href="/about-us/" className="hover:text-amber-700 underline">
                Meet our Founders & Credentials
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/montessori-system/" className="hover:text-amber-700 underline">
                Explore the Montessori System
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/admissions/" className="hover:text-amber-700 underline">
                Student Admissions details
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Upcoming Orientation CTA Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/60">
        <Container>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm relative overflow-hidden">
            {/* Top Accent Ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-indigo-600" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-3 py-1 text-xs font-bold mb-4">
                  Upcoming Online Orientation
                </span>
                <h3 className="text-2xl font-bold text-slate-900 leading-snug mb-3">
                  Build a Career That Shapes the Future
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-xl">
                  Are you looking for a career change? Passionate about child development? Join our free orientation to discover how Montessori training can lead to a deeply fulfilling career.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <span>Date: <strong className="text-slate-900">July 25, 2026</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⏰</span>
                    <span>Time: <strong className="text-slate-900">5:00 PM – 6:00 PM (IST)</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    <span>Venue: <strong className="text-slate-900">Online via Zoom</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎟️</span>
                    <span>Fee: <strong className="text-indigo-700">FREE Orientation</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[200px]">
                <a
                  href="https://forms.gle/bGRW3BFnixmkzCEh9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-sm text-white transition-all shadow-md shadow-amber-500/10"
                >
                  Register Now
                </a>
                <a
                  href="https://us06web.zoom.us/j/87583580035?pwd=oABUayMzYb1HbrNGI73FTBBXnyfAgT.1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-sm text-slate-700 transition-all bg-white"
                >
                  Join via Zoom
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <span>Meeting ID: <strong>875 8358 0035</strong> | Passcode: <strong>148941</strong></span>
              <span>Need help? WhatsApp/Call: <a href="tel:+919154160971" className="text-slate-700 font-semibold underline">+91 9154160971</a></span>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose AMI Course Section */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight mb-12 text-center">
              Why Choose an AMI Montessori Teacher Diploma?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/50 hover:border-slate-300 transition-colors duration-200">
                <span className="text-2xl block mb-4">🌍</span>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Global Career Portability</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  AMI qualifications are standard-bearers globally. You gain a credential that is highly respected and sought after by schools in over 110 countries.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/50 hover:border-slate-300 transition-colors duration-200">
                <span className="text-2xl block mb-4">🔬</span>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Deep Developmental Science</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Learn child psychology, developmental stages, and observation methods directly rooted in Dr. Maria Montessori&apos;s medical and scientific background.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/50 hover:border-slate-300 transition-colors duration-200">
                <span className="text-2xl block mb-4">🖐️</span>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Hands-on Material Mastery</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Gain comprehensive practice with the scientific wooden apparatus, understanding the purpose behind every single Montessori presentation.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/50 hover:border-slate-300 transition-colors duration-200">
                <span className="text-2xl block mb-4">🌱</span>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Personal Transformation</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Montessori training is a journey of self-reflection. You will emerge with a renewed relationship with the child and a deeper respect for human potential.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Program Details & Eligibility */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight mb-8">
              Eligibility & Course Structure
            </h2>
            
            <div className="prose prose-slate max-w-none text-slate-700 space-y-6 leading-relaxed">
              <p>
                Our certification pathways are designed for a diverse range of applicants, including career transitioners, aspiring teachers, university graduates, and current educators looking to deepen their credentials.
              </p>
              <h4 className="text-lg font-semibold text-slate-900 mt-6">Basic Requirements:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>A Bachelor&apos;s degree in any discipline (preferred but exceptions are considered for motivated candidates).</li>
                <li>Proficiency in oral and written English, as the coursework, albums, and oral examinations are conducted in English.</li>
                <li>A passion for working with children and a commitment to completing the rigorous curriculum.</li>
              </ul>
              
              <h4 className="text-lg font-semibold text-slate-900 mt-6">Course Components:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Theoretical Lectures:</strong> Studying Maria Montessori&apos;s texts on human development, social philosophy, and child psychology.</li>
                <li><strong>Material Demonstrations:</strong> Detailed instruction on the presentation and pedagogical scope of classroom materials.</li>
                <li><strong>Supervised Practice:</strong> In-depth hands-on practice sessions under the guidance of AMI trainers.</li>
                <li><strong>Classroom Observation:</strong> Passive observation hours in accredited AMI Montessori environments.</li>
              </ul>
            </div>

            <div className="mt-12 bg-white rounded-3xl border border-slate-200 p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Interested in learning more?</h3>
              <p className="text-slate-600 text-sm mb-6 max-w-lg mx-auto">
                Get in touch with our training coordinators for detailed brochures, fees, and application timelines.
              </p>
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 font-semibold text-sm text-white transition-colors cursor-pointer"
              >
                Contact Training Coordinators
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
