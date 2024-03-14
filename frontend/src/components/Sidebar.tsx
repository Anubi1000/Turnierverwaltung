import React from "react";

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-[16.5rem] flex-col border-r bg-gray-50 p-1">
      {children}
    </div>
  );
}
