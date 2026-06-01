// d:\Physo\physiocare-plus\src\components\common\Button.tsx
"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out cursor-pointer active:scale-98 focus:outline-none";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary: "bg-brand-500 text-white shadow-md shadow-brand-500/20 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg",
    secondary: "bg-accent-500 text-white shadow-md shadow-accent-500/20 hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-lg",
    outline: "border border-brand-500/20 bg-brand-50/10 text-foreground/80 hover:-translate-y-0.5 hover:bg-brand-500/10",
    text: "text-brand-500 hover:text-brand-600 hover:underline px-0 py-0 rounded-none active:scale-100",
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
