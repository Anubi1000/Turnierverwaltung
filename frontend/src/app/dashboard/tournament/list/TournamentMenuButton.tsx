"use client"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {Menu, MenuButton, MenuItem} from "@szhsin/react-menu";

export function TournamentMenuButton() {
    return (
        <Menu menuButton={
            <MenuButton className="flex justify-center border-black border rounded-md p-2 hover:border-gray-400 mr-2 transition-colors">
                <FontAwesomeIcon icon={faEllipsisVertical} className="h-6 aspect-square"/>
            </MenuButton>
        } menuClassName="z-50 text-sm bg-white p-2 rounded-md shadow-lg min-w-32 border -translate-x-1">
            <MenuItem className="rounded-md px-3 py-1 hover:text-white hover:bg-black transition-colors select-none">Bearbeiten</MenuItem>
            <MenuItem className="rounded-md px-3 py-1 hover:text-white hover:bg-black transition-colors select-none">Löschen</MenuItem>
        </Menu>
    )
}