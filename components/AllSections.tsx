'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Calendar, Mail, Sparkles, Facebook, Instagram, Twitter, Linkedin, X, Clock, BookOpen, Award, Users, Heart, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const lookbookImages = [
  {
    url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Modern living room',
    title: 'Modern Living',
    subtitle: 'Contemporary elegance',
    span: 'col-span-2 row-span-2',
    featured: true,
  },
  {
    url: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Elegant bedroom',
    title: 'Serene Bedroom',
    subtitle: 'Peaceful retreat',
    span: 'col-span-1 row-span-1',
    featured: false,
  },
  {
    url: 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Stylish dining',
    title: 'Dining Space',
    subtitle: 'Gather & dine',
    span: 'col-span-1 row-span-1',
    featured: false,
  },
  {
    url: 'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Cozy nook',
    title: 'Cozy Corner',
    subtitle: 'Reading nook',
    span: 'col-span-1 row-span-2',
    featured: false,
  },
  {
    url: 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Workspace',
    title: 'Home Office',
    subtitle: 'Productive space',
    span: 'col-span-1 row-span-1',
    featured: false,
  },
  {
    url: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Kitchen design',
    title: 'Modern Kitchen',
    subtitle: 'Culinary haven',
    span: 'col-span-1 row-span-1',
    featured: false,
  },
  {
    url: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Bathroom design',
    title: 'Spa Bathroom',
    subtitle: 'Luxury relaxation',
    span: 'col-span-1 row-span-1',
    featured: false,
  },
  {
    url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Outdoor space',
    title: 'Outdoor Living',
    subtitle: 'Nature meets design',
    span: 'col-span-1 row-span-1',
    featured: false,
  },
  {
    url: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Luxury bedroom',
    title: 'Luxury Suite',
    subtitle: 'Elegant comfort',
    span: 'col-span-1 row-span-1',
    featured: false,
  },
  {
    url: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Stylish entryway',
    title: 'Grand Entryway',
    subtitle: 'First impressions',
    span: 'col-span-2 row-span-1',
    featured: false,
  },
  {
    url: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Modern workspace',
    title: 'Creative Studio',
    subtitle: 'Inspired workspace',
    span: 'col-span-1 row-span-1',
    featured: false,
  },
  {
    url: 'https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Cozy living',
    title: 'Family Room',
    subtitle: 'Together time',
    span: 'col-span-1 row-span-1',
    featured: false,
  },
  {
    url: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Stylish lounge',
    title: 'Lounge Area',
    subtitle: 'Relax & unwind',
    span: 'col-span-1 row-span-1',
    featured: false,
  }
];

const journalPosts = [
  {
    title: 'Minimalism Trends 2025',
    excerpt: 'Discover how less truly becomes more in modern interior design. Explore the latest minimalist approaches that create serene, functional spaces.',
    date: 'November 20, 2025',
    image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Trends',
    readTime: '5 min read',
    featured: true,
  },
  {
    title: 'How to Style Brass Accents',
    excerpt: 'Master the art of incorporating warm metallic tones into your space. Learn the secrets of balancing brass with modern aesthetics.',
    date: 'November 15, 2025',
    image: 'https://images.pexels.com/photos/2459349/pexels-photo-2459349.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Styling Tips',
    readTime: '7 min read',
    featured: false,
  },
  {
    title: 'Sustainable Living Spaces',
    excerpt: 'Create an eco-friendly home without compromising on style. Discover sustainable materials and practices for conscious living.',
    date: 'November 10, 2025',
    image: 'https://images.pexels.com/photos/1030850/pexels-photo-1030850.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Sustainability',
    readTime: '6 min read',
    featured: false,
  },
  {
    title: 'Color Psychology in Home Design',
    excerpt: 'Understand how colors affect mood and create harmonious spaces. Transform your home with strategic color choices.',
    date: 'November 5, 2025',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Design Theory',
    readTime: '8 min read',
    featured: false,
  },
];

