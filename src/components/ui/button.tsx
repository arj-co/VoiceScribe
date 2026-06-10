"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-mono text-xs tracking-wide transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-light focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-40 disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-ink text-paper hover:bg-ink-light",
        variant === "secondary" &&
          "bg-transparent text-ink-muted border border-rule hover:border-ink-faint hover:text-ink",
        variant === "ghost" &&
          "bg-transparent text-ink-muted hover:text-ink",
        size === "sm" && "px-3 py-1.5",
        size === "md" && "px-5 py-2.5",
        size === "lg" && "px-7 py-3",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
