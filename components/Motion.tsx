"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

// ── Shared easing & durations ──
const ease = [0.16, 1, 0.3, 1] as const;

// ── Fade-up: the workhorse animation ──
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

// ── Stagger container ──
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

// ── Scale-in for cards ──
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease },
  },
};

// ── Slide from left ──
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

// ── Slide from right ──
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

// ── Section wrapper that triggers when in viewport ──
interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function SectionReveal({ children, className, id, delay = 0 }: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger(0.1, delay)}
    >
      {children}
    </motion.section>
  );
}

// ── Generic motion wrapper ──
interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "p" | "h1" | "h2" | "h3" | "span" | "li" | "ul";
}

export function Reveal({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: RevealProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}

// ── Stat counter (animates a number) ──
interface CountUpProps {
  value: string;
  label: string;
  className?: string;
}

export function CountUp({ value, label, className = "" }: CountUpProps) {
  return (
    <motion.div className={className} variants={fadeUp}>
      <div className="text-2xl sm:text-3xl font-bold text-white">{value}</div>
      <div className="mt-1 kbd text-[0.72rem] text-slate-200/70">{label}</div>
    </motion.div>
  );
}
