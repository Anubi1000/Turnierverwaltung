import { Updater } from "use-immer";
import React from "react";
import { IconButton, MenuItem, Select, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";

function TableHead() {
  return (
    <thead>
      <tr className="border-b">
        <th>Name</th>
        <th>Typ</th>
        <th>Formel</th>
      </tr>
    </thead>
  );
}

export default function ValuesTable({
  tournament,
  updateTournament,
}: {
  tournament: Tournament;
  updateTournament: Updater<Tournament>;
}) {
  return (
    <table>
      <tbody>
        {tournament.values.map((value, index) => {
          let formulaElement = <div />;

          if (value.type == "calculated") {
            formulaElement = (
              <TextField
                label="Formel"
                variant="outlined"
                value={value.formula}
                onChange={(e) => {
                  updateTournament((draft) => {
                    draft.values[index].formula = e.target.value;
                  });
                }}
              />
            );
          }

          return (
            <>
              <tr className="h-1.5"></tr>
              <tr>
                <td>
                  <TextField
                    label="Name"
                    variant="outlined"
                    required
                    error={value.name.length == 0}
                    value={value.name}
                    InputProps={{
                      readOnly: value.id == "points",
                    }}
                    onChange={(e) => {
                      if (value.id == "points") return;
                      updateTournament((draft) => {
                        draft.values[index].name = e.target.value;
                      });
                    }}
                  />
                </td>
                <td>
                  <Select
                    className="min-w-48"
                    value={value.type}
                    onChange={(e) => {
                      updateTournament((draft) => {
                        if (e.target.value == "input") {
                          draft.values[index].formula = undefined;
                        }

                        // @ts-ignore
                        draft.values[index].type = e.target.value;
                      });
                    }}
                  >
                    <MenuItem value="input">Eingabe</MenuItem>
                    <MenuItem value="calculated">Berechnung</MenuItem>
                  </Select>
                </td>
                <td>{formulaElement}</td>
                <td>
                  <IconButton
                    disabled={value.id == "points"}
                    onClick={() => {
                      if (value.id == "points") return;
                      updateTournament((draft) => {
                        draft.values.splice(index, 1);
                      });
                    }}
                  >
                    <Delete />
                  </IconButton>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
}
