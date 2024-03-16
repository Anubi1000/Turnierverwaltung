"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { Updater, useImmer } from "use-immer";
import ValuesTable from "@/app/dashboard/tournament/create/ValuesTable";
import { Button, TextField, Typography } from "@mui/material";
import { Add, Save } from "@mui/icons-material";

function SaveButton({ tournament }: { tournament: Tournament }) {
  let disabled = tournament.name.length == 0;

  tournament.values.forEach((value) => {
    if (disabled) return;
    if (value.name.length == 0) disabled = true;
  });

  return (
    <Button
      startIcon={<Save />}
      variant="contained"
      fullWidth
      style={{ marginTop: "auto" }}
      disabled={disabled}
    >
      Speichern
    </Button>
  );
}

function PropertiesPart({
  tournament,
  updateTournament,
}: {
  tournament: Tournament;
  updateTournament: Updater<Tournament>;
}) {
  return (
    <>
      <Typography variant="h5" style={{ marginBottom: "4px" }}>
        Eigenschaften
      </Typography>
      <TextField
        label="Name"
        type="text"
        required
        error={tournament.name.length == 0}
        value={tournament.name}
        onChange={(e) =>
          updateTournament((draft) => {
            draft.name = e.target.value;
          })
        }
      />
    </>
  );
}

function ValuesPart({
  updateTournament,
}: {
  updateTournament: Updater<Tournament>;
}) {
  return (
    <div className="mt-6 flex items-center">
      <Typography variant="h5">Werte</Typography>
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() =>
          updateTournament((draft) => {
            draft.values.push({
              id: crypto.randomUUID(),
              name: "",
              type: "input",
            });
          })
        }
        style={{ marginLeft: "8px" }}
      >
        Neuer Wert
      </Button>
    </div>
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

        <SaveButton tournament={tournament} />
      </Sidebar>

      <div className="h-screen flex-grow overflow-y-scroll p-2">
        <PropertiesPart
          tournament={tournament}
          updateTournament={updateTournament}
        />

        <ValuesPart updateTournament={updateTournament} />

        <ValuesTable
          tournament={tournament}
          updateTournament={updateTournament}
        />
      </div>
    </div>
  );
}

/*
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
                    <Input
                      className="w-full"
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
                    <Input
                      className="w-full"
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
 */
