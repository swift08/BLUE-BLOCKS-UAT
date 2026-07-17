import PlaygroupProgram from "@/components/secondary/PlaygroupProgram";

export const metadata = {
  title: "Montessori Toddler | Playgroup (Ages 1-3) | Blue Blocks Montessori",
  description:
    "Blue Blocks' Montessori Toddler Community is a pre-school program for children aged 1-3 in Hyderabad. Guided by AMI-certified educators in a child-centered environment.",
  alternates: {
    canonical: "https://blueblocks.in/programs/playgroup/montessori-toddler/",
  },
  openGraph: {
    title: "Montessori Toddler | Playgroup (Ages 1-3) | Blue Blocks Montessori",
    description:
      "Blue Blocks' Montessori Toddler Community is a pre-school program for children aged 1-3 in Hyderabad. Guided by AMI-certified educators in a child-centered environment.",
    url: "https://blueblocks.in/programs/playgroup/montessori-toddler/",
    siteName: "Blue Blocks Montessori",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function MontessoriToddlerPage() {
  return <PlaygroupProgram />;
}
