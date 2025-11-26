'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase, ContentBlock, Product, Testimonial } from '@/lib/supabase';
import { LogOut, Sparkles, Save, Plus, Pencil, Trash2, Star } from 'lucide-react';

export default function AdminPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  const [headline, setHeadline] = useState('');
  const [subtext, setSubtext] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    image_url: '',
    category: '',
    description: '',
    is_featured: true,
    sort_order: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !user && mounted) {
      router.push('/login');
    }
  }, [user, loading, router, mounted]);

  useEffect(() => {
    if (user) {
      fetchContent();
      fetchProducts();
      fetchTestimonials();
    }
  }, [user]);

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

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('sort_order');
    if (data) setProducts(data);
  };

  const fetchTestimonials = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('sort_order');
    if (data) setTestimonials(data);
  };

  const handleSaveContent = async () => {
    try {
      const updates = [
        { block_key: 'hero_headline', content: headline, updated_at: new Date().toISOString() },
        { block_key: 'hero_subtext', content: subtext, updated_at: new Date().toISOString() },
      ];

      for (const update of updates) {
        const { error } = await supabase.from('content_blocks').upsert(update, { onConflict: 'block_key' });
        if (error) throw error;
      }

      toast({ title: 'Content Updated', description: 'Hero section content has been saved successfully.' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleSubmitProduct = async () => {
    try {
      const productData = { ...productForm, price: parseFloat(productForm.price) };

      if (editingProduct) {
        const { error } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
        if (error) throw error;
        toast({ title: 'Product Updated' });
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
        toast({ title: 'Product Created' });
      }

      setDialogOpen(false);
      setEditingProduct(null);
      setProductForm({ title: '', price: '', image_url: '', category: '', description: '', is_featured: true, sort_order: 0 });
      fetchProducts();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Product Deleted' });
      fetchProducts();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  if (loading || !mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0f4c3a] border-t-transparent mx-auto mb-4"></div>
          <p className="text-[#1a202c]/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f5]">
      <header className="bg-white border-b border-[#0f4c3a]/10 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-[#0f4c3a] text-white p-2 rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1a202c]">Roomify Admin</h1>
              <p className="text-sm text-[#1a202c]/60">Content Management System</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={async () => {
              await signOut();
              router.push('/');
            }}
            className="border-[#0f4c3a] text-[#0f4c3a] hover:bg-[#0f4c3a] hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white border border-[#0f4c3a]/10 p-1 rounded-lg">
            <TabsTrigger 
              value="content" 
              className="data-[state=active]:bg-[#0f4c3a] data-[state=active]:text-white rounded-md px-6"
            >
              Hero Content
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className="data-[state=active]:bg-[#0f4c3a] data-[state=active]:text-white rounded-md px-6"
            >
              Products
            </TabsTrigger>
            <TabsTrigger 
              value="testimonials" 
              className="data-[state=active]:bg-[#0f4c3a] data-[state=active]:text-white rounded-md px-6"
            >
              Testimonials
            </TabsTrigger>
          </TabsList>

          <div className="relative">
            <TabsContent value="content" className="mt-8" forceMount>
              <div className={activeTab === 'content' ? 'block' : 'hidden'}>
            <Card className="border-[#0f4c3a]/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1a202c]">Hero Section Content</CardTitle>
                <CardDescription>Update the headline and subtext displayed on your homepage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="headline">Headline</Label>
                  <Input
                    id="headline"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Enter hero headline"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtext">Subtext</Label>
                  <Textarea
                    id="subtext"
                    value={subtext}
                    onChange={(e) => setSubtext(e.target.value)}
                    placeholder="Enter hero subtext"
                    rows={4}
                  />
                </div>
                <Button onClick={handleSaveContent} className="bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="mt-8" forceMount>
              <div className={activeTab === 'products' ? 'block' : 'hidden'}>
            <Card className="border-[#0f4c3a]/10 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-[#1a202c]">Product Management</CardTitle>
                    <CardDescription>Add, edit, or remove products</CardDescription>
                  </div>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setEditingProduct(null);
                          setProductForm({ title: '', price: '', image_url: '', category: '', description: '', is_featured: true, sort_order: 0 });
                        }}
                        className="bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Product Title</Label>
                          <Input
                            value={productForm.title}
                            onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                            placeholder="Artisan Brass Vase"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Price</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={productForm.price}
                              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                              placeholder="189.00"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Category</Label>
                            <Input
                              value={productForm.category}
                              onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                              placeholder="vases"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Image URL</Label>
                          <Input
                            value={productForm.image_url}
                            onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                            placeholder="https://images.pexels.com/..."
                          />
                        </div>
                        <Button onClick={handleSubmitProduct} className="w-full bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white">
                          {editingProduct ? 'Update Product' : 'Create Product'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden border-[#0f4c3a]/10">
                      <div className="relative h-48">
                        <Image src={product.image_url} alt={product.title} fill className="object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-[#1a202c] mb-1">{product.title}</h3>
                        <p className="text-sm text-[#0f4c3a] mb-2">{product.category}</p>
                        <p className="text-lg font-bold text-[#d4af37] mb-3">BDT {product.price.toFixed(2)}</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingProduct(product);
                              setProductForm({
                                title: product.title,
                                price: product.price.toString(),
                                image_url: product.image_url,
                                category: product.category,
                                description: product.description,
                                is_featured: product.is_featured,
                                sort_order: product.sort_order,
                              });
                              setDialogOpen(true);
                            }}
                            className="flex-1 border-[#0f4c3a] text-[#0f4c3a]"
                          >
                            <Pencil className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex-1 border-red-500 text-red-500"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="mt-8" forceMount>
              <div className={activeTab === 'testimonials' ? 'block' : 'hidden'}>
            <Card className="border-[#0f4c3a]/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1a202c]">Testimonials</CardTitle>
                <CardDescription>Manage customer reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="border-[#0f4c3a]/10">
                      <CardContent className="p-6">
                        <div className="flex mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                          ))}
                        </div>
                        <p className="font-semibold text-[#1a202c]">{testimonial.customer_name}</p>
                        <p className="text-[#1a202c]/80 italic mt-2">&ldquo;{testimonial.content}&rdquo;</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
