import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function AuthButtons() {
  const user = null; // TODO
  // const user = true; // TODO

  if (user)
    return (
      <Link href='/profile'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='https://github.com/mshll.pngNO' alt='ACB' />
          <AvatarFallback>
            <User className='h-5 w-5' />
          </AvatarFallback>
        </Avatar>
      </Link>
    );

  return (
    <>
      <Link href='/login'>
        <Button variant='outline' size='sm'>
          Log in
        </Button>
      </Link>
      <Link href='/register'>
        <Button variant='secondary' size='sm'>
          Sign up
        </Button>
      </Link>
    </>
  );
}
export default AuthButtons;
