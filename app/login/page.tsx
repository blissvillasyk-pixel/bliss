"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post<{ accessToken: string }>("/login", {
        email,
        password,
      });

      localStorage.setItem("accessToken", res?.data?.accessToken);

      toast({
        title: "Berhasil",
        description: "Berhasil masuk ke admin",
      });

      router.push("/admin");
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        toast({
          title: "Gagal",
          description: e.response?.data?.message || "Terjadi kesalahan",
          variant: "destructive",
          className: "text-white",
        });
      } else {
        toast({
          title: "Gagal",
          description: "Terjadi kesalahan",
          variant: "destructive",
          className: "text-white",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Masuk Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute inset-y-0 right-0 h-full px-3 text-gray-600 hover:text-gray-900"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                >
                  {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !email || !password}
            >
              {loading ? "Masuk..." : "Masuk"}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Dengan masuk, Anda menyetujui kebijakan privasi kami.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
