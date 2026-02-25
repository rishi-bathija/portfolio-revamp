"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Copy } from "lucide-react";

interface ProjectItem {
  name: string;
  github?: string;
  live?: string;
  metricStrip: string;
  description: string;
  tech: string[];
  codeSnippet: React.ReactNode;
  /** Plain text for Copy button */
  codeRaw: string;
  /** Hex color for code window accent (e.g. #3b82f6 React, #22c55e Node) */
  codeAccent: string;
}

/* Palette: keywords blue, strings green, functions purple */
const kw = "text-[#61afef]";
const str = "text-[#98c379]";
const fn = "text-[#c678dd]";
const default_ = "text-[#abb2bf]";
const comment = "text-[#5c6370]";
const punct = "text-[#5c6370]";
const var_ = "text-[#abb2bf]";

type Token = { type: "kw" | "str" | "fn" | "comment" | "default"; start: number; end: number };

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  const KEYWORDS =
    /\b(const|let|var|await|async|return|if|else|for|of|in|new|throw|export|default|true|false)\b/g;
  const STRING_DQ = /"(?:[^"\\]|\\.)*"/g;
  const STRING_SQ = /'(?:[^'\\]|\\.)*'/g;
  const STRING_TICK = /`(?:[^`\\]|\\.)*`/g;
  const COMMENT = /\/\/.*$/g;
  const FN_NAME = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;

  const all: { start: number; end: number; type: Token["type"] }[] = [];

  let m: RegExpExecArray | null;
  while ((m = KEYWORDS.exec(line)) !== null)
    all.push({ start: m.index, end: m.index + m[0].length, type: "kw" });
  while ((m = STRING_DQ.exec(line)) !== null)
    all.push({ start: m.index, end: m.index + m[0].length, type: "str" });
  while ((m = STRING_SQ.exec(line)) !== null)
    all.push({ start: m.index, end: m.index + m[0].length, type: "str" });
  while ((m = STRING_TICK.exec(line)) !== null)
    all.push({ start: m.index, end: m.index + m[0].length, type: "str" });
  while ((m = COMMENT.exec(line)) !== null)
    all.push({ start: m.index, end: m.index + m[0].length, type: "comment" });
  while ((m = FN_NAME.exec(line)) !== null) {
    const word = m[1];
    if (!/\b(const|let|var|await|async|return|if|else|for|of|in|new|throw|export|default|true|false)\b/.test(word))
      all.push({ start: m.index, end: m.index + word.length, type: "fn" });
  }

  all.sort((a, b) => a.start - b.start);
  const merged: Token[] = [];
  for (const t of all) {
    if (merged.length && t.start < merged[merged.length - 1].end) continue;
    merged.push({ type: t.type, start: t.start, end: t.end });
  }

  let pos = 0;
  const out: Token[] = [];
  for (const t of merged) {
    if (t.start > pos)
      out.push({ type: "default", start: pos, end: t.start });
    out.push(t);
    pos = t.end;
  }
  if (pos < line.length) out.push({ type: "default", start: pos, end: line.length });
  return out;
}

function HighlightedCode({ code }: { code: string }) {
  const lines = code.split("\n");
  const classMap = { kw, str, fn, comment, default: default_ };

  return (
    <pre className="font-mono text-[10px] leading-relaxed whitespace-pre break-none">
      <code>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {tokenizeLine(line).map((t, j) => (
              <span key={j} className={classMap[t.type]}>
                {line.slice(t.start, t.end)}
              </span>
            ))}
            {i < lines.length - 1 ? "\n" : null}
          </span>
        ))}
      </code>
    </pre>
  );
}

const PROJECTS: ProjectItem[] = [
  {
    name: "Moviesflix",
    github: "#",
    live: "#",
    metricStrip: "AI: Gemini API · Personalization · Behavior Tracking",
    description:
      "AI-powered movie discovery platform focused on personalized content exploration. Integrated Gemini API for intelligent movie search and recommendations. Built a personalized Explore page using user interaction signals such as likes, dislikes, watchlist activity, and news engagement. Implemented saved AI search history, entertainment news integration, infinite scrolling using Redux Toolkit, and backend services for authentication and behaviour tracking.",
    tech: ["React",
      "Redux Toolkit",
      "Gemini API",
      "Firebase",
      "TMDB API",
      "MongoDB",
      "Node.js",],
    codeAccent: "#e5c07b",
    codeRaw: `// Moviesflix: cached insights + Gemini fallback to heuristics
  const cached = await Insight.findOne({ firebaseUid });
  if (cached && Date.now() - cached.lastComputed < 30 * 60 * 1000)
  return res.status(200).json({ success: true, insights: cached, fromCache: true });
  
  const profile = await aggregateUserProfile(user, firebaseUid);
  const aiInsights = hasEnoughData(profile)
  ? await geminiClient.generateInsights(profile).catch(() => generateHeuristicInsights(profile))
  : generateHeuristicInsights(profile);
  
  const insights = {
  ...aiInsights, metrics: profile.metrics, topGenres: profile.topGenres, newsEngagement: profile.newsEngagement,
  recommendations: (aiInsights.recommendations || []).map(r => ({ itemType: r.itemType || r.type || "movie", id: String(r.id || ""), title: r.title || "Unknown", reason: r.reason || "", posterPath: r.posterPath || "" }))
  };
  
  await Insight.findOneAndUpdate({ firebaseUid }, { ...insights, userId: user._id, lastComputed: new Date() }, { upsert: true, new: true });
  return res.status(200).json({ success: true, insights, fromAI: true });`,
    codeSnippet: (
      <pre className="font-mono text-[10px] leading-relaxed whitespace-pre break-none">
        <code>
          <span className={kw}>const</span>{" "}
          <span className={var_}>cached</span>
          <span className={punct}> = </span>
          <span className={kw}>await</span>{" "}
          <span className={fn}>Insight</span>
          <span className={punct}>.</span>
          <span className={fn}>findOne</span>
          <span className={punct}>(</span>
          <span className={var_}>{"{ firebaseUid }"}</span>
          <span className={punct}>);</span>
          {"\n"}
          <span className={kw}>if</span>
          <span className={punct}> (</span>
          <span className={var_}>cached</span>
          <span className={punct}> &amp;&amp; </span>
          <span className={fn}>Date</span>
          <span className={punct}>.</span>
          <span className={fn}>now</span>
          <span className={punct}>() - </span>
          <span className={var_}>cached</span>
          <span className={punct}>.</span>
          <span className={var_}>lastComputed</span>
          <span className={punct}> &lt; </span>
          <span className={var_}>30 * 60 * 1000</span>
          <span className={punct}>)</span>
          {"\n"}
          <span className={punct}>  </span>
          <span className={kw}>return</span>{" "}
          <span className={fn}>res</span>
          <span className={punct}>.</span>
          <span className={fn}>status</span>
          <span className={punct}>(</span>
          <span className={var_}>200</span>
          <span className={punct}>).</span>
          <span className={fn}>json</span>
          <span className={punct}>(</span>
          <span className={var_}>{"{ success: true, insights: cached, fromCache: true }"}</span>
          <span className={punct}>);</span>
          {"\n"}
          <span className={kw}>const</span>{" "}
          <span className={var_}>profile</span>
          <span className={punct}> = </span>
          <span className={kw}>await</span>{" "}
          <span className={fn}>aggregateUserProfile</span>
          <span className={punct}>(</span>
          <span className={var_}>user</span>
          <span className={punct}>, </span>
          <span className={var_}>firebaseUid</span>
          <span className={punct}>);</span>
          {"\n"}
          <span className={kw}>const</span>{" "}
          <span className={var_}>aiInsights</span>
          <span className={punct}> = </span>
          <span className={fn}>hasEnoughData</span>
          <span className={punct}>(</span>
          <span className={var_}>profile</span>
          <span className={punct}>)</span>
          {"\n"}
          <span className={punct}>  ? </span>
          <span className={kw}>await</span>{" "}
          <span className={fn}>geminiClient</span>
          <span className={punct}>.</span>
          <span className={fn}>generateInsights</span>
          <span className={punct}>(</span>
          <span className={var_}>profile</span>
          <span className={punct}>).</span>
          <span className={fn}>catch</span>
          <span className={punct}>(() =&gt; </span>
          <span className={fn}>generateHeuristicInsights</span>
          <span className={punct}>(</span>
          <span className={var_}>profile</span>
          <span className={punct}>))</span>
          {"\n"}
          <span className={punct}>  : </span>
          <span className={fn}>generateHeuristicInsights</span>
          <span className={punct}>(</span>
          <span className={var_}>profile</span>
          <span className={punct}>);</span>
          {"\n"}
          <span className={kw}>const</span>{" "}
          <span className={var_}>insights</span>
          <span className={punct}> = </span>
          <span className={var_}>{"{ ...aiInsights, metrics, topGenres, recommendations: (aiInsights.recommendations || []).map(r => ({ ... })) }"}</span>
          <span className={punct}>;</span>
          {"\n"}
          <span className={kw}>await</span>{" "}
          <span className={fn}>Insight</span>
          <span className={punct}>.</span>
          <span className={fn}>findOneAndUpdate</span>
          <span className={punct}>(</span>
          <span className={var_}>{"{ firebaseUid }"}</span>
          <span className={punct}>, </span>
          <span className={var_}>{"{ ...insights, userId: user._id, lastComputed: new Date() }"}</span>
          <span className={punct}>, </span>
          <span className={var_}>{"{ upsert: true, new: true }"}</span>
          <span className={punct}>);</span>
          {"\n"}
          <span className={kw}>return</span>{" "}
          <span className={fn}>res</span>
          <span className={punct}>.</span>
          <span className={fn}>status</span>
          <span className={punct}>(</span>
          <span className={var_}>200</span>
          <span className={punct}>).</span>
          <span className={fn}>json</span>
          <span className={punct}>(</span>
          <span className={var_}>{"{ success: true, insights, fromAI: true }"}</span>
          <span className={punct}>);</span>
        </code>
      </pre>
    ),
  },
  {
    name: "Studynotion",
    github: "#",
    live: "#",
    metricStrip: "Auth: JWT · Payments: Razorpay",
    description:
      "Full-stack EdTech learning platform supporting instructors and students with secure role-based access. Implemented JWT authentication, Razorpay payments, and Cloudinary media management. Designed scalable backend APIs and frontend workflows for course consumption and delivery.",
    tech: ["React", "Node.js", "MongoDB", "Razorpay", "Cloudinary"],
    codeAccent: "#22c55e",
    codeRaw: `// StudyNotion: payment verification -> course enrollment pipeline
