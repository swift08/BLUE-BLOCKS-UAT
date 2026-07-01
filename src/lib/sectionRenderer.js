/**
 * sectionRenderer.js — Data-driven section renderer.
 *
 * Strategy:
 *   - Above-the-fold sections (Hero, PageHero) use static imports for LCP.
 *   - All other sections use next/dynamic with ssr:true to enable code-splitting.
 *     This creates separate JS chunks per section group, reducing the initial
 *     bundle downloaded on every page.
 */

import dynamic from "next/dynamic";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC imports — critical above-the-fold sections (affect LCP)
// ─────────────────────────────────────────────────────────────────────────────
import Hero from "@/components/blocks/Hero";
import PageHero from "@/components/blocks/PageHero";

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC imports — below-the-fold sections (code-split into separate chunks)
// ─────────────────────────────────────────────────────────────────────────────

// Home page sections
const ImageText = dynamic(() => import("@/components/blocks/ImageText"), { ssr: true });
const JourneyCards = dynamic(() => import("@/components/blocks/JourneyCards"), { ssr: true });
const FeatureGrid = dynamic(() => import("@/components/blocks/FeatureGrid"), { ssr: true });
const Insights = dynamic(() => import("@/components/blocks/Insights"), { ssr: true });
const RecognizedBy = dynamic(() => import("@/components/blocks/RecognizedBy"), { ssr: true });
const FAQAccordion = dynamic(() => import("@/components/blocks/FAQAccordion"), { ssr: true });
const CtaBanner = dynamic(() => import("@/components/blocks/CtaBanner"), { ssr: true });

// Contact / Careers
const ContactDetails = dynamic(() => import("@/components/blocks/ContactDetails"), { ssr: true });
const LocationsGrid = dynamic(() => import("@/components/blocks/LocationsGrid"), { ssr: true });
const PositionsOpen = dynamic(() => import("@/components/blocks/PositionsOpen"), { ssr: true });

// Admissions
const AdmissionsIntro = dynamic(() => import("@/components/blocks/AdmissionsIntro"), { ssr: true });
const AdmissionsJourney = dynamic(() => import("@/components/blocks/AdmissionsJourney"), { ssr: true });

// Parents
const ParentsBooks = dynamic(() => import("@/components/parents/ParentsBooks"), { ssr: true });
const InsightsCarousel = dynamic(() => import("@/components/parents/InsightsCarousel"), { ssr: true });
const TabbedFaq = dynamic(() => import("@/components/parents/TabbedFaq"), { ssr: true });

// Research Institute
const ResearchHero = dynamic(() => import("@/components/research/ResearchHero"), { ssr: true });
const ResearchMission = dynamic(() => import("@/components/research/ResearchMission"), { ssr: true });
const MethodFramework = dynamic(() => import("@/components/research/MethodFramework"), { ssr: true });
const ResearchStats = dynamic(() => import("@/components/research/ResearchStats"), { ssr: true });
const OutcomesPatents = dynamic(() => import("@/components/research/OutcomesPatents"), { ssr: true });
const PublicationsGrid = dynamic(() => import("@/components/research/PublicationsGrid"), { ssr: true });
const PartnersStrip = dynamic(() => import("@/components/research/PartnersStrip"), { ssr: true });
const CouncilCarousel = dynamic(() => import("@/components/research/CouncilCarousel"), { ssr: true });
const EthicsGovernance = dynamic(() => import("@/components/research/EthicsGovernance"), { ssr: true });
const CardsGridSection = dynamic(() => import("@/components/research/CardsGridSection"), { ssr: true });

// Innovation
const InnovationAgeCards = dynamic(() => import("@/components/innovations/InnovationAgeCards"), { ssr: true });
const InnovationLogoStrip = dynamic(() => import("@/components/innovations/InnovationLogoStrip"), { ssr: true });
const InnovationHabitSplit = dynamic(() => import("@/components/innovations/InnovationHabitSplit"), { ssr: true });
const MontessoriToMars = dynamic(() => import("@/components/innovations/MontessoriToMars"), { ssr: true });
const BillionYears = dynamic(() => import("@/components/innovations/BillionYears"), { ssr: true });
const HighStakes = dynamic(() => import("@/components/innovations/HighStakes"), { ssr: true });
const InnovationGallery = dynamic(() => import("@/components/innovations/InnovationGallery"), { ssr: true });

