import Link from "next/link";
import Container from "@/components/layout/Container";

export default function AdmissionsCtaBand() {
  return (
    <section
      aria-label="Admissions Call to Action"
      className="bg-[#273C75] text-white py-16 sm:py-20 relative z-10"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Ready to find the right fit for your child?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-200 max-w-2xl mx-auto leading-relaxed">
            Admissions for 2025–26 are open. Take the first step — we’ll guide you through the process.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admissions/"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#E67E22] px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#D35400] hover:scale-105"
            >
              Start Your Application
            </Link>
            <Link
              href="/admissions/#school-visit"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-8 py-3.5 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:bg-white hover:text-[#273C75]"
            >
              Book a School Visit
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
