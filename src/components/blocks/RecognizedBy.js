import Container from "@/components/layout/Container";
import Image from "next/image";

export default function RecognizedBy({ title, items = [] }) {
  return (
    <section className="bg-[#ffffff]">
      <Container className="py-12">
        <h2 className="text-center text-4xl sm:text-5xl font-semibold main-title">
          {title}
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-10 text-slate-700">
          {items.map((item) => (
            <div key={item.title} className="text-sm font-semibold opacity-80">
              <Image 
                src={item.icon} 
                alt={item.title} 
                width={item.width}
                height={item.height} 
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
