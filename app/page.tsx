import Hero from "./components/Hero";
import AboutSkills from "./components/AboutSkills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { SectionDivider } from "./components/SectionDivider";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <SectionDivider />
      <AboutSkills />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <Footer />
    </main>
  );
}
