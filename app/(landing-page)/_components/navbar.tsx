"use client";

import React, { useState } from "react";
import Logo from "./logo";
import ThemeSwitcher from "./themeSwitcher";
import { SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavBar = () => {
  const { isSignedIn } = useUser();

  return (
    <>
      <Logo />
      <div className="flex gap-4 items-center">
        {isSignedIn ? (
          <div className="flex gap-3 items-center">
            <Link href="/collection">My collection</Link>
            <Link href="/generate">Generate</Link>
          </div>
        ) : null}
        <ThemeSwitcher />
        {!isSignedIn ? (
          <Button>
            <SignInButton afterSignInUrl="/" />
          </Button>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </div>
    </>
  );
};

export default NavBar;
