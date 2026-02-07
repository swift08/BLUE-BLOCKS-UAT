export default function VerifiedAchievements({
  title = "These are not aspirations. They are verified achievements",
  description = `At Blue Blocks, we do not measure success by report cards alone. We measure it by the real-world impact our students create before they even graduate. Our "Unscripted Learners" are not just preparing for the future; they are actively inventing it.`,
  items = [],
  bgClass = "bg-[#F3E3CF]",
  maxWidth = "max-w-6xl",
}) {
  return (
    <section className={bgClass}>
      <div className={`mx-auto w-full ${maxWidth} px-4 sm:px-6 py-12 sm:py-16`}>
        {/* Header */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>

          {description ? (
            <p className="mt-4 leading-relaxed text-slate-700">
              {description}
            </p>
          ) : null}
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((card, idx) => (
            <AchievementCard
              key={card?.href || card?.title || idx}
              {...card}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({
  image,
  imageAlt = "",
  title,
  text,
  href = "#",
  bg = "#FDE68A", // default light yellow
}) {
  return (
    <div
      className="rounded-2xl p-4 sm:p-5"
      style={{ backgroundColor: bg }}
    >
      {/* Image */}
      <div className="overflow-hidden rounded-xl bg-white/30">
        <img
          src={image}
          alt={imageAlt || title || "Achievement"}
          className="h-44 w-full object-cover sm:h-48"
        />
      </div>

      {/* Text */}
      <div className="mt-4">
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        {text ? (
          <p className="mt-2 leading-relaxed text-slate-700">
            {text}
          </p>
        ) : null}
      </div>

      {/* CTA */}
      <div className="mt-4 flex justify-end">
        <a
          href={href}
          className="inline-flex items-center gap-2 font-semibold tracking-wide text-slate-900/80 hover:text-slate-900"
        >
          READ MORE <span aria-hidden="true">⌄</span>
        </a>
      </div>
    </div>
  );
}
