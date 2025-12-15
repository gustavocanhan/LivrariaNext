import LogoutButton from "@/components/logout/LogoutButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="w-full h-screen">
      <h1>Livraria</h1>
      <LogoutButton />
    </main>
  );
}
