import Link from "next/link";
import { Button, Typography } from "@mui/material";

function HomeLink({ name, link }: { name: string; link: string }) {
  return (
    <Link href={link} className="m-4">
      <Button
        variant="contained"
        style={{ minWidth: "16rem", minHeight: "8rem" }}
      >
        <Typography variant="h6">{name}</Typography>
      </Button>
    </Link>
  );
}

export default function Page() {
  return (
    <main>
      <div className="flex h-screen flex-col">
        <div className="flex basis-1/3 items-center justify-center">
          <Typography variant="h3">Turnierverwaltung</Typography>
        </div>
        <div className="flex basis-1/3 items-center justify-center">
          <HomeLink name="Dashboard" link="/dashboard/tournament/list" />
          <HomeLink name="Scoreboard" link="/scoreboard" />
        </div>
      </div>
    </main>
  );
}
