import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex flex-col justify-evenly items-center space-y-14'>
        <div>
          <header className='text-5xl font-bold text-blue-700'>
            Help Desk Support
          </header>
        </div>
        <div>
          <Image
            src='/help-desk-image.png'
            width={400}
            height={400}
            alt='Help desk image'
          />
        </div>
        <div className='flex flex-col space-y-4'>
          <Link href='userportal'>
            <button className='bg-blue-700 text-white font-semibold rounded-full w-64 py-2'>
              Go to User Portal
            </button>
          </Link>

          <Link href='adminportal'>
            <button className='bg-blue-700 text-white font-semibold rounded-full w-64 py-2'>
              Go to Admin Portal
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
