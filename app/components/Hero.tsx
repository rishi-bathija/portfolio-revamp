"use client";

import { motion } from "framer-motion";
import TechPhysicsOrbit from "./TechPhysicsOrbit";

interface MetricItemProps {
  value: string;
  label: string;
}

const MetricItem = ({ value, label }: MetricItemProps) => {
  return (
    <motion.div
      variants={{
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
      }}
      className="flex flex-col gap-1"
    >
      <span className="font-mono text-2xl font-bold text-[#fafafa]">
        {value}
      </span>
      <span className="font-mono text-sm text-[#a1a1a1]">{label}</span>
    </motion.div>
  );
};

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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

  return (
    <section className="relative min-h-screen bg-[#050505] px-6 py-24 md:px-12 lg:px-24">
      {/* Grid Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(#1a1a1a 1px, transparent 1px),
            linear-gradient(90deg, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(circle at center, black, transparent)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent)",
          opacity: 0.3,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-sans text-4xl font-bold tracking-tighter text-[#fafafa] sm:text-5xl lg:text-6xl"
            >
              Building performant web apps and data-driven platforms.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="font-mono text-sm text-[#b8b8b8]"
            >
              Hi, I'm Rishi. I'm a Full-stack engineer building scalable webapps and data-driven platforms.

              Shipped production features at Intelivita, dashboards and admin panels at Infoware,
              and full-stack systems end-to-end using React, Next.js, Node.js, and TypeScript.

              Focused on performance, clean architecture, and real-world shipping.
            </motion.p>

            {/* Metric Bar */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="flex flex-wrap gap-8 pt-4"
            >
              <MetricItem value="10+" label="Production Apps" />
              <MetricItem value="200+" label="DSA Solves" />
              {/* <MetricItem value="3" label="Companies Shipped" /> */}
              <MetricItem value="1+" label="Years Experience" />
            </motion.div>

            {/* Proof of Work + Download CV */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                whileHover={{
                  scale: 1.05,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                  },
                }}
                className="rounded-2xl bg-[#3b82f6] px-8 py-4 font-mono text-sm font-medium text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                aria-label="View proof of work"
              >
                Proof of Work
              </motion.a>
              <motion.a
                href="/Rishi-Bathija-Resume.pdf"
                download
                whileHover={{
                  scale: 1.05,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                  },
                }}
                className="rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] px-8 py-4 font-mono text-sm font-medium text-[#e5e5e5] hover:border-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                aria-label="Download CV"
              >
                Download CV
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Proof Card (Tech Physics Orbit) */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center"
          >
            <TechPhysicsOrbit />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
