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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-[#f9f9f5]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Pill-shaped container when scrolled - positioned behind content */}
        {scrolled && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full rounded-full bg-[#f9f9f5]/95 backdrop-blur-md shadow-lg border border-[#0f4c3a]/10 pointer-events-none" />
        )}

        <div
          className={`flex items-center transition-all duration-500 ease-out relative z-10 ${
            scrolled
              ? 'h-14 justify-center'
              : 'h-20 justify-between'
          }`}
        >
          {/* Logo - moves closer to center when scrolled */}
          <Link
            href="/"
            className={`flex items-center space-x-2 group transition-all duration-500 ease-out ${
              scrolled
                ? 'absolute left-1/2 -translate-x-[220px] md:-translate-x-[200px]'
                : 'relative left-0 translate-x-0'
            }`}
          >
            <div className="bg-[#0f4c3a] text-white p-2 rounded-lg group-hover:bg-[#0f4c3a]/90 transition-colors">
              <Sparkles className={`transition-all duration-500 ${scrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
            </div>
            <span className={`font-bold text-[#1a202c] transition-all duration-500 ${scrolled ? 'text-xl' : 'text-2xl'}`}>
              Roomify
            </span>
          </Link>

          {/* Center Nav Items */}
          <div
            className={`hidden md:flex items-center transition-all duration-500 ease-out ${
              scrolled
                ? 'space-x-6 absolute left-1/2 -translate-x-1/2'
                : 'space-x-8 relative'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[#1a202c] hover:text-[#0f4c3a] transition-all duration-300 font-medium ${
                  scrolled ? 'text-sm' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side Content - Admin button moves closer to center when scrolled */}
          <div
            className={`hidden md:flex items-center transition-all duration-500 ease-out ${
              scrolled
                ? 'absolute right-1/2 translate-x-[220px] md:translate-x-[200px]'
                : 'relative right-0 translate-x-0'
            }`}
          >
            <Link href="/login">
              <Button
                variant="ghost"
                className={`text-[#1a202c]/60 hover:text-[#0f4c3a] hover:bg-transparent transition-all duration-300 ${
                  scrolled ? 'text-xs px-3 py-1.5' : 'text-sm'
                }`}
              >
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden text-[#1a202c] transition-all duration-500 ${
              scrolled ? 'absolute right-4' : 'relative'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
              <Button variant="outline" className="w-full border-[#0f4c3a] text-[#0f4c3a]">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
