import Link from "next/link";
import TournamentList from "@/app/dashboard/tournament/list/TournamentList";
import LogoutButton from "@/app/dashboard/tournament/list/LogoutButton";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import TitleWithBackButton from "@/components/TitleWithBackButton";

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
      <div className="h-screen flex-grow">
        <TournamentList />
      </div>
    </div>
  );
}
