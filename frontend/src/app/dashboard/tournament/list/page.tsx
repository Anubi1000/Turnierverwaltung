import Link from "next/link";
import { TournamentList } from "@/app/dashboard/tournament/list/TournamentList";
import { LogoutButton } from "@/app/dashboard/tournament/list/LogoutButton";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { Sidebar } from "@/components/Sidebar";

export default function Page() {
  return (
    <div className="flex">
      <Sidebar>
        <div className="flex items-center">
          <Link href="/">
            <Button className="h-[40px]">
              <span className="material-symbols-outlined">arrow_back</span>
            </Button>
          </Link>
          <Text level="h2" className="ml-2">
            Turniere
          </Text>
        </div>
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
      <div className="flex-grow h-screen">
        <TournamentList />
      </div>
    </div>
  );
}
