import Header from "@/components/Header";
import ScrollySection from "@/components/ScrollySection";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MagicBackground from "@/components/MagicBackground";
import CinematicGlowBackground from "@/components/CinematicGlowBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-white selection:bg-accent/30 selection:text-white">
      <MagicBackground />

      <div className="relative z-10 bg-[#0a0a0a]">
        <ScrollySection />
      </div>

      <div className="relative z-20">
        <CinematicGlowBackground />
        
        <div className="pointer-events-none absolute left-0 top-0 -z-10 h-64 w-full bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

        <Header />
        <Projects />
        <Certifications />
        <About />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
