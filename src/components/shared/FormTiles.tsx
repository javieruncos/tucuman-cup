import { cn } from "@/lib/utils";
import type { FormResult } from "@/lib/teamForm";

const formTile: Record<FormResult, string> = {
  W: "bg-success text-success-foreground",
  D: "bg-muted text-muted-foreground",
  L: "bg-destructive/80 text-white",
};

const formLabel: Record<FormResult, string> = {
  W: "Victoria",
  D: "Empate",
  L: "Derrota",
};

export function FormTiles({
  form,
  align = "center",
}: {
  form?: FormResult[];
  align?: "center" | "left";
}) {
  if (!form || form.length === 0) return null;

  const label = form.map((result) => formLabel[result]).join(", ");

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        align === "center" && "justify-center"
      )}
      role="img"
      aria-label={`Racha: ${label}`}
    >
      {form.map((result, index) => (
        <span
          key={index}
          aria-hidden="true"
          title={formLabel[result]}
          className={cn(
            "grid size-5 place-items-center rounded text-[10px] font-bold",
            formTile[result]
          )}
        >
          {result}
        </span>
      ))}
    </div>
  );
}