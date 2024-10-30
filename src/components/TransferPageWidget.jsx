'use client';
import { Button } from '@/components/ui/button';
import { CreditCardIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { findUserById } from '@/actions/users';
import { transfer } from '@/actions/transactions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

function TransferPageWidget({ user }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const userID = searchParams.get('userid');
  const username = searchParams.get('username');
  const amountParam = searchParams.get('amount');
  const [amount, setAmount] = useState(amountParam);
  const [recieverName, setRecieverName] = useState(username);
  const [selectedMethod, setSelectedMethod] = useState(null); // Track selected payment method

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reciever = await findUserById(userID);
        setRecieverName(reciever.username);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userID]);

  const handleUpdate = () => {
    const newUrl = `${pathname}?userid=${userID}&username=${username}&amount=${amount}`;
    router.push(newUrl);
  };

  const handlePayment = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const amount = Number(formData.get('amount'));

    transfer(formData, username);

    toast.success('Transfer Successful!', {
      description: `Transfer of ${amount} KWD to ${username} was successful.`,
    });
  };

  if (user._id === userID) {
    return (
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Edit Payment Request</CardTitle>
          <CardDescription>Change the amount you would like to request</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='amount'>Amount</Label>
                <Input
                  type='number'
                  id='amount'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder='Enter new amount'
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex flex-row justify-between'>
          <Button onClick={() => router.push('/dashboard')} variant='destructive'>
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant='outline'>
            Update
          </Button>
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <Card className='w-[350px]'>
        <form onSubmit={handlePayment}>
          <CardHeader>
            <CardTitle>Pay {recieverName}</CardTitle>
            <CardDescription>Choose your payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='w-full rounded-lg bg-card pb-5 pt-5 shadow-lg'>
              <div className='mb-8 flex flex-col items-center'>
                <h1 className='text-4xl font-bold'>Total</h1>
                <p className='text-5xl font-bold text-foreground'>${amount}</p>
              </div>
              <div className='flex flex-col gap-4'>
                <Button
                  type='button'
                  className={`w-full hover:text-background ${selectedMethod === 'card' ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}
                  onClick={() => setSelectedMethod('card')}
                >
                  <CreditCardIcon className='mr-4 h-5 w-5' />
                  Pay with Card
                </Button>
                <Button
                  type='button'
                  className={`w-full hover:text-background ${selectedMethod === 'knet' ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}
                  onClick={() => setSelectedMethod('knet')}
                >
                  {/* <CreditCardIcon className="mr-4 h-5 w-5" /> */}
                  <Image
                    src='knet.svg'
                    alt='KNET'
                    width={20}
                    height={20}
                    className={`mr-4 inline-block rounded-full ${selectedMethod === 'knet' ? 'light:invert' : 'dark:invert'}`}
                  />
                  Pay with KNET
                </Button>
              </div>
            </div>

            <Input type='hidden' id='amount' name='amount' value={amount} />
          </CardContent>
          <CardFooter className='flex flex-row justify-between'>
            <Button onClick={() => router.push('/dashboard')} variant='destructive'>
              Cancel
            </Button>
            <Button type='submit' variant='ghost'>
              Pay
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }
}

export default TransferPageWidget;
