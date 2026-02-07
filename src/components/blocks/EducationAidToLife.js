import Image from "next/image";
import Container from "@/components/layout/Container";
import PyramidTiersRounded from "../../components/ui/PyramidTiersRounded";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PyramidTier({ tone, age, label, sublabel, className }) {
  // tone: "top" | "mid" | "bottom"
  const base =
    "mx-auto flex flex-col items-center justify-center text-center text-white";

  const toneStyles = {
    top: {
      bg: "bg-[#253B74]",
      w: "w-[10.5rem] sm:w-[12.5rem]",
      h: "h-[6.5rem] sm:h-[7.5rem]",
      clip: "[clip-path:polygon(50%_0%,94%_100%,6%_100%)]",
      age: "text-[1.55rem] sm:text-[1.8rem]",
      label: "text-[0.65rem] sm:text-[0.7rem] text-white/85",
      sub: "text-[0.6rem] sm:text-[0.65rem] text-white/75",
    },
    mid: {
      bg: "bg-[#8FC4A6]",
      w: "w-[14rem] sm:w-[16.5rem]",
      h: "h-[6.2rem] sm:h-[7rem]",
      clip: "[clip-path:polygon(8%_0%,92%_0%,100%_100%,0%_100%)]",
      age: "text-[1.6rem] sm:text-[1.85rem]",
      label: "text-[0.65rem] sm:text-[0.7rem] text-white/90",
      sub: "text-[0.6rem] sm:text-[0.65rem] text-white/80",
    },
    bottom: {
      bg: "bg-[#D77E57]",
      w: "w-[18rem] sm:w-[22rem] lg:w-[24rem]",
      h: "h-[6.4rem] sm:h-[7.2rem]",
      clip: "[clip-path:polygon(6%_0%,94%_0%,100%_100%,0%_100%)]",
      age: "text-[1.65rem] sm:text-[1.95rem]",
      label: "text-[0.65rem] sm:text-[0.7rem] text-white/90",
      sub: "text-[0.6rem] sm:text-[0.65rem] text-white/80",
    },
  };

  const t = toneStyles[tone] ?? toneStyles.mid;

  return (
    <div className={cx(base, t.bg, t.w, t.h, t.clip, className)}>
      <div className={cx("font-semibold leading-none", t.age)}>{age}</div>
      {label ? <div className={cx("mt-1 leading-snug", t.label)}>{label}</div> : null}
      {sublabel ? <div className={cx("leading-snug", t.sub)}>{sublabel}</div> : null}
    </div>
  );
}

export default function EducationAidToLife({
  bg = "#F3E3CF",
  eyebrow = "PHILOSOPHY",
  title = "EDUCATION AS AN AID\nTO LIFE",
  paragraphs = [],
  pyramidImage,
  pyramid = {
    top: { age: "0-6", label: "The Absorbent\nMind", sublabel: "(Construction\nof the Self)" },
    middle: { age: "6-12", label: "The Reasoning Mind", sublabel: "(Construction of the\nIntellect)" },
    bottom: { age: "12-18", label: "The Social Self", sublabel: "(Construction of Society)" },
  },
}) {
  return (
    <section style={{ backgroundColor: bg }}>
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* LEFT: Text */}
          <div className="lg:col-span-6">
            {eyebrow ? (
              <div className="inline-flex rounded-full bg-[#E7E8FF] px-4 py-2 text-[0.625rem] font-semibold tracking-[0.18em] uppercase text-[#2C2F8F]">
                {eyebrow}
              </div>
            ) : null}

            <h2 className="mt-5 text-4xl sm:text-5xl font-semibold main-title">
              {title}
            </h2>

            <div className="mt-6 space-y-5 text-[0.95rem] sm:text-[1rem] leading-7 text-slate-600 max-w-[34rem]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* RIGHT: Pyramid */}
          <div className="lg:col-span-6">
            <div className="mx-auto w-full max-w-[32rem] sm:max-w-[34rem]">
                <Image
                  src={pyramidImage}
                  alt={title || "Academics"}
                  width={670}
                  height={593}
                  className="object-cover"
                />
            </div>
            </div>
        </div>
      </Container>
    </section>
  );
}
