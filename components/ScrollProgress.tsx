"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/*
  Thin gradient bar fixed to the very top of the viewport.
  Uses Framer Motion's useScroll for scroll progress + spring for smoothness.
  CSS class .scroll-progress is defined in globals.css.
*/
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
