'use client';
import { useState } from 'react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { transfer } from '@/actions/transactions';
import { toast } from 'sonner';

function TransferLinkWidget({ user, users, me }) {
  const [selectedBeneficiary, setSelectedBeneficiary] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  const [payMeAmount, setPayMeAmount] = React.useState('');
  const [payMeLink, setPayMeLink] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const amount = Number(formData.get('amount'));

    // Check if terms are accepted
    if (!isChecked) {
      toast.error('Terms Required', {
        description: 'Please accept the terms and conditions.',
      });
      return;
    }

    // Check for sufficient funds
    if (me.balance < amount) {
      toast.error('Insufficient Funds', {
        description: 'Please enter a valid amount.',
      });
      return;
    }

    transfer(formData, selectedBeneficiary);

    // Successful transfer
    toast.success('Transfer Successful!', {
      description: `Transfer of ${amount} KWD to ${selectedBeneficiary} was successful.`,
    });
  };

  const handleGeneratePayMeLink = () => {
    if (payMeAmount) {
      const link = `${window.location.origin}/transfer?userid=${user._id}&username=${me.username}&amount=${payMeAmount}`;
      setPayMeLink(link);
      toast.success('Link Generated!', {
        description: 'Share the link to receive funds.',
      });
    }
  };

  return (
    <Tabs defaultValue='account' className='w-[500px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='account'>Transfer</TabsTrigger>
        <TabsTrigger value='password'>Pay Me</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>
        <Card>
          <CardHeader>
            <CardTitle>Transfer funds to a beneficiary</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='flex flex-col justify-evenly space-y-5'>
              <Select value={selectedBeneficiary} onValueChange={(value) => setSelectedBeneficiary(value)} required>
                <SelectTrigger>
                  <SelectValue placeholder='Select a Beneficiary'>
                    {selectedBeneficiary || 'Select a Beneficiary'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup label='Beneficiaries'>
                    {users.map((user, index) => (
                      <SelectItem key={`adshjkgadshj${index}`} value={user.username}>
                        {' '}
                        {user.username}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className='flex flex-row items-center justify-between'>
                <Input className='w-3/4' type='number' placeholder='Amount' name='amount' min='1' required />
                <p>KWD</p>
              </div>

              <Textarea placeholder='Purpose of transfer' />

              <div className='flex items-center space-x-2 p-1 pb-2 pt-2'>
                <Checkbox id='terms' checked={isChecked} onClick={(e) => setIsChecked(!isChecked)} />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Accept terms and conditions
                </label>
              </div>

              <Button type='submit' variant='outline'>
                Transfer
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='password'>
        <Card>
          <CardHeader>
            <CardTitle>Generate a link to receive funds</CardTitle>
          </CardHeader>
          <CardContent className='space-y-5'>
            <Input
              type='number'
              placeholder='Enter amount'
              value={payMeAmount}
              onChange={(e) => setPayMeAmount(e.target.value)}
              min='1'
              className='w-full'
            />
            <Button variant='outline' onClick={handleGeneratePayMeLink}>
              Generate Link
            </Button>
            {payMeLink && (
              <div className='mt-4 flex flex-col gap-5'>
                <Label>Share this link to receive funds:</Label>
                <Link href={payMeLink} className='break-words text-blue-500'>
                  {payMeLink}
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default TransferLinkWidget;
