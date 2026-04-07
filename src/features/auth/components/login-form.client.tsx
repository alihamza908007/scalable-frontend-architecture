"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas/login-schema";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { FormInput } from "@/shared/components/form-input";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      login(
        { id: "1", email: data.email, name: "Demo User" },
        "mock-jwt-token",
      );

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="email"
            label="Email"
            placeholder="m@example.com"
            type="email"
            disabled={isLoading}
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            disabled={isLoading}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
