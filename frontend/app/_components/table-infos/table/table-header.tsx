import React, { ReactNode } from 'react';

interface TableHeaderProps {
  children: ReactNode;

}

function TableHeader({ children}: TableHeaderProps) {
  return <div className="flex justify-between items-center w-full p-2">{children}</div>;
}

export default TableHeader;