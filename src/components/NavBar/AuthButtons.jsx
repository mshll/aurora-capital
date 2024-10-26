import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getUser } from '@/actions/token';
import ProfileMenu from '../ProfileMenu';

async function AuthButtons() {
  const user = await getUser();

  if (user) return <ProfileMenu />;

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
