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

export default function Title({ title,date, className }: TitleProps) {
  return (
    <div className={className}>
      <h1>{title}</h1>
      {date && <div className={cn("flex items-center gap-2")}>
        <IconCalendarWeek className="size-4" />
        <p>
          {date?.day} {date?.month} {date?.year}
        </p>
      </div>}
    </div>
  );
}
