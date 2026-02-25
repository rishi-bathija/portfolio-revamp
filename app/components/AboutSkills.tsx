"use client";

import { m, type Variants } from "framer-motion";
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

function MicroChip({ label }: { label: string }) {
  return (
    <span className="rounded-md border border-white/5 bg-surface px-2 py-1 font-mono text-[10px] text-text-secondary">
      {label}
    </span>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      mass: 0.8,
    },
  },
};

function CardTopLine() {
  return (
    <div
      className="absolute left-0 right-0 top-0"
      style={{
        height: "0.5px",
        background:
          "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
      }}
      aria-hidden
    />
  );
}

export default function AboutSkills() {
  return (
    <section
      className="px-6 py-20 md:px-12 lg:px-24"
      aria-labelledby="about-skills-heading"
    >
      <h2
        id="about-skills-heading"
        className="mb-12 font-mono text-sm uppercase tracking-wider text-muted-foreground"
      >
        System.Architect(Rishi)
      </h2>

      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      >
        {/* Card 1 - Bio (span 2 cols) */}
        <m.article
          variants={cardVariants}
          whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-card-border bg-card p-6 sm:col-span-2"
        >
          <CardTopLine />
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-accent" aria-hidden />
            <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">
              Bio
            </h3>
          </div>
          <p className="font-sans leading-relaxed text-text-secondary">
            Full-stack engineer experienced in building scalable features across SaaS platforms, industry projects, dashboards, and admin-panels used by real users. Worked closely with teams to deliver features end-to-end -- from UI implementation and API to deployment. Always focused on writing maintainable code and improving user experience.
          </p>
        </m.article>

        {/* Card 2 - Stack */}
        <m.article
          variants={cardVariants}
          whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-card-border bg-card p-6"
        >
          <CardTopLine />
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-accent" aria-hidden />
            <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">
              Stack
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {STACK_ITEMS.map((item) => (
              <MicroChip key={item} label={item} />
            ))}
          </div>
        </m.article>

        {/* Card 3 - Engine */}
        <m.article
          variants={cardVariants}
          whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-card-border bg-card p-6"
        >
          <CardTopLine />
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-accent" aria-hidden />
            <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">
              Engine
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {ENGINE_ITEMS.map((item) => (
              <MicroChip key={item} label={item} />
            ))}
          </div>
        </m.article>

        {/* Card 4 - Pulse */}
        <m.article
          variants={cardVariants}
          whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-card-border bg-card p-6"
        >
          <CardTopLine />
          <Activity
            className="h-8 w-8 animate-pulse text-accent-green"
            style={{ filter: "drop-shadow(0 0 10px var(--accent-green))" }}
            aria-hidden
          />
          <span className="font-mono text-xs text-accent-green">Available</span>
          <div
            className="h-2 w-2 rounded-full bg-accent-green animate-pulse"
            style={{ boxShadow: "0 0 10px var(--accent-green)" }}
            aria-hidden
          />
          <svg
            className="mt-2 h-8 w-16 opacity-60"
            viewBox="0 0 64 32"
            fill="none"
            aria-hidden
          >
            <polyline
              points="0,24 8,20 16,22 24,16 32,18 40,10 48,14 56,8 64,12"
              stroke="var(--accent-green)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          <span className="font-mono text-[10px] text-subtle">
            Location: Ahmedabad
          </span>
        </m.article>

        {/* Card 5 - Toolkit */}
        <m.article
          variants={cardVariants}
          whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-card-border bg-card p-6"
        >
          <CardTopLine />
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-accent" aria-hidden />
            <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">
              Toolkit
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Git", "Docker", "AWS EC2", "AWS S3", "GitHub Actions", "Vercel"].map(
              (tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-card-border bg-surface px-2 py-1 font-mono text-xs text-text-secondary"
                >
                  {tool}
                </span>
              )
            )}
          </div>
        </m.article>
      </m.div>
    </section>
  );
}
