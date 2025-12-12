interface AuthInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

export default function AuthInput({
  label,
  type,
  value,
  onChange,
}: AuthInputProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-[hsl(var(--foreground))]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full px-3 py-2 rounded-md
          bg-[hsl(var(--input))]
          text-[hsl(var(--input-foreground))]
          border border-[hsl(var(--input-border))]
          focus:outline-none
          focus:ring-2 focus:ring-[hsl(var(--primary))]
        "
      />
    </div>
  );
}
