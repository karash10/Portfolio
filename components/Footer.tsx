"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";
import { SectionReveal, Reveal, stagger, scaleIn } from "./Motion";
import FloatingPlanets from "./FloatingPlanets";

export default function Footer() {
  const socials = [
    {
      label: "Email",
      href: `mailto:${personal.email}`,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: personal.linkedin,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      href: personal.github,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.003 10.003 0 0022 12c0-5.523-4.477-10-10-10z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <SectionReveal id="contact" className="relative">
      <FloatingPlanets section="footer" />
      <div className="site-container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal as="h2" className="section-title text-3xl sm:text-4xl text-[var(--text-strong)]">
            Get In Touch
          </Reveal>

          <Reveal as="p" className="mt-4 text-lg text-[var(--muted-2)]">
            I&apos;m always open to discussing new projects, research opportunities,
            or roles in LLM security and backend systems.
          </Reveal>

          <Reveal>
            <div className="mt-8 flex justify-center">
              <a
                href={`mailto:${personal.email}`}
                className="btn btn-primary shine"
              >
                Say hello
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </Reveal>

          <motion.div
            className="mt-10 flex justify-center items-center gap-4"
            variants={stagger(0.08, 0.3)}
          >
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="p-3 rounded-full glass hover:border-[var(--stroke-2)] text-[var(--muted)] hover:text-[var(--text-strong)] transition-colors"
                variants={scaleIn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">{s.label}</span>
                {s.icon}
              </motion.a>
            ))}
          </motion.div>

          <Reveal>
            <div className="mt-12 pt-8">
              <p className="text-sm text-[var(--muted-3)]">
                &copy; {new Date().getFullYear()} {personal.name}.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionReveal>
  );
}
