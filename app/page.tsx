import About from '@/components/About';
import CosmicBackground from '@/components/CosmicBackground';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Header from '@/components/Headers';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <>
      <CosmicBackground />
      <Header />
      
      <main className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Footer />
      </main>
    </>
  );
}
