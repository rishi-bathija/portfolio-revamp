"use client";

import { m, type Variants } from "framer-motion";
import { Bot, MessageSquareText } from "lucide-react";

interface BuildItem {
  title: string;
  status: string;
  description: string;
  // focus: string;
  stack: string[];
  icon: React.ReactNode;
}

const BUILDS: BuildItem[] = [
  {
    title: "ReachOutFlow",
    status: "[CURRENTLY_BUILDING]",
    description:
      "Building a LinkedIn outreach tracking platform that helps job seekers manage connections, conversations, and follow-ups in one place. Includes AI-powered message generation and reply suggestions using Gemini based on user profile and conversation context. ",
    // focus:
    //   "AI messaging layer generates outreach drafts and reply suggestions using Gemini, grounded in profile + thread context.",
    stack: ["Next.js", "Supabase", "Prisma", "PostgreSQL", "Gemini"],
    icon: <MessageSquareText className="h-5 w-5 text-accent" aria-hidden />,
  },
  {
    title: "RepoInsight",
    status: "[CURRENTLY_BUILDING]",
    description:
      "Developing an AI chat interface to explore and understand GitHub repositories by asking natural language questions about the codebase. The system fetches repository files, builds contextual prompts, and streams LLM-generated answers grounded in repo code.",
    // focus:
    //   "Streams grounded responses with file-level citations and prompt packing tuned for large repositories.",
    stack: ["Next.js", "GitHub API", "Gemini API", "Vector Index"],
    icon: <Bot className="h-5 w-5 text-accent" aria-hidden />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
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

const hoverSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 22,
};

function TechPill({ label }: { label: string }) {
  return (
    <span className="rounded-md border border-white/5 bg-surface px-2 py-1 font-mono text-[10px] text-muted-foreground">
      {label}
    </span>
  );
}

export default function CurrentlyBuilding() {
  return (
    <section
      className="px-6 py-20 md:px-12 lg:px-24"
      aria-labelledby="currently-building-heading"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 flex items-center justify-between gap-4">
          <h2
            id="currently-building-heading"
            className="font-mono text-sm uppercase tracking-wider text-muted-foreground"
          >
            Currently Building
          </h2>
          <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-text-tertiary">
            LIVE_ITERATION_STREAM
          </span>
        </div>

        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
        >
          {BUILDS.map((item) => (
            <m.article
              key={item.title}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 24px rgba(59,130,246,0.12)",
                borderColor: "rgba(59,130,246,0.25)",
                transition: hoverSpring,
              }}
              className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-card-border bg-card p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border border-white/10 bg-surface p-2">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-sans text-xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[10px] text-accent">
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full bg-accent-green"
                    style={{ boxShadow: "0 0 8px rgba(34,197,94,0.7)" }}
                    aria-hidden
                  />
                  <span className="font-mono text-[10px] text-accent-green">
                    ACTIVE_BUILD
                  </span>
                </div>
              </div>

              <p className="font-sans text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
              {/* <p className="font-sans text-sm leading-relaxed text-text-secondary">
                {item.focus}
              </p> */}

              <div className="mt-auto flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <TechPill key={tech} label={tech} />
                ))}
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
