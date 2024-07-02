"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavMenuProps {
  menus: [string[], string[]];
}

const NavMenu: React.FC<NavMenuProps> = ({ menus }) => {
  const [labels, links] = menus;
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex  justify-between w-full">
        {labels.map((label, index) => (
          <Link className="w-1/3 text-center" key={links[index]} href={`/${links[index]}`}>
            <li
              key={index}
              className={clsx("border ", {
                "bg-secondary ": pathname === `/${links[index]}`,
              })}
            >
              {label}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
