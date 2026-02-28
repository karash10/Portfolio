"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";
import { SectionReveal, Reveal, stagger } from "./Motion";

// Lazy-load the 3D scene so it doesn't block SSR or first paint
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <SectionReveal
      className="relative min-h-[100dvh] flex items-center"
    >
      {/* 3D Scene (behind text) */}
      <HeroScene />

      {/* Soft vignette behind text for readability — no hard edges */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 55% 60% at 50% 50%, var(--vignette-color) 0%, transparent 100%)`,
        }}
      />

      <div className="relative site-container z-30">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div variants={stagger(0.1)}>
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--good)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--good)]" />
                </span>
                <span className="kbd text-[0.72rem] text-[var(--muted)]">Available for opportunities</span>
              </div>
            </Reveal>

            <Reveal as="h1" className="mt-8 section-title text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[var(--text-strong)] leading-[1.02]" style={{ filter: "drop-shadow(var(--hero-text-shadow))" }}>
              <>
                I build{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, var(--gradient-start), var(--gradient-mid), var(--gradient-end))" }}>
                  secure
                </span>
                <br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, var(--gradient-mid), var(--gradient-end), var(--gradient-start))" }}>
                  intelligent
                </span>{" "}
                systems.
              </>
            </Reveal>

            <Reveal as="p" className="mt-6 max-w-xl mx-auto text-lg sm:text-xl text-[var(--muted)] leading-relaxed" style={{ filter: "drop-shadow(var(--hero-subtitle-shadow))" }}>
              <>
                <span className="text-[var(--text-strong)] font-semibold">{personal.name}</span> &mdash; CS undergrad
                at PES University specializing in LLM security, adversarial ML, and building
                production-grade AI threat detection pipelines.
              </>
            </Reveal>

            <Reveal>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#projects" className="btn btn-primary shine w-full sm:w-auto">
                  View my work
                  <span aria-hidden="true">&darr;</span>
                </a>
                <a
                  href={personal.resumeFile}
                  download="K_Harshit_Resume.pdf"
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  Download resume
                  <span className="kbd text-[0.7rem] opacity-80">PDF</span>
                </a>
              </div>
            </Reveal>

          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="kbd text-[0.65rem] text-[var(--muted-3)]">scroll</span>
          <svg
            className="w-5 h-5 text-[var(--muted-3)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </SectionReveal>
  );
}