// Programs
const ProgramIntroSplit = dynamic(() => import("@/components/blocks/ProgramIntroSplit"), { ssr: true });
const AcademicsIntro = dynamic(() => import("@/components/blocks/AcademicsIntro"), { ssr: true });
const EducationAidToLife = dynamic(() => import("@/components/blocks/EducationAidToLife"), { ssr: true });
const ProgramsGrid = dynamic(() => import("@/components/blocks/ProgramsGrid"), { ssr: true });

// About Us
const OurStory = dynamic(() => import("@/components/blocks/OurStory"), { ssr: true });
const FoundersGuides = dynamic(() => import("@/components/blocks/FoundersGuides"), { ssr: true });
const VerifiedAchievements = dynamic(() => import("@/components/blocks/VerifiedAchievements"), { ssr: true });
const SeekVsDeliver = dynamic(() => import("@/components/blocks/SeekVsDeliver"), { ssr: true });
const BenchmarkBanner = dynamic(() => import("@/components/blocks/BenchmarkBanner"), { ssr: true });
const HexaInfrastructure = dynamic(() => import("@/components/blocks/HexaInfrastructure"), { ssr: true });
const MontessoriForSuccess = dynamic(() => import("@/components/blocks/montessoriForSuccessSlider.js"), { ssr: true });
const SystemOverview = dynamic(() => import("@/components/blocks/SystemOverview"), { ssr: true });

// Misc
const CareersSection = dynamic(() => import("@/components/blocks/CareersSection"), { ssr: true });
const SimpleImageSection = dynamic(() => import("@/components/blocks/StaticImageBanner"), { ssr: true });
const CenteredTextBlock = dynamic(() => import("@/components/blocks/CenteredTextBlock"), { ssr: true });
const OutcomesPills = dynamic(() => import("@/components/blocks/OutcomesPills"), { ssr: true });
const YoungInnovatorsGrid = dynamic(() => import("@/components/blocks/YoungInnovatorsGrid"), { ssr: true });
const ImpactCollageSplit = dynamic(() => import("@/components/blocks/ImpactCollageSplit"), { ssr: true });
const FounderVisionSplit = dynamic(() => import("@/components/blocks/FounderVisionSplit"), { ssr: true });
const LegalDocument = dynamic(() => import("@/components/blocks/LegalDocument"), { ssr: true });
const PageNavButtons = dynamic(() => import("@/components/ui/PageNavButtons"), { ssr: true });

// ─────────────────────────────────────────────────────────────────────────────
// Renderer
// ─────────────────────────────────────────────────────────────────────────────

