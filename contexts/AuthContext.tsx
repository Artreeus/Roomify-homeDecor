'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// Hard-coded admin credentials
const ADMIN_EMAIL = 'admin@roomify.com';
const ADMIN_PASSWORD = 'admin1234';

// Create a mock user object for hard-coded admin
const createMockAdminUser = (): User => ({
  id: 'admin-user-id',
  email: ADMIN_EMAIL,
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
});

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored admin session in localStorage
    const storedAdmin = localStorage.getItem('admin_session');
    if (storedAdmin === 'true') {
      setUser(createMockAdminUser());
      setLoading(false);
      return;
    }

    // Fallback to Supabase session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        setUser(session?.user ?? null);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Check hard-coded admin credentials first
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const mockUser = createMockAdminUser();
      setUser(mockUser);
      localStorage.setItem('admin_session', 'true');
      return { error: null };
    }

    // Fallback to Supabase authentication
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      localStorage.removeItem('admin_session');
    }
    return { error };
  };

  const signOut = async () => {
    // Clear admin session
    localStorage.removeItem('admin_session');
    setUser(null);
    // Also sign out from Supabase if there's a session
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
