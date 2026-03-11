"use client";

import { m, type Variants } from "framer-motion";
import TechPhysicsOrbit from "./TechPhysicsOrbit";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18, mass: 0.8 },
  },
};

interface MetricItemProps {
  value: string;
  label: string;
}

const MetricItem = ({ value, label }: MetricItemProps) => (
  <m.div variants={itemVariants} className="flex flex-col gap-1">
    <span className="font-mono text-2xl font-bold text-foreground">{value}</span>
    <span className="font-mono text-sm text-muted-foreground">{label}</span>
  </m.div>
);

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center bg-background px-6 py-20 md:px-12 lg:px-24">
      {/* Grid Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--card-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--card-border) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)",
          opacity: 0.25,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-8">
            <m.h1
              variants={itemVariants}
              className="text-balance font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Building performant web apps and data-driven platforms.
            </m.h1>

            <m.p
              variants={itemVariants}
              className="max-w-xl font-mono text-sm leading-relaxed text-text-tertiary"
            >
              Hi, I&apos;m Rishi. I&apos;m a Full-stack engineer building scalable webapps and data-driven platforms.
              Shipped production features at Intelivita, dashboards and admin panels at Infoware,
              and full-stack systems end-to-end using React, Next.js, Node.js, and TypeScript.
              Focused on performance, clean architecture, and real-world shipping.
            </m.p>

            {/* Metric Bar */}
            <m.div
              variants={containerVariants}
              className="flex flex-wrap gap-8 pt-2"
            >
              <MetricItem value="10+" label="Production Apps" />
              <MetricItem value="200+" label="DSA Solves" />
              <MetricItem value="1+" label="Years Experience" />
            </m.div>

            {/* CTAs */}
            <m.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="min-w-[176px] rounded-2xl bg-accent px-8 py-3.5 text-center font-mono text-sm font-medium text-foreground transition-shadow hover:shadow-[0_0_24px_rgba(59,130,246,0.5)]"
                data-cursor-hover
              >
                Proof of Work
              </a>
              <a
                href="https://drive.google.com/file/d/11XQVU8PPfQk8_ufhY4QLLitCjL3h72Q7/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[176px] rounded-2xl border border-white/10 bg-card/40 px-8 py-3.5 text-center font-mono text-sm font-medium text-text-secondary backdrop-blur-sm transition-all hover:border-accent/40 hover:bg-card/60 hover:text-foreground hover:shadow-[0_0_18px_rgba(59,130,246,0.12)]"
                data-cursor-hover
              >
                View CV
              </a>
            </m.div>
          </div>

          {/* Right Column */}
          <m.div
            variants={itemVariants}
            className="flex items-center justify-center"
          >
            <TechPhysicsOrbit />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
