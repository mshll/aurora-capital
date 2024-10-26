'use client';

import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import * as z from 'zod';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { login } from '@/actions/auth';

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
    .min(2, {
      message: 'Password must be at least 8 characters.',
    }),
});

function LoginForm() {
  const [values, setValues] = useState({});

  return (
    <>
      <AutoForm
        onSubmit={(data, { setError }) => {
          login(data);
          setValues({
            username: '',
            password: '',
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
        <AutoFormSubmit className={'w-full'}>Log in</AutoFormSubmit>
      </AutoForm>
      <div className='flex items-center gap-4'>
        <Separator className='flex-1' />
        <span className='text-xs uppercase text-muted-foreground/[.4]'>or continue with</span>
        <Separator className='flex-1' />
      </div>
      <Button
        variant='outline'
        className='w-full gap-3'
        onClick={() => {
          window.alert(
            "You didn't think this would actually work, did you?\n Just log in with your username and password.",
          );
        }}
      >
        <GitHubLogoIcon className='h-6 w-6' />
        <span>GitHub</span>
      </Button>
    </>
  );
}

export default LoginForm;
