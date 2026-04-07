import dynamic from "next/dynamic";

const LoginForm = dynamic(
  () =>
    import("@/features/auth/components/login-form").then((mod) => ({
      default: mod.LoginForm,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    ),
  },
);

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6 lg:p-12">
      <LoginForm />
    </main>
  );
}
