import { TournamentInfo } from "../../../../../../api/types";
import Link from "next/link";
import Text from "@/components/Text";
import { unstable_noStore } from "next/cache";
import TournamentMenuButton from "@/app/dashboard/tournament/list/TournamentMenuButton";

export default async function TournamentList() {
  unstable_noStore();
  const response = await fetch(`${process.env["API_URL"]}/tournaments`);
  const data: TournamentInfo[] = await response.json();

  const elements = data.map((info, index) => {
    let classes = "flex flex-row rounded-md items-center";
    if (index % 2 == 1) {
      classes += " bg-gray-200";
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
          <Text level="h3">{info.name}</Text>
        </Link>
        <TournamentMenuButton />
      </div>
    );
  });

  return <div className="m-1 overflow-y-auto">{elements}</div>;
}
