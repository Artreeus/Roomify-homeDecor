'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase, Product } from '@/lib/supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Filter } from 'lucide-react';
import { Footer } from '@/components/AllSections';

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
          delay: index * 0.05,
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
          {product.description && (
            <p className="text-sm text-[#1a202c]/60 mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          <p className="text-2xl font-bold text-[#d4af37]">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data } = await query;

      if (data) {
        setProducts(data);
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map((p) => p.category)));
        setCategories(uniqueCategories);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

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
        }
      );
    }
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#f9f9f5]">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-8 text-[#0f4c3a] hover:text-[#0f4c3a]/80 hover:bg-[#0f4c3a]/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a202c] mb-4"
            >
              All Products
            </h1>
            <p className="text-lg text-[#1a202c]/60 max-w-2xl mx-auto">
              Discover our complete collection of handcrafted home decor pieces
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-12 flex flex-wrap justify-center gap-4">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className={
                  selectedCategory === 'all'
                    ? 'bg-[#0f4c3a] text-white hover:bg-[#0f4c3a]/90'
                    : 'border-[#0f4c3a] text-[#0f4c3a] hover:bg-[#0f4c3a]/10'
                }
              >
                All Products
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? 'bg-[#0f4c3a] text-white hover:bg-[#0f4c3a]/90'
                      : 'border-[#0f4c3a] text-[#0f4c3a] hover:bg-[#0f4c3a]/10'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-lg h-96 animate-pulse"
                >
                  <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-[#1a202c]/60">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

