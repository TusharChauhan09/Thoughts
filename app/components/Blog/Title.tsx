import { cn } from "@/lib/utils";
import { IconCalendarWeek } from "@tabler/icons-react";

type DateProps = {
  day: number;
  month: string;
  year: number;
};

type TitleProps = {
  date?: DateProps;
  title: string;
  className?: string;
};

export default function Title({ title, date, className }: TitleProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h1 className="font-serif text-4xl leading-tight font-normal lg:text-5xl">
        {title}
      </h1>
      {date && (
        <div className="flex items-center gap-2  text-muted-foreground">
          <IconCalendarWeek className="size-6"/>
          <p className="text-lg">
            {date.day} {date.month} {date.year}
          </p>
        </div>
      )}
    </div>
  );
}
