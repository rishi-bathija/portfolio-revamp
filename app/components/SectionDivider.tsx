"use client";

import { m } from "framer-motion";

export function SectionDivider() {
  return (
    <m.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-6 md:mx-12 lg:mx-24"
    >
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--card-border), transparent)",
        }}
        aria-hidden
      />
    </m.div>
  );
}
