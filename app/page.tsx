import Hero from "./components/Hero";
import AboutSkills from "./components/AboutSkills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { SectionDivider } from "./components/SectionDivider";
import CurrentlyBuilding from "./components/CurrentlyBuilding";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <AboutSkills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <CurrentlyBuilding />
      <Footer />
    </main>
  );
}
