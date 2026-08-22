import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative mx-auto min-h-100 w-180 overflow-hidden rounded-2xl shadow-[0_1px_2px_oklch(0_0_0/0.04),0_6px_16px_oklch(0_0_0/0.06)] dark:shadow-[0_1px_2px_oklch(0_0_0/0.2),0_8px_20px_oklch(0_0_0/0.25)]">
      <Image
        src="https://ramx.in/blog/og/fafo-learning.png"
        alt="banner"
        fill
        className="object-cover"
      />
      <div className="absolute right-5 bottom-5 text-sm">Title</div>
    </div>
  );
}
