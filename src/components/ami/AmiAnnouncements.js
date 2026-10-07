import Image from "next/image";
import Container from "@/components/layout/Container";
import mmtiPoster from "@/assets/annoucement/WhatsApp Image 2026-10-07 at 2.28.42 PM.jpeg";
import rtiPoster from "@/assets/annoucement/WhatsApp Image 2026-10-07 at 2.28.42 PM (1).jpeg";

const POSTED = "06-10-2026";

function ExpandArrow() {
  return (
    <svg
      className="w-4 h-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function AmiAnnouncements() {
  return (
    <section
      id="announcements"
      className="py-14 sm:py-18 bg-white scroll-mt-36 sm:scroll-mt-44 border-b border-slate-100"
    >
      <Container>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2C2F8F]">
            AMI Training Announcements
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Upcoming AMI courses
          </h2>
          <p className="mt-3 text-sm text-slate-600">Posted {POSTED}</p>

          <div className="mt-8 space-y-6">
            <article className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)]">
                <Image
                  src={mmtiPoster}
                  alt="Poster for the 5th AMI Montessori Elementary Diploma Course by Medha Montessori Training Institute"
                  className="w-full h-auto object-cover"
                  sizes="(min-width: 768px) 220px, 100vw"
                />
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    5th AMI Montessori Elementary Diploma Course (6-12 Age Level)
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                    Conducted by Medha Montessori Training Institute (MMTI) under the auspices of AMI and MTRT.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-slate-800">
                    Starts: Jan 18, 2027
                    <span className="mx-2 text-slate-300">|</span>
                    Mode: Blended (Onsite &amp; Online)
                  </p>

                  <details className="group mt-4">
                    <summary className="flex items-center gap-2 cursor-pointer list-none text-sm font-semibold text-[#2C2F8F] [&::-webkit-details-marker]:hidden">
                      <ExpandArrow />
                      Click the arrow to expand for schedule and registration details
                    </summary>
                    <div className="mt-4 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                      <p>
                        Step into a transformational teaching journey and help inspire children aged 6 to 12.
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Trainer:</span> Ms. Madhavi Gaddam, AMI Elementary Trainer
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Duration:</span> January 18th, 2027 to May 28th, 2028
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Schedule:</span> Onsite Timings: 9:00 AM to 4:30 PM. Online Timings: 5:00 PM to 7:00 PM.
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Onsite Venue:</span> Medha Montessori School, Peddamangalaram, Moinabad, 501504
                      </p>
                      <div>
                        <p className="font-semibold text-slate-900">How to Apply &amp; Contact MMTI</p>
                        <p className="mt-1">
                          Call:{" "}
                          <a href="tel:+919440233288" className="text-[#2C2F8F] font-semibold underline underline-offset-2">
                            +91-9440233288
                          </a>{" "}
                          (9 am to 4 pm, Monday to Saturday)
                        </p>
                        <p>
                          Email:{" "}
                          <a href="mailto:elementarycoursehyd@gmail.com" className="text-[#2C2F8F] font-semibold underline underline-offset-2">
                            elementarycoursehyd@gmail.com
                          </a>
                        </p>
                        <p>
                          Websites:{" "}
                          <a href="https://www.montessorihyderabad.org" target="_blank" rel="noopener noreferrer" className="text-[#2C2F8F] font-semibold underline underline-offset-2">
                            www.montessorihyderabad.org
                          </a>
                          {" | "}
                          <a href="https://www.medhamontessori.com" target="_blank" rel="noopener noreferrer" className="text-[#2C2F8F] font-semibold underline underline-offset-2">
                            www.medhamontessori.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)]">
                <Image
                  src={rtiPoster}
                  alt="Poster for the AMI Elementary Diploma conducted by Sir Ratan Tata Institute"
                  className="w-full h-auto object-cover"
                  sizes="(min-width: 768px) 220px, 100vw"
                />
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    AMI Elementary Diploma (6–12 years)
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                    Conducted by RTI (Sir Ratan Tata Institute) in association with AMI.
                  </p>
                  <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                    Become the teacher who understands the child, guiding growing minds from imagination to understanding.
                  </p>

                  <details className="group mt-4">
                    <summary className="flex items-center gap-2 cursor-pointer list-none text-sm font-semibold text-[#2C2F8F] [&::-webkit-details-marker]:hidden">
                      <ExpandArrow />
                      Click the arrow to expand for course benefits and registration details
                    </summary>
                    <div className="mt-4 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                      <div>
                        <p className="font-semibold text-slate-900">What You Will Learn</p>
                        <ul className="mt-2 list-disc list-inside space-y-1.5">
                          <li>How to present the Montessori Great Stories.</li>
                          <li>How to connect science, history, geography, mathematics, and language.</li>
                          <li>To create an environment for independent learning and develop classroom leadership skills.</li>
                          <li>To earn an internationally recognised AMI qualification and join a global community of educators.</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">For More Information &amp; Registration</p>
                        <p className="mt-1">
                          Email:{" "}
                          <a href="mailto:rti@elementarycourse.com" className="text-[#2C2F8F] font-semibold underline underline-offset-2">
                            rti@elementarycourse.com
                          </a>
                        </p>
                        <p>
                          Call:{" "}
                          <a href="tel:+919833557490" className="text-[#2C2F8F] font-semibold underline underline-offset-2">
                            9833557490
                          </a>
                          {" | "}
                          <a href="tel:+919490422220" className="text-[#2C2F8F] font-semibold underline underline-offset-2">
                            9490422220
                          </a>
                        </p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
