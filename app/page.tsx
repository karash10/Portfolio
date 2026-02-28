import About from '@/components/About';
import CosmicBackground from '@/components/CosmicBackground';
import Experience from '@/components/Experience';
import FloatingSpaceObjects from '@/components/FloatingSpaceObjects';
import Footer from '@/components/Footer';
import Header from '@/components/Headers';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <>
      <CosmicBackground />
      <FloatingSpaceObjects />
      <ScrollProgress />
      <Header />
      
      <main id="main-content" className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
