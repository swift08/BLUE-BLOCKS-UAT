"use client";

import { motion, useScroll, useTransform } from "framer-motion";

function MemoryDot({ index, scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 1], [`${index * 15}%`, `${index * 15 - 50}%`]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? "5%" : "90%", index % 2 === 0 ? "10%" : "85%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);

  return (
    <motion.div
      style={{ y, x, opacity, scale }}
      className="absolute h-3 w-3 rounded-full bg-sky-blue/30 blur-sm"
    />
  );
}

export default function MemoryTrail() {
  const { scrollYProgress } = useScroll();
  const dots = Array.from({ length: 12 });

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {dots.map((_, i) => (
        <MemoryDot key={i} index={i} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}
