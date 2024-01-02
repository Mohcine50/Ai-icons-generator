"use client";

import React, { useState } from "react";
import Logo from "./logo";
import ThemeSwitcher from "./themeSwitcher";
import { SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const { isSignedIn } = useUser();

  return (
    <>
      <Logo />
      <div className="flex gap-4 items-center">
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
