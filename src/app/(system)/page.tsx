import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="w-full h-screen p-4">
      <h1 className="text-2xl">Dashboard</h1>
    </main>
  );
}
