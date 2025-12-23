import UserCardContainer from "@/components/user/UserCardContainer";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Usuarios() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex-1 h-screen overflow-hidden p-4 gap-4 flex flex-col">
      <h1 className="text-2xl">Usuários</h1>
      <UserCardContainer />
    </main>
  );
}
