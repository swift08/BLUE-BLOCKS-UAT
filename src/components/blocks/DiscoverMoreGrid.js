import Link from "next/link";
import Container from "@/components/layout/Container";

const BASE_DEFAULT = "/programs/secondary-school/cambridge-igcse-erdkinder";

const iconMap = {
  book: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  lightbulb: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925-3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v2.25m-3-2.25h6" />
    </svg>
  ),
  home: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  question: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
    </svg>
  ),
  userOutline: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
  academicCap: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M12 13.489v6.5" />
    </svg>
  )
};

const defaultItems = [
  {
    title: "Academics & Cambridge",
    description: "Subjects, IGCSE, exam preparation",
    href: `${BASE_DEFAULT}#academics`,
    bgColor: "bg-[#FFF2F2]",
    accentColor: "text-[#E27685]",
    borderColor: "border-[#E27685]/30",
    hoverBorder: "hover:border-[#E27685]/60",
    icon: iconMap.book,
  },
  {
    title: "What Students Build",
    description: "Projects, labs, patents, satellite",
    href: `${BASE_DEFAULT}#projects`,
    bgColor: "bg-[#F3F8FF]",
    accentColor: "text-[#58A5F3]",
    borderColor: "border-[#58A5F3]/30",
    hoverBorder: "hover:border-[#58A5F3]/60",
    icon: iconMap.lightbulb,
  },
  {
    title: "A Day in Erdkinder",
    description: "Daily rhythm, sports, settling in",
    href: `${BASE_DEFAULT}#day`,
    bgColor: "bg-[#FFFBF2]",
    accentColor: "text-[#E6A04B]",
    borderColor: "border-[#E6A04B]/30",
    hoverBorder: "hover:border-[#E6A04B]/60",
    icon: iconMap.home,
  },
  {
    title: "Going Outs",
    description: "Field research, conferences",
    href: `${BASE_DEFAULT}#going-outs`,
    bgColor: "bg-[#F3FAF5]",
    accentColor: "text-[#76C289]",
    borderColor: "border-[#76C289]/30",
    hoverBorder: "hover:border-[#76C289]/60",
    icon: iconMap.userOutline,
  },
  {
    title: "Erdkinder Mentors",
    description: "Who guides your child",
    href: `${BASE_DEFAULT}#mentors`,
    bgColor: "bg-[#FFF4F2]",
    accentColor: "text-[#E67D65]",
    borderColor: "border-[#E67D65]/30",
    hoverBorder: "hover:border-[#E67D65]/60",
    icon: iconMap.academicCap,
  },
  {
    title: "FAQ",
    description: "Parent questions answered",
    href: `${BASE_DEFAULT}#faq`,
    bgColor: "bg-[#F7F4FB]",
    accentColor: "text-[#AA8CE6]",
    borderColor: "border-[#AA8CE6]/30",
    hoverBorder: "hover:border-[#AA8CE6]/60",
    icon: iconMap.question,
  },
];

export default function DiscoverMoreGrid({
  title = "About Our Secondary School Community",
  items: customItems,
  cta,
  base = BASE_DEFAULT
}) {
  const displayItems = customItems
    ? customItems.map(item => ({
        ...item,
        icon: typeof item.icon === "string" ? iconMap[item.icon] || null : item.icon
      }))
    : defaultItems;

  const displayTitle = title;
  const displayCtaLabel = cta?.label || "Discover More";
  const displayCtaHref = cta?.href || base;

  const gridColsClass = displayItems.length === 5
    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5";

  return (
    <section className="bg-white py-16">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1a1a] mb-12">
            {displayTitle}
          </h2>
        </div>

        <div className={gridColsClass}>
          {displayItems.map((item, index) => (
            <div
              key={index}
              className={[
                "group relative rounded-[24px] p-6 flex flex-col justify-between min-h-[260px]",
                item.bgColor,
                "border",
                item.borderColor,
                item.hoverBorder,
                "transition-all duration-200",
                "hover:shadow-md hover:-translate-y-0.5",
              ].join(" ")}
            >
              <div className="flex flex-col items-start gap-5">
                <div
                  className={[
                    "w-10 h-10 rounded-full border bg-white flex items-center justify-center",
                    item.accentColor,
                    item.borderColor,
                    "transition-transform duration-200 group-hover:scale-110",
                  ].join(" ")}
                >
                  {item.icon}
                </div>
                <Link
                  href={item.href}
                  className="text-lg font-bold text-[#1a1a1a] leading-tight mt-2 after:absolute after:inset-0 focus:outline-none"
                >
                  {item.title}
                </Link>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-slate-500 leading-snug">{item.description}</p>
                <Link
                  href={base}
                  className={[
                    "relative z-10 flex-shrink-0 ml-2 w-6 h-6 rounded-full flex items-center justify-center",
                    "bg-white border",
                    item.borderColor,
                    item.accentColor,
                    "transition-transform duration-200 hover:scale-110 group-hover:translate-x-0.5",
                  ].join(" ")}
                  aria-label={`Discover more about ${item.title}`}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href={displayCtaHref}
            className="inline-flex items-center gap-2 bg-[#0A4BCE] text-white px-8 py-3.5 rounded-full font-semibold text-base shadow-md hover:bg-[#0840B0] transition-colors"
          >
            {displayCtaLabel}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
