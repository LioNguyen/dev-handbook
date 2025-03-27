import { cn } from "@/shared/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-testid="skeleton-test"
      className={cn("animate-pulse rounded-md bg-background-skeleton", className)}
      {...props}
    />
  );
}

export default Skeleton;
