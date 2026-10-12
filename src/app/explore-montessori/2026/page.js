import Container from "@/components/layout/Container";
import PageJsonLd from "@/components/seo/PageJsonLd";
import FaqList from "./FaqList";

export const dynamic = "force-static";

export const metadata = {
  title: "Explore Montessori 2026 | Blue Blocks",
  description:
    "An annual children's research exhibition — this year exploring the science and logic of biomimicry.",
  alternates: { canonical: "https://blueblocks.in/explore-montessori/2026/" },
};

const QUESTIONS = [
  "How does it work?",
  "Why does it work this way?",
  "What problem is the organism solving?",
  "What can we learn from it?",
  "Could that principle help solve a human problem?",
];

const CHAIN = ["Nature", "Observation", "Question", "Research", "Principle", "Human Application"];

const AUDIENCE = [
  "Scientists",
  "Researchers",
  "Educators",
  "Academicians",
  "Designers",
  "Parents",
  "Students",
  "Nature Enthusiasts",
  "The Curious",
];

const SLOTS = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];

const FAQS = [
  {
    q: "Is Explore Montessori open to schools other than Blue Blocks?",
    a: "Yes. Explore Montessori is open to everyone — students, educators, researchers, parents and curious visitors from outside Blue Blocks are welcome. External visitors register through the registration form and select a visit time slot.",
  },
  {
    q: "Who conducted the 100 research projects on display?",
    a: "The 100 research projects were undertaken by students and parents of Blue Blocks Montessori School as part of this year's Explore Montessori research journey. Each project begins with an organism or natural system, studies the principles at work, and explores how those principles could address a human challenge.",
  },
  {
    q: "Do I need a background in science to enjoy the exhibition?",
    a: "No. The exhibition is designed to be accessible to everyone. The Biomimicry Park is built around questions and principles anyone can engage with, whether you are a researcher, an educator, a designer, a parent, or simply someone curious about nature and how it works.",
  },
  {
    q: "What exactly is the Biomimicry Park?",
    a: "The Biomimicry Park is the physical exhibition space at Blue Blocks, structured around the 100 research projects. It is immersive — rather than presenting finished displays, it invites visitors to follow the thinking behind each investigation: the organism studied, the mechanism observed, the principle identified, and the human application explored.",
  },
  {
    q: "Is there a fee to attend?",
    a: "Explore Montessori 2026 is free to attend. Visitors from outside Blue Blocks Montessori School and the Blue Blocks Micro Research Institute are required to register in advance and receive confirmation before visiting. Please complete the registration form to select a time slot and confirm your attendance.",
  },
  {
    q: "Can I bring children?",
    a: "Yes. The exhibition is designed to engage visitors of all ages. Children will find the Biomimicry Park particularly engaging — the research projects are made accessible through models, demonstrations and interactions, and the inquiry process itself is one they can follow and participate in.",
  },
  {
    q: "What is Explore Montessori as an annual programme?",
    a: "Explore Montessori is Blue Blocks' annual children's research exhibition. Each year, a new theme anchors the research journey — one that brings together scientific inquiry, design thinking, and the Montessori approach to learning. The Biomimicry theme for 2026 follows this tradition of choosing a subject through which children can observe, question, research and present original work.",
  },
  {
    q: "How do I register?",
    a: "Registration for external visitors opens shortly. Once the form is live, you will be able to select a visit time slot (10:00 AM, 10:30 AM, 11:00 AM or 11:30 AM) and complete your registration. Watch this page for the registration link.",
  },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Explore Montessori 2026",
    description:
      "An annual children's research exhibition — this year exploring the science and logic of biomimicry.",
    startDate: "2026-11-28T09:30:00+05:30",
    endDate: "2026-11-28T12:30:00+05:30",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    isAccessibleForFree: true,
    url: "https://blueblocks.in/explore-montessori/2026/",
    location: {
      "@type": "Place",
      name: "Blue Blocks Montessori School, Tellapur, Hyderabad",
      address: "Tellapur, Hyderabad",
    },
    organizer: { "@id": "https://blueblocks.in/#organization" },
  },
];

