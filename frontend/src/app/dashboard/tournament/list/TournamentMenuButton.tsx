"use client";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

export default function TournamentMenuButton() {
  return (
    <Menu
      menuButton={
        <MenuButton className="mr-2 flex justify-center rounded-md border border-black p-2 transition-colors hover:border-gray-400">
          <span className="material-symbols-outlined">more_vert</span>
        </MenuButton>
      }
      menuClassName="z-50 bg-white p-2 rounded-md shadow-lg min-w-32 border -translate-x-1"
    >
      <MenuItem className="select-none rounded-md px-3 py-1 hover:bg-black hover:text-white">
        Bearbeiten
      </MenuItem>
      <MenuItem className="select-none rounded-md px-3 py-1 hover:bg-black hover:text-white">
        Löschen
      </MenuItem>
    </Menu>
  );
}
