'use client';

import { useEffect, useRef } from 'react';
import { Leaf, Hammer, Truck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Leaf,
    title: 'Sustainable Materials',
    description: 'Ethically sourced, eco-friendly materials that honor both craft and planet.',
  },
  {
    icon: Hammer,
    title: 'Artisan Crafted',
    description: 'Each piece is meticulously handcrafted by skilled artisans with decades of experience.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Premium packaging and express delivery to bring your vision to life quickly.',
  },
];

export default function WhyRoomify() {
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
            delay: index * 0.2,
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a202c] mb-4">
            Why Roomify?
          </h2>
          <p className="text-lg text-[#1a202c]/60 max-w-2xl mx-auto">
            We believe your home should reflect your values and aesthetic vision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0f4c3a] text-white rounded-2xl mb-6 group-hover:bg-[#d4af37] transition-colors duration-300 shadow-lg">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-semibold text-[#1a202c] mb-4">
                  {feature.title}
                </h3>
                <p className="text-[#1a202c]/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
