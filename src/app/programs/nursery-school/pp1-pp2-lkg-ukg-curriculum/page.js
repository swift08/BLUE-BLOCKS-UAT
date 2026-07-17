import NurseryCurriculum from "@/components/secondary/NurseryCurriculum";

export const metadata = {
  title: "Montessori Preschool Hyderabad | Nursery, PP1, PP2 | Blue Blocks",
  description:
    "Montessori preschool in Hyderabad for ages 2.5–6. Nursery, PP1, PP2. Hands-on reading, writing, maths. AMI-certified guides. Book a free observation.",
  alternates: {
    canonical: "https://blueblocks.in/programs/nursery-school/pp1-pp2-lkg-ukg-curriculum/",
  },
  openGraph: {
    title: "Montessori Preschool Hyderabad | Nursery, PP1, PP2 | Blue Blocks",
    description:
      "Montessori preschool in Hyderabad for ages 2.5–6. Nursery, PP1, PP2. Hands-on reading, writing, maths. AMI-certified guides. Book a free observation.",
    url: "https://blueblocks.in/programs/nursery-school/pp1-pp2-lkg-ukg-curriculum/",
    siteName: "Blue Blocks Montessori",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function NurseryCurriculumPage() {
  return <NurseryCurriculum />;
}