const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
const userId = req.user.id;

const expected = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
.update(\`\${razorpay_order_id}|\${razorpay_payment_id}\`)
  .digest("hex");
if (expected !== razorpay_signature) throw new Error("Invalid payment signature");

for (const courseId of courses) {
  await Course.findByIdAndUpdate(courseId, { $push: { studentsEnrolled: userId } });
  const progress = await CourseProgress.create({ courseID: courseId, userId, completedVideos: [] });
  const student = await User.findByIdAndUpdate(userId, { $push: { courses: courseId, courseProgress: progress._id } }, { new: true });
  await mailSender(student.email, "Enrollment Confirmed", courseEnrollmentEmail(courseId, \`\${student.firstName} \${student.lastName}\`));
}

return res.status(200).json({ success: true, message: "Payment verified, enrollment completed" });`,
    codeSnippet: (
      <pre className="font-mono text-[10px] leading-relaxed whitespace-pre break-none">
        <code>
          <span className={punct}>// StudyNotion: payment verification -&gt; enrollment</span>
          {"\n"}
          <span className={kw}>const</span>{" "}
          <span className={var_}>{"{ razorpay_order_id, razorpay_payment_id, razorpay_signature, courses }"}</span>
          <span className={punct}> = </span>
          <span className={var_}>req</span>
          <span className={punct}>.</span>
          <span className={var_}>body</span>
          <span className={punct}>;</span>
          {"\n"}
          <span className={kw}>const</span>{" "}
          <span className={var_}>userId</span>
          <span className={punct}> = </span>
          <span className={var_}>req</span>
          <span className={punct}>.</span>
          <span className={var_}>user</span>
          <span className={punct}>.</span>
          <span className={var_}>id</span>
          <span className={punct}>;</span>
          {"\n"}
          <span className={kw}>const</span>{" "}
          <span className={var_}>expected</span>
          <span className={punct}> = </span>
          <span className={fn}>crypto</span>
          <span className={punct}>.</span>
          <span className={fn}>createHmac</span>
          <span className={punct}>(</span>
          <span className={str}>&quot;sha256&quot;</span>
          <span className={punct}>, </span>
          <span className={var_}>process</span>
          <span className={punct}>.</span>
          <span className={var_}>env</span>
          <span className={punct}>.</span>
          <span className={var_}>RAZORPAY_SECRET</span>
          <span className={punct}>)</span>
          {"\n"}
          <span className={punct}>  .</span>
          <span className={fn}>update</span>
          <span className={punct}>(</span>
          <span className={str}>{"`${razorpay_order_id}|${razorpay_payment_id}`"}</span>
          <span className={punct}>).</span>
          <span className={fn}>digest</span>
          <span className={punct}>(</span>
          <span className={str}>&quot;hex&quot;</span>
          <span className={punct}>);</span>
          {"\n"}
          <span className={kw}>if</span>
          <span className={punct}> (</span>
          <span className={var_}>expected</span>
          <span className={punct}> !== </span>
          <span className={var_}>razorpay_signature</span>
          <span className={punct}>) </span>
          <span className={kw}>throw new</span>{" "}
          <span className={fn}>Error</span>
          <span className={punct}>(</span>
          <span className={str}>&quot;Invalid payment signature&quot;</span>
          <span className={punct}>);</span>
          {"\n"}
          <span className={kw}>for</span>
          <span className={punct}> (</span>
          <span className={kw}>const</span>{" "}
          <span className={var_}>courseId</span>
          <span className={punct}> of </span>
          <span className={var_}>courses</span>
          <span className={punct}>) {"{"}</span>
          {"\n"}
          <span className={punct}>  </span>
          <span className={kw}>await</span>{" "}
          <span className={fn}>Course</span>
          <span className={punct}>.</span>
          <span className={fn}>findByIdAndUpdate</span>
          <span className={punct}>(</span>
          <span className={var_}>courseId</span>
          <span className={punct}>, </span>
          <span className={var_}>{"{ $push: { studentsEnrolled: userId } }"}</span>
          <span className={punct}>);</span>
          {"\n"}
          <span className={punct}>  </span>
          <span className={kw}>const</span>{" "}
          <span className={var_}>progress</span>
          <span className={punct}> = </span>
          <span className={kw}>await</span>{" "}
          <span className={fn}>CourseProgress</span>
          <span className={punct}>.</span>
          <span className={fn}>create</span>
          <span className={punct}>(</span>
          <span className={var_}>{"{ courseID: courseId, userId, completedVideos: [] }"}</span>
          <span className={punct}>);</span>
          {"\n"}
          <span className={punct}>  </span>
          <span className={kw}>await</span>{" "}
          <span className={fn}>mailSender</span>
          <span className={punct}>(</span>
          <span className={var_}>student</span>
          <span className={punct}>.</span>
          <span className={var_}>email</span>
          <span className={punct}>, </span>
          <span className={str}>&quot;Enrollment Confirmed&quot;</span>
          <span className={punct}>, ...);</span>
          {"\n"}
          <span className={punct}>{"}"}</span>
          {"\n"}
          <span className={kw}>return</span>{" "}
          <span className={fn}>res</span>
          <span className={punct}>.</span>
          <span className={fn}>status</span>
          <span className={punct}>(</span>
          <span className={var_}>200</span>
          <span className={punct}>).</span>
          <span className={fn}>json</span>
          <span className={punct}>(</span>
          <span className={var_}>{"{ success: true, message: \"Payment verified, enrollment completed\" }"}</span>
          <span className={punct}>);</span>
        </code>
      </pre>
    ),
  },
  {
    name: "Revisitly",
    github: "#",
    live: "#",
    metricStrip: "Auth: Firebase · Background Jobs: Cron",
    description:
      "Full-stack bookmark reminder platform enabling users to save links and schedule automated email reminders. Built responsive dashboard for bookmarks, tags, and reminder timelines. Implemented repeat reminders, smart follow-ups, and remind-again workflows. Integrated Firebase authentication and background jobs for reliable scheduling.",
    tech: ["React", "Node.js", "MongoDB", "Firebase Auth"],
    codeAccent: "#3b82f6",
    codeRaw: `// Revisitly: due-reminder processor with signed action links + smart follow-ups
  const now = new Date();
  const due = await Bookmark.find({
  $or: [{ remindAt: { $lte: now }, reminded: false }, { "smartFollowUp.enabled": true, "smartFollowUp.followUpScheduled": { $lte: now }, "smartFollowUp.followUpSent": false }]
  }).populate("user");
  
  for (const b of due) {
  const remindToken = jwt.sign({ action: "REMIND", bookmarkId: b._id, userId: b.user._id }, process.env.REMINDER_TOKEN_SECRET, { expiresIn: "24h" });
  const stopToken = jwt.sign({ action: "STOP", bookmarkId: b._id, userId: b.user._id }, process.env.REMINDER_TOKEN_SECRET, { expiresIn: "24h" });
  const trackingLink = \`\${frontendUrl}/track/\${b._id}?redirect=\${encodeURIComponent(b.url)}\`;
  
  await sendEmail({ to: b.user.email, subject: \`Reminder: \${b.title || "Your bookmark"}\`, html: emailTemplate(b.user, b, trackingLink, \`\${frontendUrl}/remind/\${remindToken}\`, \`\${frontendUrl}/remind/\${stopToken}\`, frontendUrl, false) });
  b.reminded = true;
  if (b.smartFollowUp.enabled && !b.smartFollowUp.followUpScheduled) b.smartFollowUp.followUpScheduled = new Date(now.getTime() + b.smartFollowUp.daysDelay * 24 * 60 * 60 * 1000);
  await scheduleNextReminder(b); // handles daily/weekly recurrence
  await b.save();
  }`,
    codeSnippet: (
      <pre className="font-mono text-[10px] leading-relaxed whitespace-pre break-none">
        <code>
          <span className={punct}>// Revisitly: due-reminder + signed links + smart follow-ups</span>
          {"\n"}
          <span className={kw}>const</span>{" "}
          <span className={var_}>now</span>
          <span className={punct}> = </span>
          <span className={kw}>new</span>{" "}
          <span className={fn}>Date</span>
          <span className={punct}>();</span>
          {"\n"}
          <span className={kw}>const</span>{" "}
          <span className={var_}>due</span>
          <span className={punct}> = </span>
          <span className={kw}>await</span>{" "}
          <span className={fn}>Bookmark</span>
          <span className={punct}>.</span>
          <span className={fn}>find</span>
          <span className={punct}>(</span>
          <span className={var_}>{"{ $or: [{ remindAt: { $lte: now }, reminded: false }, { \"smartFollowUp.enabled\": true, ... }]"}</span>
          <span className={punct}>).</span>
          <span className={fn}>populate</span>
          <span className={punct}>(</span>
          <span className={str}>&quot;user&quot;</span>
          <span className={punct}>);</span>
          {"\n"}
          <span className={kw}>for</span>
          <span className={punct}> (</span>
          <span className={kw}>const</span>{" "}
          <span className={var_}>b</span>
          <span className={punct}> of </span>
          <span className={var_}>due</span>
          <span className={punct}>) {"{"}</span>
          {"\n"}
          <span className={punct}>  </span>
          <span className={kw}>const</span>{" "}
          <span className={var_}>remindToken</span>
          <span className={punct}> = </span>
          <span className={fn}>jwt</span>
          <span className={punct}>.</span>
          <span className={fn}>sign</span>
          <span className={punct}>(</span>
          <span className={var_}>{"{ action: \"REMIND\", bookmarkId: b._id, userId: b.user._id }"}</span>
          <span className={punct}>, </span>
          <span className={var_}>process</span>
          <span className={punct}>.</span>
          <span className={var_}>env</span>
          <span className={punct}>.</span>
          <span className={var_}>REMINDER_TOKEN_SECRET</span>
          <span className={punct}>, </span>
          <span className={var_}>{"{ expiresIn: \"24h\" }"}</span>
          <span className={punct}>);</span>
          {"\n"}
          <span className={punct}>  </span>
          <span className={kw}>await</span>{" "}
          <span className={fn}>sendEmail</span>
          <span className={punct}>(</span>
          <span className={var_}>{"{ to: b.user.email, subject: `Reminder: ${b.title || \"Your bookmark\"}`, html: emailTemplate(...) }"}</span>
          <span className={punct}>);</span>
          {"\n"}
          <span className={punct}>  </span>
          <span className={var_}>b</span>
          <span className={punct}>.</span>
          <span className={var_}>reminded</span>
          <span className={punct}> = </span>
          <span className={kw}>true</span>
          <span className={punct}>;</span>
          {"\n"}
          <span className={punct}>  </span>
          <span className={kw}>await</span>{" "}
          <span className={fn}>scheduleNextReminder</span>
          <span className={punct}>(</span>
          <span className={var_}>b</span>
          <span className={punct}>); </span>
          <span className={kw}>await</span>{" "}
          <span className={var_}>b</span>
          <span className={punct}>.</span>
          <span className={fn}>save</span>
          <span className={punct}>();</span>
          {"\n"}
          <span className={punct}>{"}"}</span>
        </code>
      </pre>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
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

function ProjectCard({ project }: { project: ProjectItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const codeScrollRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = codeScrollRef.current;
    if (!el) return;
    const check = () => {
      setHasOverflow(el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [project.name]);

  const handleCopy = useCallback(async () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(project.codeRaw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [project.codeRaw]);

  return (
    <motion.article
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 30px rgba(59,130,246,0.1)",
        transition: hoverSpring,
      }}
      className="group overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]"
      aria-labelledby={`project-${project.name.replace(/\s+/g, "-")}`}
    >
      <div className="flex flex-col p-6">
        {/* Top Header */}
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3
            id={`project-${project.name.replace(/\s+/g, "-")}`}
            className="font-sans text-xl font-bold text-white md:text-2xl"
          >
            {project.name}
          </h3>
          <div className="flex shrink-0 gap-2">
            {project.github && (
              <a
                href={project.github}
                className="rounded-lg p-2 text-[#a1a1a1] transition-colors hover:text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                aria-label={`View ${project.name} on GitHub`}
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                className="rounded-lg p-2 text-[#a1a1a1] transition-colors hover:text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                aria-label={`View ${project.name} live`}
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        {/* Metric Strip */}
        <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[#666]">
          {project.metricStrip}
        </p>

        {/* Description */}
        <p className="mb-4 font-sans text-sm leading-relaxed text-[#e5e5e5]">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/5 bg-[#111] px-2 py-1 font-mono text-[10px] text-[#a1a1a1]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Code Preview - VS Code style window */}
      <motion.div
        className="relative flex min-h-[280px] flex-col overflow-hidden border-t border-[#1a1a1a] bg-[#050505]"
        initial={false}
        style={{
          boxShadow: `inset 0 0 0 0.5px ${project.codeAccent}20`,
        }}
      >
        {/* macOS window dots + Copy button */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#1a1a1a] px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" aria-hidden />
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleCopy}
            className={`absolute right-3 top-2 flex items-center gap-1 rounded px-2 py-1 font-mono text-[10px] text-[#a1a1a1] transition-colors hover:text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] ${!isHovered ? "pointer-events-none" : ""
              }`}
            aria-label="Copy code"
          >
            <Copy className="h-3.5 w-3.5" />
            {copied ? "Copied" : "Copy"}
          </motion.button>
        </div>
        {/* Code area: scrollable, fade only when overflowing */}
        <div className="relative min-h-0 flex-1">
          <div
            ref={codeScrollRef}
            className="scrollbar-code code-scroll-inner h-full min-h-[240px] overflow-x-auto overflow-y-auto p-5"
          >
            <HighlightedCode code={project.codeRaw} />
          </div>
          {hasOverflow && (
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-5"
              style={{
                background:
                  "linear-gradient(to top, #050505 0%, transparent 100%)",
              }}
              aria-hidden
            />
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="px-6 py-14 md:px-12 md:py-16 lg:px-24"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className="mb-16 font-mono text-sm uppercase tracking-wider text-muted-foreground"
      >
        Engineered Artifacts
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-8 lg:grid-cols-2"
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
