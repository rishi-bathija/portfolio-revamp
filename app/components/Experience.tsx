"use client";

import { useRef } from "react";
import { m, useInView, type Variants } from "framer-motion";
import { Building2, Briefcase, Laptop } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  dates: string;
  location: string;
  icon: React.ReactNode;
  impact: string[];
  badges: string[];
  tech: string[];
}

const EXPERIENCES: ExperienceItem[] = [
{
  company: "Newsreach",
  role: "Full-Stack Engineer",
  dates: "Jan 2026 — Present",
  location: "Ahmedabad, India",
  icon: <Building2 className="h-5 w-5" />,
  impact: [
    "Built a WordPress Multisite-equivalent platform supporting up to 200 domains, with content, layouts, configurations, and routing centrally managed through a single Next.js admin application.",
    "Contributed across multiple modules in migrating Newsreach's core platform from Laravel to Next.js and Node.js, modernizing legacy workflows and improving maintainability, performance, and scalability.",
    "Integrated Elasticsearch for fast and efficient search and data retrieval across application modules.",
    "Translated requirements from Sales, Operations, and Accounts teams into scalable product modules by understanding end-to-end workflows and delivering solutions aligned with business needs."
  ],
  badges: [
    "Up to 200 Domains",
    "Platform Modernization",
    "Cross-Functional Ownership"
  ],
  tech: [
    "Next.js",
    "Node.js",
    "Elasticsearch",
    "JavaScript",
    "TypeScript"
  ],
},
  {
    company: "Intelivita Pvt. Ltd.",
    role: "Associate Software Engineer",
    dates: "Aug 2025 — Dec 2025",
    location: "Ahmedabad, India",
    icon: <Building2 className="h-5 w-5" />,
    impact: [
      "Contributed to multiple production SaaS platforms end-to-end using React, Next.js, Node.js, TypeScript",
      "Implemented REST APIs and integrated frontend workflows for reliable data flow across services.",
      "Collaborated with cross-functional teams to deliver features following clean code and modular design.",
    ],
    badges: ["3+ SaaS Platforms", "Full-Stack Ownership"],
    tech: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    company: "Infoware India",
    role: "React.js Developer",
    dates: "Feb 2025 — May 2025",
    location: "Ahmedabad, India",
    icon: <Briefcase className="h-5 w-5" />,
    impact: [
      "Built production dashboards and admin panels using React.js, Next.js, and Tailwind CSS.",
      "Integrated REST APIs and optimized UI performance for complex data-driven screens.",
      "Delivered client-facing projects independently and within tight timelines.",
    ],
    badges: ["3+ Dashboards", "Independent Delivery"],
    tech: ["React", "Next.js", "Tailwind", "REST APIs"],
  },
  {
    company: "Zummit Infolabs",
    role: "Jr. Web Developer",
    dates: "Aug 2024 — Jan 2025",
    location: "Remote",
    icon: <Laptop className="h-5 w-5" />,
    impact: [
      "Designed optimized REST APIs for a hospital management system using query optimization and indexing.",
      "Improved API response performance and backend efficiency.",
      "Built responsive reusable UI components for company's website using React.js and Tailwind CSS.",
    ],
    badges: ["Reduced Latency", "Hospital System"],
    tech: ["React", "Tailwind", "Node.js", "MongoDB"],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 18, mass: 0.8 },
  },
};

const springTransition = {
  type: "spring" as const,
  stiffness: 50,
  damping: 25,
  mass: 0.5,
};

const hoverSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <m.article
      variants={cardVariants}
      whileHover={{
        boxShadow: "0 0 24px rgba(59,130,246,0.1)",
        borderColor: "rgba(59,130,246,0.25)",
        transition: hoverSpring,
      }}
      className="relative rounded-2xl border border-card-border bg-card p-6 md:p-8"
      aria-labelledby={`${item.company.replace(/\s+/g, "-")}-heading`}
    >
      <div className="flex flex-col gap-4">
        {/* Header - grid for crisp alignment */}
        <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-[1fr_auto] sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="text-accent" aria-hidden>
              {item.icon}
            </div>
            <div>
              <h3
                id={`${item.company.replace(/\s+/g, "-")}-heading`}
                className="font-sans text-xl font-bold text-foreground md:text-2xl"
              >
                {item.company}
              </h3>
              <p className="font-mono text-sm text-accent">{item.role}</p>
            </div>
          </div>
          <div className="shrink-0 sm:text-right">
            <p className="font-mono text-sm text-muted-foreground">{item.dates}</p>
            <p className="font-mono text-xs text-subtle">{item.location}</p>
          </div>
        </div>

        {/* Impact List */}
        <div>
          <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-subtle">
            Impact
          </h4>
          <ul className="flex flex-col gap-2">
            {item.impact.map((point, i) => (
              <li
                key={i}
                className="flex gap-2 font-sans text-text-secondary leading-relaxed"
              >
                <span
                  className="mt-0.5 shrink-0 font-mono text-accent"
                  aria-hidden
                >
                  →
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Used Pill */}
        <div className="flex flex-wrap gap-2">
          {item.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/5 bg-surface px-2 py-1 font-mono text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Metric Badges */}
        <div className="flex flex-wrap gap-2">
          {item.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-md border border-white/5 bg-surface px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </m.article>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="px-6 py-20 md:px-12 lg:px-24"
      aria-labelledby="experience-heading"
    >
      <h2
        id="experience-heading"
        className="mb-12 font-mono text-sm uppercase tracking-wider text-muted-foreground"
      >
        Work Experience
      </h2>

      <div className="relative">
        {/* Glow Timeline */}
        <div
          className="absolute left-4 top-0 hidden h-full w-px md:left-0 md:block"
          aria-hidden
        >
          <m.div
            className="h-full w-px bg-card-border"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isInView ? 1 : 0 }}
            transition={springTransition}
            style={{ transformOrigin: "top" }}
          />
          <m.div
            className="absolute inset-0 h-full w-px bg-gradient-to-b from-accent/50 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isInView ? 1 : 0 }}
            transition={springTransition}
            style={{ transformOrigin: "top" }}
          />
        </div>

        {/* Cards */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative flex flex-col gap-6 md:gap-8 md:pl-12 lg:pl-16"
        >
          {EXPERIENCES.map((item) => (
            <ExperienceCard key={item.company} item={item} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