export default function SectionRenderer({ sections = [] }) {
  return (
    <>
      {sections.map((section, idx) => {
        const { type, props } = section || {};
        const key = `${type || "section"}-${idx}`;

        switch (type) {
          case "pageNavButtons":
            return <PageNavButtons key={key} {...props} />;

          case "legalDocument":
            return <LegalDocument key={key} {...props} />;

          case "founderVisionSplit":
            return <FounderVisionSplit key={key} {...props} />;
          case "impactCollageSplit":
            return <ImpactCollageSplit key={key} {...props} />;
          case "youngInnovatorsGrid":
            return <YoungInnovatorsGrid key={key} {...props} />;

          case "outcomesPills":
            return <OutcomesPills key={key} {...props} />;

          case "CenteredTextBlock":
            return <CenteredTextBlock key={key} {...section.props} />;

          case "simpleImageSection":
            return <SimpleImageSection key={key} {...section.props} />;
          case "systemOverview":
            return <SystemOverview key={key} {...section.props} />;

          case "careersSection":
            return <CareersSection key={key} {...section.props} />;

          // About Us — Montessori For Success
          case "montessoriForSuccess":
            return <MontessoriForSuccess key={key} {...props} />;

          // About Us
          case "ourStory":
            return <OurStory key={key} {...props} />;
          case "foundersGuides":
            return <FoundersGuides key={key} {...props} />;
          case "verifiedAchievements":
            return <VerifiedAchievements key={key} {...props} />;
          case "seekVsDeliver":
            return <SeekVsDeliver key={key} {...props} />;
          case "benchmarkBanner":
            return <BenchmarkBanner key={key} {...props} />;
          case "hexaInfrastructure":
            return <HexaInfrastructure key={key} {...props} />;

          // Academics
          case "academicsIntro":
            return <AcademicsIntro key={key} {...props} />;
          case "educationAidToLife":
            return <EducationAidToLife key={key} {...props} />;
          case "programsGrid":
            return <ProgramsGrid key={key} {...props} />;

          // Programs
          case "programIntroSplit":
            return <ProgramIntroSplit key={key} {...props} />;
          case "AreasofDevelopment":
            return <CardsGridSection key={key} {...props} />;
          case "programsctaBanner":
            return <CtaBanner key={key} {...props} />;

          // Innovation
          case "innovationMediaHero":
            return <Hero key={key} {...props} />;
          case "innovationAgeCards":
            return <InnovationAgeCards key={key} {...props} />;
          case "innovationLogoStrip":
            return <InnovationLogoStrip key={key} {...props} />;
          case "innovationHabitSplit":
            return <InnovationHabitSplit key={key} {...props} />;
          case "montessoriToMars":
            return <MontessoriToMars key={key} {...props} />;
          case "billionYears":
            return <BillionYears key={key} {...props} />;
          case "highStakes":
            return <HighStakes key={key} {...props} />;
          case "innovationGallery":
            return <InnovationGallery key={key} {...props} />;

          // Research Institute
          case "researchHero":
            return <ResearchHero key={key} {...props} />;
          case "researchMission":
            return <ResearchMission key={key} {...props} />;
          case "philosophyCards":
            return <CardsGridSection key={key} {...props} />;
          case "methodFramework":
            return <MethodFramework key={key} {...props} />;
          case "researchStats":
            return <ResearchStats key={key} {...props} />;
          case "outcomesPatents":
            return <OutcomesPatents key={key} {...props} />;
          case "publicationsGrid":
            return <PublicationsGrid key={key} {...props} />;
          case "partnersStrip":
            return <PartnersStrip key={key} {...props} />;
          case "councilCarousel":
            return <CouncilCarousel key={key} {...props} />;
          case "ethicsGovernance":
            return <EthicsGovernance key={key} {...props} />;

          // Parents
          case "books":
            return <ParentsBooks key={key} {...props} />;
          case "insightsCarousel":
            return <InsightsCarousel key={key} {...props} />;
          case "tabbedFaq":
            return <TabbedFaq key={key} {...props} />;

          // Admissions
          case "admissionsIntro":
            return <AdmissionsIntro key={key} {...props} />;
          case "admissionsJourney":
            return <AdmissionsJourney key={key} {...props} />;

          // Contact
          case "contactDetails":
            return <ContactDetails key={key} {...props} />;
          case "locationsGrid":
            return <LocationsGrid key={key} {...props} />;
          case "positionsOpen":
            return <PositionsOpen key={key} {...props} />;

          // Home
          case "homeHero":
            return <Hero key={key} {...props} />;
          case "imageText":
            return <ImageText key={key} {...props} />;
          case "journeyCards":
            return <JourneyCards key={key} {...props} />;
          case "featureGrid":
            return <FeatureGrid key={key} {...props} />;
          case "insights":
            return <Insights key={key} {...props} />;
          case "recognizedBy":
            return <RecognizedBy key={key} {...props} />;
          case "faq":
            return <FAQAccordion key={key} {...props} />;

          // Common
          case "pageHero":
            return <PageHero key={key} {...props} />;
          case "ctaBanner":
            return <CtaBanner key={key} {...props} />;
          default:
            return null;
        }
      })}
    </>
  );
}
