// Import all the components we just built
import About from '@/components/About';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Header from '@/components/Headers';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import ScrollAnimator from '@/components/ScrollAnimator'; // Import the scroll animator

export default function Home() {
  return (
    <>
      {/* The ScrollAnimator component just runs its script 
        but doesn't render any HTML.
      */}
      <ScrollAnimator />
    
      <Header />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
      </main>
      
      <Footer />
    </>
  );
}