'use client';

import { useEffect, useRef } from 'react';
import { Leaf, Hammer, Truck, Award, Heart, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Leaf,
    title: 'Sustainable Materials',
    description: 'Ethically sourced, eco-friendly materials that honor both craft and planet. Every piece is made with environmental responsibility in mind.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Hammer,
    title: 'Artisan Crafted',
    description: 'Each piece is meticulously handcrafted by skilled artisans with decades of experience. Quality that stands the test of time.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We curate only the finest pieces, ensuring exceptional craftsmanship and materials that exceed expectations.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Premium packaging and express delivery to bring your vision to life quickly. Free shipping on orders over BDT 5000.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: Heart,
    title: 'Customer Care',
    description: 'Dedicated support team ready to help you find the perfect pieces. Your satisfaction is our priority.',
    color: 'from-rose-500 to-red-600',
  },
  {
    icon: Sparkles,
    title: 'Unique Designs',
    description: 'Exclusive collections you won\'t find anywhere else. Curated designs that make your space truly special.',
    color: 'from-yellow-500 to-amber-600',
  },
];

export default function WhyRoomify() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
            delay: index * 0.1,
            ease: 'back.out(1.2)',
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
    <section ref={containerRef} className="py-16 bg-gradient-to-b from-[#f9f9f5] to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#0f4c3a]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#1a202c] mb-4 md:mb-6"
          >
            Why Roomify?
          </h2>
          <p className="text-lg md:text-xl text-[#1a202c]/70 max-w-3xl mx-auto leading-relaxed">
            We believe your home should reflect your values and aesthetic vision. Discover what makes us different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#0f4c3a]/5"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                
                {/* Icon container */}
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} text-white rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  {/* Decorative element */}
                  <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br ${feature.color} rounded-full opacity-20 group-hover:opacity-40 group-hover:scale-150 transition-all duration-500 blur-sm`}></div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-[#1a202c] mb-4 group-hover:text-[#0f4c3a] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#1a202c]/70 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className={`mt-6 h-1 w-0 bg-gradient-to-r ${feature.color} group-hover:w-full transition-all duration-500 rounded-full`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA section */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-[#0f4c3a]/10">
            <p className="text-lg text-[#1a202c]/80 mb-2">
              <span className="font-semibold text-[#0f4c3a]">Join thousands</span> of satisfied customers
            </p>
            <p className="text-sm text-[#1a202c]/60">
              Experience the difference quality makes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
