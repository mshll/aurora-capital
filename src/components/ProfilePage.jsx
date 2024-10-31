import { baseUrl } from '@/actions/config';
import BankCard from '@/components/BankCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { UserIcon } from 'lucide-react';
import ChangeImageForm from './ChangeImageForm';

const ProfilePage = ({ profile }) => {
  return (
    // <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
    //   <h1>{profile.username}</h1>
    //   <h2>Balance: {formatCurrency(profile.balance)}</h2>
    //   <ChangeImageForm />
    // </div>
    <div className='flex flex-col justify-center gap-5 p-8 lg:flex-row'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>{profile.username}</CardTitle>
          <CardDescription>Balance: {formatCurrency(profile.balance, false)}</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center gap-4'>
          <Avatar className='h-36 w-36 border border-border lg:h-96 lg:w-96'>
            <AvatarImage src={`${baseUrl}/${profile.image}`} alt='' />
            <AvatarFallback>
              <UserIcon className='lg:h-56 lg:w-56' />
            </AvatarFallback>
          </Avatar>
          <ChangeImageForm />
        </CardContent>
      </Card>
      <Card className='flex flex-1 flex-col'>
        <CardHeader>
          <CardTitle className='text-xl'>Your Cards</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-1 flex-col items-center'>
          <BankCard />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
