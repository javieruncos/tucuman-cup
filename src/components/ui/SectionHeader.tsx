import * as React from "react";
import { cn } from "@/lib/utils";
import { Typography, Eyebrow } from "./Typography";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h2" as="h2">
        {title}
      </Typography>
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
