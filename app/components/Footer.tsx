"use client";

import { useState, useCallback } from "react";
import { m, type Variants } from "framer-motion";
import { Mail, Linkedin, Github, Twitter, Copy } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18, mass: 0.8 },
  },
};

const EMAIL = "bathijarishi@gmail.com";
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
  return (
    <m.div
      variants={itemVariants}
      whileHover={{
        boxShadow: "0 0 20px rgba(59,130,246,0.12)",
        borderColor: "rgba(59,130,246,0.2)",
      }}
      className="flex flex-col gap-2 rounded-xl border border-card-border bg-card p-4 transition-shadow"
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
          {label}
        </span>
      </div>
      {isCopyable ? (
        <button
          type="button"
          onClick={onClick}
          className="group flex items-center gap-2 text-left font-mono text-sm text-text-secondary transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label={copied ? "Email copied" : "Copy email address"}
          data-cursor-hover
        >
          {copied ? (
            <>
              <span className="font-mono text-xs text-accent-green">
                COPIED_TO_CLIPBOARD
              </span>
              <span className="rounded bg-accent-green/20 px-1.5 py-0.5 font-mono text-[10px] text-accent-green">
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
          className="font-mono text-sm text-text-secondary transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label={`Open ${label}`}
          data-cursor-hover
        >
          {value}
        </a>
      )}
      {subtext && (
        <span className="font-mono text-[10px] text-subtle">{subtext}</span>
      )}
    </m.div>
  );
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
      className="border-t border-card-border bg-background px-6 py-16 md:px-12 lg:px-24"
      aria-label="Contact"
    >
      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_auto] lg:gap-16"
      >
        {/* Left: CTA */}
        <m.div
          variants={itemVariants}
          className="flex flex-col justify-center"
        >
          <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Open to building impactful products and solving real engineering problems.
          </h2>
          <p className="mt-3 font-mono text-sm text-muted-foreground">
            {"Let's connect."}
          </p>
        </m.div>

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
            href={TWITTER_URL}
          />
        </div>

        {/* System Status */}
        <m.div
          variants={itemVariants}
          className="col-span-full mt-8 border-t border-card-border pt-6"
        >
          <p
            className="font-mono text-[10px] text-muted-foreground"
            aria-hidden
          >
            BUILT_WITH_NEXT_JS // REACT // TYPESCRIPT
          </p>
        </m.div>
      </m.div>
    </footer>
  );
}
