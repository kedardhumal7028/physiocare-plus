"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Activity } from "lucide-react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { role, loading } = useAuth();

  // /portal/book is public (supports guest booking wizard)
  const isPublicRoute = pathname.startsWith("/portal/book");

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!loading && !isPublicRoute && role !== "user") {
      router.push("/login?redirect=/portal");
    }
  }, [loading, role, isPublicRoute, router]);

  if ((loading || role !== "user") && !isPublicRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50/5 text-foreground bg-grid-pattern">
        <div className="flex flex-col items-center gap-4">
          <Activity className="h-10 w-10 text-brand-500 animate-spin" />
          <span className="text-xs font-bold text-foreground/60">
            {loading ? "Restoring patient portal session..." : "Redirecting to login..."}
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