export function Lookbook() {
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<typeof lookbookImages[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

    imagesRef.current.forEach((image, index) => {
      if (image) {
        gsap.fromTo(
          image,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.08,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: image,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  const handleImageClick = (image: typeof lookbookImages[0]) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  return (
    <section ref={containerRef} className="py-16 bg-gradient-to-b from-white to-[#f9f9f5] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#0f4c3a]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#1a202c] mb-4 md:mb-6"
          >
            Lookbook
          </h2>
          <p className="text-lg md:text-xl text-[#1a202c]/70 max-w-3xl mx-auto leading-relaxed">
            Real homes, real stories. See how our pieces come to life in beautifully curated spaces
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-4 md:gap-6 min-h-[800px]">
          {lookbookImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                imagesRef.current[index] = el;
              }}
              onClick={() => handleImageClick(image)}
              className={`${image.span} relative overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Featured Badge */}
              {image.featured && (
                <div className="absolute top-4 left-4 bg-[#d4af37] text-[#1a202c] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide z-10">
                  Featured
                </div>
              )}

              {/* Click Indicator */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3">
                  <ArrowRight className="w-6 h-6 text-[#0f4c3a]" />
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* Image Detail Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0">
          {selectedImage && (
            <>
              <div className="relative w-full h-[60vh] min-h-[400px]">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover"
                />
                {selectedImage.featured && (
                  <div className="absolute top-4 left-4 bg-[#d4af37] text-[#1a202c] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                    Featured
                  </div>
                )}
              </div>
              <DialogHeader className="p-6 md:p-8">
                <DialogTitle className="text-3xl md:text-4xl font-bold text-[#1a202c] mb-2">
                  {selectedImage.title}
                </DialogTitle>
                <DialogDescription className="text-lg md:text-xl text-[#1a202c]/70 mb-4">
                  {selectedImage.subtitle}
                </DialogDescription>
                <p className="text-[#1a202c]/60 leading-relaxed">
                  {selectedImage.alt}
                </p>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export function DesignJournal() {
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

  const featuredPost = journalPosts.find(post => post.featured);
  const regularPosts = journalPosts.filter(post => !post.featured);

  return (
    <section ref={containerRef} id="journal" className="py-16 bg-gradient-to-b from-white to-[#f9f9f5] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#0f4c3a]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f4c3a]/10 text-[#0f4c3a] text-sm font-semibold uppercase tracking-wide mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Design Insights</span>
          </div>
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1a202c] mb-4 md:mb-6"
          >
            The Design Journal
          </h2>
          <p className="text-lg md:text-xl text-[#1a202c]/70 max-w-3xl mx-auto leading-relaxed">
            Inspiration, tips, and stories from the world of modern home design
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            className="mb-12 md:mb-16"
          >
            <Card className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-96 overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#d4af37] text-[#1a202c] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
                        Featured
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-[#0f4c3a] text-white px-3 py-1 rounded-full text-xs font-medium">
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-[#1a202c]/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a202c] mb-4 group-hover:text-[#0f4c3a] transition-colors leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-[#1a202c]/70 mb-6 leading-relaxed text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <Button
                      variant="outline"
                      className="w-fit border-2 border-[#0f4c3a] text-[#0f4c3a] hover:bg-[#0f4c3a] hover:text-white rounded-full px-6 py-6 text-base group/btn"
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {regularPosts.map((post, index) => (
            <Card
              key={post.title}
              ref={(el) => {
                cardsRef.current[index + 1] = el;
              }}
              className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white h-full flex flex-col"
            >
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0f4c3a] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs md:text-sm text-[#1a202c]/60 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#1a202c] mb-3 group-hover:text-[#0f4c3a] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[#1a202c]/70 mb-4 leading-relaxed line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-[#0f4c3a] hover:text-[#0f4c3a]/80 p-0 h-auto group/btn w-fit mt-auto"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 md:mt-16">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-[#0f4c3a] text-[#0f4c3a] hover:bg-[#0f4c3a] hover:text-white rounded-full px-8 py-6 text-lg group"
          >
            View All Articles
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Customers', color: 'from-blue-500 to-indigo-600' },
    { icon: Award, value: '500+', label: 'Curated Products', color: 'from-amber-500 to-orange-600' },
    { icon: Heart, value: '98%', label: 'Satisfaction Rate', color: 'from-rose-500 to-red-600' },
    { icon: Target, value: '15+', label: 'Years Experience', color: 'from-green-500 to-emerald-600' },
  ];

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: 60, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    statsRef.current.forEach((stat, index) => {
      if (stat) {
        gsap.fromTo(
          stat,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-16 bg-gradient-to-b from-white to-[#f9f9f5] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#0f4c3a]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f4c3a]/10 text-[#0f4c3a] text-sm font-semibold uppercase tracking-wide mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Our Story</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1a202c] mb-4 md:mb-6">
            About Roomify
          </h2>
          <p className="text-lg md:text-xl text-[#1a202c]/70 max-w-3xl mx-auto leading-relaxed">
            Crafting beautiful spaces, one piece at a time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
          {/* Text Content */}
          <div ref={textRef} className="space-y-6">
            <div className="space-y-5 text-lg md:text-xl text-[#1a202c]/70 leading-relaxed">
              <p className="text-xl md:text-2xl font-semibold text-[#1a202c]">
                Founded with a passion for bringing modern aesthetics to everyday homes, Roomify curates exceptional pieces that blend timeless design with contemporary living.
              </p>
              <p>
                We believe your home should be more than just a place to live. It should be a reflection of your values, your style, and your story. Every piece in our collection is thoughtfully selected to inspire and transform.
              </p>
              <p>
                From sustainable materials to artisan craftsmanship, we partner with makers who share our commitment to quality and environmental responsibility. Each product tells a story of dedication, skill, and respect for both craft and planet.
              </p>
            </div>
            
            <div className="pt-4 border-t border-[#0f4c3a]/10">
              <p className="text-2xl font-bold text-[#0f4c3a] mb-2">
                Transform your space. Elevate your everyday.
              </p>
              <p className="text-[#1a202c]/60">
                Join thousands of homeowners who have discovered the Roomify difference
              </p>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative group">
            <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Roomify showroom"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#d4af37]/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#0f4c3a]/20 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                ref={(el) => {
                  statsRef.current[index] = el;
                }}
                className="group text-center p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#0f4c3a]/5"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} text-white rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#1a202c] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-[#1a202c]/60 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: 'Welcome to the Decor Circle!',
        description: 'Check your inbox for exclusive design inspiration.',
      });
      setEmail('');
    }
  };

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

  return (
    <section ref={containerRef} id="contact" className="py-16 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f4c3a] via-[#0a3829] to-[#0f4c3a]"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/20 shadow-lg">
          <Mail className="w-10 h-10 text-white" />
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-6 md:mb-8"
        >
          Join the Decor Circle
        </h2>
        
        <p className="text-lg md:text-xl text-white/90 mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed">
          Get exclusive access to new collections, design tips, and special offers delivered to your inbox
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <Sparkles className="w-6 h-6 text-[#d4af37] mb-2" />
            <p className="text-white/90 text-sm font-medium">Exclusive Offers</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <Mail className="w-6 h-6 text-[#d4af37] mb-2" />
            <p className="text-white/90 text-sm font-medium">Design Tips</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <ArrowRight className="w-6 h-6 text-[#d4af37] mb-2" />
            <p className="text-white/90 text-sm font-medium">Early Access</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-2xl">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-14 bg-white/95 border-none text-[#1a202c] placeholder:text-[#1a202c]/50 rounded-xl px-6 text-base focus:ring-2 focus:ring-[#d4af37]"
            />
            <Button
              type="submit"
              size="lg"
              className="h-14 bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a202c] font-bold px-8 md:px-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Subscribe
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <p className="text-white/70 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>

        {/* Trust Indicators */}
        <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
            <span>No spam, ever</span>
          </div>
          <div className="w-px h-4 bg-white/30"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
            <span>Weekly updates</span>
          </div>
          <div className="w-px h-4 bg-white/30"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
            <span>10K+ subscribers</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const footerLinks = {
    Shop: [
      { label: 'New Arrivals', href: '#' },
      { label: 'Best Sellers', href: '#' },
      { label: 'Collections', href: '#' },
      { label: 'Sale', href: '#' },
    ],
    Company: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Story', href: '#' },
      { label: 'Sustainability', href: '#' },
      { label: 'Careers', href: '#' },
    ],
    Support: [
      { label: 'Contact Us', href: '#contact' },
      { label: 'Shipping Info', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[#1a202c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="bg-[#0f4c3a] text-white p-2 rounded-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">Roomify</span>
            </Link>
            <p className="text-white/70 leading-relaxed mb-6 max-w-sm">
              Transforming ordinary rooms into extraordinary sanctuaries with timeless design and sustainable craftsmanship.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 hover:bg-[#0f4c3a] rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Roomify. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
