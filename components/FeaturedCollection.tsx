'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { supabase, Product } from '@/lib/supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingBag } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 w-full h-[560px] flex flex-col"
    >
      <div className="relative h-96 w-full overflow-hidden bg-gradient-to-br from-[#f9f9f5] to-[#ebe9dd] flex-shrink-0">
        <Image
          src={product.image_url}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-[#0f4c3a] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-[#1a202c] mb-2 group-hover:text-[#0f4c3a] transition-colors line-clamp-2 min-h-[4rem]">
          {product.title}
        </h3>
        {product.description && (
          <p className="text-sm text-[#1a202c]/60 mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto">
          <p className="text-3xl font-bold text-[#d4af37]">
            BDT {product.price.toFixed(2)}
          </p>
          <Button
            size="sm"
            className="bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white rounded-full px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            View
          </Button>
        </div>
      </div>
    </div>
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
    <section id="collection" className="py-32 bg-gradient-to-b from-white to-[#f9f9f5] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0f4c3a]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1a202c] mb-6"
          >
            Featured Collection
          </h2>
          <p className="text-xl text-[#1a202c]/70 max-w-3xl mx-auto leading-relaxed">
            Handpicked pieces that bring elegance and sophistication to every corner of your home
          </p>
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  See All Products
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-[#1a202c]/60">No featured products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
