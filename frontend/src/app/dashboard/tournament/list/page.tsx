import Link from "next/link";
import TournamentList from "@/app/dashboard/tournament/list/TournamentList";
import LogoutButton from "@/app/dashboard/tournament/list/LogoutButton";
import Button from "@/components/Button";
import Sidebar from "@/components/Sidebar";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import React from "react";

export default function Page() {
  return (
    <div className="flex">
      <Sidebar>
        <TitleWithBackButton title="Turniere" href="/" />

        <Link href="/dashboard/tournament/create" className="mt-1">
          <Button className="w-full">
            <div className="flex justify-center">
              <span className="material-symbols-outlined mr-1">add</span>
              Neues Turnier
            </div>
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
