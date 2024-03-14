import Clock from "@/app/scoreboard/Clock";
import ScoreboardTable from "@/app/scoreboard/ScoreboardTable";

export default function Page() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <ScoreboardTable />
      <div className="flex flex-row border-t-2 border-black p-1">
        <p className="text-4xl font-semibold">Test Turnier</p>
        <Clock />
      </div>
    </div>
  );
}
