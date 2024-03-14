"use client";
import React from "react";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Sidebar from "@/components/Sidebar";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { Updater, useImmer } from "use-immer";
import { Tournament } from "../../../../../../api/types";

function SaveButton() {
  return (
    <Button className="mt-auto">
      <div className="flex justify-center">
        <span className="material-symbols-outlined mr-1">save</span>
        Speichern
      </div>
    </Button>
  );
}

function Properties({
  tournament,
  updateTournament,
}: {
  tournament: Tournament;
  updateTournament: Updater<Tournament>;
}) {
  return (
    <>
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
    </>
  );
}

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
      {
        id: "test",
        name: "test",
        type: "input",
        isResult: false,
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

        <SaveButton />
      </Sidebar>

      <div className="m-2 h-full flex-grow">
        <Properties
          tournament={tournament}
          updateTournament={updateTournament}
        />

        <div className="mt-6 flex items-center">
          <Text level="h2">Werte</Text>
          <Button
            className="ml-2 min-w-32"
            onClick={() =>
              updateTournament((draft) => {
                draft.values.push({
                  id: "test",
                  name: "",
                  type: "input",
                  isResult: false,
                });
              })
            }
          >
            Neuer Wert
          </Button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Typ</th>
              <th>Formel</th>
            </tr>
          </thead>

          <tbody>
            {tournament.values.map((tournamentValue, valueIndex) => {
              let nameDisabled = false;
              if (tournamentValue.id == "points") {
                nameDisabled = true;
              }

              let formulaDisabled = true;
              if (tournamentValue.type == "calculated") {
                formulaDisabled = false;
              }

              return (
                <tr key={valueIndex}>
                  <td>
                    <input
                      className="w-full rounded-md border border-gray-300 p-1"
                      value={tournamentValue.name}
                      onChange={(e) =>
                        updateTournament((draft) => {
                          draft.values[valueIndex].name = e.target.value;
                        })
                      }
                      disabled={nameDisabled}
                      type="text"
                    />
                  </td>
                  <td>
                    <select
                      className="w-full rounded-md border border-gray-300 p-1"
                      value={tournamentValue.type}
                      onChange={(e) =>
                        updateTournament((draft) => {
                          if (e.target.value == "input") {
                            draft.values[valueIndex].formula = undefined;
                          }
                          draft.values[valueIndex].type = e.target.value as
                            | "input"
                            | "calculated";
                        })
                      }
                    >
                      <option value="input">Eingabe</option>
                      <option value="calculated">Berechnung</option>
                    </select>
                  </td>
                  <td>
                    <input
                      className="w-full rounded-md border border-gray-300 p-1"
                      value={tournamentValue.formula || ""}
                      onChange={(e) =>
                        updateTournament((draft) => {
                          draft.values[valueIndex].formula = e.target.value;
                        })
                      }
                      disabled={formulaDisabled}
                      type="text"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
