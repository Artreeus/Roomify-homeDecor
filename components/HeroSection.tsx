'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { supabase, ContentBlock } from '@/lib/supabase';
import gsap from 'gsap';

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

export default function HeroSection() {
  const [headline, setHeadline] = useState('Elevate Your Space with Timeless Design');
  const [subtext, setSubtext] = useState('Discover curated home decor that transforms ordinary rooms into extraordinary sanctuaries.');
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from('content_blocks')
        .select('*')
        .in('block_key', ['hero_headline', 'hero_subtext']);

      if (data) {
        const headlineBlock = data.find((block: ContentBlock) => block.block_key === 'hero_headline');
        const subtextBlock = data.find((block: ContentBlock) => block.block_key === 'hero_subtext');

        if (headlineBlock) setHeadline(headlineBlock.content);
        if (subtextBlock) setSubtext(subtextBlock.content);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline
      .from(headlineRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
      })
      .from(
        subtextRef.current,
        {
          y: 60,
          opacity: 0,
          duration: 1,
        },
        '-=0.6'
      )
      .from(
        ctaRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.4'
      );
  }, [headline, subtext]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f9f9f5] via-[#f5f5f0] to-[#ebe9dd]">
      <Hero3D />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1a202c] mb-6 leading-tight"
        >
          {headline}
        </h1>
        <p
          ref={subtextRef}
          className="text-lg md:text-xl lg:text-2xl text-[#1a202c]/70 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          {subtext}
        </p>
        <div ref={ctaRef}>
          <Button
            size="lg"
            className="bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-[#0f4c3a]/30 transition-all duration-300 group"
          >
            Shop Collection
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#0f4c3a] rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-[#0f4c3a] rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
