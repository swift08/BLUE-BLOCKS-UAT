import Container from "@/components/layout/Container";
import Image from "next/image";

export default function FeatureGrid({ headline, subText, items = [] }) {
  return (
    <section className="bg-[#ffffff]">
      <Container className="py-14">
        {headline ? (<h2 className="text-center text-4xl sm:text-5xl font-semibold whitespace-pre-line">{headline}</h2>) : null}
        {subText ? (<h3 className="text-center text-xl sm:text-2xl mt-4">{subText}</h3>) : null}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl bg-[#273C75]/5 border border-black/5 p-6"
            >
              <div className="flex justify-end gap-3 pb-1">
                {it.tag ? (
                  <span className="text-xs rounded-full px-3 py-1 bg-white/60 text-slate-700">
                    {it.tag}
                  </span>
                ) : null}
              </div>
              <div className="icon mb-4">
                <Image 
                  src={it.icon} 
                  alt={it.title} 
                  width={100}
                  height={100} 
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-semibold">{it.title}</div>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                {it.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
