export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-fade-in">
        <h2 className="text-4xl font-extrabold text-center text-white mb-6">
          About Me
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto text-center mb-16">
          I'm a detail-oriented Computer Science student, passionate about the intersection of <strong className="text-cyan-400">Machine Learning</strong>, <strong className="text-cyan-400">Deep Learning</strong>, and <strong className="text-cyan-400">Cybersecurity</strong>. I have hands-on experience developing advanced DL models and secure, scalable software solutions. I'm always eager to learn and apply new technologies to solve challenging problems.
        </p>

        <h3 className="text-3xl font-bold text-center text-white mb-12">
          My Core Skills
        </h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          
          {/* Category 1: Deep Learning & AI */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4 border-b-2 border-cyan-500/30 pb-2">Deep Learning & AI</h4>
            <dl className="flex flex-wrap gap-2">
              <dt className="sr-only">Skills</dt>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Python</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">PyTorch</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Hugging Face</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Transformers</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">LangChain</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">LLMs</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">GANs</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">XAI</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">NLP</dd>
            </dl>
          </div>

          {/* Category 2: Cybersecurity & Networking */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4 border-b-2 border-cyan-500/30 pb-2">Cybersecurity & Networking</h4>
            <dl className="flex flex-wrap gap-2">
              <dt className="sr-only">Skills</dt>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Computer Networking</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Nmap</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Socket Programming</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">JWT</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Ethical Hacking</dd>
            </dl>
          </div>

          {/* Category 3: Web Development & Database */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4 border-b-2 border-cyan-500/30 pb-2">Web Development & Database</h4>
            <dl className="flex flex-wrap gap-2">
              <dt className="sr-only">Skills</dt>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">React.js</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Node.js</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">MongoDB</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">FastAPI</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Streamlit</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Tailwind CSS</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">ChromaDB</dd>
            </dl>
          </div>

          {/* Category 4: Tools & Concepts */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4 border-b-2 border-cyan-500/30 pb-2">Tools & Core Concepts</h4>
            <dl className="flex flex-wrap gap-2">
              <dt className="sr-only">Skills</dt>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Git</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Linux</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Data Structures</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">Algorithms</dd>
              <dd className="bg-cyan-900/50 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">APIs</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}