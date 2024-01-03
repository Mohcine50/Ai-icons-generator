import React, { Suspense, useState } from "react";
import Logo from "./logo";
import ThemeSwitcher from "./themeSwitcher";
import { SignInButton, SignedIn, UserButton, auth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import SignInMenu from "./signInMenu";

const NavBar = () => {
  const { user } = auth();

  return (
    <>
      <Logo />
      <div className="flex gap-4 items-center">
        {user !== null ? (
          <Suspense>
            <SignInMenu />
          </Suspense>
        ) : null}
        <ThemeSwitcher />
        {user === null ? (
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
