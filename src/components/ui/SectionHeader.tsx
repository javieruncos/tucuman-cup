import * as React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "./Typography";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: "center" | "left";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "center",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex w-full flex-wrap items-end justify-between gap-4",
          align === "center" && "justify-center"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-1.5",
            align === "center" ? "items-center text-center" : "items-start text-left"
          )}
        >
          {eyebrow && (
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-gold">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-balance sm:text-3xl">
            {title}
          </h2>
        </div>
        {action}
      </div>
      {description && (
        <Typography
          variant="lead"
          className={cn("max-w-3xl", align === "center" && "mx-auto")}
        >
          {description}
        </Typography>
      )}
    </div>
  );
}
