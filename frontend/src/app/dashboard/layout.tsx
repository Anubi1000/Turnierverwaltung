import React from "react";
import SessionProviderComponent from "@/app/dashboard/SessionProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SessionProviderComponent />
      {children}
    </div>
  );
}
