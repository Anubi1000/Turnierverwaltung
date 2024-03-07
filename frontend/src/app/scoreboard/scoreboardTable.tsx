"use client";
import {useEffect, useRef} from 'react';

const scrollInterval = 20

export function ScoreboardTable() {
    const info: ScoreboardInfo = {
        columns: [
            {
                name: "Platz",
                weight: 1. / 6
            },
            {
                name: "Name",
                weight: .5
            },
            {
                name: "Verein",
                weight: .5
            },
            {
                name: "Punkte",
                weight: 1. / 6
            }
        ],
        values: []
    }

    const max = 30;
    for (let i = 0; i <= max; i++) {
        if (i == 0) {
            info.values.push([
                "0",
                "Name ".repeat(15),
                "Verein ".repeat(15),
                (max * 2).toString()
            ])
        } else {
            info.values.push([
                i.toString(),
                "Name " + i,
                "Verein " + i,
                ((max - i) * 2).toString()
            ])
        }
    }

    const tableRef = useRef(null);

    useEffect(() => {
        let scrollToBottom = true
        let runInterval = true

        const interval = setInterval(async () => {
            if (!runInterval) return;

            const tableContainer = tableRef.current as unknown as HTMLDivElement;
            if (tableContainer) {
                if (scrollToBottom) {
                    tableContainer.scrollTop += 1;
                } else {
                    tableContainer.scrollTop -= 1;
                }

                if (tableContainer.scrollTop == 0 && !scrollToBottom) {
                    runInterval = false
                    setTimeout(() => {
                        scrollToBottom = true
                        runInterval = true
                    }, 5000)
                } else if (tableContainer.scrollTop + tableContainer.clientHeight == tableContainer.scrollHeight && scrollToBottom) {
                    runInterval = false
                    setTimeout(() => {
                        scrollToBottom = false
                        runInterval = true
                    }, 5000)
                }
            }
        }, scrollInterval);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const headElements = info.columns.map(column => {
        return (
            <th key={column.name} className="text-xl border-b-2 border-b-black"
                style={{width: `${column.weight}%`}}>{column.name}</th>
        )
    })

    const valueElements = info.values.map((row, rowIndex) => {
        const rowElements = row.map((value, valueIndex) => {
            let elementClasses = "w-1/2 text-center"

            if (rowIndex % 2 == 1) {
                elementClasses += " bg-gray-200"
            }

            if (valueIndex == 0) {
                elementClasses += " p-3 rounded-l-lg"
            }
            if (valueIndex == row.length - 1) {
                elementClasses += " rounded-r-lg"
            }

            return (
                <td key={valueIndex} className={elementClasses}>{value}</td>
            )
        })

        return (
            <tr key={rowIndex}>{rowElements}</tr>
        )
    })

    return (
        <div className="overflow-y-hidden flex-grow" ref={tableRef}>
            <table className="table-fixed w-full border-separate border-spacing-0">
                <thead className="sticky top-0 bg-white">
                <tr className="sticky">{headElements}</tr>
                </thead>

                <tbody>{valueElements}</tbody>
            </table>
        </div>
    );
}
