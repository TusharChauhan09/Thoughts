import DoubleBorder from "../ui/DoubleBorder";

type ReadTimeProps = {
  time: number;
  className?: string;
};

export default function ReadTime({ time, className }: ReadTimeProps) {
  return (
    <div className={`${className} flex justify-center `}>
      <DoubleBorder>
        <span>{time} mins</span>
      </DoubleBorder>
    </div>
  );
}
