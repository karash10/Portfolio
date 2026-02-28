"use client";

import { motion } from "framer-motion";
import {
  experience,
  education,
  achievements,
  certifications,
} from "@/data/portfolio";
import { SectionReveal, Reveal, fadeUp, stagger, slideLeft, slideRight } from "./Motion";
import FloatingPlanets from "./FloatingPlanets";

export default function Experience() {
  return (
    <SectionReveal id="experience" className="relative py-24 sm:py-32">
      <FloatingPlanets section="experience" />
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Experience column — appears first on all screens */}
          <motion.div variants={slideLeft} className="order-1">
            <Reveal as="h2" className="section-title text-3xl sm:text-4xl text-[var(--text-strong)] mb-8">
              Experience
            </Reveal>

            <motion.div className="space-y-6" variants={stagger(0.1)}>
              {experience.map((exp) => (
                <motion.div
                  key={exp.title}
                  variants={fadeUp}
                  className="glass rounded-[var(--radius-xl)] p-6 hover:border-[var(--stroke-2)] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-strong)]">{exp.title}</h3>
                      <p className="text-[var(--muted-2)]">{exp.org}</p>
                    </div>
                    <span className="pill kbd px-3 py-1 text-[0.72rem] shrink-0 self-start">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--muted)] leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)] opacity-60 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="tag px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Education column — appears second on mobile (right after Experience) */}
          <motion.div variants={slideRight} className="order-2 lg:order-2">
            <Reveal as="h2" className="section-title text-3xl sm:text-4xl text-[var(--text-strong)] mb-8">
              Education
            </Reveal>

            <motion.div className="space-y-6" variants={stagger(0.1)}>
              {education.map((edu) => (
                <motion.div
                  key={edu.degree}
                  variants={fadeUp}
                  className="glass rounded-[var(--radius-xl)] p-6 hover:border-[var(--stroke-2)] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-strong)]">{edu.degree}</h3>
                      <p className="text-[var(--muted-2)]">{edu.institution}, {edu.location}</p>
                    </div>
                    <span className="pill kbd px-3 py-1 text-[0.72rem] shrink-0 self-start">
                      {edu.period}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[var(--text-strong)]">{edu.cgpa}</span>
                      <span className="kbd text-[0.72rem] text-[var(--muted-3)]">CGPA</span>
                    </div>
                    <div className="h-8 w-px bg-[var(--divider)]" />
                    <div className="tag-emerald px-3 py-1 rounded-full text-xs font-semibold">
                      On track
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Achievements — third on mobile */}
          <motion.div variants={slideLeft} className="order-3 lg:order-3">
            <Reveal as="h2" className="section-title text-3xl sm:text-4xl text-[var(--text-strong)] mb-8">
              Achievements
            </Reveal>
            <motion.div className="space-y-4" variants={stagger(0.1)}>
              {achievements.map((a) => (
                <motion.div
                  key={a.title}
                  variants={fadeUp}
                  className="glass rounded-[var(--radius-xl)] p-6 hover:border-[var(--stroke-2)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 shrink-0" />
                    <h3 className="text-lg font-semibold text-[var(--text-strong)]">{a.title}</h3>
                  </div>
                  <p className="mt-2 text-[var(--muted-2)] text-sm">{a.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Certifications — fourth on mobile */}
          <motion.div variants={slideRight} className="order-4 lg:order-4">
            <Reveal as="h2" className="section-title text-3xl sm:text-4xl text-[var(--text-strong)] mb-8">
              Certifications
            </Reveal>
            <motion.div className="space-y-4" variants={stagger(0.1)}>
              {certifications.map((cert) => (
                <motion.div
                  key={cert.title}
                  variants={fadeUp}
                  className="glass rounded-[var(--radius-xl)] p-6 hover:border-[var(--stroke-2)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 shrink-0" />
                    <h3 className="text-lg font-semibold text-[var(--text-strong)]">{cert.title}</h3>
                  </div>
                  <p className="mt-2 text-[var(--muted-2)] text-sm">{cert.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
}
