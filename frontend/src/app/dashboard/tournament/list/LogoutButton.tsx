"use client";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";
import { Logout } from "@mui/icons-material";

export default function LogoutButton() {
  return (
    <Button
      variant="outlined"
      style={{ marginTop: "auto" }}
      onClick={() => signOut({ callbackUrl: "/" })}
      startIcon={<Logout />}
    >
      Abmelden
    </Button>
  );
}
