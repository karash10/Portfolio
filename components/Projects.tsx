export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 bg-slate-900/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-fade-in">
        <h2 className="text-4xl font-extrabold text-center text-white mb-12">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Project Card 1: XJailGuard */}
          <div className="card-hover bg-slate-800/70 rounded-lg overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-white mb-2">XJailGuard: AI Safety Framework</h3>
              <p className="text-slate-300 text-sm mb-4">
                A secure multilingual AI assistant acting as a safety filtering layer for LLM deployment. Detects and blocks prompt injections, multilingual attacks, and chained jailbreaks in multi-turn conversations using an XAI module for transparency.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">PyTorch</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">Transformers</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">XAI</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">FastAPI</span>
              </div>
            </div>
            <div className="p-6 bg-slate-800 mt-auto">
              <a href="https://github.com/karash10/XJailGuard" target="_blank" rel="noopener noreferrer" className="font-medium text-cyan-400 hover:text-cyan-300">
                View on GitHub &rarr;
              </a>
            </div>
          </div>

          {/* Project Card 2: CTI-RAG */}
          <div className="card-hover bg-slate-800/70 rounded-lg overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-white mb-2">CTI-RAG: CTI Analysis Chatbot</h3>
              <p className="text-slate-300 text-sm mb-4">
                A Retrieval-Augmented Generation (RAG) system for Cyber Threat Intelligence. Ingests and indexes CTI data (CVE, MITRE ATT&CK) into a vector DB, allowing analysts to extract actionable, cited intelligence via a chatbot.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">LangChain</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">Gemini</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">ChromaDB</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">Streamlit</span>
              </div>
            </div>
            <div className="p-6 bg-slate-800 mt-auto">
              <a href="https://github.com/karash10/CTI-RAG" target="_blank" rel="noopener noreferrer" className="font-medium text-cyan-400 hover:text-cyan-300">
                View on GitHub &rarr;
              </a>
            </div>
          </div>

          {/* Project Card 3: SecureLogger */}
          <div className="card-hover bg-slate-800/70 rounded-lg overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-white mb-2">SecureLogger: GAN Deception Tool</h3>
              <p className="text-slate-300 text-sm mb-4">
                A cyber deception tool to flood web server access logs with realistic, fake entries using a GAN. This obfuscates true server activity and frustrates attackers or unauthorized auditors.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">PyTorch</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">GAN</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">Flask</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">Python</span>
              </div>
            </div>
            <div className="p-6 bg-slate-800 mt-auto">
              <a href="https://github.com/karash10/SecureLogger" target="_blank" rel="noopener noreferrer" className="font-medium text-cyan-400 hover:text-cyan-300">
                View on GitHub &rarr;
              </a>
            </div>
          </div>
          
          {/* Project Card 4: SecureSniff */}
          <div className="card-hover bg-slate-800/70 rounded-lg overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-white mb-2">SecureSniff: Network Analyzer</h3>
              <p className="text-slate-300 text-sm mb-4">
                A network analysis tool that captures live packets and generates detailed summaries. Integrates Nmap to perform real-time scanning for vulnerability assessment, providing both passive and active security insights.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">Python</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">Socket Programming</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">Nmap</span>
              </div>
            </div>
            <div className="p-6 bg-slate-800 mt-auto">
              <a href="https://github.com/karash10/SecureSniff" target="_blank" rel="noopener noreferrer" className="font-medium text-cyan-400 hover:text-cyan-300">
                View on GitHub &rarr;
              </a>
            </div>
          </div>
          
          {/* Project Card 5: PlayTogether */}
          <div className="card-hover bg-slate-800/70 rounded-lg overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-white mb-2">PlayTogether: Full-Stack App</h3>
              <p className="text-slate-300 text-sm mb-4">
                A full-stack platform for discovering, booking, and organizing sports activities. Features JWT authentication, venue booking, event management, and a system for players to connect with each other.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">React.js</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">Node.js</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">MongoDB</span>
                <span className="text-xs font-medium bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">Tailwind CSS</span>
              </div>
            </div>
            <div className="p-6 bg-slate-800 mt-auto">
              <a href="https://github.com/karash10/playTogether" target="_blank" rel="noopener noreferrer" className="font-medium text-cyan-400 hover:text-cyan-300">
                View on GitHub &rarr;
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}