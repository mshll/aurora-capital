'use client';
import { useState } from 'react';
import * as React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
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
import PayCard from './PayCard';
import { useSearchParams } from 'next/navigation';

function TransferLinkWidget({ user, users, me, defaultTab = 'transfer', minTransfer = false, className, ...props }) {
  const [selectedBeneficiary, setSelectedBeneficiary] = useState();
  const [isChecked, setIsChecked] = React.useState(false);
  const [payMeAmount, setPayMeAmount] = React.useState('');
  const [isCopied, setIsCopied] = useState(false);
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab') || defaultTab;

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

    const beneficiary = users.find((user) => user._id === selectedBeneficiary)?.username;
    const response = transfer(formData, beneficiary);

    toast.promise(response, {
      loading: 'Processing...',
    });

    response.then((res) => {
      if (res) {
        toast.success('Transfer Successful!', {
          description: `Transfer of ${amount} KWD to ${username} was successful.`,
        });
        event.target.reset();
      } else {
        toast.error('Payment failed');
      }
    });
  };

  const handleGeneratePayMeLink = () => {
    if (payMeAmount) {
      const link = `${window.location.origin}/transfer?userid=${user._id}&username=${me.username}&amount=${payMeAmount}`;
      navigator.clipboard.writeText(link);
      toast.success('Pay Me Link Generated!', {
        description: 'Link copied to clipboard, share it to receive funds.',
        action: {
          label: 'Open Link',
          onClick: () => window.open(link, '_blank'),
        },
      });
    }
  };

  const handleCopy = async (payMeLink) => {
    try {
      await navigator.clipboard.writeText(payMeLink);
      setIsCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000); // Reset copy state after 2 seconds
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy link.');
    }
  };

  return (
    <div className={className} {...props}>
      <Tabs defaultValue={tab}>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='transfer'>Transfer</TabsTrigger>
          <TabsTrigger value='pay-me'>Pay Me</TabsTrigger>
        </TabsList>
        <TabsContent value='transfer'>
          {!minTransfer ? (
            <Card>
              <CardHeader>
                <CardTitle>Transfer funds to a beneficiary</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className='flex flex-col justify-evenly space-y-5'>
                  <Select value={selectedBeneficiary} onValueChange={(value) => setSelectedBeneficiary(value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a Beneficiary'>
                        {users.find((user) => user._id === selectedBeneficiary)?.username || 'Select a Beneficiary'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup label='Beneficiaries'>
                        {users.map((user) => (
                          <SelectItem key={`user-transfer-widget-${user._id}`} value={user._id}>
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
          ) : (
            // Minimized transfer card
            <Card>
              <CardHeader>
                <CardTitle>Transfer funds to a beneficiary</CardTitle>
                <CardDescription>Visit the transfer page to transfer funds to a beneficiary.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col items-end justify-center gap-y-4 pt-6'>
                  <Link type='submit' className={buttonVariants({ variant: 'secondary' })} href='/dashboard/transfer'>
                    Go to transfer page
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value='pay-me'>
          <PayCard
            title='Generate a link to receive funds'
            inputLabel='Enter amount'
            buttonText='Generate Link'
            onSubmit={handleGeneratePayMeLink}
            inputVal={payMeAmount}
            setInputVal={setPayMeAmount}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TransferLinkWidget;
