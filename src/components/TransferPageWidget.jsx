'use client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter, redirect } from 'next/navigation';
import { findUserById } from '@/actions/users';

function TransferPageWidget({ user }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const userID = searchParams.get('userid');
  const username = searchParams.get('username');
  const amountParam = searchParams.get('amount');
  const [amount, setAmount] = useState(amountParam);
  const [recieverName, setRecieverName] = useState(username);

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

  const handleUpdate = (e) => {
    const newUrl = `${pathname}?userid=${userID}&username=${username}&amount=${amount}`;
    router.push(newUrl);
  };

  if (user._id !== userID) {
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Edit Payment Request</CardTitle>
        <CardDescription>Change the amount you would like to request</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Amount</Label>
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
    </Card>;
  }

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Pay {recieverName}</CardTitle>
        <CardDescription>Change the amount you would like to request</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Amount</Label>
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
}
export default TransferPageWidget;
