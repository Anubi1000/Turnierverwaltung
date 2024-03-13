"use client"
import {Menu, MenuButton, MenuItem} from "@szhsin/react-menu";

export function TournamentMenuButton() {
    return (
        <Menu menuButton={
            <MenuButton className="flex justify-center border-black border rounded-md p-2 hover:border-gray-400 mr-2 transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
            </MenuButton>
        } menuClassName="z-50 bg-white p-2 rounded-md shadow-lg min-w-32 border -translate-x-1">
            <MenuItem className="rounded-md px-3 py-1 hover:text-white hover:bg-black transition-colors select-none">Bearbeiten</MenuItem>
            <MenuItem className="rounded-md px-3 py-1 hover:text-white hover:bg-black transition-colors select-none">Löschen</MenuItem>
        </Menu>
    )
}