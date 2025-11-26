'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#collection', label: 'Shop' },
    { href: '#about', label: 'About' },
    { href: '#journal', label: 'Journal' },
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
              <div className="hidden md:flex items-center space-x-6 transition-all duration-500 ease-out">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[#1a202c] hover:text-[#0f4c3a] transition-all duration-300 font-medium text-sm"
                  >
                    {link.label}
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
              <div className="hidden md:flex items-center space-x-8 transition-all duration-500 ease-out flex-shrink-0">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[#1a202c] hover:text-[#0f4c3a] transition-all duration-300 font-medium whitespace-nowrap"
                  >
                    {link.label}
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
        <div className="md:hidden bg-[#f9f9f5] border-t border-[#0f4c3a]/10">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-[#1a202c] hover:text-[#0f4c3a] transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
