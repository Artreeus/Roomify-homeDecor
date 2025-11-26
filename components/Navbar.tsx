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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f9f9f5]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-[#0f4c3a] text-white p-2 rounded-lg group-hover:bg-[#0f4c3a]/90 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-[#1a202c]">Roomify</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#1a202c] hover:text-[#0f4c3a] transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-[#1a202c]/60 hover:text-[#0f4c3a] hover:bg-transparent text-sm"
              >
                Admin
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-[#1a202c]"
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
