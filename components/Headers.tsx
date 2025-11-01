"use client"; // This makes the component interactive

import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-white">K Harshit</a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a href="#about" className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#projects" className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">Projects</a>
            <a href="#experience" className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">Experience</a>
            <a href="#contact" className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button 
              id="mobile-menu-button" 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500" 
              aria-controls="mobile-menu" 
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed (hamburger) */}
              <svg id="icon-open" className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open (close) */}
              <svg id="icon-close" className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu, show/hide based on menu state. */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#about" onClick={toggleMobileMenu} className="text-slate-300 hover:bg-slate-700 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">About</a>
          <a href="#projects" onClick={toggleMobileMenu} className="text-slate-300 hover:bg-slate-700 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">Projects</a>
          <a href="#experience" onClick={toggleMobileMenu} className="text-slate-300 hover:bg-slate-700 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">Experience</a>
          <a href="#contact" onClick={toggleMobileMenu} className="text-slate-300 hover:bg-slate-700 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
        </div>
      </div>
    </header>
  );
}