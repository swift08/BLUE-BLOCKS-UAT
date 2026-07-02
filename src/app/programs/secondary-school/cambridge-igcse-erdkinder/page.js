import CambridgeIgcseErdkinder from "@/components/secondary/CambridgeIgcseErdkinder";

export const metadata = {
  title:
    "Cambridge IGCSE & Erdkinder | Secondary School (Grades 7–10) | Blue Blocks Montessori",
  description:
    "Blue Blocks runs Cambridge IGCSE in Hyderabad the Montessori way. AMI-certified Erdkinder programme for ages 12–16 integrated with Cambridge Lower Secondary and IGCSE assessments. Students have built a CubeSat for ISRO, filed five patents, and published peer-reviewed research.",
  alternates: {
    canonical:
      "https://www.blueblocks.in/programs/secondary-school/cambridge-igcse-erdkinder",
  },
  openGraph: {
    title:
      "Cambridge IGCSE & Erdkinder | Secondary School | Blue Blocks Montessori",
    description:
      "AMI Montessori adolescent programme with Cambridge IGCSE. Students built a CubeSat for ISRO, filed patents, and authored peer-reviewed research.",
    url: "https://www.blueblocks.in/programs/secondary-school/cambridge-igcse-erdkinder",
    siteName: "Blue Blocks Montessori",
    locale: "en_IN",
    type: "website",
  },
};

export default function CambridgeIgcseErdkinderPage() {
  return <CambridgeIgcseErdkinder />;
}
