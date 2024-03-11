"use client";
import React from "react";
import {useImmer} from "use-immer";
import {Tournament} from "../../../../../../api/types";

export function EditForm() {
    const [tournament, updateTournament] = useImmer({
        name: "",
        values: [{
            id: "points",
            name: "Punkte",
            type: "input",
            isResult: true
        }]
    } as Tournament)

    return (
        <div className="m-1 flex flex-row">
            <div className="basis-1/2">
                <label>
                    <p className="font-semibold text-xl">Name</p>
                    <input className="border rounded-md border-gray-300 p-1 w-64"
                           value={tournament.name}
                           onChange={(e) => updateTournament(draft => {
                               draft.name = e.target.value
                           })}
                           type="text"/>
                </label>
            </div>
            <div className="basis-1/2">
                <p className="font-semibold text-xl">Werte</p>
                <table className="w-[100%]">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Typ</th>
                        <th>Formel</th>
                    </tr>
                    </thead>

                    <tbody>
                    {tournament.values.map((tournamentValue, valueIndex) => {
                        let nameDisabled = false
                        if (tournamentValue.id == "points") {
                            nameDisabled = true
                        }

                        let formulaDisabled = true
                        if (tournamentValue.type == "calculated") {
                            formulaDisabled = false
                        }

                        return (
                            <tr key={valueIndex}>
                                <td>
                                    <input className="w-full border rounded-md border-gray-300 p-1"
                                           value={tournamentValue.name}
                                           onChange={(e) => updateTournament(draft => {
                                               draft.values[valueIndex].name = e.target.value
                                           })}
                                           disabled={nameDisabled} type="text"/>
                                </td>
                                <td>
                                    <select className="w-full border rounded-md border-gray-300 p-1"
                                            value={tournamentValue.type}
                                            onChange={(e) => updateTournament(draft => {
                                                if (e.target.value == "input") {
                                                    draft.values[valueIndex].formula = undefined
                                                }
                                                draft.values[valueIndex].type = e.target.value as "input" | "calculated"
                                            })}>
                                        <option value="input">Eingabe</option>
                                        <option value="calculated">Berechnung</option>
                                    </select>
                                </td>
                                <td>
                                    <input className="w-full border rounded-md border-gray-300 p-1"
                                           value={tournamentValue.formula || ""}
                                           onChange={(e) => updateTournament(draft => {
                                               draft.values[valueIndex].formula = e.target.value
                                           })}
                                           disabled={formulaDisabled} type="text"/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}