import Link from "next/link";
import LogoutButton from "@/app/dashboard/tournament/list/LogoutButton";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import TournamentList from "@/app/dashboard/tournament/list/TournamentList";

export default function Page() {
  return (
    <div className="flex">
      <Sidebar>
        <TitleWithBackButton title="Turniere" href="/" />

        <Link href="/dashboard/tournament/create" className="mt-1">
          <Button variant="contained" className="w-full" startIcon={<Add />}>
            Neues Turnier
          </Button>
        </Link>

        <LogoutButton />
      </Sidebar>
      <TournamentList />
    </div>
  );
}
