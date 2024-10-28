import MainLayout from '@/components/MainLayout';

export default function Profile() {
  return (
    <MainLayout>
      <div className='flex h-full flex-1 flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20'>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Profile</h1>
        <p className='leading-7'>This is the profile page.</p>
      </div>
    </MainLayout>
  );
}
