import React from 'react'
import Image from "next/image";
import Link from 'next/link';

interface HeaderProps{
  icon?: string
}

export default function Header({icon}: HeaderProps) {
  return (
    <div className='flex items-center justify-center gap-3 border border-b h-[12vh]'>
        <Image
              src="/logo.png"
              alt="Logo Gestão Merenda"
              className="w-auto h-auto"
              width={220}
              height={24}
              priority
            />
            <div className='w-[2px] bg-secondary h-10 my-4'>

            </div>
        <h2 className='text-primary font-semibold text-lg'>
            Merenda
        </h2>
        <Link href={"/kitchen/inserir"}>
        <div className='text-primary font-semibold text-4xl ml-4'>
          {icon}
        </div>
        
        </Link>
    </div>
  )
}
