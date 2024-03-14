import React from "react";
import { SessionProviderComponent } from "@/app/dashboard/SessionProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SessionProviderComponent />
      {children}
    </div>
  );
}
