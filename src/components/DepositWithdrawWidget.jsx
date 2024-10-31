'use client';
import { depositMoney, withdrawMoney } from '@/actions/transactions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import PayCard from './PayCard';

function DepositWithdrawWidget({ className, ...props }) {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab') || 'deposit';

  function handleDepositWithdraw(type) {
    const isDeposit = type === 'deposit';
    const formData = new FormData();
    formData.append('amount', isDeposit ? depositAmount : withdrawAmount);

    let promise = isDeposit ? depositMoney(formData) : withdrawMoney(formData);

    toast.promise(promise, {
      loading: 'Processing...',
    });

    promise.then((res) => {
      if (res) {
        toast.success(`${isDeposit ? 'Deposit' : 'Withdrawal'} successful`);
        isDeposit ? setDepositAmount('') : setWithdrawAmount('');
      } else {
        toast.error(`${isDeposit ? 'Deposit' : 'Withdrawal'} failed`);
      }
    });
  }

  return (
    <div className={className} {...props}>
      <Tabs defaultValue={tab}>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='deposit'>Deposit</TabsTrigger>
          <TabsTrigger value='withdraw'>Withdraw</TabsTrigger>
        </TabsList>
        <TabsContent value='deposit'>
          <PayCard
            title='Deposit funds into your account'
            inputLabel='Enter amount'
            buttonText='Deposit'
            onSubmit={() => handleDepositWithdraw('deposit')}
            inputVal={depositAmount}
            setInputVal={setDepositAmount}
          />
        </TabsContent>

        <TabsContent value='withdraw'>
          <PayCard
            title='Withdraw funds from your account'
            inputLabel='Enter amount'
            buttonText='Withdraw'
            onSubmit={() => handleDepositWithdraw('withdraw')}
            inputVal={withdrawAmount}
            setInputVal={setWithdrawAmount}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DepositWithdrawWidget;
