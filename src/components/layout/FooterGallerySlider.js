"use client";

import Image from "next/image";
import CarouselTrack from "@/components/ui/carousel/CarouselTrack";

export default function FooterGallerySlider({ slides }) {
  return (
    <div className="relative">
      <CarouselTrack
        total={slides.length}
        perView={{ base: 1, md: 1, lg: 1 }}
        gap={0}
        className="relative"
        dots={{
          show: true,
          className:
            "absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2",
          dotClassName: "h-1.5 w-10 rounded-full",
          activeClassName: "bg-white/90",
          inactiveClassName: "bg-white/25",
          focusRingClassName: "focus:ring-white/30",
          showOn: "all",
        }}
      >
        {({ cardW }) =>
          slides.map((item, idx) => (
            <div
              key={`${item.src}-${idx}`}
              className="relative shrink-0"
              style={{ width: cardW || "100%" }}
            >
              <div className="relative h-[14.5rem] sm:h-[18rem] lg:h-[32rem] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt || "Footer gallery"}
                  width={1200}
                  height={800}
                  style={{ aspectRatio: "1200 / 800" }}
                  className="absolute inset-0 h-full w-full object-cover"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
              </div>
            </div>
          ))
        }
      </CarouselTrack>
    </div>
  );
}
