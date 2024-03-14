"use client";
import { SessionProvider } from "next-auth/react";

export default function SessionProviderComponent() {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <div />
    </SessionProvider>
  );
}
