import React from "react";
import Link from "next/link";
import { getConnectedUser } from "@/app/actions/userActions";
import CreditBadge from "./creditBadge";

const SignInMenu = async () => {
  // check if the user already exist in db if not add it on the db
  // and retrieve how many credits he has
  const user = await getConnectedUser();
  if (!user) return null;

  return (
    <div className="flex gap-3 items-center h-full">
      <Link href="/generate">Generate</Link>
      <Link href="/collection">My collection</Link>
      <CreditBadge credits={user?.credits} />
    </div>
  );
};

export default SignInMenu;
