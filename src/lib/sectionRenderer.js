import Hero from "@/components/blocks/Hero";
import ImageText from "@/components/blocks/ImageText";
import JourneyCards from "@/components/blocks/JourneyCards";
import FeatureGrid from "@/components/blocks/FeatureGrid";
import Insights from "@/components/blocks/Insights";
import RecognizedBy from "@/components/blocks/RecognizedBy";
import FAQAccordion from "@/components/blocks/FAQAccordion";
import CtaBanner from "@/components/blocks/CtaBanner";

import PageHero from "@/components/blocks/PageHero";
import ContactDetails from "@/components/blocks/ContactDetails";
import LocationsGrid from "@/components/blocks/LocationsGrid";
import PositionsOpen from "@/components/blocks/PositionsOpen";

import AdmissionsIntro from "@/components/blocks/AdmissionsIntro";
import AdmissionsJourney from "@/components/blocks/AdmissionsJourney";

import ParentsBooks from "@/components/parents/ParentsBooks";
import InsightsCarousel from "@/components/parents/InsightsCarousel";
import TabbedFaq from "@/components/parents/TabbedFaq";

import ResearchHero from "@/components/research/ResearchHero";
import ResearchMission from "@/components/research/ResearchMission";
import MethodFramework from "@/components/research/MethodFramework";
import ResearchStats from "@/components/research/ResearchStats";
import OutcomesPatents from "@/components/research/OutcomesPatents";
import PublicationsGrid from "@/components/research/PublicationsGrid";
import PartnersStrip from "@/components/research/PartnersStrip";
import CouncilCarousel from "@/components/research/CouncilCarousel";
import EthicsGovernance from "@/components/research/EthicsGovernance";

import InnovationAgeCards from "@/components/innovations/InnovationAgeCards";
import InnovationLogoStrip from "@/components/innovations/InnovationLogoStrip";
import InnovationHabitSplit from "@/components/innovations/InnovationHabitSplit";
import MontessoriToMars from "@/components/innovations/MontessoriToMars";
import BillionYears from "@/components/innovations/BillionYears";
import HighStakes from "@/components/innovations/HighStakes";
import InnovationGallery from "@/components/innovations/InnovationGallery";
import ProgramIntroSplit from "@/components/blocks/ProgramIntroSplit";

import CardsGridSection from "@/components/research/CardsGridSection";

import AcademicsIntro from "@/components/blocks/AcademicsIntro";
import EducationAidToLife from "@/components/blocks/EducationAidToLife";
import ProgramsGrid from "@/components/blocks/ProgramsGrid";

import OurStory from "@/components/blocks/OurStory";
import FoundersGuides from "@/components/blocks/FoundersGuides";
import VerifiedAchievements from "@/components/blocks/VerifiedAchievements";
import SeekVsDeliver from "@/components/blocks/SeekVsDeliver";
import BenchmarkBanner from "@/components/blocks/BenchmarkBanner";
import HexaInfrastructure from "@/components/blocks/HexaInfrastructure";
import MontessoriForSuccess from "@/components/blocks/montessoriForSuccessSlider.js";
import CareersSection from "@/components/blocks/CareersSection";
import SystemOverview from "@/components/blocks/SystemOverview";
import SimpleImageSection from "@/components/blocks/StaticImageBanner";
import CenteredTextBlock from "@/components/blocks/CenteredTextBlock";
import OutcomesPills from "@/components/blocks/OutcomesPills";
import YoungInnovatorsGrid from "@/components/blocks/YoungInnovatorsGrid";
import ImpactCollageSplit from "@/components/blocks/ImpactCollageSplit";
import FounderVisionSplit from "@/components/blocks/FounderVisionSplit";
import LegalDocument from "@/components/blocks/LegalDocument";
import PageNavButtons from "@/components/ui/PageNavButtons";
import ReadMoreInjector from "@/components/ui/ReadMoreInjector";

