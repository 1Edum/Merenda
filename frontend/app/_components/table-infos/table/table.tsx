import React, { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Food } from "@/app/interface/Food";

// TableRoot Component
const TableRootVariants = cva(
  'flex flex-col w-full border rounded-lg bg-zinc-100',
  {
    variants: {
      variant: {
        default: '',
      },
    },
  }
);

interface TableRootProps extends VariantProps<typeof TableRootVariants> {
  children: ReactNode;
}

const TableRoot = ({ children, variant }: TableRootProps) => {
  return <div className={cn(TableRootVariants({ variant }))}>{children}</div>;
};

// TableHeader Component
interface TableHeaderProps {
  children: ReactNode;
}

const TableHeader = ({ children }: TableHeaderProps) => {
  return <div className="flex justify-between items-center w-full p-2">{children}</div>;
};

// TableRow Component
interface TableRowProps {
  children: ReactNode;
}

const TableRow = ({ children }: TableRowProps) => {
  return <div className="flex justify-between items-center w-full border-t">{children}</div>;
};

// TableCell Component
interface TableCellProps {
  textcell?: string;
  foods?: Food[];
}

const TableCell = ({ textcell, foods }: TableCellProps) => {
  return (
    <div className="w-44 p-3 text-center">
      {textcell && <span>{textcell}</span>}
    </div>
  );
};

// TableBody Component
interface TableBodyProps {
  children: ReactNode;
}

const TableBody = ({ children }: TableBodyProps) => {
  return <div className="w-full ">{children}</div>;
};

// Table object with all components
export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Cell: TableCell,
  Body: TableBody,
  Row: TableRow,
};
