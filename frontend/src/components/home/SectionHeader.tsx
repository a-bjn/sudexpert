"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type SectionHeaderProps = {
  subtitle?: string;
  title?: string;
  description?: string;
  subtitleIcon?: ReactNode;
  align?: "left" | "center";
  variant?: "default" | "minimal" | "dark";
  className?: string;
  animate?: boolean;
  isInView?: boolean;
  children?: ReactNode;
};

export default function SectionHeader({
  subtitle,
  title,
  description,
  subtitleIcon,
  align = "center",
  variant = "default",
  className = "",
  animate = true,
  isInView = true,
  children,
}: SectionHeaderProps) {
  const variantStyles = {
    default: {
      subtitle: "text-orange-600",
      title: "text-slate-800",
      description: "text-slate-500",
    },
    minimal: {
      subtitle: "text-slate-400",
      title: "text-slate-800",
      description: "text-slate-500",
    },
    dark: {
      subtitle: "text-orange-500",
      title: "text-white",
      description: "text-slate-400",
    },
  };

  const styles = variantStyles[variant];

  const content = (
    <>
      {subtitle && (
        <span
          className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 ${
            align === "center" ? "" : "mb-3 sm:mb-4"
          } ${styles.subtitle}`}
        >
          {subtitleIcon}
          {subtitle}
        </span>
      )}
      {title && (
        <h2 className={`bebas-neue-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 px-2 ${variant === "dark" ? "text-white" : "text-slate-800"}`}>
          {title}
        </h2>
      )}
      {description && (
        <p className={`max-w-2xl mx-auto text-sm sm:text-base px-2 ${styles.description}`}>
          {description}
        </p>
      )}
      {children}
    </>
  );

  const defaultMargin = variant === "minimal" && !title ? "mb-6 sm:mb-10" : "mb-10 sm:mb-16";
  const wrapperClass = `${defaultMargin} ${align === "center" ? "text-center" : ""} ${className}`;

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={wrapperClass}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={wrapperClass}>{content}</div>;
}
