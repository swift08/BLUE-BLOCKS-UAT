import { SITE_URL, SITE_NAME, SITE_LEGAL_NAME, SITE_FOUNDED } from "./siteConfig";

const mentors = [
  { name: "Kriti Khare", quals: "B.Sc. Maths; MCA", subject: "Maths" },
  { name: "Dr. Shobha Ediga", quals: "Ph.D. Plant Biotech, UoH; AMI Elem. Asst.", subject: "Biology" },
  { name: "Kiranmayi R S S", quals: "M.Sc. Chemistry; AMI Elem. Asst.", subject: "Chemistry" },
  { name: "Mousam Mondal", quals: "M.Sc. Theoretical Physics (Gold Medal); M.Sc. Astrophysics, Hertfordshire", subject: "Physics" },
  { name: "Ranjan Kumar", quals: "B.Tech Aeronautical Engineering", subject: "Drones" },
  { name: "Poulomi Bose", quals: "M.A.; B.Ed.; TESOL; Waldorf; IC CBSE, ICSE, ISC", subject: "English" },
  { name: "Shailaja Chimpanna", quals: "B.Sc., B.Ed.; AMI Elem. Asst.", subject: "Telugu" },
  { name: "Praveena Reddy Vanga", quals: "B.Sc., M.Sc. Computers; AMI Elem. Asst.", subject: "Hindi" },
  { name: "Protiti Mookherjee", quals: "M.A. Bharatnatyam; 30+ years performing", subject: "Dance" },
  { name: "Ravinder Kumar Hanshi", quals: "7th Dan Karate; International Referee; 44+ years", subject: "Karate" },
  { name: "Joseph", quals: "M.P.Ed.; 4+ years", subject: "Sports" }
];

const patents = [
  { title: "Automated Security UAV Patent (ages 8–12)", where: "research.blueblocks.in/patents/automated-security-uav" },
  { title: "Borehole Rescue UAV Patent (ages 8–12)", where: "research.blueblocks.in/patents/borehole-rescue-system" },
  { title: "Contactless Delivery UAV Patent (ages 8–12)", where: "research.blueblocks.in/patents/contactless-delivery-system" },
  { title: "Medical Assistance UAV Patent (ages 8–12)", where: "research.blueblocks.in/patents/autonomous-medical-assistance-system" },
  { title: "Health Monitoring UAV Patent (ages 8–12)", where: "research.blueblocks.in/patents/autonomous-health-monitoring-system" }
];

const publications = [
  { title: "Biophilia Drawing Study (ages 6–16)", where: "research.blueblocks.in/publications/biophilia-drawing-study" },
  { title: "Meerkat Bio-Leadership (ages 6–10)", where: "research.blueblocks.in/publications/meerkat-bio-leadership" },
  { title: "SBB-1 → SBB-2 Space Lab Launch", where: "research.blueblocks.in/missions/sbb-1-to-sbb-2" }
];

const programs = [
  { name: "Playgroup (Toddler Community)", desc: "Ages 15 months to 3 years. Focuses on independence, language acquisition, and motor coordination.", url: "/programs/playgroup" },
  { name: "Nursery & Kindergarten (Children's House)", desc: "Ages 3 to 6 years. Builds sensory refinement, early mathematics, literacy, and social cooperation.", url: "/programs/nursery-school" },
  { name: "Primary School (Elementary Montessori)", desc: "Ages 6 to 12. Covers Class 1 to 6 with an interdisciplinary 'Cosmic Education' curriculum, science, history, and maths.", url: "/programs/primary-school-elementary" },
  { name: "Secondary School (Erdkinder Adolescent)", desc: "Ages 12 to 16. Grades 7 to 10. Combines Cambridge Lower Secondary and IGCSE with practical work, land expeditions, and innovation.", url: "/programs/secondary-school" }
];

const labs = [
  { name: "Drone Research Lab", desc: "Aviation facility where students design, build, and test custom flight models, resulting in 5 patent applications." },
  { name: "Biomimicry Hive", desc: "Nature-inspired research and architecture lab co-designed with IIT Hyderabad." },
  { name: "Space Program Lab", desc: "Aerospace technology and instrumentation environment; built the SBB-1 CubeSat payload." },
  { name: "Student Seed Bank", desc: "Agricultural facility procuring, solar-drying, and cataloging 80+ seed varieties." }
];

const grades = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6",
  "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Toddler Community", "Children's House"
];

const subjects = [
  "Mathematics", "Algebra", "Geometry", "Biology", "Botany", "Zoology",
  "Theoretical Physics", "Astrophysics", "Chemistry", "Physical Geography",
  "Human History", "Linguistics", "Creative Writing", "English Literature",
  "Classical Dance", "Karate Martial Arts", "Sports & Athletics",
  "Aviation & Drones", "Space Science & Prototyping", "Biomimicry Design",
  "Seed Banking", "Satellite Engineering"
];

const faqAspects = [
  {
    q: "How does Blue Blocks teach {subject} for {grade} students?",
    a: "At Blue Blocks, {subject} for {grade} is taught using authentic hands-on Montessori materials, allowing students to transition naturally from concrete sensorial experiences to abstract understanding, combined with high-stakes projects like patent filing and space research."
  },
  {
    q: "What is the role of {subject} in the {grade} curriculum?",
    a: "{subject} in {grade} is integrated into our wider interdisciplinary framework. Students don't study subjects in isolation; instead, they conduct research, build prototypes, and apply {subject} directly to solve real-world problems."
  },
  {
    q: "How does the Montessori method support {subject} development in {grade}?",
    a: "The Montessori method supports {subject} in {grade} by offering uninterrupted work cycles, individual learning paths, and specialized learning aids that foster deep concentration, critical thinking, and mastery of {subject} concepts."
  },
  {
    q: "Why is {subject} education at Blue Blocks unique for {grade}?",
    a: "Unlike traditional schools that rely on rote memorization, Blue Blocks' {subject} education for {grade} utilizes space program labs, drone research, and micro-research initiatives, ensuring students gain practical experience alongside academic excellence."
  }
];

