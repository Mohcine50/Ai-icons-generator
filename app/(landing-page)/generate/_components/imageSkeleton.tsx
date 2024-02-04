import React, { useState } from "react";
import Image from "next/image";

const ImageSkeleton = ({ src, idx }: { src: string; idx: number }) => {
  return <Image src={src} alt={idx.toString()} width={120} height={120} />;
};

export default ImageSkeleton;
