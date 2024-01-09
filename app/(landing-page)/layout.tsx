import React from "react";
import NavBar from "./_components/navbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-background">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <NavBar />
      </nav>
      {children}
    </div>
  );
}

export default layout;
