import React, { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

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
  return <div className="flex justify-between items-center w-full px-4">{children}</div>;
};

// TableRow Component
interface TableRowProps {
  children: ReactNode;
}

const TableRow = ({ children }: TableRowProps) => {
  return <div className="flex justify-between items-center w-full border-t px-4">{children}</div>;
};

// TableCell Component
interface TableCellProps {
  textcell?: string;
  children?: ReactNode; // Nova propriedade para a URL da imagem
}

const TableCell = ({ textcell, children }: TableCellProps) => {
  return (
    <div className="w-44 p-2 text-start">
      {textcell || children} {/* Use textcell ou children */}
    </div>
  );
};

// TableBody Component
interface TableBodyProps {
  children: ReactNode;
}

const TableBody = ({ children }: TableBodyProps) => {
  return <div className="w-full">{children}</div>;
};

interface TableActionsProps{
  children: ReactNode,
}

const TableActions = ({children}: TableActionsProps) => {
return <div>{children}</div>
}

interface TableActionProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  icon: ElementType,
}


const TableAction = ({icon: Icon, ...rest}: TableActionProps) => {
return <button className='w-44' {...rest}><Icon /></button>
}

// Table object with all components
export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Cell: TableCell,
  Body: TableBody,
  Row: TableRow,
  Action: TableAction,
  Actions: TableActions,
};
