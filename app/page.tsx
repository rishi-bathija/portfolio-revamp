import Hero from "./components/Hero";
import AboutSkills from "./components/AboutSkills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSkills />
      <Experience />
      <Projects />
      <Footer />
    </main>
  );
}
