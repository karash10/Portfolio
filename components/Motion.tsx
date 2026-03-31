"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode, useState, useEffect } from "react";

// ── Detect mobile for simplified animations ──
function useIsMobile() {
  // Start as false for SSR to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    
    checkMobile();
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  
  return { isMobile: mounted && isMobile, mounted };
}

// ── Shared easing & durations ──
const ease = [0.16, 1, 0.3, 1] as const;

// ── Fade-up: the workhorse animation (with mobile optimization) ──
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

// Mobile-optimized: simpler fade without blur or transform
export const fadeUpMobile: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ── Stagger container (with mobile optimization) ──
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const staggerMobile = (staggerChildren = 0.04, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

// ── Scale-in for cards (with mobile optimization) ──
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease },
  },
};

export const scaleInMobile: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

// ── Slide from left (with mobile optimization) ──
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

export const slideLeftMobile: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ── Slide from right (with mobile optimization) ──
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

export const slideRightMobile: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ── Section wrapper that triggers when in viewport ──
interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  as?: "section" | "footer";
}

export function SectionReveal({ children, className, id, delay = 0, as = "section" }: SectionRevealProps) {
  const Tag = motion[as] as typeof motion.section;
  const { isMobile } = useIsMobile();
  
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={isMobile ? staggerMobile(0.05, delay) : stagger(0.1, delay)}
    >
      {children}
    </Tag>
  );
}

// ── Generic motion wrapper ──
interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variants?: Variants;
  as?: "div" | "p" | "h1" | "h2" | "h3" | "h4" | "span" | "li" | "ul" | "footer";
}

export function Reveal({
  children,
  className,
  style,
  variants = fadeUp,
  as = "div",
}: RevealProps) {
  const Tag = motion[as] as typeof motion.div;
  const { isMobile } = useIsMobile();
  
  // Use mobile-optimized variants if on mobile and default fadeUp is used
  const finalVariants = isMobile && variants === fadeUp ? fadeUpMobile : variants;
  
  return (
    <Tag className={className} style={style} variants={finalVariants}>
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
      <div className="text-2xl sm:text-3xl font-bold text-[var(--text-strong)]">{value}</div>
      <div className="mt-1 kbd text-[0.72rem] text-[var(--muted-2)]">{label}</div>
    </motion.div>
  );
}
