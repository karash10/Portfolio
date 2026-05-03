import type { Metadata } from "next";
import CosmicBackground from "@/components/CosmicBackground";
import FloatingSpaceObjects from "@/components/FloatingSpaceObjects";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Headers";
import About from "@/components/About";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills across backend engineering, AI security, systems programming, and tooling.",
};

export default function SkillsPage() {
  return (
    <>
      <CosmicBackground />
      <FloatingSpaceObjects />
      <ScrollProgress />
      <Header />

      <main id="main-content" className="relative z-10 pt-16 sm:pt-20">
        <About />
      </main>

      <Footer />
    </>
  );
}
