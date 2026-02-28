import Container from "@/components/layout/Container";
import Link from "next/link";

export default function ResearchMission({ 
  eyebrow,
  bgClassName = "bg-[#F3E3CF]", 
  sectionTopPadd = "py-16 sm:py-20",
  calloutWidth = "max-w-5xl",
  calloutTitleClass = "text-[0.95rem] sm:text-[1rem] font-medium",
  calloutClass = "text-center text-[0.95rem] sm:text-[1rem] leading-relaxed text-slate-700",
  alignCenter = "",
  id, 
  title, 
  text = [],
  calloutGroupClass = "mt-10 sm:mt-14",
  CalloutWrapClass = "text-left bg-[#FFFFFF] border-2 border-[#131313] px-7 py-8 sm:px-12 sm:py-10",
  calloutTitle, 
  callout,
  calloutCTA,
  calloutBg = "bg-[#FFDBAE]"
}) {
  const body =
    Array.isArray(text) && text.length > 0 ? text.join(" ") : "";

  return (
    <section id={id} className={`${bgClassName} ${alignCenter}`}>
      <Container className={`${sectionTopPadd}`}>
        {eyebrow ? (<h3 className="text-[0.75rem] sm:text-[0.95rem] leading-[1.05] font-medium text-[#131313]">
          {eyebrow}
        </h3>): null}
        {title ? (<h2 className="text-[2.25rem] sm:text-[3rem] leading-[1.05] font-medium text-[#131313]">
          {title}
        </h2>) : null}

        {body ? (
          <p className="mt-5 text-[0.95rem] sm:text-[1.05rem] leading-relaxed text-slate-600">
            {body}
          </p>
        ) : null}

        {callout ? (
          <div className={`${calloutGroupClass}`}>
            <div className={`relative mx-auto w-full ${calloutWidth}`}>
              <div aria-hidden className={`absolute top-0 left-0 -translate-x-[1.5%] translate-y-0 w-[103%] h-full rotate-[-1deg] rounded-[28px] border border-black/20 ${calloutBg}`}/>
 
              <div className={`relative text-center rounded-[26px] ${CalloutWrapClass}`}>
                {calloutTitle ? (<h3 className={`${calloutTitleClass}`}>{calloutTitle}</h3>) : null}
                <p className={`${calloutClass}`}>
                  {callout}
                </p>

                {calloutCTA?.href ? (<div className="text-center"><Link className="bb-btn bb-btn--primary mt-6 " href={calloutCTA?.href}>{calloutCTA?.label} <span className="ml-2" aria-hidden="true">→</span></Link></div>) : null}
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
