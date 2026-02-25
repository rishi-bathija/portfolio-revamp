"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { m, animate, useMotionValue } from "framer-motion";
import {
  Database,
  Server,
  Code2,
  Layout,
  Sparkles,
  FileCode,
  Box,
  Zap,
} from "lucide-react";

/* ───── chip data ───── */
interface ChipConfig {
  label: string;
  icon: React.ReactNode;
  /** percentage x/y of the container */
  cx: number;
  cy: number;
  floatDuration: number;
  floatDelay: number;
}

const CHIPS: ChipConfig[] = [
  { label: "Next.js",     icon: <Box       className="h-3.5 w-3.5 text-accent" />, cx: 14, cy: 18, floatDuration: 3.2, floatDelay: 0   },
  { label: "TypeScript",  icon: <FileCode  className="h-3.5 w-3.5 text-accent" />, cx: 70, cy: 12, floatDuration: 2.8, floatDelay: 0.4 },
  { label: "Tailwind",    icon: <Layout    className="h-3.5 w-3.5 text-accent" />, cx: 78, cy: 50, floatDuration: 3.5, floatDelay: 0.8 },
  { label: "Framer",      icon: <Sparkles  className="h-3.5 w-3.5 text-accent" />, cx: 16, cy: 60, floatDuration: 2.6, floatDelay: 0.2 },
  { label: "Node",        icon: <Server    className="h-3.5 w-3.5 text-accent" />, cx: 60, cy: 70, floatDuration: 3.0, floatDelay: 0.6 },
  { label: "PostgreSQL",  icon: <Database  className="h-3.5 w-3.5 text-accent" />, cx: 44, cy: 26, floatDuration: 2.9, floatDelay: 0.3 },
  { label: "React",       icon: <Zap       className="h-3.5 w-3.5 text-accent" />, cx: 26, cy: 40, floatDuration: 3.3, floatDelay: 0.5 },
  { label: "Vercel",      icon: <Code2     className="h-3.5 w-3.5 text-accent" />, cx: 54, cy: 82, floatDuration: 2.7, floatDelay: 0.7 },
];

/* ───── constellation lines (pairs of chip indices) ───── */
const CONNECTIONS: [number, number][] = [
  [0, 5], // Next.js → PostgreSQL
  [5, 1], // PostgreSQL → TypeScript
  [1, 2], // TypeScript → Tailwind
  [6, 0], // React → Next.js
  [6, 5], // React → PostgreSQL
  [3, 6], // Framer → React
  [4, 2], // Node → Tailwind
  [7, 4], // Vercel → Node
  [3, 7], // Framer → Vercel
];

/* ───── floating particles ───── */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 3,
}));

/* ───── draggable chip ───── */
function FloatingChip({
  label,
  icon,
  cx,
  cy,
  floatDuration,
  floatDelay,
  constraintsRef,
}: ChipConfig & { constraintsRef: React.RefObject<HTMLDivElement | null> }) {
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const snapBack = useCallback(() => {
    animate(dragX, 0, { type: "spring", stiffness: 500, damping: 30 });
    animate(dragY, 0, { type: "spring", stiffness: 500, damping: 30 });
  }, [dragX, dragY]);

  return (
    <m.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: floatDuration,
        delay: floatDelay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="absolute z-10"
      style={{ left: `${cx}%`, top: `${cy}%` }}
    >
      <m.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.18}
        dragMomentum={false}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        onDragEnd={snapBack}
        whileHover={{ scale: 1.12, boxShadow: "0 0 16px rgba(59,130,246,0.3)" }}
        whileTap={{ scale: 0.92 }}
        className="flex cursor-grab items-center gap-1.5 rounded-lg border border-card-border bg-surface/90 px-3 py-2 font-mono text-xs text-foreground shadow-lg shadow-black/30 backdrop-blur-sm active:cursor-grabbing"
        style={{ x: dragX, y: dragY }}
        aria-label={`Drag ${label} chip`}
        data-cursor-hover
      >
        {icon}
        <span>{label}</span>
      </m.div>
    </m.div>
  );
}

/* ───── SVG constellation layer ───── */
function ConstellationLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.15)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0.03)" />
        </linearGradient>
      </defs>
      {CONNECTIONS.map(([a, b], i) => (
        <line
          key={i}
          x1={`${CHIPS[a].cx}%`}
          y1={`${CHIPS[a].cy}%`}
          x2={`${CHIPS[b].cx}%`}
          y2={`${CHIPS[b].cy}%`}
          stroke="url(#line-grad)"
          strokeWidth="1"
          strokeDasharray="4 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="24"
            dur={`${3 + i * 0.3}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}
    </svg>
  );
}

/* ───── ambient particles ───── */
function AmbientParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PARTICLES.map((p) => (
        <m.div
          key={p.id}
          className="absolute rounded-full bg-accent/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ───── center gravity node ───── */
function CenterNode() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      {/* outer pulse ring */}
      <m.div
        className="absolute -inset-6 rounded-full border border-accent/10"
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* middle pulse ring */}
      <m.div
        className="absolute -inset-3 rounded-full border border-accent/15"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      {/* glow */}
      <div
        className="h-3 w-3 rounded-full bg-accent/40"
        style={{ boxShadow: "0 0 20px rgba(59,130,246,0.4), 0 0 40px rgba(59,130,246,0.15)" }}
      />
    </div>
  );
}

/* ───── scanning line ───── */
function ScanLine() {
  return (
    <m.div
      className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent"
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      aria-hidden
    />
  );
}

/* ───── main component ───── */
export default function TechPhysicsOrbit() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={constraintsRef}
      className="relative w-full overflow-hidden rounded-2xl border border-card-border bg-card p-6"
      style={{
        boxShadow: "inset 0 2px 12px rgba(0,0,0,0.6)",
        minHeight: "420px",
      }}
    >
      {/* Radial glow backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      {/* System status label */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-subtle">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-green" />
        </span>
        [SYSTEM_STATUS: ACTIVE]
      </div>

      {/* Visual layers */}
      {mounted && (
        <>
          <ConstellationLines />
          <AmbientParticles />
          <CenterNode />
          <ScanLine />
        </>
      )}

      {/* Floating chips */}
      <div className="relative h-[380px] w-full">
        {CHIPS.map((chip) => (
          <FloatingChip
            key={chip.label}
            {...chip}
            constraintsRef={constraintsRef}
          />
        ))}
      </div>

      {/* Drag hint */}
      <m.div
        className="absolute bottom-4 right-4 z-20 font-mono text-[10px] text-subtle"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        drag the chips
      </m.div>
    </div>
  );
}
