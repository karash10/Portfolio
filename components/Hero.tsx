export default function Hero() {
  return (
    <section className="relative pt-28 pb-36 sm:pt-40 sm:pb-48 hero-grid-pattern overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900 z-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 section-fade-in">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
            K Harshit
          </h1>
          
          <h2 className="mt-4 text-xl sm:text-2xl text-cyan-300 font-medium">
            Cybersecurity Specialist & Deep Learning Practitioner
          </h2>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
            A Computer Science student with a focus on building secure and intelligent systems.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors duration-300 shadow-lg hover:shadow-cyan-400/30 transform hover:scale-105">
              Get In Touch
            </a>
            <a href="./K_Harshit_Resume.pdf" download="K_Harshit_Resume.pdf" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-slate-600 text-base font-medium rounded-md text-cyan-300 bg-slate-800/60 hover:bg-slate-700/80 transition-colors duration-300">
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}