export default function SectionRenderer({ sections = [] }) {
  return (
    <>
      {sections.map((section, idx) => {
        const { type, props } = section || {};
        const key = `${type || "section"}-${idx}`;

        const wrap = (node) => {
        const rm = props?.readMore;
        if (!rm?.text) return node;

        return (
          <ReadMoreInjector
            config={rm}
            // default selector: finds the first paragraph inside bb-text
            selector=".bb-text p"
          >
            {node}
          </ReadMoreInjector>
        );
      };

        switch (type) {
          // ADD:
          case "pageNavButtons": 
            return <PageNavButtons key={key} {...props} />;

          case "legalDocument": 
            return wrap(<LegalDocument key={key} {...props} />);

          case "founderVisionSplit":
            return wrap(<FounderVisionSplit key={key} {...props} />);
          case "impactCollageSplit":
            return wrap(<ImpactCollageSplit key={key} {...props} />);
          case "youngInnovatorsGrid":
            return wrap(<YoungInnovatorsGrid key={key} {...props} />);

          case "outcomesPills":
            return wrap(<OutcomesPills key={key} {...props} />);

          case "CenteredTextBlock":
            return wrap(<CenteredTextBlock key={key} {...section.props} />);

          case "simpleImageSection":
            return wrap(<SimpleImageSection key={key} {...section.props} />);
          case "systemOverview":
            return wrap(<SystemOverview key={key} {...section.props} />);

          case "careersSection":
            return wrap(<CareersSection key={key} {...section.props} />);

          //About US > Montessori For Success 
          case "montessoriForSuccess":
            return wrap(<MontessoriForSuccess key={key} {...props} />);
          
          //ABOUT US
          case "ourStory":
            return wrap(<OurStory key={key} {...props} />);
          case "foundersGuides":
            return wrap(<FoundersGuides key={key} {...props} />);
          case "verifiedAchievements":
            return wrap(<VerifiedAchievements key={key} {...props} />);
          case "seekVsDeliver":
            return wrap(<SeekVsDeliver key={key} {...props} />);
          case "benchmarkBanner":
            return wrap(<BenchmarkBanner key={key} {...props} />);
          case "hexaInfrastructure":
            return wrap(<HexaInfrastructure key={key} {...props} />);

          // ACADEMICS
          case "academicsIntro":
            return wrap(<AcademicsIntro key={key} {...props} />);
          case "educationAidToLife":
            return wrap(<EducationAidToLife key={key} {...props} />);
          case "programsGrid":
            return wrap(<ProgramsGrid key={key} {...props} />);

          // PROGRAMS
          case "programIntroSplit":
            return wrap(<ProgramIntroSplit key={key} {...props} />);
          case "AreasofDevelopment":
            return wrap(<CardsGridSection key={key} {...props} />);
          case "programsctaBanner":
            return wrap(<CtaBanner key={key} {...props} />);
          
          // INNOVATION
          case "innovationMediaHero":
            return wrap(<Hero key={key} {...props} />);
          case "innovationAgeCards":
            return wrap(<InnovationAgeCards key={key} {...props} />);
          case "innovationLogoStrip":
            return wrap(<InnovationLogoStrip key={key} {...props} />);
          case "innovationHabitSplit":
            return wrap(<InnovationHabitSplit key={key} {...props} />);
          case "montessoriToMars":
            return wrap(<MontessoriToMars key={key} {...props} />);
          case "billionYears":
            return wrap(<BillionYears key={key} {...props} />);
          case "highStakes":
            return wrap(<HighStakes key={key} {...props} />);
          case "innovationGallery":
            return wrap(<InnovationGallery key={key} {...props} />);

          // Research-Institute
          case "researchHero":
            return wrap(<ResearchHero key={key} {...props} />);
          case "researchMission":
            return wrap(<ResearchMission key={key} {...props} />);
          case "philosophyCards":
            return wrap(<CardsGridSection key={key} {...props} />);
          case "methodFramework":
            return wrap(<MethodFramework key={key} {...props} />);
          case "researchStats":
            return wrap(<ResearchStats key={key} {...props} />);
          case "outcomesPatents":
            return wrap(<OutcomesPatents key={key} {...props} />);
          case "publicationsGrid":
            return wrap(<PublicationsGrid key={key} {...props} />);
          case "partnersStrip":
            return wrap(<PartnersStrip key={key} {...props} />);
          case "councilCarousel":
            return wrap(<CouncilCarousel key={key} {...props} />);
          case "ethicsGovernance":
            return wrap(<EthicsGovernance key={key} {...props} />);
          
          // Parents
          case "books":
            return wrap(<ParentsBooks key={key} {...props} />);
          case "insightsCarousel":
            return wrap(<InsightsCarousel key={key} {...props} />);
          case "tabbedFaq":
            return wrap(<TabbedFaq key={key} {...props} />);

          // ADMISSIONS
          case "admissionsIntro":
            return wrap(<AdmissionsIntro key={key} {...props} />);
          case "admissionsJourney":
            return wrap(<AdmissionsJourney key={key} {...props} />);
            
          // CONTACT
          case "contactDetails":
            return wrap(<ContactDetails key={key} {...props} />);
          case "locationsGrid":
            return wrap(<LocationsGrid key={key} {...props} />);
          case "positionsOpen":
            return wrap(<PositionsOpen key={key} {...props} />);

          // HOME
          case "homeHero":
            return wrap(<Hero key={key} {...props} />);
          case "imageText":
            return wrap(<ImageText key={key} {...props} />);
          case "journeyCards":
            return wrap(<JourneyCards key={key} {...props} />);
          case "featureGrid":
            return wrap(<FeatureGrid key={key} {...props} />);
          case "insights":
            return wrap(<Insights key={key} {...props} />);
          case "recognizedBy":
            return wrap(<RecognizedBy key={key} {...props} />);
          case "faq":
            return wrap(<FAQAccordion key={key} {...props} />);

          //COMMON
          case "pageHero":
            return wrap(<PageHero key={key} {...props} />);
          case "ctaBanner":
            return wrap(<CtaBanner key={key} {...props} />);
          default:
            return null;
        }
      })}
    </>
  );
}
