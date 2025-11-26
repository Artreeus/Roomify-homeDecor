'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase, Product } from '@/lib/supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, [index]);

  return (
    <Card
      ref={cardRef}
      className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
    >
      <CardContent className="p-0">
        <div className="relative h-80 overflow-hidden bg-[#f9f9f5]">
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <p className="text-sm text-[#0f4c3a] font-medium uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h3 className="text-xl font-semibold text-[#1a202c] mb-3 group-hover:text-[#0f4c3a] transition-colors">
            {product.title}
          </h3>
          <p className="text-2xl font-bold text-[#d4af37]">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FeaturedCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .order('sort_order')
        .limit(6);

      if (data) setProducts(data);
    };

    fetchProducts();
  }, []);

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
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section id="collection" className="py-24 bg-[#f9f9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a202c] mb-4"
          >
            Featured Collection
          </h2>
          <p className="text-lg text-[#1a202c]/60 max-w-2xl mx-auto">
            Handpicked pieces that bring elegance and sophistication to every corner of your home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button
              size="lg"
              className="bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white px-8 py-6 text-lg group"
            >
              See All Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
