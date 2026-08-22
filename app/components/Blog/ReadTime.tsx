import DoubleBorder from "../ui/DoubleBorder";

type ReadTimeProps = {
  time: number;
  className?: string;
};

export default function ReadTime({ time, className }: ReadTimeProps) {
  return (
    <div className={`${className}`}>
      <DoubleBorder>
        <span>{time} mins</span>
      </DoubleBorder>
    </div>
  );
}
