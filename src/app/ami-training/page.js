import Link from "next/link";
import Container from "@/components/layout/Container";

export const dynamic = "force-static";

export const metadata = {
  title: "AMI Montessori Teacher Training in India | Blue Blocks",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://blueblocks.in/ami-montessori-training/",
  },
};

export default function AmiTrainingRedirectPage() {
  return (
    <section className="py-28 bg-white text-center">
      <Container>
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">
            AMI Montessori Teacher Training
          </h1>
          <p className="text-slate-600">
            This page has moved. Please visit our updated guide:
          </p>
          <div>
            <Link
              href="/ami-montessori-training/"
              className="inline-block px-6 py-3 rounded-full bg-[#2C2F8F] text-white font-semibold hover:bg-[#1e2060] transition-colors"
            >
              Go to AMI Montessori Teacher Training
            </Link>
          </div>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.location.replace("/ami-montessori-training/");`,
            }}
          />
        </div>
      </Container>
    </section>
  );
}
