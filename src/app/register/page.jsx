import HeroBg from '@/components/HeroBg';
import MainLayout from '@/components/MainLayout';
import RegisterForm from '@/components/RegisterForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { metadata } from '../layout';

export default function RegisterPage() {
  return (
    <MainLayout>
      <div className='w-full'>
        <HeroBg className='flex size-full flex-1 flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20'>
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Create an account</CardTitle>
              <CardDescription>Register for your {metadata.title} account.</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <RegisterForm />
            </CardContent>
            <CardFooter>
              <p className='text-xs text-muted-foreground'>
                Already have an account?
                <Link href='/login'>
                  <Button variant='link' size='sm' className='px-1 text-muted-foreground'>
                    Log in here.
                  </Button>
                </Link>
              </p>
            </CardFooter>
          </Card>
        </HeroBg>
      </div>
    </MainLayout>
  );
}
