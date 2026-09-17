import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";
import Container from "@/components/layout/Container";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata = {
  title: "Montessori School Admissions Hyderabad | Blue Blocks",
  description:
    "Montessori school admissions in Hyderabad at Blue Blocks. AMI-standard pedagogy, ages 15 months to 18 years, Cambridge IGCSE integration.",
  keywords: [
    "Montessori school admissions Hyderabad",
    "Blue Blocks school admission process",
    "best school admissions Gachibowli",
    "Montessori school entry requirements",
    "Tellapur school admission guidelines",
  ],
  alternates: {
    canonical: "https://blueblocks.in/admissions/",
    languages: {
      "en-in": "https://blueblocks.in/admissions/",
      "x-default": "https://blueblocks.in/admissions/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/admissions/",
    title: "Montessori School Admissions Hyderabad | Blue Blocks",
    description:
      "Montessori school admissions in Hyderabad at Blue Blocks. AMI-standard pedagogy, ages 15 months to 18 years, Cambridge IGCSE integration.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Montessori Admissions Hyderabad",
      },
    ],
  },
};

export default function AdmissionsPage() {
  const page = siteData?.pages?.admissions || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="admissions" schema={page?.schema} />
      
      <SectionRenderer sections={sections} />

      {/* Custom localized SEO content & internal links section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-snug mb-8 border-b border-slate-200 pb-4">
              Admissions Guidelines & Entry Windows
            </h3>

            <div className="grid gap-8 md:grid-cols-2 mb-12">
              {/* Gachibowli Campus Admissions */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all">
                <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-2.5 py-1 text-xs font-bold mb-4">
                  Gachibowli Campus
                </span>
                <h4 className="text-lg font-bold text-slate-900 mb-3">Infant & Pre-Primary Admissions</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Serving children aged <strong>15 months to 6 years</strong>. Ideally suited for parents located in Gachibowli, Madhapur, Hitec City, and surrounding IT corridor neighborhoods.
                </p>
                <ul className="text-xs font-semibold text-amber-600 space-y-2 border-t border-slate-100 pt-4">
                  <li>
                    <Link href="/programs/playgroup/montessori-toddler/" className="hover:text-amber-700 underline">
                      Toddler Community (1.5 - 3 Years)
                    </Link>
                  </li>
                  <li>
                    <Link href="/programs/nursery-school/" className="hover:text-amber-700 underline">
                      Pre-Primary Montessori (3 - 6 Years)
                    </Link>
                  </li>
                  <li>
                    <Link href="/campus/" className="hover:text-amber-700 underline">
                      Tour Gachibowli Campus
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Tellapur Campus Admissions */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all">
                <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full px-2.5 py-1 text-xs font-bold mb-4">
                  Tellapur Campus
                </span>
                <h4 className="text-lg font-bold text-slate-900 mb-3">Elementary & Secondary Admissions</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Serving the complete Montessori continuum, including Primary (Class 1 to 6) and Secondary (Class 7 to 10), integrated with the Cambridge IGCSE framework.
                </p>
                <ul className="text-xs font-semibold text-amber-600 space-y-2 border-t border-slate-100 pt-4">
                  <li>
                    <Link href="/programs/primary-school-elementary/class-1-to-6/" className="hover:text-amber-700 underline">
                      Elementary Primary School (Class 1 - 6)
                    </Link>
                  </li>
                  <li>
                    <Link href="/programs/secondary-school/cambridge-igcse-erdkinder/" className="hover:text-amber-700 underline">
                      Secondary School & Erdkinder (Class 7 - 10)
                    </Link>
                  </li>
                  <li>
                    <Link href="/campus/" className="hover:text-amber-700 underline">
                      Tour Tellapur Campus
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* General Onboarding Information */}
            <div className="bg-white rounded-3xl border border-slate-200/60 p-8 sm:p-10 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-4">Important Enrollment Notes:</h4>
              <div className="text-sm text-slate-700 space-y-4 leading-relaxed">
                <p>
                  • <strong>AMI Standards:</strong> Blue Blocks strictly maintains Association Montessori Internationale (AMI) student-to-teacher ratios. In order to safeguard the prepared environment, seats are capped and filled based on alignment and application date.
                </p>
                <p>
                  • <strong>Parental Involvement:</strong> We require all prospective parents to attend our Discovery Workshop and onboarding sessions. This ensures parent-school synchronization on freedom, self-discipline, and independent education. See recent event updates on our <Link href="/annoucement-centre/" className="text-amber-600 hover:text-amber-700 underline font-semibold transition-colors">Announcement Centre</Link>.
                </p>
                <p>
                  • <strong>Teacher Training Alignment:</strong> Our guides are continuously trained under rigorous standards. Prospective educators seeking certifications can visit the <Link href="/ami-training/" className="text-amber-600 hover:text-amber-700 underline font-semibold transition-colors">AMI Training</Link> page.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
