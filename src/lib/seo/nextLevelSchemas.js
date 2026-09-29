/**
 * Global JSON-LD entity graph — real entities only.
 * Fake grade×subject FAQ spam removed (hurts Google, not helps).
 * Page-level FAQs stay on pages that actually show those FAQs.
 */
import { SITE_URL, SITE_NAME, SITE_LEGAL_NAME, SITE_FOUNDED } from "./siteConfig";

const ORG = `${SITE_URL}/#organization`;
const WEB = `${SITE_URL}/#website`;

export function buildNextLevelSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEB,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description:
          "AMI-certified Montessori school in Hyderabad. Ages 15 months-18 years, Cambridge IGCSE, innovation labs, and Blue Blocks Micro Research Institute.",
        inLanguage: "en-IN",
        publisher: { "@id": ORG },
      },
      {
        "@type": ["School", "EducationalOrganization", "ResearchOrganization"],
        "@id": ORG,
        name: SITE_NAME,
        legalName: SITE_LEGAL_NAME,
        alternateName: ["Blue Blocks", "BlueBlocks", "Blue Blocks Complete School"],
        url: `${SITE_URL}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/logo.svg`,
          width: 300,
          height: 100,
        },
        image: `${SITE_URL}/images/campus-aerial.jpg`,
        description:
          "AMI-certified Montessori school and micro-research institute in Hyderabad offering continuous education from 15 months to 18 years, with student CubeSat work, drone patents, and Cambridge IGCSE.",
        foundingDate: SITE_FOUNDED,
        telephone: ["+919000955050", "+919000955053"],
        email: "info@blueblocks.in",
        address: [
          {
            "@type": "PostalAddress",
            name: "Gachibowli Campus (Preschool & Primary)",
            streetAddress: "MIG 3, Lane opposite to DLF, APHB Colony, Gachibowli",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            postalCode: "500032",
            addressCountry: "IN",
          },
          {
            "@type": "PostalAddress",
            name: "Tellapur Campus (Complete School)",
            streetAddress: "Osman Nagar Road, Tellapur",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            postalCode: "502032",
            addressCountry: "IN",
          },
        ],
        geo: {
          "@type": "GeoCoordinates",
          latitude: 17.4506609,
          longitude: 78.3562301,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:30",
          closes: "16:30",
        },
        areaServed: {
          "@type": "City",
          name: "Hyderabad",
          sameAs: "https://en.wikipedia.org/wiki/Hyderabad",
        },
        founder: [{ "@id": `${SITE_URL}/#pavan` }, { "@id": `${SITE_URL}/#munira` }],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "AMI Montessori Certification (All Four Planes)",
            credentialCategory: "Accreditation",
            recognizedBy: {
              "@type": "Organization",
              name: "Association Montessori Internationale",
              sameAs: "https://montessori-ami.org/",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Cambridge International School",
            credentialCategory: "Accreditation",
            recognizedBy: {
              "@type": "Organization",
              name: "Cambridge Assessment International Education",
              sameAs: "https://www.cambridgeinternational.org/",
            },
          },
        ],
        knowsAbout: [
          "Montessori education",
          "Cambridge IGCSE",
          "Biomimicry",
          "CubeSat",
          "STEM education",
          "Child development research",
        ],
        award: [
          "Best Pre-School in Hyderabad - Times of India (3 Consecutive Years)",
          "ISRO IN-SPACe Authorization for Student CubeSat Mission (2025)",
          "Invited Presentation - Nobel Peace Centre, Oslo (2024)",
        ],
        sameAs: [
          "https://www.linkedin.com/school/blue-blocks-school/",
          "https://www.facebook.com/BlueblocksSchool",
          "https://www.instagram.com/blueblocksmontessorischool/",
          "https://www.youtube.com/channel/UCnJ6uX3B-uwAg63PgTK0LhQ",
        ],
        department: [
          {
            "@type": "ResearchOrganization",
            "@id": `${SITE_URL}/#microresearch`,
            name: "Blue Blocks Micro Research Institute",
            url: `${SITE_URL}/research-institute/`,
            description:
              "17-year longitudinal observational study of child development across 1,047 children in authentic Montessori environments.",
            parentOrganization: { "@id": ORG },
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Blue Blocks Programmes",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "EducationalOccupationalProgram",
                "@id": `${SITE_URL}/programs/playgroup/#program`,
                name: "Playgroup (Toddler Community)",
                url: `${SITE_URL}/programs/playgroup/`,
                educationalProgramMode: "onsite",
                timeToComplete: "P1Y9M",
                provider: { "@id": ORG },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "EducationalOccupationalProgram",
                "@id": `${SITE_URL}/programs/nursery-school/#program`,
                name: "Nursery & Kindergarten (Children's House)",
                url: `${SITE_URL}/programs/nursery-school/`,
                provider: { "@id": ORG },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "EducationalOccupationalProgram",
                "@id": `${SITE_URL}/programs/primary-school-elementary/#program`,
                name: "Primary School (Elementary Montessori)",
                url: `${SITE_URL}/programs/primary-school-elementary/`,
                provider: { "@id": ORG },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "EducationalOccupationalProgram",
                "@id": `${SITE_URL}/programs/secondary-school/#program`,
                name: "Secondary School (Cambridge IGCSE & Erdkinder)",
                url: `${SITE_URL}/programs/secondary-school/`,
                provider: { "@id": ORG },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "EducationalOccupationalProgram",
                "@id": `${SITE_URL}/ami-montessori-training/#program`,
                name: "AMI Montessori Teacher Training",
                url: `${SITE_URL}/ami-montessori-training/`,
                provider: { "@id": ORG },
              },
            },
          ],
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#pavan`,
        name: "Pavan Goyal",
        jobTitle: "Founder & Principal",
        url: `${SITE_URL}/about-us/founders/pavan-goyal/`,
        worksFor: { "@id": ORG },
        description:
          "Holds all four AMI Diplomas (0-3, 3-6, 6-12, 12-18). Principal Investigator at Blue Blocks Micro Research Institute.",
        sameAs: "https://www.linkedin.com/in/pavangoel/",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#munira`,
        name: "Munira Hussain",
        jobTitle: "Co-Founder & Director of Pedagogy",
        url: `${SITE_URL}/about-us/founders/munira-hussain/`,
        worksFor: { "@id": ORG },
        description:
          "Leads parent education and guide mentoring. Workshops for 40,000+ parents across 18 years.",
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/#campus-gachibowli`,
        name: "Blue Blocks Gachibowli Campus",
        url: `${SITE_URL}/campus/`,
        parentOrganization: { "@id": ORG },
        address: {
          "@type": "PostalAddress",
          streetAddress: "MIG 3, Lane opposite to DLF, APHB Colony, Gachibowli",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500032",
          addressCountry: "IN",
        },
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/#campus-tellapur`,
        name: "Blue Blocks Tellapur Campus",
        url: `${SITE_URL}/campus/`,
        parentOrganization: { "@id": ORG },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Osman Nagar Road, Tellapur",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "502032",
          addressCountry: "IN",
        },
      },
    ],
  };
}
