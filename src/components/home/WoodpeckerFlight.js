"use client";

/** One intro pass. Ground rises first, then flyers cross in a line. Nothing repeats. */

export default function WoodpeckerFlight() {
  return (
    <div className="bb-nature pointer-events-none absolute inset-0 z-[15] overflow-hidden" aria-hidden="true">
      <style>{`
        .bb-nature .bb-piece { opacity: 0; }
        .bb-sky { top: 15%; animation: bb-parade 7s linear forwards; }
        .bb-fly { width: 78px; animation-delay: 1.4s; }
        .bb-bee { width: 68px; animation-delay: 2.5s; }
        .bb-wp { width: 128px; animation-delay: 3.6s; }
        .bb-ground {
          bottom: 13%;
          transform-origin: 50% 100%;
          animation: bb-rise 10s ease-out forwards;
        }
        .bb-plant { width: 84px; }
        .bb-plant-l { left: 6%; animation-delay: 0.15s; }
        .bb-worm { width: 72px; }
        .bb-worm-l { left: 16%; animation-delay: 0.4s; }
        .bb-bug { left: 26%; width: 42px; animation-delay: 0.65s; }
        .bb-mush { left: 64%; width: 64px; animation-delay: 0.9s; }
        .bb-worm-r { left: 74%; animation-delay: 1.15s; }
        .bb-plant-r { left: 84%; width: 74px; animation-delay: 1.4s; }
        .bb-wp-wing, .bb-wp-wing-far, .bb-bee-wing, .bb-fly-wing {
          transform-box: fill-box;
          transform-origin: center;
        }
        .bb-wp-wing, .bb-wp-wing-far { transform-origin: 0% 70%; }
        .bb-wp .bb-wp-wing { animation: bb-flap 0.17s ease-in-out infinite; }
        .bb-wp .bb-wp-wing-far { animation: bb-flap 0.17s ease-in-out infinite reverse; }
        .bb-bee .bb-bee-wing { animation: bb-flap 0.08s linear infinite; }
        .bb-fly .bb-fly-wing { animation: bb-flutter 0.28s ease-in-out infinite; }
        .bb-fly .bb-fly-wing-r { animation-delay: 0.08s; }
        @keyframes bb-parade {
          0% { opacity: 0; left: 108%; transform: translateY(6px) rotate(6deg); }
          8% { opacity: 1; transform: translateY(0) rotate(4deg); }
          40% { opacity: 1; transform: translateY(-10px) rotate(2deg); }
          70% { opacity: 1; transform: translateY(8px) rotate(7deg); }
          100% { opacity: 0; left: -24%; transform: translateY(0) rotate(4deg); }
        }
        @keyframes bb-rise {
          0% { opacity: 0; transform: translateY(28px) scale(0.82); }
          10% { opacity: 1; transform: translateY(0) scale(1); }
          82% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(12px) scale(0.96); }
        }
        @keyframes bb-flap {
          0%, 100% { transform: rotate(24deg); }
          50% { transform: rotate(-28deg); }
        }
        @keyframes bb-flutter {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.35); }
        }
        @media (max-width: 767px) {
          .bb-sky { top: 11%; }
          .bb-wp { width: 88px; }
          .bb-bee, .bb-fly { width: 48px; }
          .bb-ground { bottom: 20%; }
          .bb-plant { width: 56px; }
          .bb-plant-r { width: 50px; }
          .bb-mush { width: 44px; }
          .bb-worm { width: 52px; }
          .bb-bug { width: 32px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bb-nature .bb-piece { animation: none; opacity: 0; }
        }
      `}</style>
      <div className="bb-piece bb-sky bb-fly absolute">
        <ButterflySvg />
      </div>
      <div className="bb-piece bb-sky bb-bee absolute">
        <BeeSvg />
      </div>
      <div className="bb-piece bb-sky bb-wp absolute">
        <WoodpeckerSvg />
      </div>
      <div className="bb-piece bb-ground bb-plant bb-plant-l absolute">
        <PlantSvg />
      </div>
      <div className="bb-piece bb-ground bb-worm bb-worm-l absolute">
        <WormSvg />
      </div>
      <div className="bb-piece bb-ground bb-bug absolute">
        <LadybugSvg />
      </div>
      <div className="bb-piece bb-ground bb-mush absolute">
        <MushroomSvg />
      </div>
      <div className="bb-piece bb-ground bb-worm bb-worm-r absolute">
        <WormSvg />
      </div>
      <div className="bb-piece bb-ground bb-plant bb-plant-r absolute">
        <PlantSvg flower />
      </div>
    </div>
  );
}

