import Link from "next/link";
import { unstable_noStore } from "next/cache";
import TournamentMenuButton from "@/app/dashboard/tournament/list/TournamentMenuButton";
import { Typography } from "@mui/material";

export default async function TournamentList() {
  unstable_noStore();
  const response = await fetch(`${process.env["API_URL"]}/tournaments`);
  const data: TournamentInfo[] = await response.json();

  const elements = data.map((info, index) => {
    let classes = "flex flex-row rounded-md items-center transition-colors";
    if (index % 2 == 1) {
      classes += " bg-gray-100 hover:bg-gray-200";
    } else {
      classes += " hover:bg-gray-100";
    }

    if (!info.id || !info.name) {
      throw Error("id or name not present in entry");
    }

    return (
      <div key={info.id} className={classes}>
        <Link
          href={`/dashboard/tournament/${info.id}`}
          className="w-full py-4 pl-3"
        >
          <Typography variant="h6">{info.name}</Typography>
        </Link>
        <TournamentMenuButton />
      </div>
    );
  });

  return <div className="m-1 overflow-y-auto">{elements}</div>;
}