export default function ExploreMontessori2026Page() {
  return (
    <>
      <PageJsonLd baseId="explore-montessori-2026" schema={schema} />
      <header className="bg-[#F3E3CF] px-4 pb-14 pt-32 text-center sm:pt-36">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F52BA]">
          Explore Montessori · 2026
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-tight text-slate-900 sm:text-6xl">
          Nature has already
          <br />
          <em className="font-serif text-[#0F52BA]">solved this.</em>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-700 sm:text-lg">
          An annual children&apos;s research exhibition — this year exploring the science and logic of biomimicry.
        </p>
        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
          <span>28 November 2026</span>
          <span>9:30 AM – 12:30 PM</span>
          <span>Blue Blocks, Tellapur, Hyderabad</span>
        </p>
      </header>

      <section className="bg-[#273C75] px-4 py-12 text-center text-white">
        <blockquote className="mx-auto max-w-3xl font-serif text-2xl font-normal italic leading-snug sm:text-4xl">
          Nature has already solved many problems.
          <br />
          The question is: are we observing closely enough to learn from it?
          <cite className="mt-4 block font-sans text-xs font-semibold uppercase not-italic tracking-[0.12em] text-white/80">
            — The Central Thought, Explore Montessori 2026
          </cite>
        </blockquote>
      </section>

      <div>
        <Container>
          <div className="mx-auto max-w-3xl">
            <section className="border-b border-neutral-200 py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F52BA]">This Year&apos;s Theme</p>
              <h2 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">Biomimicry</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Nature has spent billions of years adapting, evolving and finding ways to survive. From the way a leaf manages sunlight and heat to the way a bird flies in formation, organisms around us offer remarkable examples of how problems can be solved.
                </p>
                <p>
                  Explore Montessori 2026 invites us to look at nature differently — not simply as something to observe, but as something we can learn from.
                </p>
                <p className="border-l-4 border-[#0F52BA] bg-[#F3E3CF] px-4 py-4 font-serif text-lg italic text-slate-900">
                  Biomimicry is the practice of studying how living things solve problems, understanding the principles behind those solutions, and applying those principles to human challenges.
                </p>
                <p>
                  It goes beyond imitating the appearance of nature. Drawing a leaf on a building is not biomimicry. Studying how a leaf manages sunlight, heat and water — and using those principles to design a more efficient building — is.
                </p>
                <p>
                  At its heart, biomimicry begins with a simple question: <strong>How has nature already solved this problem?</strong>
                </p>
              </div>
            </section>

            <section className="border-b border-neutral-200 py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F52BA]">Why Biomimicry</p>
              <h2 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">Questions with direction</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Children naturally observe, question and investigate the world around them. Biomimicry gives these questions a powerful direction. Instead of looking at nature only to identify or describe it, students are encouraged to ask:
              </p>
              <ul className="mt-4 space-y-2 font-serif text-lg italic text-slate-700">
                {QUESTIONS.map((question) => (
                  <li key={question}>— {question}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                This journey from observation to questioning, research, understanding and application closely reflects the way learning is approached at Blue Blocks. Through Biomimicry, Explore Montessori 2026 brings together nature, scientific inquiry, design, research and innovation.
              </p>
            </section>

            <section className="border-b border-neutral-200 py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F52BA]">The Exhibition</p>
              <h2 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">The Biomimicry Park</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Visitors will step into the Biomimicry Park — an immersive exploration inspired by different organisms and the remarkable mechanisms they use to survive, adapt and thrive.
                </p>
                <p>
                  Through research, models, demonstrations and interactions, visitors will discover how strategies found in nature can inspire solutions to human challenges. Rather than simply seeing finished projects, visitors experience the thinking behind them.
                </p>
              </div>
              <ol className="mt-6 flex flex-wrap items-center gap-2" aria-label="The inquiry process: Nature to Human Application">
                {CHAIN.map((step, index) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="rounded-full bg-[#E8EEF8] px-3 py-1 text-xs font-semibold tracking-wide text-[#0F52BA]">
                      {step}
                    </span>
                    {index < CHAIN.length - 1 ? <span aria-hidden="true" className="text-slate-400">→</span> : null}
                  </li>
                ))}
              </ol>
            </section>

            <section className="border-b border-neutral-200 py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F52BA]">What Makes This Significant</p>
              <h2 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">100 research projects</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                At the heart of this year&apos;s Explore Montessori are 100 research projects undertaken by students and parents of Blue Blocks Montessori School.
              </p>
              <div className="my-6 rounded-lg border border-neutral-200 bg-[#F3E3CF] px-6 py-8 text-center">
                <p className="font-serif text-6xl text-[#0F52BA] sm:text-8xl">100</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                  original investigations — each beginning with an organism, a behaviour, a structure, or a system found in nature.
                </p>
              </div>
              <div className="space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Each project begins with an organism, behaviour, structure or system found in nature. Participants study how it works, identify the principle behind it, and explore how that principle could inform solutions to human challenges.
                </p>
                <p>
                  Together, these projects transform the Biomimicry Park into more than an exhibition. They represent 100 journeys of observation, questioning and research — inspired by nature.
                </p>
              </div>
            </section>

            <section className="border-b border-neutral-200 py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F52BA]">Who Should Attend</p>
              <h2 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">Open to everyone</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                Scientists, researchers, educators, academicians, nature enthusiasts, designers, parents and students will each find different ways to engage with the experience. Whether you are interested in nature, education, research, design or innovation — or simply curious about how the world works — Explore Montessori offers an opportunity to see nature from a different perspective.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {AUDIENCE.map((name) => (
                  <li key={name} className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-slate-600">
                    {name}
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-b border-neutral-200 py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F52BA]">Date, Time & Venue</p>
              <h2 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">Visit details</h2>
              <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
                {[
                  ["Date", "28 November 2026"],
                  ["Time", "9:30 AM – 12:30 PM"],
                  ["Venue", "Blue Blocks Montessori School, Tellapur, Hyderabad"],
                  ["Entry", "Free · Prior registration required"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white p-5">
                    <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</dt>
                    <dd className="mt-1 font-serif text-lg text-slate-900">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-slate-700">
                Guided visit slots are available in the morning session. Select a time slot when registering.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Available time slots">
                {SLOTS.map((slot) => (
                  <li key={slot} className="rounded bg-[#E8EEF8] px-3 py-1.5 text-sm font-medium text-[#0F52BA]">
                    {slot}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-4 rounded-lg bg-slate-900 px-5 py-8 text-white sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-serif text-2xl italic">Register to visit the Biomimicry Park</p>
                  <p className="mt-2 text-xs tracking-wide text-white/70">
                    Free entry · External visitors must register and receive confirmation
                  </p>
                </div>
                <p className="text-xs tracking-wide text-white/70">
                  Registration form
                  <br />
                  opening soon
                </p>
              </div>
            </section>

            <section className="py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F52BA]">Frequently Asked Questions</p>
              <h2 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">Questions answered</h2>
              <div className="mt-6">
                <FaqList items={FAQS} />
              </div>
            </section>
          </div>
        </Container>
      </div>

      <section className="border-t border-neutral-200 bg-[#F3E3CF] px-4 py-10 text-center">
        <p className="font-serif text-lg text-slate-700">Blue Blocks Montessori School</p>
        <p className="mt-1 text-xs tracking-wide text-slate-500">
          Tellapur, Hyderabad · blueblocks.in
        </p>
      </section>
    </>
  );
}
