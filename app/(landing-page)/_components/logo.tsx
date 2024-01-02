import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="font-bold text-2xl">
      <h1>
        <span className="">Icons</span> Generator
      </h1>
    </Link>
  );
};

export default Logo;
