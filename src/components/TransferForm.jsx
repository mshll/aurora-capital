import { transfer } from '@/actions/transactions';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Label } from './ui/label';
import { Button } from './ui/button';

function TransferForm({ username }) {
  return (
    <form action={(formData) => transfer(formData, username)} className='flex w-full flex-col items-start gap-4'>
      <Label htmlFor='amount' className='text-right'>
        Amount
      </Label>
      <div className='flex w-full flex-1 gap-4'>
        <Input type='number' name='amount' defaultValue='' placeholder='Enter Amount' className='flex-1' required />
        <Button type='submit'>Transfer</Button>
      </div>
    </form>
  );
}

export default TransferForm;
