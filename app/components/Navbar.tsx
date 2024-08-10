'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='border border-gray-300'>
      <div className='flex space-x-4 justify-center sm:justify-between px-24 py-6'>
        <div className='text-blue-700 text-4xl font-bold'>
          {pathname === '/userportal' ? 'User Portal' : 'Admin Portal'}
        </div>
        <div className='flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0'>
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
