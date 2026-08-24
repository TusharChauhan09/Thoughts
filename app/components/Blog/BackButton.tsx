"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { IconArrowBackUp } from '@tabler/icons-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <div>
      <button className="hover:opacity-75 transition-opacity duration-300 cursor-pointer" onClick={() => router.back()}>
        <div className="relative">
          <div>
            <IconArrowBackUp stroke={0.80} className="size-12 ml-2.25"/>
          </div>
          <div className="absolute bottom-0 left-0 text-lg">
            <span>Back</span>
          </div>
        </div>
      </button>
    </div>
  );
}
