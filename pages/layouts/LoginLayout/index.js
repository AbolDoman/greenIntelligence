import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardLayout({children}) {
  return (
    <>
    <div className="h-[50px] px-8 flex items-center justify-center bg-green-500 text-white font-bold">
        please login to app
    </div>
    {children}
    </>
  )
}