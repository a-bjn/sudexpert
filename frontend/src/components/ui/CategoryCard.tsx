import Link from "next/link";
import { ReactNode } from "react";

type CategoryCardProps = {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
};

export default function CategoryCard({
  href,
  title,
  description,
  icon,
  gradientFrom,
  gradientTo,
  accentColor,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl bg-neutral-800 shadow-md transition hover:shadow-xl"
    >
      <div className={`aspect-[4/3] bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
        <div className="flex h-full items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-neutral-400">{description}</p>
        <div className={`mt-4 flex items-center ${accentColor} font-medium group-hover:gap-2 transition-all`}>
          <span>Vezi produsele</span>
          <svg
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

