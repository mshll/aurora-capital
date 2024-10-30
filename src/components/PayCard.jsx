import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

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
