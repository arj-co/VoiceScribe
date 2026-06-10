"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "sage" | "copper" | "muted";
}

export function Badge({
  children,
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.1em] uppercase font-bold",
        variant === "default" && "text-ink-light",
        variant === "sage" && "text-sage font-extrabold",
        variant === "copper" && "text-copper font-extrabold",
        variant === "muted" && "text-ink-muted",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
