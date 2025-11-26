'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { supabase, Product } from '@/lib/supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
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
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
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
    <div
      ref={cardRef}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 w-full h-[520px] flex flex-col"
    >
      <div className="relative h-80 w-full overflow-hidden bg-gradient-to-br from-[#f9f9f5] to-[#ebe9dd] flex-shrink-0">
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
        <h3 className="text-xl font-bold text-[#1a202c] mb-2 group-hover:text-[#0f4c3a] transition-colors line-clamp-2 min-h-[3.5rem]">
          {product.title}
        </h3>
        {product.description && (
          <p className="text-sm text-[#1a202c]/60 mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto">
          <p className="text-2xl font-bold text-[#d4af37]">
            BDT {product.price.toFixed(2)}
          </p>
          <Button
            size="sm"
            className="bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white rounded-full px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Fetch all products and categories on mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });

      if (data) {
        setAllProducts(data);
        // Extract unique categories from ALL products
        const uniqueCategories = Array.from(new Set(data.map((p) => p.category)));
        setCategories(uniqueCategories);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter products based on selected category
  useEffect(() => {
    setLoading(true);
    if (selectedCategory === 'all') {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter(p => p.category === selectedCategory));
    }
    setLoading(false);
  }, [selectedCategory, allProducts]);

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
    <main className="min-h-screen bg-gradient-to-b from-white to-[#f9f9f5]">
      <Navbar />
      
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0f4c3a]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-8 text-[#0f4c3a] hover:text-[#0f4c3a]/80 hover:bg-[#0f4c3a]/10 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <h1
              ref={headingRef}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1a202c] mb-6"
            >
              All Products
            </h1>
            <p className="text-xl text-[#1a202c]/70 max-w-3xl mx-auto leading-relaxed">
              Discover our complete collection of handcrafted home decor pieces
            </p>
          </div>

          {/* Category Filter - Always show all categories */}
          {categories.length > 0 && (
            <div className="mb-16 flex flex-wrap justify-center gap-3">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className={
                  selectedCategory === 'all'
                    ? 'bg-[#0f4c3a] text-white hover:bg-[#0f4c3a]/90 rounded-full px-6'
                    : 'border-[#0f4c3a] text-[#0f4c3a] hover:bg-[#0f4c3a]/10 rounded-full px-6'
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
                      ? 'bg-[#0f4c3a] text-white hover:bg-[#0f4c3a]/90 rounded-full px-6'
                      : 'border-[#0f4c3a] text-[#0f4c3a] hover:bg-[#0f4c3a]/10 rounded-full px-6'
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
                  className="bg-white rounded-2xl shadow-md h-[500px] animate-pulse overflow-hidden"
                >
                  <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
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

