import Container from "@/components/layout/Container";
import Accordion from "@/components/ui/Accordion";

export default function FAQAccordion({
  // content
  title,
  subtitle,
  items = [],

  // JSON-driven UI controls
  bg = "#F3E3CF",
  defaultOpenIndex = 0,
  allowToggleAllClosed = true,

  // layout controls
  panelMaxWidth = "max-w-4xl",
  containerClassName = "py-14 sm:py-16",

  // typography controls (optional)
  titleClassName = "text-4xl sm:text-5xl text-slate-900 main-title",
  subtitleClassName = "mt-3 text-xs sm:text-sm text-slate-700/70 max-w-2xl mx-auto",

  // accordion style controls (optional)
  rowGapClassName = "space-y-3",
  openItemClassName = "bg-white shadow-sm",
  closedItemClassName = "bg-transparent",
  itemClassName = "",
  buttonClassName = "",
  contentClassName = "",
  iconClassName = "",
}) {
  return (
    <section style={{ backgroundColor: bg }}>
      <Container className={containerClassName}>
        <div className="text-center">
          {title ? <h2 className={titleClassName}>{title}</h2> : null}
          {subtitle ? <p className={subtitleClassName}>{subtitle}</p> : null}
        </div>

        <div className={`mt-10 mx-auto w-full ${panelMaxWidth}`}>
          <Accordion
            items={items}
            defaultOpenIndex={defaultOpenIndex}
            allowToggleAllClosed={allowToggleAllClosed}
            openItemClassName={openItemClassName}
            closedItemClassName={closedItemClassName}
            itemClassName={itemClassName}
            buttonClassName={buttonClassName}
            contentClassName={contentClassName}
            iconClassName={iconClassName}
          />
        </div>
      </Container>
    </section>
  );
}
