"use client";

import { useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
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

interface ChipConfig {
  label: string;
  icon: React.ReactNode;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

const CHIPS: ChipConfig[] = [
  { label: "Next.js", icon: <Box className="h-3.5 w-3.5 text-[#3b82f6]" />, left: "12%", top: "18%", duration: 3.2, delay: 0 },
  { label: "TypeScript", icon: <FileCode className="h-3.5 w-3.5 text-[#3b82f6]" />, left: "68%", top: "12%", duration: 2.8, delay: 0.4 },
  { label: "Tailwind", icon: <Layout className="h-3.5 w-3.5 text-[#3b82f6]" />, left: "75%", top: "48%", duration: 3.5, delay: 0.8 },
  { label: "Framer", icon: <Sparkles className="h-3.5 w-3.5 text-[#3b82f6]" />, left: "18%", top: "62%", duration: 2.6, delay: 0.2 },
  { label: "Node", icon: <Server className="h-3.5 w-3.5 text-[#3b82f6]" />, left: "58%", top: "68%", duration: 3.0, delay: 0.6 },
  { label: "PostgreSQL", icon: <Database className="h-3.5 w-3.5 text-[#3b82f6]" />, left: "42%", top: "28%", duration: 2.9, delay: 0.3 },
  { label: "React", icon: <Zap className="h-3.5 w-3.5 text-[#3b82f6]" />, left: "28%", top: "42%", duration: 3.3, delay: 0.5 },
  { label: "Vercel", icon: <Code2 className="h-3.5 w-3.5 text-[#3b82f6]" />, left: "52%", top: "78%", duration: 2.7, delay: 0.7 },
];

function FloatingChip({
  label,
  icon,
  left,
  top,
  duration,
  delay,
  constraintsRef,
}: ChipConfig & { constraintsRef: React.RefObject<HTMLDivElement | null> }) {
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const snapBack = () => {
    animate(dragX, 0, { type: "spring", stiffness: 500, damping: 30 });
    animate(dragY, 0, { type: "spring", stiffness: 500, damping: 30 });
  };

  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="absolute"
      style={{ left, top }}
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        dragMomentum={false}
        dragTransition={{
          bounceStiffness: 600,
          bounceDamping: 20,
        }}
        onDragEnd={snapBack}
        className="flex cursor-grab items-center gap-1.5 rounded-lg border border-[#1a1a1a] bg-[#111] px-3 py-2 font-mono text-xs text-white shadow-2xl shadow-black/25 active:cursor-grabbing"
        style={{ x: dragX, y: dragY }}
        aria-label={`Drag ${label} chip`}
      >
        {icon}
        <span>{label}</span>
      </motion.div>
    </motion.div>
  );
}

export default function TechPhysicsOrbit() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={constraintsRef}
      className="relative w-full overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-6"
      style={{
        boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
        minHeight: "400px",
      }}
    >
      {/* System status label */}
      <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-wider text-[#666]">
        [SYSTEM_STATUS: ACTIVE]
      </div>

      {/* Floating chips orbit */}
      <div className="relative h-[360px] w-full">
        {CHIPS.map((chip) => (
          <FloatingChip
            key={chip.label}
            {...chip}
            constraintsRef={constraintsRef}
          />
        ))}
      </div>

      {/* Drag hint */}
      <div
        className="absolute bottom-4 right-4 font-mono text-xs opacity-40 text-[#888]"
        aria-hidden
      >
        Drag me
      </div>
    </div>
  );
}
