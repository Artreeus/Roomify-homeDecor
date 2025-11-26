'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Calendar, Mail, Sparkles, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const lookbookImages = [
  {
    url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Modern living room',
    span: 'col-span-2 row-span-2',
  },
  {
    url: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Elegant bedroom',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Stylish dining',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Cozy nook',
    span: 'col-span-1 row-span-2',
  },
  {
    url: 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Workspace',
    span: 'col-span-2 row-span-1',
  },
];

const journalPosts = [
  {
    title: 'Minimalism Trends 2025',
    excerpt: 'Discover how less truly becomes more in modern interior design.',
    date: 'November 20, 2025',
    image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Trends',
  },
  {
    title: 'How to Style Brass Accents',
    excerpt: 'Master the art of incorporating warm metallic tones into your space.',
    date: 'November 15, 2025',
    image: 'https://images.pexels.com/photos/2459349/pexels-photo-2459349.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Styling Tips',
  },
  {
    title: 'Sustainable Living Spaces',
    excerpt: 'Create an eco-friendly home without compromising on style.',
    date: 'November 10, 2025',
    image: 'https://images.pexels.com/photos/1030850/pexels-photo-1030850.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sustainability',
  },
];

export function Lookbook() {
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    imagesRef.current.forEach((image, index) => {
      if (image) {
        gsap.fromTo(
          image,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: image,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a202c] mb-4">Lookbook</h2>
          <p className="text-lg text-[#1a202c]/60 max-w-2xl mx-auto">
            Real homes, real stories. See how our pieces come to life in beautifully curated spaces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] gap-4">
          {lookbookImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                imagesRef.current[index] = el;
              }}
              className={`${image.span} relative overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DesignJournal() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section id="journal" className="py-24 bg-[#f9f9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a202c] mb-4">
            The Design Journal
          </h2>
          <p className="text-lg text-[#1a202c]/60 max-w-2xl mx-auto">
            Inspiration, tips, and stories from the world of modern home design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {journalPosts.map((post, index) => (
            <Card
              key={post.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
            >
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0f4c3a] text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-[#1a202c]/60 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.date}
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1a202c] mb-3 group-hover:text-[#0f4c3a] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#1a202c]/70 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-[#0f4c3a] hover:text-[#0f4c3a]/80 p-0 h-auto group/btn"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={textRef}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a202c] mb-6">
              About Roomify
            </h2>
            <div className="space-y-4 text-lg text-[#1a202c]/70 leading-relaxed">
              <p>
                Founded with a passion for bringing modern aesthetics to everyday homes, Roomify curates exceptional pieces that blend timeless design with contemporary living.
              </p>
              <p>
                We believe your home should be more than just a place to live. It should be a reflection of your values, your style, and your story. Every piece in our collection is thoughtfully selected to inspire and transform.
              </p>
              <p>
                From sustainable materials to artisan craftsmanship, we partner with makers who share our commitment to quality and environmental responsibility. Each product tells a story of dedication, skill, and respect for both craft and planet.
              </p>
              <p className="text-[#0f4c3a] font-medium pt-4">
                Transform your space. Elevate your everyday.
              </p>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Roomify showroom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: 'Welcome to the Decor Circle!',
        description: 'Check your inbox for exclusive design inspiration.',
      });
      setEmail('');
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-[#0f4c3a] to-[#0a3829]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Join the Decor Circle
        </h2>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          Get exclusive access to new collections, design tips, and special offers delivered to your inbox
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 h-14 bg-white/95 border-none text-[#1a202c] placeholder:text-[#1a202c]/50"
          />
          <Button
            type="submit"
            size="lg"
            className="h-14 bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a202c] font-semibold px-8"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const footerLinks = {
    Shop: [
      { label: 'New Arrivals', href: '#' },
      { label: 'Best Sellers', href: '#' },
      { label: 'Collections', href: '#' },
      { label: 'Sale', href: '#' },
    ],
    Company: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Story', href: '#' },
      { label: 'Sustainability', href: '#' },
      { label: 'Careers', href: '#' },
    ],
    Support: [
      { label: 'Contact Us', href: '#contact' },
      { label: 'Shipping Info', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[#1a202c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="bg-[#0f4c3a] text-white p-2 rounded-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">Roomify</span>
            </Link>
            <p className="text-white/70 leading-relaxed mb-6 max-w-sm">
              Transforming ordinary rooms into extraordinary sanctuaries with timeless design and sustainable craftsmanship.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 hover:bg-[#0f4c3a] rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Roomify. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