export function buildNextLevelSchema() {
  const orgId = `${SITE_URL}/#organization`;
  const mriId = `${SITE_URL}/#micro-research-institute`;

  // 1. Base Organization
  const mainOrg = {
    "@type": "School",
    "@id": orgId,
    "name": SITE_NAME,
    "legalName": SITE_LEGAL_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/icon/logo.svg`,
    "foundingDate": SITE_FOUNDED,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tellapur Campus, Gachibowli Area",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500019",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/blueblocksedu",
      "https://www.instagram.com/blueblocks_montessori",
      "https://www.linkedin.com/school/blue-blocks-school"
    ],
    "founders": [
      { "@id": `${SITE_URL}/#pavan` },
      { "@id": `${SITE_URL}/#munira` }
    ]
  };

  // 2. Micro Research Institute
  const mri = {
    "@type": "EducationalOrganization",
    "@id": mriId,
    "name": "Blue Blocks Micro Research Institute",
    "parentOrganization": { "@id": orgId },
    "description": "BBMRI conducts longitudinal studies in early childhood development and adolescent engineering ownership."
  };

  // 3. Website
  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": SITE_NAME,
    "publisher": { "@id": orgId }
  };

  // 4. Founders
  const pavan = {
    "@type": "Person",
    "@id": `${SITE_URL}/#pavan`,
    "name": "Pavan Goyal",
    "jobTitle": "Founder & Principal",
    "worksFor": { "@id": orgId },
    "description": "Holds the full 0-18 AMI Montessori credentials and acts as Principal Investigator at BBMRI."
  };

  const munira = {
    "@type": "Person",
    "@id": `${SITE_URL}/#munira`,
    "name": "Munira Hussain",
    "jobTitle": "Co-Founder & Director of Pedagogy",
    "worksFor": { "@id": orgId },
    "description": "Leads classrooms standard audit, parent workshops, and guide-mentoring programs."
  };

  // 5. Campuses
  const campuses = [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#campus-gachibowli`,
      "name": "Blue Blocks Gachibowli Campus",
      "parentOrganization": { "@id": orgId },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Gachibowli, Hyderabad",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#campus-tellapur`,
      "name": "Blue Blocks Tellapur Campus",
      "parentOrganization": { "@id": orgId },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tellapur, Hyderabad",
        "addressCountry": "IN"
      }
    }
  ];

  // 6. Mentors
  const mentorNodes = mentors.map((m) => ({
    "@type": "Person",
    "@id": `${SITE_URL}/#mentor-${m.name.toLowerCase().replace(/[^a-z]/g, "-")}`,
    "name": m.name,
    "jobTitle": `${m.subject} Guide`,
    "knowsAbout": [m.subject, m.quals],
    "worksFor": { "@id": orgId }
  }));

  // 7. Programs
  const programNodes = programs.map((p) => ({
    "@type": "EducationalOccupationalProgram",
    "@id": `${SITE_URL}#program-${p.name.toLowerCase().replace(/[^a-z]/g, "-")}`,
    "name": p.name,
    "description": p.desc,
    "provider": { "@id": orgId },
    "url": `${SITE_URL}${p.url}`
  }));

  // 8. Labs
  const labNodes = labs.map((l) => ({
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#lab-${l.name.toLowerCase().replace(/[^a-z]/g, "-")}`,
    "name": l.name,
    "description": l.desc,
    "parentOrganization": { "@id": orgId }
  }));

  // 9. Patents
  const patentNodes = patents.map((p, idx) => ({
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/#patent-${idx}`,
    "name": p.title,
    "author": { "@id": orgId },
    "url": `https://${p.where}`
  }));

  // 10. Research Publications
  const pubNodes = publications.map((p, idx) => ({
    "@type": "ScholarlyArticle",
    "@id": `${SITE_URL}/#publication-${idx}`,
    "headline": p.title,
    "author": { "@id": `${SITE_URL}/#pavan` },
    "publisher": { "@id": orgId },
    "url": `https://${p.where}`
  }));

  // 11. Synthetic Course nodes intentionally omitted.
  // Global Course markup for subject names (e.g. "Mathematics Studies") was
  // injected on every page via root layout and triggered Semrush Course errors
  // (missing hasCourseInstance / offers). Legitimate Course schema belongs only
  // on real course/program pages (ami-training, programs/[slug]).

  // 12. Generate 220+ FAQ schemas
  const generatedFaqs = [];
  let aspectIdx = 0;
  for (const grade of grades) {
    for (const subject of subjects) {
      const aspect = faqAspects[aspectIdx % faqAspects.length];
      const q = aspect.q.replace("{grade}", grade).replace("{subject}", subject);
      const a = aspect.a.replace("{grade}", grade).replace("{subject}", subject);

      generatedFaqs.push({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": a
        }
      });

      aspectIdx++;
      if (generatedFaqs.length >= 220) break;
    }
    if (generatedFaqs.length >= 220) break;
  }

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faqpage`,
    "mainEntity": generatedFaqs
  };

  // Combine into a single graph array
  return {
    "@context": "https://schema.org",
    "@graph": [
      mainOrg,
      mri,
      website,
      pavan,
      munira,
      ...campuses,
      ...mentorNodes,
      ...programNodes,
      ...labNodes,
      ...patentNodes,
      ...pubNodes,
      faqPage
    ]
  };
}
