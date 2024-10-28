import LoginForm from '@/components/LoginForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { metadata } from '../layout';
import MainLayout from '@/components/MainLayout';

export default function LoginPage() {
  return (
    <MainLayout>
      <div className='flex h-full flex-1 flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20'>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>Welcome back</CardTitle>
            <CardDescription>Log in to your {metadata.title} account.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <LoginForm />
          </CardContent>
          <CardFooter>
            <p className='text-xs text-muted-foreground'>
              Don&apos;t have an account?
              <Link href='/register'>
                <Button variant='link' size='sm' className='px-1 text-muted-foreground'>
                  Register now!
                </Button>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
