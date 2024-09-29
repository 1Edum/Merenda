import React, { ReactNode } from 'react';

interface TableBodyProps {
  children: ReactNode;
}

function TableBody({ children}: TableBodyProps) {
  return <div className="flex justify-between items-center w-full p-2">{children}</div>;
}

export default TableBody;