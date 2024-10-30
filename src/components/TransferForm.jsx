import { transfer } from '@/actions/transactions';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

function TransferForm({ username }) {
  const handlePayment = () => {
    event.preventDefault();
    const formEvent = event.target;
    const formData = new FormData(formEvent);
    const amount = Number(formData.get('amount'));

    const response = transfer(formData, username);

    toast.promise(response, {
      loading: 'Processing...',
    });

    response.then((res) => {
      if (res) {
        toast.success('Transfer Successful!', {
          description: `Transfer of ${amount} KWD to ${username} was successful.`,
        });
        formEvent.reset();
      } else {
        toast.error('Payment failed');
      }
    });
  };

  return (
    <form onSubmit={handlePayment} className='flex w-full flex-col items-start gap-4'>
      <Label htmlFor='amount' className='text-right'>
        Amount
      </Label>
      <div className='flex w-full flex-1 gap-4'>
        <Input name='amount' defaultValue='' placeholder='Enter Amount' className='flex-1' required />
        <input type='submit' id='submit-transfer-form' className='hidden' />
      </div>
    </form>
  );
}

export default TransferForm;
