import MontessoriSystemContent from "@/components/montessori-system/MontessoriSystemContent";

export const dynamic = "force-static";

export const metadata = {
  title: "What Is Montessori Education? | Blue Blocks",
  description:
    "Dr Maria Montessori was a physician and a scientist. Through rigorous observation of children, she discovered that traditional education, built on instruction and forced compliance, obstructs natural human development. She did not invent a teaching method; she discovered the exact environmental conditions under which children naturally teach themselves.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://blueblocks.in/montessori-system/",
  },
  openGraph: {
    type: "website",
    url: "https://blueblocks.in/montessori-system/",
    title: "What Is Montessori Education? | Blue Blocks",
    description:
      "Dr Maria Montessori was a physician and a scientist. Through rigorous observation of children, she discovered that traditional education, built on instruction and forced compliance, obstructs natural human development.",
    images: [
      {
        url: "https://blueblocks.in/images/og-homepage.webp",
        width: 1200,
        height: 630,
        alt: "Montessori classroom at Blue Blocks School Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Montessori Education? | Blue Blocks",
    description:
      "Dr Maria Montessori was a physician and a scientist. Through rigorous observation of children, she discovered the exact environmental conditions under which children naturally teach themselves.",
  },
};

export default function MontessoriSystemPage() {
  return <MontessoriSystemContent />;
}
