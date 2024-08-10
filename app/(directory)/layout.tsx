import Navbar from '../components/Navbar';

export default function DirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-full'>
      <Navbar />
      <div className='w-full px-4 sm:px-0'>{children}</div>
    </div>
  );
}
