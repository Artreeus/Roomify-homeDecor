import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import Hero3D from './Hero3D';

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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-[#f5f5f0] to-[#ebe9dd]"
    >
      {/* 3D Background Layer */}
      <div className="absolute inset-0 w-full h-full opacity-60 md:opacity-100 transition-opacity duration-1000">
        <Hero3D />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-gold-400/30 text-olive-800 text-sm font-semibold tracking-wide uppercase mb-8 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span>New Collection 2024</span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-olive-900 mb-8 leading-[1.1] tracking-tight"
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
              className="font-sans text-lg md:text-xl text-olive-800/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {subtext}
            </p>

            {/* Call to Actions */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                variant="primary"
                className="group px-10"
                onClick={() => console.log('Shop Collection clicked')}
              >
                Shop Collection
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="bg-white/40 backdrop-blur-sm border-olive-900/10 hover:bg-white/80"
                onClick={() => console.log('View Lookbook clicked')}
              >
                View Lookbook
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Decorative Overlay Gradient (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cream to-transparent pointer-events-none z-10"></div>
    </section>
  );
}