import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import React from 'react';

const HelloWordl = () => {
  return (
    <MainLayout>
      <div className='h-500 w-500 flex flex-col items-center justify-center gap-5'>
        <h1>Contact us</h1>
        <Form action={''}>
          <Label>Enter Name</Label>
          <Input type='text' placeholder='Enter Email'></Input>
          <Label>Enter Email</Label>

          <Input type='text'></Input>
          <Label>Enter Contact Number</Label>

          <Input type='text'></Input>
          <Label>Enter Purpose of contact</Label>
          <Input type='text'></Input>

          <Button type='submit'>howdy</Button>
        </Form>
      </div>
    </MainLayout>
  );
};

export default HelloWordl;
