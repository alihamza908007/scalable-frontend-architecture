"use client";

import Image from "next/image";
import { useAuth } from "@/features/auth/hooks";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Image
              src="/placeholder-avatar.png"
              alt="User avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Welcome back,
              </p>
              <h2 className="text-xl font-bold">{user?.name || user?.email}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
