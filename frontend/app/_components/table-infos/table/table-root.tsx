import React, { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const TableRootVariants = cva(
  'flex flex-col w-full border rounded-lg bg-zinc-100',
  {
    variants: {
      variant: {
        default:'',
      },
    },
  }
);

interface TableRootProps extends VariantProps<typeof TableRootVariants> {
  children: ReactNode;

}

function TableRoot({ children, variant }: TableRootProps) {
  return <div className={cn(TableRootVariants({ variant }))}>{children}</div>;
}

export default TableRoot;