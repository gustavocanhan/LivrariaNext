export default function AuthTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-2xl font-bold mb-6 text-center text-[hsl(var(--foreground))]">
      {children}
    </h1>
  );
}