function WoodpeckerSvg() {
  return (
    <svg viewBox="0 0 220 110" className="block h-auto w-full" aria-hidden="true">
      <g className="bb-wp-wing-far">
        <path d="M96 58 C128 30 168 24 184 44 C152 34 118 48 94 68 Z" fill="#3d342c" />
      </g>
      <path d="M128 60 L206 74 L134 70 Z" fill="#1a1612" />
      <path d="M130 66 L204 88 L138 76 Z" fill="#2a241e" />
      <path d="M132 62 L198 80 L140 72 Z" fill="#0e0c0a" />
      <ellipse cx="112" cy="70" rx="34" ry="16" fill="#f6f1e8" />
      <path d="M86 58 C108 46 146 46 160 64 C132 52 102 54 84 68 Z" fill="#1b1815" />
      <g className="bb-wp-wing">
        <path d="M92 64 C132 28 178 16 198 40 C160 26 118 50 90 76 Z" fill="#141210" />
        <path d="M104 50 L176 34" stroke="#e8c15a" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M98 58 L182 42" stroke="#f6e7b2" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <circle cx="72" cy="58" r="16" fill="#171412" />
      <path d="M58 46 C70 20 98 26 94 48 C82 34 64 36 58 46 Z" fill="#d23b2c" />
      <ellipse cx="82" cy="66" rx="9" ry="6.5" fill="#f7f4ee" />
      <circle cx="64" cy="55" r="3.1" fill="#f4f1ea" />
      <circle cx="64.8" cy="55.2" r="1.55" fill="#111" />
      <polygon points="2,60 56,53 56,67" fill="#6a5d52" />
      <polygon points="2,60 56,60 56,67" fill="#3a322c" />
    </svg>
  );
}

function BeeSvg() {
  return (
    <svg viewBox="0 0 80 50" className="block h-auto w-full" aria-hidden="true">
      <g className="bb-bee-wing">
        <ellipse cx="28" cy="16" rx="14" ry="8" fill="#f7f4ee" opacity="0.9" />
        <ellipse cx="48" cy="14" rx="12" ry="7" fill="#f7f4ee" opacity="0.75" />
      </g>
      <ellipse cx="40" cy="30" rx="18" ry="12" fill="#f2c14e" />
      <path d="M30 20 v20 M38 18 v24 M46 20 v20" stroke="#1c1916" strokeWidth="2.4" />
      <circle cx="18" cy="28" r="7" fill="#1c1916" />
      <circle cx="16" cy="26" r="1.3" fill="#f7f4ee" />
    </svg>
  );
}

function ButterflySvg() {
  return (
    <svg viewBox="0 0 90 70" className="block h-auto w-full" aria-hidden="true">
      <g className="bb-fly-wing">
        <ellipse cx="24" cy="28" rx="20" ry="16" fill="#e07a3d" />
        <ellipse cx="28" cy="48" rx="14" ry="12" fill="#c45c4a" />
      </g>
      <g className="bb-fly-wing bb-fly-wing-r">
        <ellipse cx="66" cy="28" rx="20" ry="16" fill="#e07a3d" />
        <ellipse cx="62" cy="48" rx="14" ry="12" fill="#c45c4a" />
      </g>
      <ellipse cx="45" cy="36" rx="4" ry="16" fill="#2a241e" />
      <circle cx="45" cy="16" r="4" fill="#2a241e" />
    </svg>
  );
}

function PlantSvg({ flower = false }) {
  return (
    <svg viewBox="0 0 70 90" className="block h-auto w-full" aria-hidden="true">
      <path d="M34 88 C34 60 36 40 34 28" stroke="#3d6b3a" strokeWidth="3" fill="none" />
      <path d="M34 58 C18 50 12 36 20 30 C28 40 34 48 34 58 Z" fill="#4e8a48" />
      <path d="M34 48 C50 40 58 28 50 22 C42 32 36 40 34 48 Z" fill="#3d7a3e" />
      {flower ? (
        <g>
          <circle cx="28" cy="18" r="5" fill="#e7b3c8" />
          <circle cx="38" cy="16" r="5" fill="#e7b3c8" />
          <circle cx="33" cy="24" r="5" fill="#e7b3c8" />
          <circle cx="33" cy="18" r="3" fill="#e2c15a" />
        </g>
      ) : (
        <ellipse cx="34" cy="22" rx="8" ry="5" fill="#2f6a38" />
      )}
    </svg>
  );
}

function MushroomSvg() {
  return (
    <svg viewBox="0 0 60 50" className="block h-auto w-full" aria-hidden="true">
      <path d="M24 46 C24 32 28 28 30 28 C32 28 36 32 36 46 Z" fill="#f3e6d4" />
      <path d="M6 28 C10 10 50 10 54 28 Z" fill="#c4473a" />
      <circle cx="20" cy="20" r="2.2" fill="#f6f1e8" />
      <circle cx="32" cy="16" r="2.6" fill="#f6f1e8" />
      <circle cx="42" cy="22" r="1.8" fill="#f6f1e8" />
    </svg>
  );
}

function WormSvg() {
  return (
    <svg viewBox="0 0 80 24" className="block h-auto w-full" aria-hidden="true">
      <path d="M4 14 C16 4 28 22 40 12 C52 2 64 20 76 10" stroke="#c47b8a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="10" cy="12" r="1.2" fill="#2a241e" />
    </svg>
  );
}

function LadybugSvg() {
  return (
    <svg viewBox="0 0 40 32" className="block h-auto w-full" aria-hidden="true">
      <ellipse cx="22" cy="18" rx="14" ry="10" fill="#c4473a" />
      <path d="M22 8 v20" stroke="#1c1916" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="1.6" fill="#1c1916" />
      <circle cx="28" cy="15" r="1.6" fill="#1c1916" />
      <circle cx="24" cy="22" r="1.4" fill="#1c1916" />
      <circle cx="8" cy="16" r="5" fill="#1c1916" />
    </svg>
  );
}
