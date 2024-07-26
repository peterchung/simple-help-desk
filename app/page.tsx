import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <div>
          <header>Help Desk Support</header>
        </div>
        <div>
          <Image
            src='/help-desk-image.png'
            width={400}
            height={400}
            alt='Help desk image'
          />
        </div>
        <div>
          <Link href='userportal'>
            <button>Go to User Portal</button>
          </Link>

          <Link href='adminportal'>
            <button>Go to Admin Portal</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
