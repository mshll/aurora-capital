'use client';

import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import * as z from 'zod';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { login } from '@/actions/auth';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

const formSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required.',
    })
    .min(3, {
      message: 'Username must be at least 3 characters.',
    }),

  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(4, {
      message: 'Password must be at least 4 characters.',
    }),
});

function LoginForm() {
  const [values, setValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <AutoForm
        onSubmit={(data) => {
          setIsLoading(true);
          login(data).then((res) => {
            setIsLoading(false);
            if (!res) {
              toast.error('Username or password is incorrect, please try again.');
              setValues({
                ...values,
                password: '',
              });
            } else {
              toast.success('Logged in successfully.');
              redirect('/');
            }
          });
        }}
        values={values}
        onValuesChange={setValues}
        className={'min-w-[20rem]'}
        formSchema={formSchema}
        fieldConfig={{
          password: {
            inputProps: {
              type: 'password',
              placeholder: '••••••••',
            },
          },
        }}
      >
        <AutoFormSubmit className={'w-full'} disabled={isLoading}>
          {isLoading ? <LoaderCircle className='h-6 w-6 animate-spin' /> : 'Log In'}
        </AutoFormSubmit>
      </AutoForm>
      <div className='flex items-center gap-4'>
        <Separator className='flex-1' />
        <span className='text-xs uppercase text-muted-foreground/[.4]'>or</span>
        <Separator className='flex-1' />
      </div>
      <Button
        variant='outline'
        className='w-full gap-3'
        onClick={() => {
          // window.alert("You didn't think this would actually work, did you?");
          toast("You didn't think this would actually work, did you?", {
            action: {
              label: ':(',
            },
          });
        }}
      >
        <GitHubLogoIcon className='h-6 w-6' />
        <span>Continue With GitHub</span>
      </Button>
    </>
  );
}

export default LoginForm;
