'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { supabase, Testimonial } from '@/lib/supabase';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let Autoplay: any;
if (typeof window !== 'undefined') {
  Autoplay = require('embla-carousel-autoplay').default;
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const plugin = useRef(
    Autoplay ? Autoplay({ delay: 5000, stopOnInteraction: true }) : undefined
  );

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (data) setTestimonials(data);
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section ref={containerRef} className="py-16 bg-gradient-to-b from-[#f9f9f5] to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#0f4c3a]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1a202c] mb-4 md:mb-6"
          >
            What Our Customers Say
          </h2>
          <p className="text-lg md:text-xl text-[#1a202c]/70 max-w-2xl mx-auto leading-relaxed">
            Join thousands of happy homeowners who transformed their spaces with Roomify
          </p>
        </div>

        {testimonials.length > 0 && (
          <div className="relative px-8 md:px-16">
            <Carousel
              setApi={setApi}
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={plugin.current ? [plugin.current] : []}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="h-full">
                      <Card className="border-none shadow-lg bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col group">
                        <CardContent className="p-6 md:p-8 flex flex-col flex-grow relative">
                          {/* Quote Icon */}
                          <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Quote className="w-16 h-16 text-[#0f4c3a]" />
                          </div>

                          {/* Rating Stars */}
                          <div className="flex mb-4 relative z-10">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-5 h-5 fill-[#d4af37] text-[#d4af37]"
                              />
                            ))}
                          </div>

                          {/* Testimonial Content */}
                          <p className="text-[#1a202c]/80 leading-relaxed mb-6 italic text-base md:text-lg flex-grow relative z-10">
                            &ldquo;{testimonial.content}&rdquo;
                          </p>

                          {/* Customer Info */}
                          <div className="border-t border-[#0f4c3a]/10 pt-4 relative z-10">
                            <p className="font-bold text-[#1a202c] text-lg">
                              {testimonial.customer_name}
                            </p>
                            {testimonial.location && (
                              <p className="text-sm text-[#1a202c]/60 mt-1">
                                {testimonial.location}
                              </p>
                            )}
                          </div>

                          {/* Decorative gradient */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0f4c3a] via-[#d4af37] to-[#0f4c3a] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-8 h-12 w-12 bg-white border-2 border-[#0f4c3a]/20 hover:bg-[#0f4c3a] hover:text-white hover:border-[#0f4c3a] shadow-lg" />
              <CarouselNext className="hidden md:flex -right-8 h-12 w-12 bg-white border-2 border-[#0f4c3a]/20 hover:bg-[#0f4c3a] hover:text-white hover:border-[#0f4c3a] shadow-lg" />
            </Carousel>

            {/* Custom Navigation Dots */}
            {testimonials.length > 3 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index * 3)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      Math.ceil(current / 3) === index + 1 || (current === testimonials.length && index === Math.ceil(testimonials.length / 3) - 1)
                        ? 'w-8 bg-[#0f4c3a]'
                        : 'w-2 bg-[#0f4c3a]/30 hover:bg-[#0f4c3a]/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#0f4c3a] mb-2">4.9/5</div>
            <div className="text-sm md:text-base text-[#1a202c]/60">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#0f4c3a] mb-2">10K+</div>
            <div className="text-sm md:text-base text-[#1a202c]/60">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#0f4c3a] mb-2">98%</div>
            <div className="text-sm md:text-base text-[#1a202c]/60">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#0f4c3a] mb-2">5★</div>
            <div className="text-sm md:text-base text-[#1a202c]/60">Premium Quality</div>
          </div>
        </div>
      </div>
    </section>
  );
}
