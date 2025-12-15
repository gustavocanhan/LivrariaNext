"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import AuthCard from "@/components/auth/AuthCard";
import AuthTitle from "@/components/auth/AuthTitle";
import AuthInput from "@/components/auth/AuthInput";
import AuthSubmitButton from "@/components/auth/AuthSubmitButton";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError("E-mail ou senha inválidos");
      return;
    }

    router.push("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-900">
      <AuthCard>
        <AuthTitle>Login</AuthTitle>

        <form onSubmit={handleSubmit}>
          <AuthInput
            label="E-mail"
            type="text"
            value={email}
            onChange={setEmail}
          />

          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <AuthSubmitButton loading={loading}>login</AuthSubmitButton>
        </form>

        <p className="text-center text-sm mt-4">
          SingUp?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Create account
          </a>
        </p>
      </AuthCard>
    </main>
  );
}
