"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Certifique-se de importar Link
import { Close, Open } from "./menu";

interface LinkItem {
  name: string;
  link: string;
}

interface HeaderProps {
  menu: boolean;
  links?: LinkItem[]; // Prop opcional
}

export default function Header({ menu, links = [] }: HeaderProps) {
  // Valor padrão como array vazio
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <header className="flex items-center justify-between lg:px-24 px-5 border border-b h-[12vh]">
      <Image
        src="/logo.png"
        alt="Logo Gestão Merenda"
        className="md:w-auto md:h-auto w-48"
        width={220}
        height={24}
        priority />
      {menu && (
        <div>
          <ul
            className={`flex flex-col md:flex-row md:text-base text-primary text-2xl absolute text-justify md:static bg-white top-[86px] right-0 z-10 transition-all duration-500 ease-in ${
              open ? "" : "hidden md:flex"}`}>
            {links.length > 0 ? (
              links.map((link) => (
                <li key={link.name} className="border md:border-none p-5 md:p-3 text-base">
                  <Link href={link.link}>{link.name}</Link>
                </li>
              ))) : (
              <li className="p-5 text-base">teste</li>)}
          </ul>
          <div onClick={toggleMenu} className="md:hidden z-20">
            {open ? <Close /> : <Open />}
          </div>
        </div>)}
    </header>
  );
}
