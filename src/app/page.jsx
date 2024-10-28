import { metadata } from './layout';

function Home() {
  // const allUsers = await getAllUsers();
  // const user = await getUser();
  return (
    <div className='flex h-full flex-1 flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>{metadata.title}</h1>
      <p className='leading-7'>Great things are coming soon!</p>
    </div>
  );
}

export default Home;