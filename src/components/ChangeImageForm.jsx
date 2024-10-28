'use client';

import { updateProfile } from '@/actions/users';
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import * as z from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { redirect } from 'next/navigation';

const MAX_FILE_SIZE = 25000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const formSchema = z.object({
  image: z
    .any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Please upload a valid image file (jpeg, jpg, png, webp).',
    )
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is ${MAX_FILE_SIZE / 1000000}MB.`)
    .describe('Update profile image'),
});

function ChangeImageForm() {
  const [values, setValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <AutoForm
        onSubmit={(data) => {
          setIsLoading(true);
          updateProfile(data).then((res) => {
            setIsLoading(false);
            if (!res) {
              toast.error('An error occurred while updating your profile.');
            } else {
              toast.success('Profile updated successfully.');
              setValues({});
              redirect('/profile');
            }
          });
        }}
        values={values}
        onValuesChange={setValues}
        className={'min-w-[20rem]'}
        formSchema={formSchema}
        fieldConfig={{
          image: {
            fieldType: 'file',
            inputProps: {
              accept: 'image/*',
              required: true,
            },
          },
        }}
      >
        <AutoFormSubmit className={'w-full'} disabled={isLoading}>
          {isLoading ? <LoaderCircle className='h-6 w-6 animate-spin' /> : 'Change Image'}
        </AutoFormSubmit>
      </AutoForm>
    </>
  );
}

export default ChangeImageForm;
