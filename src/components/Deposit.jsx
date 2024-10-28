import { depositMoney } from '@/actions/transactions';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

const DepositToAccount = () => {
  return (
    <div>
      <form action={depositMoney} className='flex w-full flex-col items-start gap-4'>
        <Label htmlFor='amount' className='text-right'>
          Amount
        </Label>
        <div className='flex w-full flex-1 gap-4'>
          <Input type='number' name='amount' defaultValue='' placeholder='Enter Amount' className='flex-1' required />
          <Button type='submit'>Deposit</Button>
        </div>
      </form>
    </div>
  );
};

export default DepositToAccount;
