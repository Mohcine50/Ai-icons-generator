"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

const ImageSkeleton = ({ src, idx }: { src: string; idx: number }) => {
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  return (
    <>
      {loadingCompleted ? (
        <Skeleton className="w-[120px] h-[120px] rounded-lg  border-[3px] border-white shadow-sm" />
      ) : (
        <Image
          src={src}
          alt={idx.toString()}
          width={120}
          height={120}
          onLoadingComplete={() => setLoadingCompleted(true)}
          className="rounded-lg  border-[3px] border-white shadow-sm"
        />
      )}
    </>
  );
};

export default ImageSkeleton;
