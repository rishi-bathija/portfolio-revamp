"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Cpu,
  Wrench,
  Activity,
} from "lucide-react";

const STACK_ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "Redux Toolkit",
  "Tailwind CSS",
  "JavaScript",
];

const ENGINE_ITEMS = [
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "REST APIs",
  "JWT Auth",
  "Firebase",
];

interface MicroChipProps {
  label: string;
}

function MicroChip({ label }: MicroChipProps) {
  return (
    <span
      className="rounded-md border border-white/5 bg-[#111] px-2 py-1 font-mono text-[10px] text-[#e5e5e5]"
      aria-hidden
    >
      {label}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

const hoverTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

export default function AboutSkills() {
  return (
    <section
      className="px-6 py-14 md:px-12 md:py-16 lg:px-24"
      aria-labelledby="about-skills-heading"
    >
      <h2
        id="about-skills-heading"
        className="mb-12 font-mono text-sm uppercase tracking-wider text-muted-foreground"
      >
        System.Architect(Rishi)
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-auto"
      >
        {/* Card 1 - Bio (span 2 cols) */}
        <motion.article
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.01, transition: hoverTransition }}
          className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 md:col-span-2"
        >
          <div
            className="absolute left-0 right-0 top-0"
            style={{
              height: "0.5px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
            }}
            aria-hidden
          />
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-[#3b82f6]" aria-hidden />
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#666]">
              Bio
            </h3>
          </div>
          <p className="font-sans text-[#e5e5e5] leading-relaxed">
            Full-stack engineer experienced in building scalable features across SaaS platforms, industry projects, dashboards, admin-panels used by real users.

            Worked closely with teams to deliver features end-to-end —
            from UI implementation and API to deployment.

            Always focused on writing maintainable code and improving user experience.
          </p>
        </motion.article>

        {/* Card 2 - Stack */}
        <motion.article
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.01, transition: hoverTransition }}
          className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-6"
        >
          <div
            className="absolute left-0 right-0 top-0"
            style={{
              height: "0.5px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
            }}
            aria-hidden
          />
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-[#3b82f6]" aria-hidden />
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#666]">
              Stack
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {STACK_ITEMS.map((item) => (
              <MicroChip key={item} label={item} />
            ))}
          </div>
        </motion.article>

        {/* Card 3 - Engine */}
        <motion.article
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.01, transition: hoverTransition }}
          className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 md:col-span-1"
        >
          <div
            className="absolute left-0 right-0 top-0"
            style={{
              height: "0.5px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
            }}
            aria-hidden
          />
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-[#3b82f6]" aria-hidden />
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#666]">
              Engine
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {ENGINE_ITEMS.map((item) => (
              <MicroChip key={item} label={item} />
            ))}
          </div>
        </motion.article>

        {/* Card 4 - Pulse (square on md+) */}
        <motion.article
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.01, transition: hoverTransition }}
          className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 md:aspect-square"
        >
          <div
            className="absolute left-0 right-0 top-0"
            style={{
              height: "0.5px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
            }}
            aria-hidden
          />
          <Activity
            className="h-8 w-8 animate-pulse text-[#22c55e]"
            style={{ filter: "drop-shadow(0 0 10px #22c55e)" }}
            aria-hidden
          />
          <span className="font-mono text-xs text-[#22c55e]">Available</span>
          <div
            className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse"
            style={{ boxShadow: "0 0 10px #22c55e" }}
            aria-hidden
          />
          {/* Mini line chart - real-time feel */}
          <svg
            className="mt-2 h-8 w-16 opacity-60"
            viewBox="0 0 64 32"
            fill="none"
            aria-hidden
          >
            <polyline
              points="0,24 8,20 16,22 24,16 32,18 40,10 48,14 56,8 64,12"
              stroke="#22c55e"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          <span className="font-mono text-[10px] text-[#666]">
            Location: Ahmedabad
          </span>
        </motion.article>

        {/* Card 5 - Toolkit (square on md+) */}
        <motion.article
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.01, transition: hoverTransition }}
          className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 md:aspect-square"
        >
          <div
            className="absolute left-0 right-0 top-0"
            style={{
              height: "0.5px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
            }}
            aria-hidden
          />
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-[#3b82f6]" aria-hidden />
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#666]">
              Toolkit
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Git", "Docker", "AWS EC2", "AWS S3", "GitHub Actions", "Vercel"].map(
              (tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-[#1a1a1a] bg-[#111] px-2 py-1 font-mono text-xs text-[#e5e5e5]"
                >
                  {tool}
                </span>
              )
            )}
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
}
