"use client";

import React, { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

function getDisplayName<P>(Wrapped: ComponentType<P>) {
  return Wrapped.displayName || Wrapped.name || "Component";
}

export function withAuth<P extends object>(Wrapped: ComponentType<P>) {
  function AuthGuard(props: P) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let alive = true;

      api
        .get("/check-auth") // asumsi baseURL axios kamu sudah "/api"
        .then(() => {
          if (alive) setLoading(false);
        })
        .catch(() => {
          try {
            localStorage.removeItem("accessToken");
          } catch {}
          router.replace("/login");
        });

      return () => {
        alive = false;
      };
    }, [router]);

    if (loading) {
      return (
        <div className="min-h-screen grid place-items-center">
          <div className="flex items-center gap-3 text-gray-600">
            <span className="h-4 w-4 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
            <span>Memeriksa sesi...</span>
          </div>
        </div>
      );
    }

    return <Wrapped {...props} />;
  }

  AuthGuard.displayName = `withAuth(${getDisplayName<P>(Wrapped)})`;

  // Penting: kembalikan sebagai ComponentType<P>, jangan React.FC<P>
  return AuthGuard as ComponentType<P>;
}
