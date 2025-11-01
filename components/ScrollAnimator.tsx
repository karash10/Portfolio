"use client";

import { useEffect } from 'react';

export default function ScrollAnimator() {
  
  useEffect(() => {
    // This is your exact scroll logic, just placed inside a useEffect hook
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section-fade-in');
      const windowHeight = window.innerHeight;
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - 100) { // Trigger when 100px from bottom
          section.classList.add('is-visible');
        }
      });
    };

    // Add the listener when the component mounts
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    // Trigger it once on load
    handleScroll();

    // Clean up the listener when the component unmounts
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []); // The empty array [] means this effect runs only once on mount

  // This component doesn't render any visible HTML
  return null;
}