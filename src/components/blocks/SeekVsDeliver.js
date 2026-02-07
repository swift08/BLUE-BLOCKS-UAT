export default function SeekVsDeliver({
  title = "If you seek... vs We deliver...",
  leftHeader = "If You Seek",
  rightHeader = "We Deliver",
  rows = [],
  bgClass = "bg-white",
  maxWidth = "max-w-4xl",
}) {
  return (
    <section className={bgClass}>
      <div className={`mx-auto w-full ${maxWidth} px-4 sm:px-6 py-12 sm:py-16`}>
        {/* Title */}
        <h2 className="text-center text-4xl sm:text-5xl font-semibold text-slate-900 main-title">
          {title}
        </h2>

        {/* Headers */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 gap-4">
          <div className="rounded-lg bg-[#1F3566] px-5 py-4 text-lg font-semibold text-white">
            {leftHeader}
          </div>
          <div className="rounded-lg bg-[#1F3566] px-5 py-4 text-lg font-semibold text-white">
            {rightHeader}
          </div>
        </div>

        {/* Rows */}
        <div className="mt-4 space-y-4">
          {rows.map((row, idx) => (
            <div
              key={`row-${idx}`}
              className="grid grid-cols-2 sm:grid-cols-2 gap-4 rounded-lg"
            >
              {/* Left */}
              <div className="grid items-center rounded-lg px-5 py-6 text-sm sm:text-base font-semibold text-slate-900" style={{ backgroundColor: row.bg || getDefaultRowBg(idx) }}>
                {row.left}
              </div>

              {/* Right */}
              <div className="rounded-lg px-5 py-6 text-sm sm:text-base text-slate-800 whitespace-pre-line" style={{ backgroundColor: row.bg || getDefaultRowBg(idx) }}>
                {row.right}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getDefaultRowBg(idx) {
  const palette = ["#EFE7DD", "#F2DCD6", "#E3EBDD", "#DCE9EA", "#E7E4E1"];
  return palette[idx % palette.length];
}
