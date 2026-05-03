import type { Metadata } from "next";
import CosmicBackground from "@/components/CosmicBackground";
import FloatingSpaceObjects from "@/components/FloatingSpaceObjects";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Headers";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Detailed project portfolio across AI security, backend systems, and full-stack engineering.",
};

export default function ProjectsPage() {
  return (
    <>
      <CosmicBackground />
      <FloatingSpaceObjects />
      <ScrollProgress />
      <Header />

      <main id="main-content" className="relative z-10 pt-16 sm:pt-20">
        <Projects />
      </main>

      <Footer />
    </>
  );
}
