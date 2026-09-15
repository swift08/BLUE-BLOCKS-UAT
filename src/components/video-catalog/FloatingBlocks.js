"use client";

import { motion } from "framer-motion";

const blocks = [
  { size: 80, x: "8%", y: "18%", rotate: -12, delay: 0, color: "sky", depth: 0.4 },
  { size: 120, x: "82%", y: "22%", rotate: 14, delay: 0.4, color: "lilac", depth: 0.7 },
  { size: 64, x: "18%", y: "72%", rotate: 22, delay: 0.8, color: "warm", depth: 0.3 },
  { size: 100, x: "75%", y: "70%", rotate: -8, delay: 1.2, color: "sky", depth: 0.6 },
  { size: 56, x: "50%", y: "10%", rotate: 6, delay: 0.6, color: "lilac", depth: 0.5 },
  { size: 72, x: "92%", y: "48%", rotate: -18, delay: 1.4, color: "warm", depth: 0.8 },
  { size: 48, x: "5%", y: "45%", rotate: 30, delay: 1.0, color: "sky", depth: 0.4 },
];

const colorMap = {
  sky: "bg-sky-blue/80",
  lilac: "bg-lilac/85",
  warm: "bg-warm/80",
  deep: "bg-deep-blue/90",
};

export default function FloatingBlocks() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blocks.map((block, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 60, scale: 0.5, rotate: block.rotate - 40 }}
          animate={{ opacity: block.depth, y: 0, scale: 1, rotate: block.rotate }}
          transition={{ delay: block.delay, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
          style={{ left: block.x, top: block.y, width: block.size, height: block.size }}
        >
          <div
            className={`block-3d animate-float h-full w-full rounded-2xl ${colorMap[block.color]}`}
            style={{ ["--r"]: `${block.rotate}deg`, animationDelay: `${block.delay}s` }}
          />
        </motion.div>
      ))}
    </div>
  );
}
