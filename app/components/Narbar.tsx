'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='border border-gray-300'>
      <div className='flex justify-between px-24 py-6'>
        <div className='text-blue-700 text-4xl font-bold'>
          {pathname === '/userportal' ? 'User Portal' : 'Admin Portal'}
        </div>
        <div className='space-x-4'>
          <Link href='/'>
            <button className='bg-blue-700 text-white rounded-full w-32 py-2 font-semibold'>
              Home
            </button>
          </Link>
          <Link
            href={pathname === '/userportal' ? '/adminportal' : '/userportal'}
          >
            <button className='bg-blue-700 text-white rounded-full w-32 py-2 font-semibold'>
              {pathname === '/userportal' ? 'Admin Portal' : 'User Portal'}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
