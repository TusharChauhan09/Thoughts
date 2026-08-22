import { cn } from "@/lib/utils";

type DoubleBorderProps = {
  children: React.ReactNode;
  className?: string;
};

export default function DoubleBorder({
  children,
  className,
}: DoubleBorderProps) {
  return (
    <div
      className={cn(
        "rounded-[calc(var(--radius-md)-3px)] border border-foreground/10 p-[0.5px]",
        className,
      )}
    >
      <div className="rounded-[calc(var(--radius-md)-3px)] border border-foreground/30 px-1 ">
        {children}
      </div>
    </div>
  );
}
