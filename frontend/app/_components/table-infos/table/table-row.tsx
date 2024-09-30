import React, { ReactNode } from 'react';

interface TableRowProps {
  children: ReactNode;
}

function TableRow({ children}: TableRowProps) {
  return <div className=" flex justify-between items-center w-full border-t">{children}</div>;
}

export default TableRow;