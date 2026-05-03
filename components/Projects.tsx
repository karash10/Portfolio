"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal, Reveal, stagger, scaleIn } from "./Motion";
import FloatingPlanets from "./FloatingPlanets";
import { Project } from "@/lib/types";
import { personal } from "@/data/portfolio";
import Link from "next/link";

const tagColor: Record<string, string> = {
  cyan: "tag",
  violet: "tag-violet",
  emerald: "tag-emerald",
  neutral: "pill kbd",
};

function cleanProjectText(text: string) {
  return text.replace(/\[Image\s*\d+\]/gi, "").replace(/\s{2,}/g, " ").trim();
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data.projects || []);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="relative py-20 sm:py-24">
        <FloatingPlanets section="projects" />
        <div className="site-container">
          <div className="flex flex-col items-center text-center">
            <h2 className="section-title text-4xl sm:text-5xl text-[var(--text-strong)]">
              Projects
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--muted-2)]">
              Loading projects...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <SectionReveal id="projects" className="relative py-20 sm:py-24">
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
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger(0.08, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={scaleIn}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group glass rounded-[var(--radius-xl)] overflow-hidden flex flex-col border border-[var(--stroke)] hover:border-[var(--stroke-2)] transition-colors relative"
              >
                {/* Hover glow overlay */}
                <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--card-glow-from)] via-transparent to-[var(--card-glow-to)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative p-6 flex-grow">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-[var(--text-strong)]">
                      <Link
                        href={`/projects/${project.id}`}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <span className="pill kbd px-3 py-1 text-[0.72rem] shrink-0">{project.label}</span>
                  </div>

                  <p className="mt-3 text-[var(--muted)] text-sm leading-relaxed">
                    {cleanProjectText(project.description)}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {project.bullets.slice(0, 2).map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[var(--muted-2)] leading-relaxed">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-[var(--accent)] opacity-60 shrink-0" />
                        {cleanProjectText(b)}
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

                <div className="relative p-5 border-t border-[var(--stroke)] mt-auto">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 text-[var(--text)] hover:text-[var(--text-strong)] font-semibold text-sm group-hover:translate-x-1 transition-transform rounded-lg"
                    >
                      Read documentation
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                    <a
                      href={project.github || personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs kbd text-[var(--muted-2)] hover:text-[var(--text)] transition-colors"
                    >
                      Source
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
