'use client';

import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import * as z from 'zod';
import { DependencyType } from './ui/auto-form/types';
import { useState } from 'react';

const formSchema = z
  .object({
    profileImage: z
      .string({
        required_error: 'Profile image is required.',
      })
      .describe('Profile image'),

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
      .min(8, {
        message: 'Password must be at least 8 characters.',
      }),

    confirm: z
      .string({
        required_error: 'Confirm password is required.',
      })
      .min(8, {
        message: 'Confirm password must be at least 8 characters.',
      })
      .describe('Confirm password.'),

    acceptTerms: z.boolean().describe('Accept terms and conditions.'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match.',
    path: ['confirm'],
  });

function RegisterForm() {
  const [values, setValues] = useState({});

  return (
    <>
      <AutoForm
        onSubmit={(data, { setError }) => {
          // TODO submit data to server
          console.log(data);
          setValues({
            username: '',
            password: '',
            confirm: '',
            profileImage: '',
            acceptTerms: false,
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
          confirm: {
            inputProps: {
              type: 'password',
              placeholder: '••••••••',
            },
          },
          profileImage: {
            fieldType: 'file',
            inputProps: {
              accept: 'image/*',
              required: true,
            },
          },
          acceptTerms: {
            fieldType: 'checkbox',
            inputProps: {
              required: true,
            },
            description: (
              <>
                I agree to the{' '}
                <a href='#' className='text-primary underline'>
                  terms and conditions
                </a>
                .
              </>
            ),
          },
        }}
        dependencies={[
          {
            sourceField: 'password',
            type: DependencyType.HIDES,
            targetField: 'confirm',
            when: (value) => !value,
          },
        ]}
      >
        {/* <ImageUpload required /> */}
        <AutoFormSubmit className={'w-full'}>Sign Up</AutoFormSubmit>
      </AutoForm>
    </>
  );
}

export default RegisterForm;
