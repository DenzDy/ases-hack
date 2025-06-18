'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, LogOut, User } from 'lucide-react';
import { SessionContext } from '@/lib/SessionContext';
import { supabase } from '@/lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);

      if (!data.session) {
        router.push('/login');
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      if (!newSession) router.push('/login');
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) return <p className="p-8">Loading...</p>;

  const navLinkClasses = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === path
        ? 'bg-teal-100 text-teal-800 font-semibold'
        : 'text-gray-600 hover:text-black'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="text-teal-600" size={20} />
              <span className="text-xl font-black text-gray-800 font-serif">KatwiranAI</span>
            </Link>

            <div className="hidden md:flex gap-3 ml-4">
              <Link href="/dashboard" className={navLinkClasses('/dashboard')}>
                Dashboard
              </Link>
              <Link href="/filer" className={navLinkClasses('/filer')}>
                Filer
              </Link>
            </div>
          </div>

          {/* Right side - avatar menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer text-gray-600 hover:text-black bg-transparent rounded-none !overflow-visible">
                <AvatarImage
                  src="/images/user.png"
                  alt="user"
                  className="bg-transparent rounded-none"
                />
                <AvatarFallback className="bg-transparent rounded-none">
                  <User size={22} />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 mt-2">
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-800 cursor-pointer"
              >
                <LogOut size={16} /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Main */}
      <main className="pt-20 px-6 w-full max-w-6xl mx-auto flex-1">
        <SessionContext.Provider value={session}>
          {children}
        </SessionContext.Provider>
      </main>
    </div>
  );
}
