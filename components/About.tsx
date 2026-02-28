"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { SectionReveal, Reveal, stagger, scaleIn, fadeUp } from "./Motion";
import FloatingPlanets from "./FloatingPlanets";

const tagColor: Record<string, string> = {
  cyan: "tag",
  violet: "tag-violet",
  emerald: "tag-emerald",
  neutral: "pill kbd",
};

export default function About() {
  return (
    <SectionReveal id="about" className="relative py-24 sm:py-32">
      <FloatingPlanets section="skills" />
      <div className="site-container">
        <Reveal as="h2" className="section-title text-4xl sm:text-5xl text-center text-[var(--text-strong)]">
          Technical Skills
        </Reveal>
        <Reveal as="p" className="mt-4 max-w-2xl mx-auto text-center text-[var(--muted-3)]">
          Organized by domain — from core languages to specialized security and ML tooling.
        </Reveal>

        <motion.div
          className="mt-14 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={stagger(0.07, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {skills.map((cat, idx) => (
            <motion.div
              key={cat.category}
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group glass rounded-[var(--radius-xl)] p-6 hover:border-[var(--stroke-2)] transition-colors relative overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-lg font-semibold text-[var(--text-strong)]">{cat.category}</h4>
                  <span className="kbd text-[0.65rem] text-[var(--muted-3)]">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                {cat.description && (
                  <p className="text-xs text-[var(--muted-2)] mb-4">{cat.description}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <motion.span
                      key={item.name}
                      variants={fadeUp}
                      className={`${tagColor[item.color]} px-3 py-1 rounded-full text-xs font-semibold`}
                    >
                      {item.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  );
}
