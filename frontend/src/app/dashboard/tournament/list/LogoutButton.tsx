"use client";
import { signOut } from "next-auth/react";
import Button from "@/components/Button";

export default function LogoutButton() {
  return (
    <Button
      style="outlined"
      className="mt-auto"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <div className="flex justify-center">
        <span className="material-symbols-outlined mr-1">logout</span>
        Abmelden
      </div>
    </Button>
  );
}
