import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import BiomimicryParkRegisterForm from "@/components/forms/BiomimicryParkRegisterForm";

export const dynamic = "force-static";

export const metadata = {
  title: "Explore Montessori 2026 - Registration Biomimicry Park | Blue Blocks Montessori School",
  description:
    "Join us to explore how learning from nature can inspire new ideas and solutions. Please fill in your details to register for the event.",
  alternates: { canonical: "https://blueblocks.in/Biomimicry-Park/register/" },
  robots: { index: false, follow: false },
};

export default function BiomimicryParkRegisterPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F4EDE3]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 10% 0%, rgba(26,83,54,0.12), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 20%, rgba(243,217,196,0.7), transparent 50%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(26,83,54,0.08), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A5336' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <section className="relative px-0 pb-28 pt-24 sm:pt-32 lg:px-4 lg:pb-24">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
            <aside className="min-w-0 lg:sticky lg:top-28">
              <Link
                href="/Biomimicry-Park/"
                className="inline-flex items-center text-sm font-semibold text-[#1A5336] transition hover:opacity-70"
              >
                ← Back to Biomimicry Park
              </Link>

              <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#1A5336] sm:text-xs sm:tracking-[0.22em] lg:mt-8">
                Explore Montessori 2026
              </p>
              <h1 className="mt-3 break-words font-serif text-[1.75rem] leading-[1.15] text-[#0F3D2E] sm:mt-4 sm:text-5xl sm:leading-[1.1] lg:text-[3.25rem]">
                Explore Montessori 2026 -{" "}
                <span className="bg-[#F3D9C4] px-1.5 italic">Registration</span> Biomimicry Park | Blue
                Blocks Montessori School
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#3F4A44] sm:mt-6 sm:text-base">
                Join us to explore how learning from nature can inspire new ideas and solutions. Please fill in
                your details to register for the event.
              </p>

              <div className="mt-6 hidden overflow-hidden rounded-[24px] border border-[#1A5336]/20 bg-white/50 shadow-sm backdrop-blur lg:mt-8 lg:block">
                <Image
                  src="/explore-montessori/biomimicry-park/hero.png"
                  alt="Biomimicry Park"
                  width={1774}
                  height={887}
                  className="h-auto w-full"
                  priority
                />
              </div>

              <dl className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                <div className="rounded-full border border-[#1A5336]/25 bg-white/70 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#1A5336] sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.14em]">
                  28-11-2026
                </div>
                <div className="rounded-full border border-[#1A5336]/25 bg-white/70 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#1A5336] sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.14em]">
                  9:00 am - 12:30 am
                </div>
              </dl>
            </aside>

            <div className="min-w-0 w-full">
              <BiomimicryParkRegisterForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
