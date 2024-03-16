import { Updater } from "use-immer";
import React from "react";
import Button from "@/components/Button";

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
      <TableHead />

      <tbody>
        <tr>
          <td>
            <input className="m-0.5 rounded-md border border-gray-300 p-1" />
          </td>
          <td>
            <select className="m-0.5 rounded-md border border-gray-300 p-1">
              <option value="input">Eingabe</option>
              <option value="calculated">Berechnung</option>
            </select>
          </td>
          <td>
            <input className="m-0.5 rounded-md border border-gray-300 p-1" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
