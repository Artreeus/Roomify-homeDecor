'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Home, Palette, Heart, Star, Flower2, Flame, Lightbulb, Sofa, Sprout, Circle } from 'lucide-react';
import gsap from 'gsap';

// Mock Data Types (Simulating Supabase structure)
type ContentBlock = {
  block_key: string;
  content: string;
};

export default function HeroSection() {
  const [headline, setHeadline] = useState('Artistry in Every Corner');
  const [subtext, setSubtext] = useState('Curated collections that transform houses into timeless sanctuaries.');
  const [isLoading, setIsLoading] = useState(true);

  // Refs for animation
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Simulating Data Fetch (replacing Supabase for this demo)
  useEffect(() => {
    const fetchContent = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock Data
      const mockData: ContentBlock[] = [
        { block_key: 'hero_headline', content: 'Elevate Your Space with Timeless Design' },
        { block_key: 'hero_subtext', content: 'Discover curated home decor that transforms ordinary rooms into extraordinary sanctuaries.' }
      ];

      // In a real app, this would be: 
      // const { data } = await supabase.from('content_blocks')...

      const headlineBlock = mockData.find(b => b.block_key === 'hero_headline');
      const subtextBlock = mockData.find(b => b.block_key === 'hero_subtext');

      if (headlineBlock) setHeadline(headlineBlock.content);
      if (subtextBlock) setSubtext(subtextBlock.content);
      setIsLoading(false);
    };

    fetchContent();
  }, []);

  // Animation Sequence
  useEffect(() => {
    if (!isLoading) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Animate floating decorative elements
        floatingElementsRef.current.forEach((el, index) => {
          if (el) {
            gsap.fromTo(
              el,
              { opacity: 0, scale: 0.8, y: 30 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                delay: 0.6 + index * 0.15,
                ease: 'back.out(1.5)',
              }
            );

            // Floating animation
            gsap.to(el, {
              y: '+=15',
              duration: 2.5 + index * 0.3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: 1.5 + index * 0.15,
            });
          }
        });

        tl.from(tagRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.8,
        })
          .from(headlineRef.current, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            skewY: 2,
          }, '-=0.4')
          .from(subtextRef.current, {
            y: 30,
            opacity: 0,
            duration: 1,
          }, '-=0.8')
          .from(ctaRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.8,
          }, '-=0.6');

      }, containerRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f9f9f5] via-[#f5f5f0] to-[#ebe9dd]"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0f4c3a]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl"></div>

        {/* Geometric Patterns */}
        <div className="absolute top-32 left-10 w-32 h-32 border-2 border-[#0f4c3a]/10 rounded-lg rotate-45"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-[#d4af37]/20 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-[#d4af37]/5 rounded-lg rotate-12"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-[#0f4c3a]/5 rounded-full"></div>

        {/* Decorative Lines */}
        <div className="absolute top-40 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[#0f4c3a]/20 to-transparent"></div>
        <div className="absolute bottom-40 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-[#d4af37]/20 to-transparent"></div>
      </div>

      {/* Floating Decorative Cards */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Floating Card 1 - Flower Vase - Top Left */}
        <div
          ref={(el) => { floatingElementsRef.current[0] = el; }}
          className="absolute top-20 md:top-32 left-4 md:left-12 lg:left-16 w-28 md:w-32 h-36 md:h-40 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-3 md:p-4 border-2 border-[#0f4c3a]/20 hidden md:block group cursor-pointer pointer-events-auto transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-3xl hover:z-50"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-full h-20 md:h-24 bg-gradient-to-br from-[#0f4c3a]/15 to-[#d4af37]/15 rounded-lg mb-2 md:mb-3 flex items-end justify-center relative overflow-hidden transition-all duration-500 group-hover:from-[#0f4c3a]/25 group-hover:to-[#d4af37]/25">
            <Flower2 className="w-8 md:w-10 h-8 md:h-10 text-[#0f4c3a] mb-1 md:mb-2 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
            <div className="absolute bottom-0 w-10 md:w-12 h-6 md:h-8 bg-[#0f4c3a]/25 rounded-t-lg transition-all duration-500 group-hover:bg-[#0f4c3a]/35"></div>
          </div>
          <p className="text-xs font-semibold text-[#1a202c] text-center">Flower Vase</p>
          <p className="text-xs text-[#1a202c]/60 text-center">Elegant Design</p>
        </div>

        {/* Floating Card 2 - Candles - Top Right */}
        <div
          ref={(el) => { floatingElementsRef.current[1] = el; }}
          className="absolute top-24 md:top-40 right-4 md:right-12 lg:right-16 w-28 md:w-32 h-36 md:h-40 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-3 md:p-4 border-2 border-[#0f4c3a]/20 hidden md:block group cursor-pointer pointer-events-auto transition-all duration-500 hover:scale-110 hover:-rotate-3 hover:shadow-3xl hover:z-50"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-full h-20 md:h-24 bg-gradient-to-br from-[#d4af37]/15 to-[#0f4c3a]/15 rounded-lg mb-2 md:mb-3 flex items-end justify-center gap-0.5 md:gap-1 relative transition-all duration-500 group-hover:from-[#d4af37]/25 group-hover:to-[#0f4c3a]/25">
            <div className="flex flex-col items-center transition-all duration-500 group-hover:scale-110">
              <Flame className="w-2.5 md:w-3 h-2.5 md:h-3 text-[#d4af37] mb-0.5 transition-all duration-500 group-hover:scale-125" />
              <Circle className="w-4 md:w-5 h-4 md:h-5 text-[#d4af37] fill-[#d4af37]/25" />
            </div>
            <div className="flex flex-col items-center transition-all duration-500 group-hover:scale-110">
              <Flame className="w-3 md:w-4 h-3 md:h-4 text-[#d4af37] mb-0.5 transition-all duration-500 group-hover:scale-125" />
              <Circle className="w-5 md:w-6 h-5 md:h-6 text-[#d4af37] fill-[#d4af37]/25" />
            </div>
            <div className="flex flex-col items-center transition-all duration-500 group-hover:scale-110">
              <Flame className="w-2.5 md:w-3 h-2.5 md:h-3 text-[#d4af37] mb-0.5 transition-all duration-500 group-hover:scale-125" />
              <Circle className="w-4 md:w-5 h-4 md:h-5 text-[#d4af37] fill-[#d4af37]/25" />
            </div>
          </div>
          <p className="text-xs font-semibold text-[#1a202c] text-center">Candles</p>
          <p className="text-xs text-[#1a202c]/60 text-center">Natural</p>
        </div>

        {/* Floating Card 3 - Lamp - Bottom Left */}
        <div
          ref={(el) => { floatingElementsRef.current[2] = el; }}
          className="absolute bottom-24 md:bottom-32 left-8 md:left-16 lg:left-24 w-24 md:w-28 h-32 md:h-36 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-2.5 md:p-3 border-2 border-[#0f4c3a]/20 hidden lg:block group cursor-pointer pointer-events-auto transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-3xl hover:z-50"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-full h-16 md:h-20 bg-gradient-to-br from-[#0f4c3a]/15 to-[#d4af37]/15 rounded-lg mb-2 flex items-center justify-center relative transition-all duration-500 group-hover:from-[#0f4c3a]/25 group-hover:to-[#d4af37]/25">
            <Lightbulb className="w-7 md:w-8 h-7 md:h-8 text-[#0f4c3a] transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
            <div className="absolute top-1.5 md:top-2 w-1.5 md:w-2 h-1.5 md:h-2 bg-[#d4af37] rounded-full animate-pulse group-hover:scale-150"></div>
          </div>
          <p className="text-xs font-semibold text-[#1a202c] text-center">Table Lamp</p>
          <p className="text-xs text-[#1a202c]/60 text-center">Modern Style</p>
        </div>

        {/* Floating Card 4 - Plant - Bottom Right */}
        <div
          ref={(el) => { floatingElementsRef.current[3] = el; }}
          className="absolute bottom-28 md:bottom-40 right-8 md:right-16 lg:right-24 w-24 md:w-28 h-32 md:h-36 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-2.5 md:p-3 border-2 border-[#0f4c3a]/20 hidden lg:block group cursor-pointer pointer-events-auto transition-all duration-500 hover:scale-110 hover:-rotate-3 hover:shadow-3xl hover:z-50"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-full h-16 md:h-20 bg-gradient-to-br from-[#d4af37]/15 to-[#0f4c3a]/15 rounded-lg mb-2 flex items-end justify-center relative transition-all duration-500 group-hover:from-[#d4af37]/25 group-hover:to-[#0f4c3a]/25">
            <Sprout className="w-7 md:w-8 h-7 md:h-8 text-[#0f4c3a] mb-1 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12" />
            <div className="absolute bottom-0 w-8 md:w-10 h-5 md:h-6 bg-[#0f4c3a]/25 rounded-t-lg transition-all duration-500 group-hover:bg-[#0f4c3a]/35"></div>
          </div>
          <p className="text-xs font-semibold text-[#1a202c] text-center">Indoor Plant</p>
          <p className="text-xs text-[#1a202c]/60 text-center">Fresh Decor</p>
        </div>

        {/* Floating Card 5 - Sofa - Middle Left */}
        <div
          ref={(el) => { floatingElementsRef.current[4] = el; }}
          className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 lg:left-12 w-24 md:w-28 h-28 md:h-32 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-2.5 md:p-3 border-2 border-[#0f4c3a]/20 hidden xl:block group cursor-pointer pointer-events-auto transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-3xl hover:z-50"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-full h-14 md:h-16 bg-gradient-to-br from-[#0f4c3a]/15 to-[#d4af37]/15 rounded-lg mb-2 flex items-center justify-center transition-all duration-500 group-hover:from-[#0f4c3a]/25 group-hover:to-[#d4af37]/25">
            <Sofa className="w-6 md:w-7 h-6 md:h-7 text-[#0f4c3a] transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
          </div>
          <p className="text-xs font-semibold text-[#1a202c] text-center">Furniture</p>
          <p className="text-xs text-[#1a202c]/60 text-center">Comfort</p>
        </div>

        {/* Floating Card 6 - Home Decor - Middle Right */}
        <div
          ref={(el) => { floatingElementsRef.current[5] = el; }}
          className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 lg:right-12 w-24 md:w-28 h-28 md:h-32 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-2.5 md:p-3 border-2 border-[#0f4c3a]/20 hidden xl:block group cursor-pointer pointer-events-auto transition-all duration-500 hover:scale-110 hover:-rotate-3 hover:shadow-3xl hover:z-50"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-full h-14 md:h-16 bg-gradient-to-br from-[#d4af37]/15 to-[#0f4c3a]/15 rounded-lg mb-2 flex items-center justify-center transition-all duration-500 group-hover:from-[#d4af37]/25 group-hover:to-[#0f4c3a]/25">
            <Home className="w-6 md:w-7 h-6 md:h-7 text-[#d4af37] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12" />
          </div>
          <p className="text-xs font-semibold text-[#1a202c] text-center">Home Decor</p>
          <p className="text-xs text-[#1a202c]/60 text-center">Stylish</p>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Loading State Skeleton */}
        {isLoading ? (
          <div className="animate-pulse flex flex-col items-center space-y-6 max-w-3xl w-full">
            <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
            <div className="h-24 w-full bg-gray-200 rounded-lg"></div>
            <div className="h-24 w-3/4 bg-gray-200 rounded-lg"></div>
            <div className="h-14 w-48 bg-gray-200 rounded-full mt-8"></div>
          </div>
        ) : (
          <>
            {/* Tagline */}
            <div
              ref={tagRef}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-[#d4af37]/30 text-[#0f4c3a] text-sm font-semibold tracking-wide uppercase mb-8 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>New Collection 2024</span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-[#1a202c] mb-8 leading-[1.1] tracking-tight"
            >
              {headline.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-3 md:mr-5">
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtext */}
            <p
              ref={subtextRef}
              className="font-sans text-lg md:text-xl text-[#1a202c]/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {subtext}
            </p>

            {/* Call to Actions */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                className="group px-10 bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => console.log('Shop Collection clicked')}
              >
                Shop Collection
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-white/60 backdrop-blur-sm border-[#0f4c3a]/30 hover:bg-white/90 text-[#1a202c] shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => console.log('View Lookbook clicked')}
              >
                View Lookbook
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-[#1a202c]/60">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-[#1a202c]/20"></div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#0f4c3a]" />
                <span>10K+ Happy Customers</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-[#1a202c]/20"></div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Premium Quality</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Decorative Overlay Gradient (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f9f9f5] to-transparent pointer-events-none z-10"></div>
    </section>
  );
}