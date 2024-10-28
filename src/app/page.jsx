import { getUser } from '@/actions/token';
import HeroBg from '@/components/HeroBg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  const user = await getUser();

  return (
    <div className='w-full'>
      <HeroBg
        className={'flex w-full flex-1 flex-col items-center justify-evenly gap-16 p-8 pb-20 text-foreground sm:p-20'}
      >
        <div className=''></div>
        <div className='container z-20 mx-auto flex flex-col gap-4'>
          <p className='leading-7 tracking-wide text-muted-foreground'>Aurora Capital Bank</p>
          <h1 className='max-w-2xl scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-7xl'>
            Illuminating Your Financial Future
          </h1>
          <p className='mb-6 text-lg leading-7 text-muted-foreground'>
            For those who want more from their money — <br /> there&apos;s Aurora Capital. Sign up for free, in a tap.
          </p>
          <div className=''>
            <Link href={user ? '/dashboard' : '/register'}>
              <Button variant='outline' size='lg' className='rounded-full px-20'>
                {user ? 'View Dashboard' : 'Get Started'}
              </Button>
            </Link>
          </div>
        </div>
      </HeroBg>
    </div>
  );
}
