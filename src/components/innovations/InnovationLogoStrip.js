import Image from "next/image";
import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";
import Link from "next/link";

import bigNewsNetwork from "@/assets/Big-news-network.webp";
import aniNews from "@/assets/ANI news.webp";
import businessStandard from "@/assets/business-standard-logo-2.webp";

const localAssets = {
  "src/assets/Big-news-network.webp": bigNewsNetwork,
  "src/assets/ANI news.webp": aniNews,
  "src/assets/business-standard-logo-2.webp": businessStandard,
  "/src/assets/Big-news-network.webp": bigNewsNetwork,
  "/src/assets/ANI news.webp": aniNews,
  "/src/assets/business-standard-logo-2.webp": businessStandard,
};

import MediaMentions from "@/components/blocks/MediaMentions";

function stripTypographySizing(className = "") {
  // remove common Tailwind typography sizing that breaks global consistency
  return className
    .split(/\s+/)
    .filter(
      (c) =>
        !/^text-/.test(c) &&
        !/^(sm:|md:|lg:|xl:|2xl:)?text-/.test(c) &&
        !/^(sm:|md:|lg:|xl:|2xl:)?font-/.test(c) &&
        !/^(sm:|md:|lg:|xl:|2xl:)?leading-/.test(c)
    )
    .join(" ");
}

export default function InnovationLogoStrip({
  // ✅ Standard prop (token | class | hex)
  sectionBg = "bg-[#F8E5C7]",
  anchorHref,
  pressRow = false,

  // kept (non-breaking)
  sectionClass = "",
  sectionTitleClass = "",
  logoWrapClass = "flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-10",

  text,
  logos = [],
}) {
  if (pressRow || text === "Media Mentions") {
    return <MediaMentions logos={Array.isArray(logos) && logos.length ? logos : undefined} />;
  }

  const resolvedSection = resolveBg(sectionBg);

  // allow color/alignment/padding from legacy prop, but strip typography sizing
  const hasSubtitle = text === "Media Mentions";
  let safeTitleExtras = stripTypographySizing(sectionTitleClass);
  if (hasSubtitle) {
    // Strip padding bottom from title to avoid double spacing
    safeTitleExtras = safeTitleExtras.replace(/\b(pb-\d+|pb-\[[^\]]+\])\b/g, "");
  }

  return (
    <section
      className={["bb-ui", resolvedSection.className].filter(Boolean).join(" ")}
      style={resolvedSection.style}
    >
      <div className="bb-section">
        <div className="bb-section__inner">
          <Container>
            <div className={["flex flex-col", sectionClass].filter(Boolean).join(" ")}>
              {text ? (
                <h2 className={["bb-section-title text-center", safeTitleExtras, hasSubtitle ? "pb-2" : ""].filter(Boolean).join(" ")}>
                  {text}
                </h2>
              ) : null}

              {hasSubtitle ? (
                <p className="text-center text-[#4F4F4F] text-base sm:text-lg font-normal pb-10 sm:pb-12">
                  Click on any logo to read the full article
                </p>
              ) : null}

              {Array.isArray(logos) && logos.length ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 place-items-center sm:flex sm:flex-row sm:flex-wrap sm:justify-center sm:items-center sm:gap-10">
                  {logos.map((logo, idx) => {
                    const href = logo?.anchorHref;
                    const Wrapper = href ? Link : "div";
                    
                    const isBigNews = logo?.src && logo.src.includes("Big-news-network.webp");
                    const scale = isBigNews ? 1.6 : 0.95;
                    
                    const logoWidth = Math.max(1, Number(logo.width) || 200) * scale;
                    const logoHeight = Math.max(1, Number(logo.height) || 60) * scale;
                    const imageSrc = localAssets[logo.src] || logo.src;

                    // Make Big News Network even larger on mobile screen
                    const maxWClass = isBigNews ? "max-w-[55vw]" : "max-w-[45vw]";
                    const maxHClass = isBigNews ? "max-h-[20vw]" : "max-h-[14vw]";

                    return (
                      <Wrapper
                        key={idx}
                        {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="relative block shrink-0 cursor-pointer p-2 rounded-xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:bg-white/90 hover:shadow-md"
                        style={{ 
                          width: `var(--logo-w, ${logoWidth}px)`, 
                          height: `var(--logo-h, ${logoHeight}px)`,
                          "--logo-w": `${logoWidth}px`,
                          "--logo-h": `${logoHeight}px`,
                        }}
                        aria-label={logo?.alt || "Logo"}
                      >
                        <Image
                          src={imageSrc}
                          alt={logo.alt || ""}
                          width={logoWidth}
                          height={logoHeight}
                          className={`h-full w-full object-contain ${maxWClass} ${maxHClass} sm:max-w-none sm:max-h-none`}
                          sizes="(max-width: 640px) 50vw, 200px"
                        />
                      </Wrapper>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
