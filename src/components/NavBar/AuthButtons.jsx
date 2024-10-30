import { getUser } from '@/actions/token';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProfileMenu from '../ProfileMenu';

async function AuthButtons() {
  const user = await getUser();

  if (user) return <ProfileMenu />;

  return (
    <>
      <Link href='/login'>
        <Button variant='ghost' size='sm'>
          Log in
        </Button>
      </Link>
      <Link href='/register'>
        <Button variant='default' size='sm'>
          Sign up
        </Button>
      </Link>
    </>
  );
}

export default AuthButtons;
