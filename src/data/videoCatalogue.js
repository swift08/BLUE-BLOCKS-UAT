import { SITE_URL, SITE_NAME } from "@/lib/seo/siteConfig";

const PUBLISHER = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
};

const WHATSAPP_HREF = "https://wa.me/919000955053";
const ADMISSIONS_HREF = "/admissions/";

export const videoCatalogueMeta = {
  title: "Watch Blue Blocks Montessori | Video Catalogue Hyderabad",
  description:
    "Watch Blue Blocks Montessori School in Hyderabad. A scroll through the full 0 to 18 Montessori journey, programs, labs, farm, teachers, and a day in the life of a child.",
  path: "/video-catalogue/",
  canonical: `${SITE_URL}/video-catalogue/`,
  focusKeyword: "Montessori school videos Hyderabad",
};

export const videoCatalogueHero = {
  title: "A child's journey unfolds here.",
  subtitle:
    "From the Pink Tower to the launch pad, from first steps to the confidence of an adolescent. Watch what sixteen years of trusted childhood looks like at Blue Blocks Montessori.",
  scrollLabel: "Scroll to Begin",
};

export const videoCatalogueIntro = {
  title: "The Journey",
  text: "Every step of a child's time at Blue Blocks, from the first day in a Toddler room to the last year of the Erdkinder program.",
};

export const videoCatalogueCta = {
  title: "Ready to visit?",
  text: "Every video you just watched has a next step. Our admissions process starts with a Discovery Workshop.",
  buttonLabel: "REGISTER FOR THE ADMISSION WORKSHOP \u2192",
  href: ADMISSIONS_HREF,
};

