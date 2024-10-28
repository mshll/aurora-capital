import { withdrawMoney } from '@/actions/transactions';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

const WithdrawToAccount = () => {
  return (
    <form action={withdrawMoney} className='flex w-full flex-col items-start gap-4'>
      <Label htmlFor='amount' className='text-right'>
        Amount
      </Label>
      <div className='flex w-full flex-1 gap-4'>
        <Input type='number' name='amount' defaultValue='' placeholder='Enter Amount' className='flex-1' required />
        <Button type='submit'>Withdraw</Button>
      </div>
    </form>
  );
};

export default WithdrawToAccount;
