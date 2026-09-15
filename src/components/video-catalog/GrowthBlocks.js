"use client";

import { motion, useScroll, useTransform } from "framer-motion";

function GrowthBlock({ index, scrollYProgress }) {
  const threshold = index / 12;
  const end = Math.min(1, threshold + 0.05);
  const opacity = useTransform(scrollYProgress, [threshold, end], [0, 1]);
  const scale = useTransform(scrollYProgress, [threshold, end], [0.5, 1]);
  const y = useTransform(scrollYProgress, [threshold, end], [20, 0]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="block-3d h-10 w-10 rounded-lg border border-white/10 bg-sky-blue/20 backdrop-blur-md"
    >
      <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-sky-blue/40">
        0{index + 1}
      </div>
    </motion.div>
  );
}

export default function GrowthBlocks() {
  const { scrollYProgress } = useScroll();
  const blocks = Array.from({ length: 12 });

  return (
    <div className="pointer-events-none fixed bottom-20 left-10 z-40 hidden flex-col-reverse gap-1.5 lg:flex">
      {blocks.map((_, i) => (
        <GrowthBlock key={i} index={i} scrollYProgress={scrollYProgress} />
      ))}
      <span className="mt-4 origin-left -rotate-90 translate-x-4 text-[10px] font-black uppercase tracking-[0.3em] text-sky-blue/40">
        Journey Progress
      </span>
    </div>
  );
}
