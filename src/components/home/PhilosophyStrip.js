import Container from "@/components/layout/Container";

const PILLARS = [
  {
    title: "Child-Led Learning",
    body: "The child chooses their work. The guide observes and supports.",
    // Sapling / plant line art SVG
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0a5 5 0 015-5c2.5 0 3 2 3 2s-.5 4-3 5a5.002 5.002 0 01-5-2zm0 0a5 5 0 00-5-5c-2.5 0-3 2-3 2s.5 4 3 5a5 5 0 005-2z" />
      </svg>
    ),
  },
  {
    title: "Research-Rooted Practice",
    body: "Every classroom method is grounded in peer-reviewed Montessori research.",
    // Microscope line art SVG
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 5H9L8 4zm-4 16h16" />
        <circle cx="12" cy="11" r="2" strokeWidth={1.5} />
      </svg>
    ),
  },
  {
    title: "AMI & Cambridge Standards",
    body: "Accredited by two of the world’s most respected education bodies.",
    // Globe with hands line art SVG
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
      </svg>
    ),
  },
  {
    title: "Prepared Environment",
    body: "Spaces designed for independence, movement, and deep concentration.",
    // Two children / community line art SVG
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function PhilosophyStrip() {
  return (
    <section
      aria-label="The Blue Blocks Way"
      className="bg-[#273C75] text-white py-14 sm:py-18 relative z-10"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto pb-10 sm:pb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            The Blue Blocks Way
          </h2>
        </div>

        {/* 4 Pillars Grid: Desktop 4 cols, Mobile 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center sm:items-start text-center sm:text-left group"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 p-3 mb-4 transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/15">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200 mt-2 leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
