import React, { use } from "react";
import Link from "next/link";
import { getConnectedUser } from "@/actions/promptActions";
import { Badge } from "@/components/ui/badge";

const SignInMenu = async () => {
  // check if the user already exist in db if not add it on the db
  // and retrieve how many credits he has

  const user = await getConnectedUser();
  if (!user) return null;

  return (
    <div className="flex gap-3 items-center h-full">
      <Link href="/collection">My collection</Link>
      <Link href="/generate">Generate</Link>
      <Badge variant="outline">{user.credits} Credit</Badge>
    </div>
  );
};

export default SignInMenu;
