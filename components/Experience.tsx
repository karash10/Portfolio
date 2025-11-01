export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Experience Column */}
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-8">Experience</h2>
            <div className="space-y-8 border-l-2 border-slate-700 pl-6">
              
              {/* Experience Item */}
              <div className="relative">
                <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-cyan-400 ring-8 ring-slate-900"></span>
                <h3 className="text-xl font-bold text-white">Summer Intern</h3>
                <p className="text-cyan-400 font-medium">CCNCS, PES University</p>
                <p className="text-sm text-slate-400 mb-2">June 2025 – July 2025</p>
                <ul className="list-disc list-outside pl-5 text-slate-300 space-y-1">
                  <li>Developed <strong className="text-white">XJailGuard</strong>, an explainable framework for detecting multi-turn, cross-lingual jailbreak attacks on LLMs.</li>
                  <li>Authored a research paper on this work, selected for publication at the <strong className="text-white">ICICC Conference</strong>.</li>
                </ul>
              </div>
              
              {/* Add more experience items here if needed */}

            </div>
          </div>

          {/* Education Column */}
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-8">Education</h2>
            <div className="space-y-8 border-l-2 border-slate-700 pl-6">
              
              {/* Education Item */}
              <div className="relative">
                <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-cyan-400 ring-8 ring-slate-900"></span>
                <h3 className="text-xl font-bold text-white">B.Tech in Computer Science and Engineering</h3>
                <p className="text-cyan-400 font-medium">PES University, Bengaluru</p>
                <p className="text-sm text-slate-400 mb-2">2023 – 2027</p>
                <p className="text-slate-300">CGPA: <strong className="text-white">8.7</strong></p>
              </div>
              
              {/* Certification Item */}
              <div className="relative">
                <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-cyan-400 ring-8 ring-slate-900"></span>
                <h3 className="text-xl font-bold text-white">Cybersecurity Certification</h3>
                <p className="text-cyan-400 font-medium">Basics of Red Teaming</p>
                <p className="text-slate-300">Learned the fundamentals of ethical hacking and red team operations.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}