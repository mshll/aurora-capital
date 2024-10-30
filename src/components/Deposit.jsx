import { depositMoney } from '@/actions/transactions';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';

const DepositToAccount = () => {
  return (
    <div>
      <form action={depositMoney} className='flex w-full flex-col items-start gap-4'>
        <Input type='number' name='amount' defaultValue='' placeholder='Enter Amount' className='flex-1' required />
        <Button type='submit'>Deposit</Button>
      </form>
    </div>
  );
};

export default DepositToAccount;
