import { LoaderCircle } from 'lucide-react';

function Loading() {
  return (
    <main className='relative flex min-h-screen flex-col items-center justify-center'>
      <LoaderCircle className='h-12 w-12 animate-spin' />
    </main>
  );
}

export default Loading;