export const videoCatalogueVideos = [
  {
    id: "from-first-steps",
    position: 1,
    title: "From First Steps to Future Innovators",
    kicker: "Sixteen years of Montessori at Blue Blocks.",
    blurb:
      "A child stacks the Pink Tower. Years later, the same child builds a CubeSat. This is Blue Blocks Montessori School in Hyderabad, from ages 15 months to 18 years, across our Gachibowli and Tellapur campuses.",
    pointers: [
      "AMI, the gold-standard Montessori method, taught the way Maria Montessori intended",
      "Two campuses across Hyderabad",
      "The full 0-18 arc, under one continuous method",
    ],
    src: "/videos/catalogue/pony-tail-girl.mp4",
    schemaName: "Blue Blocks Montessori \u2014 From First Steps to Future Innovators (Hero)",
    schemaDescription:
      "Blue Blocks Montessori School in Hyderabad, from ages 15 months to 18 years, across Gachibowli and Tellapur campuses.",
    duration: "PT49S",
    uploadDate: "2026-09-11",
  },
  {
    id: "our-vision",
    position: 2,
    title: "Our Vision, In Their Words",
    kicker: "Pavan Goyal and Munira Hussain, Visionaries.",
    blurb:
      "A school where a child begins in infancy and grows with us through adolescence. Blue Blocks is not just a school. It is a complete developmental journey, held together by the same pedagogy at every age.",
    pointers: [
      "Pavan Goyal, Founder : World\u2019s First with all four AMI diplomas, IMF Trustee",
      "Munira Hussain, Co-founder : AMI Auxiliary Trainer, Director of Pedagogy",
      "Founded in 2009, now serving ages 15 months to 18 years",
    ],
    src: "/videos/catalogue/founders-at-bb.mp4",
    schemaName: "Our Vision, In Their Words \u2014 Blue Blocks Co-founders",
    schemaDescription:
      "Pavan Goyal and Munira Hussain, Co-founders of Blue Blocks Montessori School, on the complete 0 to 18 journey.",
    duration: "PT54S",
    uploadDate: "2026-09-11",
  },
  {
    id: "toddler-environment",
    position: 3,
    title: "The Toddler Environment",
    kicker: "Ages 15 months to 3 years, at our Gachibowli campus.",
    blurb:
      "A prepared environment designed for the child who has just begun to move, speak, and choose. Shelves at the right height. Materials that invite. Guides who observe. Every detail respects the toddler's own pace.",
    pointers: [
      "AMI certified guides trained in the earliest years",
      "Everyday tasks: Pouring, Buttoning, Tidying , at the centre of daily schedule",
      "Language, movement, and independence, gently supported",
    ],
    src: "/videos/catalogue/red-sweater-kid.mp4",
    schemaName: "The Toddler Environment at Blue Blocks",
    schemaDescription:
      "AMI-guided Montessori Toddler programme at Blue Blocks, for ages 15 months to 3 years, Gachibowli campus.",
    duration: "PT35S",
    uploadDate: "2026-09-11",
  },
  {
    id: "primary-classroom",
    position: 4,
    title: "The Primary Classroom",
    kicker: "Ages 3 to 6, at both Tellapur and Gachibowli campuses.",
    blurb:
      "The Montessori foundation years. Children work with real materials that make numbers, letters, and ideas physical. They touch what they learn. Mixed-age classrooms, guided by trained Montessori educators. Language, math, science, and culture, all discoverable by hand.",
    pointers: [
      "AMI certified guides in every classroom",
      "Mixed-age communities of 3, 4, 5, and 6 year olds",
      "A long, unbroken window each morning for children to focus deeply",
    ],
    src: "/videos/catalogue/bb-primary.mp4",
    schemaName: "The Primary Classroom at Blue Blocks",
    schemaDescription:
      "Blue Blocks Primary Montessori programme for ages 3 to 6, mixed-age classrooms with AMI-certified guides.",
    duration: "PT42S",
    uploadDate: "2026-09-11",
  },
  {
    id: "elementary-programme",
    position: 5,
    title: "The Elementary Programme",
    kicker: "Ages 6 to 12, at our Tellapur campus.",
    blurb:
      "Where a child's ideas start becoming real work. Elementary at Blue Blocks brings biomimicry lessons drawn from nature, an early introduction to our Innovation Programme, and mentor-led enrichment in art, karate, Bharatanatyam, sports, and science. Hands begin to build.",
    pointers: [
      "Biomimicry lessons and hands-on learning from nature",
      "Introduction to the Innovation Programme; children start building their own ideas",
      "Enrichment: karate, Bharatanatyam, art, sports, science",
    ],
    src: "/videos/catalogue/bb-elementary.mp4",
    schemaName: "The Elementary Programme at Blue Blocks",
    schemaDescription:
      "Blue Blocks Elementary Montessori programme for ages 6 to 12, Tellapur campus, with Cosmic Education, the Great Lessons, and mentor-led enrichment.",
    duration: "PT39S",
    uploadDate: "2026-09-11",
  },
  {
    id: "erdkinder-programme",
    position: 6,
    title: "The Erdkinder Programme",
    kicker: "Ages 12 to 18, our adolescent program. Education for real life.",
    blurb:
      "In adolescence, Cambridge learning goes beyond classrooms. Our Adolescent Program at Blue Blocks connects academics with real-world responsibility, preparing young adults for life with purpose and independence.",
    pointers: [
      "Cambridge IGCSE integration",
      "Farm work, enterprises, and real responsibility",
      "Collaborative projects and student-led presentations",
    ],
    src: "/videos/catalogue/bb-erdkinder.mp4",
    schemaName: "The Erdkinder Programme at Blue Blocks",
    schemaDescription:
      "Blue Blocks Erdkinder Montessori adolescent programme for ages 12 to 18, Cambridge IGCSE integrated.",
    duration: "PT43S",
    uploadDate: "2026-09-11",
  },
  {
    id: "safe-transport",
    position: 7,
    title: "Safe Transport",
    kicker: "Every journey matters.",
    blurb:
      "Trained women attenders in every bus. Seat belts on every seat. Safe boarding, safe drop-off, and clear communication with parents. Our school transport is designed to give parents complete peace of mind, every single day.",
    pointers: [
      "Trained women attenders on every route",
      "Seat belts on every seat",
      "Safe boarding and drop-off protocols",
    ],
    src: "/videos/catalogue/safe-transport.mp4",
    schemaName: "Safe Transport at Blue Blocks",
    schemaDescription:
      "Blue Blocks school transport with trained women attenders, seat belts, and safe boarding protocols.",
    duration: "PT53S",
    uploadDate: "2026-09-11",
  },
  {
    id: "innovation-programme",
    position: 8,
    title: "The Innovation Programme",
    kicker: "Where children design, prototype, and build.",
    blurb:
      "Innovation at Blue Blocks is not a subject. It is an experience. From drones to 3D printing to our space lab, children learn to imagine, design, and create the future. Real work, real prototypes, real projects.",
    pointers: [
      "Drones designed and flown by students",
      "3D printing across programmes",
      "Our own space lab, with student-built CubeSats",
    ],
    src: "/videos/catalogue/drone-lab.mp4",
    schemaName: "The Innovation Programme at Blue Blocks",
    schemaDescription:
      "Innovation Programme at Blue Blocks \u2014 drones, 3D printing, and a student-run space lab.",
    duration: "PT1M4S",
    uploadDate: "2026-09-11",
  },
  {
    id: "farm-day",
    position: 9,
    title: "A Day at Our Farm",
    kicker: "Nature as teacher.",
    blurb:
      "Our dedicated farm connects children with the earth. Feeding animals. Planting seeds. Harvesting what they grew. Children learn responsibility, patience, and the quiet joy of working with living things.",
    pointers: [
      "Dedicated farm for hands-on learning",
      "Animal care and seed-to-harvest cycles",
      "Central to both Elementary and Erdkinder programs",
    ],
    src: "/videos/catalogue/farm-day.mp4",
    schemaName: "A Day at Our Farm \u2014 Blue Blocks",
    schemaDescription:
      "Blue Blocks dedicated farm, where children feed animals, plant seeds, and harvest. Nature as teacher.",
    duration: "PT45S",
    uploadDate: "2026-09-11",
  },
  {
    id: "day-in-the-life",
    position: 10,
    title: "A Day in the Life",
    kicker: "One morning through a child's eyes.",
    blurb:
      "Arrival. Choosing work. Preparing a snack. Group activity. Outdoor play. Story circle. A Montessori day is filled with choice, focus, and joy. Every moment quietly builds confidence and independence.",
    pointers: [
      "Follows a single 3 to 6 year old through her morning",
      "A long, focused day of choosing and growing",
      "Independence and joy woven into the routine",
    ],
    src: "/videos/catalogue/day-in-life-3-6yrs.mp4",
    schemaName: "A Day in the Life of a Montessori Child (3 to 6) at Blue Blocks",
    schemaDescription:
      "One morning through the eyes of a 3 to 6 year old Montessori child at Blue Blocks.",
    duration: "PT48S",
    uploadDate: "2026-09-11",
  },
  {
    id: "guides-not-teachers",
    position: 11,
    title: "Guides, Not Teachers",
    kicker: "100% AMI certified. The world\u2019s highest bar for a Montessori educator.",
    blurb:
      "Every guide at Blue Blocks is certified by Association Montessori Internationale, the global body that keeps Montessori authentic. Founded by Dr. Maria Montessori in 1929, world\u2019s best Montessori schools all holthis certification. It is why the classroom looks the way it does.",
    pointers: [
      "\u2022  100% AMI-certified guides across all ages",
      "\u2022  Continuous professional training aligned to AMI standards",
    ],
    src: "/videos/catalogue/teachers-at-bb.mp4",
    schemaName: "Guides, Not Teachers \u2014 AMI-Certified Educators at Blue Blocks",
    schemaDescription: "100% AMI-certified Montessori guides at Blue Blocks Montessori School.",
    duration: "PT45S",
    uploadDate: "2026-09-11",
  },
  {
    id: "parents-in-the-room",
    position: 12,
    title: "Parents in the Room",
    kicker: "When parents and school pull in the same direction, children thrive.",
    blurb:
      "Education works best when school and home work together. Workshops for parents, grandparents, and nannies. Our events like Explore Montessori and Drone & Art Expo day. Families as active partners in every child's growth, across the full 16-year journey.",
    pointers: [
      "Workshops for parents, grandparents, and nannies",
      "Explore Montessori, our annual themed school event.",
      "Ongoing home-school communication",
    ],
    src: "/videos/catalogue/parent-engagement-at-bb.mp4",
    schemaName: "Parent Engagement at Blue Blocks",
    schemaDescription:
      "Workshops for parents, grandparents, and nannies. The annual Explore Montessori event. Home-school partnership across 16 years.",
    duration: "PT43S",
    uploadDate: "2026-09-11",
  },
  {
    id: "begin-your-journey",
    position: 13,
    title: "Begin Your Journey",
    kicker: "Simple, welcoming admissions.",
    blurb:
      "Your journey with Blue Blocks begins with an insightful Admission Workshop. Meet the school, meet the guides, and see the environment before anything is decided.",
    pointers: [
      "Start with an Admission Workshop and school tour",
      "Meet the founders, the guides in person",
      "WhatsApp 9000955053 to register",
    ],
    src: null,
    image: "/video-catalogue/admissions.webp",
    schemaName: "Begin Your Journey \u2014 Blue Blocks Admissions",
    schemaDescription:
      "Blue Blocks admissions begin with a welcoming Admission Workshop. WhatsApp 9000955053 to register.",
    whatsappHref: WHATSAPP_HREF,
    ctaHref: ADMISSIONS_HREF,
  },
];

export function buildVideoCatalogueSchema() {
  const pageUrl = videoCatalogueMeta.canonical;
  const thumbnailUrl = `${SITE_URL}/video-catalogue/hero.webp`;

  const itemListElement = videoCatalogueVideos.map((video) => {
    const entry = {
      "@type": "VideoObject",
      position: video.position,
      name: video.schemaName,
      description: video.schemaDescription,
      publisher: PUBLISHER,
    };

    if (video.src) {
      entry.contentUrl = `${SITE_URL}${video.src}`;
      entry.thumbnailUrl = thumbnailUrl;
      entry.uploadDate = video.uploadDate;
      entry.duration = video.duration;
    }

    return entry;
  });

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: videoCatalogueMeta.title,
      url: pageUrl,
      description: videoCatalogueMeta.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      keywords: videoCatalogueMeta.focusKeyword,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Video Catalogue",
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Blue Blocks Montessori School Video Catalogue",
      description:
        "Short vertical videos showing the full 0 to 18 Montessori journey at Blue Blocks Montessori School, Hyderabad \u2014 programmes, labs, farm, teachers, parent engagement, and admissions.",
      itemListElement,
    },
  ];
}
