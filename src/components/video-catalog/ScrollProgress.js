"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollProgress({ chapters = [] }) {
  const count = chapters.length || 13;
  const { scrollYProgress } = useScroll();
  const filled = useTransform(scrollYProgress, [0, 1], [0, count]);

  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex">
      {Array.from({ length: count }).map((_, i) => (
        <ProgressDot key={i} i={i} filled={filled} chapter={chapters[i]} />
      ))}
    </div>
  );
}

function ProgressDot({ i, filled, chapter }) {
  const opacity = useTransform(filled, (value) => (value >= i + 0.4 ? 1 : 0.2));
  const scale = useTransform(filled, (value) => (value >= i + 0.4 ? 1.2 : 0.8));

  return (
    <div className="group relative flex items-center gap-3">
      <span className="absolute right-10 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.2em] text-sky-blue opacity-0 transition-opacity group-hover:opacity-100">
        {chapter}
      </span>
      <motion.div
        style={{ opacity, scale }}
        className="block-3d h-3 w-3 rounded-[3px] bg-sky-blue"
      />
    </div>
  );
}

