import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative mx-auto w-180 min-h-100 overflow-hidden rounded-2xl border">
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
