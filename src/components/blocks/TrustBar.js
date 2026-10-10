import Image from "next/image";

const CHIPS = [
  {
    label: "As seen in Times of India",
    src: "/icon/toi.png",
    alt: "Times of India",
  },
  {
    label: "AMI-Trained Lead Guides",
    src: "/icon/AMI-color.webp",
    alt: "AMI",
  },
  {
    label: "Cambridge International",
    src: "/icon/cambridge-mark.webp",
    alt: "Cambridge International",
    wide: true,
    hideLabel: true,
  },
  {
    label: "IN-SPACe Partner",
    src: "/icon/inspace.webp",
    alt: "IN-SPACe",
    wide: true,
  },
];

export default function TrustBar() {
  return (
    <section aria-label="Credentials" className="bg-[#F9F9F9]">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 md:flex">
        {CHIPS.map((chip, index) => (
          <li
            key={chip.label}
            className={[
              "flex items-center justify-center gap-2.5 px-4 py-3 md:flex-1",
              index % 2 === 0 ? "border-r border-black/10 md:border-r-0" : "",
              index > 0 ? "md:border-l md:border-black/10" : "",
            ].join(" ")}
          >
            <ChipMark chip={chip} />
            {chip.hideLabel ? null : (
              <span className="text-[13px] leading-tight text-slate-800">{chip.label}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ChipMark({ chip }) {
  if (chip.src) {
    return (
      <Image
        src={chip.src}
        alt={chip.alt}
        width={120}
        height={32}
        className={
          chip.wide
            ? "h-8 w-auto max-w-[8rem] object-contain"
            : "h-8 w-auto max-w-[5.5rem] object-contain"
        }
      />
    );
  }
  return null;
}

