import { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
  iconBgColor,
  iconColor,
}: FeatureCardProps) {
  return (
    <div className="group relative rounded-2xl border border-neutral-800 bg-neutral-900 p-8 transition hover:border-neutral-700 hover:shadow-lg">
      <div className={`mb-4 inline-flex rounded-lg ${iconBgColor} ${iconColor} p-3`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-neutral-400">{description}</p>
    </div>
  );
}

