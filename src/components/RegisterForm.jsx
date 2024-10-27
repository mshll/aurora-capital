'use client';

import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import * as z from 'zod';
import { DependencyType } from './ui/auto-form/types';
import { register } from '@/actions/auth';
import { FormControl, FormDescription, FormItem, FormLabel } from './ui/form';
import { Switch } from '@radix-ui/react-switch';

const MAX_FILE_SIZE = 25000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const formSchema = z
  .object({
    image: z
      .any()
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Please upload a valid image file (jpeg, jpg, png, webp).',
      )
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is ${MAX_FILE_SIZE / 1000000}MB.`)
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

    acceptTerms: z
      .boolean()
      .describe('Accept terms and conditions.')
      .refine((data) => data, {
        message: 'You must accept the terms and conditions.',
      }),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match.',
    path: ['confirm'],
  });

function RegisterForm() {
  return (
    <>
      <AutoForm
        onSubmit={(data, { setError }) => {
          register(data);
        }}
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
          image: {
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
        <AutoFormSubmit className={'w-full'}>Sign Up</AutoFormSubmit>
      </AutoForm>
    </>
  );
}

export default RegisterForm;
