export default function AuthSubmitButton({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      disabled={loading}
      className="
        w-full py-2 mt-2 rounded-md font-semibold
        bg-[hsl(var(--primary))]
        text-[hsl(var(--primary-foreground))]
        hover:opacity-90 transition disabled:opacity-50
      "
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}
