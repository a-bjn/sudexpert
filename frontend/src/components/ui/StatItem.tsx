type StatItemProps = {
  value: string;
  label: string;
};

export default function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-white">{value}</div>
      <div className="mt-2 text-sm font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </div>
    </div>
  );
}

