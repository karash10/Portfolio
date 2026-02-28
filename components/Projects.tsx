"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";
import { SectionReveal, Reveal, stagger, scaleIn } from "./Motion";
import FloatingPlanets from "./FloatingPlanets";

const tagColor: Record<string, string> = {
  cyan: "tag",
  violet: "tag-violet",
  emerald: "tag-emerald",
  neutral: "pill kbd",
};

const INITIAL_SHOW = 6;

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, INITIAL_SHOW);

  return (
    <SectionReveal id="projects" className="relative py-24 sm:py-32">
      <FloatingPlanets section="projects" />
      <div className="site-container">
        <div className="flex flex-col items-center text-center">
          <Reveal as="h2" className="section-title text-4xl sm:text-5xl text-[var(--text-strong)]">
            Projects
          </Reveal>
          <Reveal as="p" className="mt-4 max-w-2xl text-[var(--muted-2)]">
            Research-driven builds across LLM security, AI steganography, systems programming,
            threat intelligence, and production-grade backend systems.
          </Reveal>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger(0.08, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.title}
                variants={scaleIn}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group glass rounded-[var(--radius-xl)] overflow-hidden flex flex-col border border-[var(--stroke)] hover:border-[var(--stroke-2)] transition-colors relative"
              >
                {/* Hover glow overlay */}
                <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative p-6 flex-grow">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-[var(--text-strong)]">{project.title}</h3>
                    <span className="pill kbd px-3 py-1 text-[0.72rem] shrink-0">{project.label}</span>
                  </div>

                  <p className="mt-3 text-[var(--muted)] text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {project.bullets.slice(0, 2).map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[var(--muted-2)] leading-relaxed">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan-400/60 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t.name}
                        className={`${tagColor[t.color]} px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold`}
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>

                {project.github && (
                  <div className="relative p-5 border-t border-[var(--stroke)] mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--text)] hover:text-[var(--text-strong)] font-semibold text-sm group-hover:translate-x-1 transition-transform"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.003 10.003 0 0022 12c0-5.523-4.477-10-10-10z"
                          clipRule="evenodd"
                        />
                      </svg>
                      View on GitHub
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more / less toggle */}
        {projects.length > INITIAL_SHOW && (
          <Reveal>
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="btn btn-secondary text-sm px-6 py-3"
              >
                {showAll ? "Show less" : `Show all ${projects.length} projects`}
                <motion.span
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                  aria-hidden="true"
                >
                  &darr;
                </motion.span>
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </SectionReveal>
  );
}
