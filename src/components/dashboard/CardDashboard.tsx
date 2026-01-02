type CardDashboardProps = {
  titulo: string;
  quantidade: number | null;
  icon: React.ElementType;
};

export default function CardDashboard({
  titulo,
  quantidade,
  icon: Icon,
}: CardDashboardProps) {
  return (
    <div className="flex justify-around bg-[hsl(var(--card))] rounded-lg shadow border h-fit py-4 items-center">
      <div className="flex flex-col items-center py-2">
        <h1 className="text-xl font-bold">{titulo}</h1>
        <h2 className="text-2xl py-4">{quantidade}</h2>
      </div>
      <div>
        <Icon className="h-16 w-16" />
      </div>
    </div>
  );
}
