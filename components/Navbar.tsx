'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active link based on scroll position
      const sections = ['home', 'collection', 'journal', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveLink(`#${sections[i]}`);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#collection', label: 'Shop' },
    { href: '#journal', label: 'Journal' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out overflow-x-hidden ${
        scrolled ? 'py-2' : 'py-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative flex justify-center w-full">
          {/* Pill-shaped container when scrolled - contains all elements */}
          {scrolled ? (
            <div className="relative w-full max-w-4xl h-14 rounded-full bg-[#f9f9f5]/95 backdrop-blur-md shadow-lg border border-[#0f4c3a]/10 flex items-center justify-between px-4 md:px-6 overflow-hidden">
              {/* Logo - Left side inside pill */}
              <Link
                href="/"
                className="flex items-center space-x-2 group transition-all duration-500 ease-out"
              >
                <div className="bg-[#0f4c3a] text-white p-2 rounded-lg group-hover:bg-[#0f4c3a]/90 transition-colors">
                  <Sparkles className="w-4 h-4 transition-all duration-500" />
                </div>
                <span className="font-bold text-[#1a202c] text-xl transition-all duration-500">
                  Roomify
                </span>
              </Link>

              {/* Center Nav Items - inside pill */}
              <div className="hidden md:flex items-center space-x-1 md:space-x-2 lg:space-x-4 transition-all duration-500 ease-out">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={`relative px-3 py-2 text-sm font-semibold transition-all duration-300 group ${
                      activeLink === link.href
                        ? 'text-[#0f4c3a]'
                        : 'text-[#1a202c] hover:text-[#0f4c3a]'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* Active indicator */}
                    {activeLink === link.href && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0f4c3a] rounded-full"></span>
                    )}
                    {/* Hover underline */}
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0f4c3a] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </a>
                ))}
              </div>

              {/* Login Button - Right side inside pill */}
              <div className="hidden md:flex items-center transition-all duration-500 ease-out">
                <Link href="/login">
                  <Button className="bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white text-xs px-4 py-1.5 h-8 transition-all duration-300">
                    Login
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-[#1a202c] transition-all duration-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full h-20 min-w-0">
              {/* Logo - Left side */}
              <Link
                href="/"
                className="flex items-center space-x-2 group transition-all duration-500 ease-out flex-shrink-0"
              >
                <div className="bg-[#0f4c3a] text-white p-2 rounded-lg group-hover:bg-[#0f4c3a]/90 transition-colors">
                  <Sparkles className="w-5 h-5 transition-all duration-500" />
                </div>
                <span className="font-bold text-[#1a202c] text-xl md:text-2xl transition-all duration-500 whitespace-nowrap">
                  Roomify
                </span>
              </Link>

              {/* Center Nav Items */}
              <div className="hidden md:flex items-center space-x-6 lg:space-x-8 transition-all duration-500 ease-out flex-shrink-0">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={`relative px-2 py-2 text-base font-semibold transition-all duration-300 group whitespace-nowrap ${
                      activeLink === link.href
                        ? 'text-[#0f4c3a]'
                        : 'text-[#1a202c] hover:text-[#0f4c3a]'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* Active indicator */}
                    {activeLink === link.href && (
                      <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0f4c3a] rounded-full"></span>
                    )}
                    {/* Hover underline */}
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0f4c3a] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </a>
                ))}
              </div>

              {/* Login Button - Right side */}
              <div className="hidden md:flex items-center transition-all duration-500 ease-out flex-shrink-0">
                <Link href="/login">
                  <Button className="bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white px-6 py-2 transition-all duration-300 whitespace-nowrap">
                    Login
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-[#1a202c] transition-all duration-500 flex-shrink-0 ml-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f9f9f5]/98 backdrop-blur-md border-t border-[#0f4c3a]/10 shadow-lg">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveLink(link.href);
                }}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 font-semibold ${
                  activeLink === link.href
                    ? 'bg-[#0f4c3a] text-white'
                    : 'text-[#1a202c] hover:bg-[#0f4c3a]/10 hover:text-[#0f4c3a]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-[#0f4c3a]/10 mt-4">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white rounded-lg py-6 text-base font-semibold">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
