import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "./components/MotionProvider";
import { CustomCursor } from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rishi-works.vercel.app"),
  title: "Rishi Bathija | Software Engineer",
  description:
    "Full-stack engineer building performant web apps, scalable APIs, and data-driven platforms with React, Next.js, Node.js, and TypeScript.",
  openGraph: {
    title: "Rishi Bathija | Software Engineer",
    description:
      "Full-stack engineer building performant web apps, scalable APIs, and data-driven platforms.",
    url: "https://rishi-works.vercel.app",
    siteName: "Rishi Bathija Portfolio",
    type: "website",
  },
  twitter: { card: "summary", title: "Rishi Bathija | Software Engineer", description: "Full-stack engineer building production applications and scalable platforms." },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <MotionProvider>
          <CustomCursor />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
