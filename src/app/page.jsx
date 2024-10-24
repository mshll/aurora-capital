import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Aurora Capital</h1>
      <p className='leading-7'>Great things are coming soon!</p>
    </div>
  );
}
