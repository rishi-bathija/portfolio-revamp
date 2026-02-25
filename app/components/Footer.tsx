"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter, Copy, Check } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

const hoverSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

const EMAIL = "bathijarishi@email.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/rishi-bathija-969982279/";
const GITHUB_URL = "https://github.com/rishi-bathija";
const TWITTER_URL = "https://x.com/bathija_rishi";

function ActionCard({
  icon: Icon,
  label,
  value,
  subtext,
  href,
  onClick,
  isCopyable,
  copied,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext?: string;
  href?: string;
  onClick?: () => void;
  isCopyable?: boolean;
  copied?: boolean;
}) {
  const content = (
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 20px rgba(59,130,246,0.15)",
        transition: hoverSpring,
      }}
      className="flex flex-col gap-2 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-4 transition-shadow"
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-[#3b82f6]" aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#666]">
          {label}
        </span>
      </div>
      {isCopyable ? (
        <button
          type="button"
          onClick={onClick}
          className="group flex items-center gap-2 text-left font-mono text-sm text-[#e5e5e5] transition-colors hover:text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-0 focus:ring-offset-[#0a0a0a]"
          aria-label={copied ? "Email copied" : "Copy email address"}
        >
          {copied ? (
            <>
              <span className="font-mono text-xs text-[#22c55e]">
                COPIED_TO_CLIPBOARD
              </span>
              <span className="rounded bg-[#22c55e]/20 px-1.5 py-0.5 font-mono text-[10px] text-[#22c55e]">
                [OK]
              </span>
            </>
          ) : (
            <>
              <span className="truncate">{value}</span>
              <Copy className="h-4 w-4 shrink-0 opacity-60 group-hover:opacity-100" />
            </>
          )}
        </button>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-[#e5e5e5] transition-colors hover:text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-0 focus:ring-offset-[#0a0a0a]"
          aria-label={`Open ${label}`}
        >
          {value}
        </a>
      )}
      {subtext && (
        <span className="font-mono text-[10px] text-[#666]">{subtext}</span>
      )}
    </motion.div>
  );

  return content;
}

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, []);

  return (
    <footer
      className="border-t border-[#1a1a1a] bg-[#050505] px-6 py-12 md:px-12 md:py-14 lg:px-24"
      aria-label="Command Center"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_auto] lg:gap-16"
      >
        {/* Left: CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-center"
        >
          <h2 className="font-sans text-3xl font-bold tracking-tighter text-[#fafafa] md:text-4xl">
            Open to building impactful products and solving real engineering problems.
            <p>Let&apos;s connect!</p>
          </h2>
        </motion.div>

        {/* Right: 2x2 Action Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ActionCard
            icon={Mail}
            label="Email"
            value={EMAIL}
            isCopyable
            copied={copied}
            onClick={handleCopyEmail}
          />
          <ActionCard
            icon={Linkedin}
            label="LinkedIn"
            value="Connect"
            subtext="800+ Connections"
            href={LINKEDIN_URL}
          />
          <ActionCard
            icon={Github}
            label="GitHub"
            value="Profile"
            subtext="Recent Activity"
            href={GITHUB_URL}
          />
          <ActionCard
            icon={Twitter}
            label="X / Twitter"
            value="Follow"
            // subtext="Building in Public"
            href={TWITTER_URL}
          />
        </div>

        {/* System Status */}
        <motion.div
          variants={itemVariants}
          className="col-span-full mt-12 border-t border-[#1a1a1a] pt-6"
        >
          <p
            className="font-mono text-[10px] text-muted-foreground"
            aria-hidden
          >
            DEPLOYMENT_V2.0.26 // LATENCY: 24MS // BUILT_WITH_NEXT_JS_FRAMER
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
