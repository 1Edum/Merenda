import React from 'react'
import Image from "next/image";

export default function Header() {
  return (
    <div className='flex items-center justify-center gap-3'>
        <Image
              src="/sesi-logo.webp"
              alt="Vercel Logo"
              className="dark:invert"
              width={130}
              height={24}
              priority
            />
            <div className='w-[2px] bg-secondary h-10 my-4'>

            </div>
        <h2 className='text-red-600 font-semibold text-lg'>
            Merenda
        </h2>
    </div>
  )
}
