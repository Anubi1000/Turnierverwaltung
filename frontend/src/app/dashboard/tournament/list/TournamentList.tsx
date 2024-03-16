import Link from "next/link";
import { unstable_noStore } from "next/cache";
import TournamentMenuButton from "@/app/dashboard/tournament/list/TournamentMenuButton";
import { Card, CardActionArea, CardActions, CardHeader } from "@mui/material";
import React from "react";

export default async function TournamentList() {
  unstable_noStore();
  const response = await fetch(`${process.env["API_URL"]}/tournaments`);
  const data: TournamentInfo[] = await response.json();

  const elements = data.map((info) => {
    if (!info.id || !info.name) {
      throw Error("id or name not present in entry");
    }

    return (
      <Card key={info.id} className="mx-auto w-full min-w-64 max-w-96">
        <Link href={`/dashboard/tournament/${info.id}`}>
          <CardActionArea>
            <CardHeader title={info.name} />
          </CardActionArea>
        </Link>
        <CardActions>
          <TournamentMenuButton deleteTournament={() => {}} />
        </CardActions>
      </Card>
    );
  });

  return (
    <div className="h-screen w-full overflow-y-scroll">
      <div className="m-1 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
        {elements}
      </div>
    </div>
  );
}
