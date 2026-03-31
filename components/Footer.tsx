"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";
import { SectionReveal, Reveal, stagger, scaleIn } from "./Motion";
import FloatingPlanets from "./FloatingPlanets";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socials = [
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
    <SectionReveal id="contact" as="footer" className="relative">
      <FloatingPlanets section="footer" />
      <div className="site-container py-24 sm:py-32">
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
                href={personal.calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary shine"
              >
                Let&apos;s talk
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal>
            <form onSubmit={handleSubmit} className="mt-12 max-w-lg mx-auto">
              <div className="glass p-8 rounded-2xl border border-[var(--stroke-1)]">
                {/* Name Field */}
                <div className="mb-6 text-left">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-[var(--text-strong)] mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-1)] border border-[var(--stroke-1)] text-[var(--text-strong)] placeholder:text-[var(--muted-3)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    placeholder="John Doe"
                    disabled={status === "loading"}
                  />
                </div>

                {/* Email Field */}
                <div className="mb-6 text-left">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[var(--text-strong)] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-1)] border border-[var(--stroke-1)] text-[var(--text-strong)] placeholder:text-[var(--muted-3)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    placeholder="john@example.com"
                    disabled={status === "loading"}
                  />
                </div>

                {/* Message Field */}
                <div className="mb-6 text-left">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-[var(--text-strong)] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-1)] border border-[var(--stroke-1)] text-[var(--text-strong)] placeholder:text-[var(--muted-3)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors resize-none"
                    placeholder="Your message here..."
                    disabled={status === "loading"}
                  />
                  {/* Character Counter */}
                  <div className={`text-right mt-2 text-sm font-semibold transition-colors ${
                    formData.message.length >= 10 
                      ? "text-[var(--good)]" 
                      : "text-red-500"
                  }`}>
                    {formData.message.length}/10 characters
                    {formData.message.length >= 10 && " ✓"}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    status === "loading" ||
                    formData.name.trim().length === 0 ||
                    formData.email.trim().length === 0 ||
                    formData.message.length < 10
                  }
                  className="w-full btn btn-primary shine disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>

                {/* Success Message */}
                {status === "success" && (
                  <div className="mt-4 p-3 rounded-lg bg-[var(--good)] bg-opacity-10 border border-[var(--good)] text-[var(--good)] text-sm">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}

                {/* Error Message */}
                {status === "error" && (
                  <div className="mt-4 p-3 rounded-lg bg-red-500 bg-opacity-10 border border-red-500 text-red-500 text-sm">
                    {errorMessage || "Failed to send message. Please try again."}
                  </div>
                )}
              </div>
            </form>
          </Reveal>

          {/* Social Icons */}
          <motion.div
            className="mt-10 flex justify-center items-center gap-4"
            variants={stagger(0.08, 0.3)}
          >
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
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
            <div className="mt-12 pt-8 border-t border-[var(--divider)]">
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
