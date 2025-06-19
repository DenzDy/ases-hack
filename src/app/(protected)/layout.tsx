"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { SessionContext } from "@/lib/SessionContext";
import type { Session } from "@supabase/supabase-js";

import TopNav from "../../components/protected-components/topNav"
import Sidebar from "../../components/protected-components/sideBar"


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);

      if (!data.session) router.push("/login");
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (!newSession) router.push("/login");
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (loading) return <div className="p-8">Loading…</div>;

  return (
    <SessionContext.Provider value={session}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex flex-col flex-1 h-full">
          <div className="h-16 flex-shrink-0">
            <TopNav />
          </div>

          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0F0F12] p-6">
            {children}
          </main>
        </div>
      </div>
    </SessionContext.Provider>
  )
}
