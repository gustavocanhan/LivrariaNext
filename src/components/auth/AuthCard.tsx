export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        w-full max-w-md p-6 rounded-xl shadow 
        bg-[hsl(var(--card))] 
        text-[hsl(var(--card-foreground))]
        border border-[hsl(var(--input-border))]
      "
    >
      {children}
    </div>
  );
}
