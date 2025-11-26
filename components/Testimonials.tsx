'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { supabase, Testimonial } from '@/lib/supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
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
  }, [testimonials]);

  return (
    <section className="py-16 bg-[#f9f9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a202c] mb-4 md:mb-6">
            What Our Customers Say
          </h2>
          <p className="text-lg md:text-xl text-[#1a202c]/60 max-w-2xl mx-auto leading-relaxed">
            Join thousands of happy homeowners who transformed their spaces with Roomify
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="border-none shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#d4af37] text-[#d4af37]"
                    />
                  ))}
                </div>
                <p className="text-[#1a202c]/80 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-[#1a202c]">
                    {testimonial.customer_name}
                  </p>
                  {testimonial.location && (
                    <p className="text-sm text-[#1a202c]/60">
                      {testimonial.location}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
