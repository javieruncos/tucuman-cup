import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  clean?: boolean;
}

export function Container({
  as: Component = "div",
  className,
  clean = false,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full",
        !clean && "max-w-[1400px] px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    />
  );
}
