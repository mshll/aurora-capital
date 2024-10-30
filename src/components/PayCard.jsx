import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import Link from 'next/link';
import { Form } from './ui/form';

function PayCard({ title, inputLabel, buttonText, onSubmit = () => {}, inputVal, setInputVal, formAction = '' }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={formAction}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className='flex flex-col items-end justify-center gap-y-4'>
            <Input
              type='number'
              name='amount'
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={inputLabel}
              min='1'
              required
            />
            <Button type='submit' variant='secondary' disabled={!inputVal}>
              {buttonText}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
export default PayCard;
