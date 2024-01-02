import { useAuth, useUser } from "@clerk/nextjs";
import React from "react";
import FormGenerator from "./_components/formGenerator";

const Generate = () => {
  return (
    <div className="flex justify-center">
      <FormGenerator />
    </div>
  );
};

export default Generate;
