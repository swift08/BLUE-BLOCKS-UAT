/**
 * generate-llms.js — Rebuilds public/llms.txt and public/llms-full.txt at prebuild time.
 *
 * Automatically pulls all blog posts and research outputs from publishing.js
 * so the files stay in sync whenever new content is added.
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.blueblocks.in"
).replace(/\/$/, "");

function abs(p) {
  return `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`;
}

async function main() {
  const { pathToFileURL } = require("url");

  const publishingPath = path.join(process.cwd(), "src", "data", "publishing.js");
  const pub = await import(pathToFileURL(publishingPath).href);

  const blogPosts = Array.isArray(pub.BLOG_POSTS) ? pub.BLOG_POSTS : [];
  const paperSeries = Array.isArray(pub.PAPER_SERIES) ? pub.PAPER_SERIES : [];
  const researchOutputs = Array.isArray(pub.RESEARCH_OUTPUTS) ? pub.RESEARCH_OUTPUTS : [];

  const now = new Date().toISOString();

  // ---------------------------------------------------------------------------
  // llms.txt — concise summary for AI crawlers
  // ---------------------------------------------------------------------------

  const blogSection = blogPosts.length
    ? [
        "## Blog",
        "",
        ...blogPosts.map(
          (p) =>
            `- [${p.title}](${abs(`/blog/${p.slug}/`)}): ${p.excerpt || p.category || ""}`
        ),
      ].join("\n")
    : "";

  const papersSection = paperSeries.length
    ? [
        "## Foundational Papers",
        "",
        ...paperSeries.map(
          (p) =>
            `- [${p.title}](${abs(`/${p.slug}/`)}): ${p.summary || ""}`
        ),
      ].join("\n")
    : "";

  const publicationsSection = researchOutputs.length
    ? [
        "## Publications",
        "",
        ...researchOutputs.map(
          (p) =>
            `- [${p.title}](${abs(p.pageUrl || `/publications/${p.slug}/`)}): ${p.summary || ""}`
        ),
      ].join("\n")
    : "";

  const llmsTxt = `# Blue Blocks Montessori School & Micro Research Institute
> Last updated: ${now}

> Blue Blocks is an AMI-certified Montessori school and micro-research institute in Hyderabad, India, offering a continuous developmental education from 15 months to 18 years (Ages 1-18), integrated with the Cambridge IGCSE curriculum. The school operates two campuses (Gachibowli and Tellapur) and houses innovation labs in space technology, drone engineering, and biomimicry. The Blue Blocks Micro Research Institute conducts a 17-year longitudinal observational study of child development across 847 cumulative students.

Canonical: ${abs("/")}
Primary email: info@blueblocks.in
Primary phone: +91 9000955050
WhatsApp: +91 9000955053
Founded: 2009

## Core pages

- [Home](${abs("/")}): Overview of the AMI Montessori continuum, 0-18 developmental architecture, and research-led pedagogy.
- [About Us](${abs("/about-us/")}): Founding story, founder bios (Pavan Goyal, Munira Hussain), 17-year longitudinal dataset, Times of India recognition, BBMRI mission.
- [Programs](${abs("/programs/")}): Full program catalogue across the four planes of Montessori development.
- [Innovation](${abs("/innovation/")}): Innovation Lab, Drone Lab, Space Lab, Biomimicry Hive, CubeSat Mission.
- [Admissions](${abs("/admissions/")}): Admissions process, parent orientation, entry windows, Cambridge integration.
- [Campus](${abs("/campus/")}): Octagonal classrooms, biophilic design, Innovation Infrastructure (CESDI), kinaesthetic landscape.
- [Careers](${abs("/careers/")}): Open roles for AMI guides, educators, innovation lab leads, and operations staff.
- [Contact](${abs("/contact-us/")}): Both campus addresses, phone, email, and enquiry form.
- [FAQ](${abs("/faq/")}): Common questions about Montessori, admissions, and Cambridge IGCSE integration.
- [Blog](${abs("/blog/")}): Articles on Montessori, parenting, innovation pedagogy.

## Programs

- [Playgroup (Toddler Community, Ages 1-3)](${abs("/programs/playgroup/")})
- [Nursery, PP1, PP2 (Children's House, Ages 3-6)](${abs("/programs/nursery-school/")})
- [Primary School - Class 1 to 6 (Elementary, Ages 6-12)](${abs("/programs/primary-school-elementary/")})
- [Secondary School - Class 7 to 10 (Adolescent, Ages 12-18)](${abs("/programs/secondary-school/")})

## Innovation Labs

- [Innovation Lab](${abs("/innovation/innovation-lab/")}): Ethical making and design facility with 500 tools across all three Planes of Development.
- [Drone Lab](${abs("/innovation/drone-lab/")}): Student drone research; 5 patent applications filed by elementary students aged 8-12.
- [Space Lab](${abs("/innovation/space-lab/")}): Student-led aerospace research; CubeSat payload development.
- [Biomimicry Hive](${abs("/innovation/biomimicry-hive/")}): Hexagonal research space designed by IIT Hyderabad for nature-inspired innovation.
- [CubeSat Mission](${abs("/innovation/cubesat-mission/")}): IN-SPACe-authorised student CubeSat payload (Project SBB-1).

## Research and Publications

- [Research Institute](${abs("/research-institute/")}): Blue Blocks Micro Research Institute mission, methodology, ethics, governance.
- [Papers](${abs("/papers/")}): The four published developmental papers.
- [Publications](${abs("/publications/")}): Authorisation dossiers, longitudinal studies, methodological contributions, patents.

${papersSection}

${publicationsSection}

${blogSection}

## Credentials and recognition

- AMI (Association Montessori Internationale) certification across all four planes (0-3, 3-6, 6-12, 12-18).
- Cambridge International School (Cambridge Assessment International Education).
- Best Pre-School in Hyderabad - Times of India (3 consecutive years).
- ISRO IN-SPACe authorisation for student CubeSat mission (2025).
- Invited presentation - Nobel Peace Centre, Oslo (2024).
- Verified educational institution - U.S. Department of State.
- Affiliation - Indian Institute of Technology Hyderabad (IIT-H).

## SEO and Semantic Graph

- Next-level structured data featuring over 250+ interlinked Schema.org JSON-LD nodes.
- Fully mapped entity relationships detailing the school organization, campuses, founders, mentors, educational programs, curriculum subjects, patents, research publications, and dynamic subject-matter FAQs.

## Authoritative dataset

- [Full LLM dataset](${abs("/llms-full.txt")})
- [Sitemap](${abs("/sitemap.xml")})
- [Privacy policy](${abs("/privacy-policy/")})
- [Terms](${abs("/terms/")})
`;

  // ---------------------------------------------------------------------------
  // llms-full.txt — extended version with more detail
  // ---------------------------------------------------------------------------

  const llmsFullTxt = `${llmsTxt}
---

## Extended detail

### About the founders

**Pavan Goyal** — Founder & Principal. Holds the rare distinction of all four AMI Diplomas (0-3, 3-6, 6-12, 12-18), making him one of the few people globally certified across the complete Montessori continuum. Principal Investigator at the Blue Blocks Micro Research Institute.

**Munira Hussain** — Co-Founder & Director of Pedagogy. Ensures that every classroom remains a psychological sanctuary for the child. Leads the Parent Education Programme and Guide Training, conducting workshops for over 40,000 parents across 18 years.

### About the research institute (BBMRI)

The Blue Blocks Micro Research Institute (BBMRI) conducts a 17-year longitudinal observational study of child development. The study uses passive, non-intrusive observation methodology across 847 cumulative students. Research output includes scholarly papers, methodological contributions, and patent documentation from student innovation programmes.

### Innovation ecosystem

Blue Blocks operates India's only school-based IN-SPACe-authorised student CubeSat mission (Project SBB-1, 2025). Elementary students aged 8-12 have filed 5 drone patent applications. The Biomimicry Hive was co-designed with IIT Hyderabad. The Innovation Lab contains 500+ tools available to students across all planes of development.

### Campuses

1. **Gachibowli Campus** — Primary and Toddler programmes. Octagonal classroom design, biophilic materials, kinaesthetic landscape.
2. **Tellapur Campus** — Secondary and Innovation programmes. Houses the Innovation Lab, Drone Lab, Space Lab, and Biomimicry Hive.

### Cambridge integration

Blue Blocks integrates the Cambridge IGCSE framework at the Secondary level (Grades 7-10). The Montessori approach builds deep concentration and self-regulation in early years, which prepares students for Cambridge examination rigour without remediation.
`;

  // ---------------------------------------------------------------------------
  // Write files
  // ---------------------------------------------------------------------------

  const llmsTxtPath = path.join(process.cwd(), "public", "llms.txt");
  const llmsFullTxtPath = path.join(process.cwd(), "public", "llms-full.txt");

  fs.writeFileSync(llmsTxtPath, llmsTxt.trim() + "\n", "utf8");
  fs.writeFileSync(llmsFullTxtPath, llmsFullTxt.trim() + "\n", "utf8");

  console.log(`✓ llms.txt generated → ${llmsTxtPath}`);
  console.log(`✓ llms-full.txt generated → ${llmsFullTxtPath}`);
}

main().catch((err) => {
  console.error("✗ Failed to generate llms.txt");
  console.error(err);
  process.exit(1);
});
