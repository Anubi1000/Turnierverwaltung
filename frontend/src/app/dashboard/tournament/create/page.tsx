"use client";
import React from "react";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Sidebar from "@/components/Sidebar";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { useImmer } from "use-immer";
import { Tournament } from "../../../../../../api/types";

export default function Page() {
  const [tournament, updateTournament] = useImmer({
    name: "",
    values: [
      {
        id: "points",
        name: "Punkte",
        type: "input",
        isResult: true,
      },
    ],
  } as Tournament);

  return (
    <div className="flex">
      <Sidebar>
        <TitleWithBackButton
          title="Turnier erstellen"
          href="/dashboard/tournament/list"
        />

        <Button className="mt-auto">
          <div className="flex justify-center">
            <span className="material-symbols-outlined mr-1">save</span>
            Speichern
          </div>
        </Button>
      </Sidebar>

      <div className="m-2 h-full flex-grow">
        <Text level="h2">Eigenschaften</Text>
        <label>
          <Text level="label">Name</Text>
          <input
            className="rounded-md border border-gray-300 p-1"
            type="text"
            value={tournament.name}
            onChange={(e) =>
              updateTournament((draft) => {
                draft.name = e.target.value;
              })
            }
          />
        </label>

      </div>
    </div>
  );
}
