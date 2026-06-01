// d:\Physo\physiocare-plus\src\components\common\SectionTitle.tsx
import React from "react";

interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  alignment?: "left" | "center" | "right";
  className?: string;
}

export default function SectionTitle({
  badge,
  title,
  description,
  alignment = "center",
  className = "",
}: SectionTitleProps) {
  
  const alignmentStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={`max-w-2xl flex flex-col gap-3 ${alignmentStyles[alignment]} ${className} animate-fade-in`}>
      {badge && (
        <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
