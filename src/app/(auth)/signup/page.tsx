"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import AuthCard from "@/components/auth/AuthCard";
import AuthTitle from "@/components/auth/AuthTitle";
import AuthInput from "@/components/auth/AuthInput";
import AuthSubmitButton from "@/components/auth/AuthSubmitButton";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setEmail("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.message || "Erro ao criar conta");
      setLoading(false);
      return;
    }

    // Login automático após o cadastro
    const login = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (login?.error) {
      router.push("/login");
    }

    router.push("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <AuthCard>
        <AuthTitle>Create Account</AuthTitle>

        <form onSubmit={handleSubmit}>
          <AuthInput label="Name" type="text" value={name} onChange={setName} />

          <AuthInput
            label="E-mail"
            type="email"
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

          <AuthSubmitButton loading={loading}>Create</AuthSubmitButton>
        </form>
        <p className="text-center text-sm mt-4">
          Já possui conta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Entrar
          </a>
        </p>
      </AuthCard>
    </main>
  );
}
