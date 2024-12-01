import React, { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';
import Image, { ImageProps } from 'next/image';

interface TableRootProps {
  children: ReactNode;
}

const TableRoot = ({ children }: TableRootProps) => {
  return <div className="flex flex-col w-full border rounded-lg bg-zinc-100">{children}</div>;
};

// TableHeader Component
interface TableHeaderProps {
  children: ReactNode;
}

const TableHeader = ({ children }: TableHeaderProps) => {
  return <div className="flex justify-between items-center w-full font-semibold px-4">{children}</div>;
};

// TableRow Component
interface TableRowProps {
  children: ReactNode;
}

const TableRow = ({ children }: TableRowProps) => {
  return <div className="flex justify-between items-center w-full px-4">{children}</div>;
};

// TableCell Component
interface TableCellProps {
  textcell?: string;
  children?: ReactNode; // Nova propriedade para a URL da imagem
}

const TableCell = ({ textcell, children }: TableCellProps) => {
  return (
    <div className="size-table text-start text-wrap py-3">
      {textcell || children} {/* Use textcell ou children */}
    </div>
  );
};

interface TableActionProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  icon: ElementType,
}

const TableAction = ({icon: Icon, ...rest}: TableActionProps) => {
return <button className='size-table flex items-center' {...rest}>
    <div className='bg-destructive text-destructive-foreground  px-4 py-2 w-14 rounded-lg  hover:bg-destructive/90'>
      <Icon size={25}/>
    </div>
  </button>
}

interface TableImageProps extends ImageProps {}

const TableImage = ({ ...rest }: TableImageProps) => {
  return <Image {...rest} width={112} height={10} className='w-44' />;
};
// TableBody Component
interface TableBodyProps {
  children: ReactNode;
}

const TableBody = ({ children }: TableBodyProps) => {
  return <div className="w-full">{children}</div>;
};


// Table object with all components
export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Cell: TableCell,
  Body: TableBody,
  Row: TableRow,
  Action: TableAction,
  Image: TableImage,
};
