type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      className="w-full max-w-md p-6 rounded-xl shadow 
        bg-[hsl(var(--card))] 
        text-[hsl(var(--card-foreground))]
        border border-[hsl(var(--input-border))]"
    >
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
