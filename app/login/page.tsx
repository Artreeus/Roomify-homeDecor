'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: 'Authentication Failed',
        description: error.message,
        variant: 'destructive',
      });
      setLoading(false);
    } else {
      toast({
        title: 'Welcome back!',
        description: 'Redirecting to admin dashboard...',
      });
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9f9f5] via-[#f0f0eb] to-[#e8e8dd] px-4">
      <Card className="w-full max-w-md border-[#0f4c3a]/10 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#0f4c3a] text-white p-4 rounded-2xl">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-[#1a202c]">Roomify Admin</CardTitle>
          <CardDescription className="text-[#1a202c]/60">
            Sign in to manage your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1a202c]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@roomify.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#0f4c3a]/20 focus:border-[#0f4c3a]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1a202c]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#0f4c3a]/20 focus:border-[#0f4c3a]"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f4c3a] hover:bg-[#0f4c3a]/90 text-white"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
