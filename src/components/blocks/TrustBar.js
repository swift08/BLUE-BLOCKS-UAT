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
    label: "IN-SPACe",
    src: "/icon/inspace.webp",
    alt: "IN-SPACe",
    wide: true,
    hideLabel: true,
  },
];

export default function TrustBar() {
  return (
    <section aria-label="Credentials" className="border-y border-[#0F52BA]/10 bg-white">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 items-center justify-items-center gap-y-4 px-6 py-5 md:grid-cols-4">
        {CHIPS.map((chip) => (
          <li key={chip.label} className="flex items-center gap-3">
            <ChipMark chip={chip} />
            {chip.hideLabel ? null : (
              <span className="text-sm font-medium tracking-tight text-slate-900">{chip.label}</span>
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
            ? "h-10 w-auto max-w-[9rem] object-contain"
            : "h-10 w-auto max-w-[6.5rem] object-contain"
        }
      />
    );
  }
  return null;
}

