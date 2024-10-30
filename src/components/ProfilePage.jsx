import { baseUrl } from '@/actions/config';
import BankCard from '@/components/BankCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { UserIcon } from 'lucide-react';
import ChangeImageForm from './ChangeImageForm';

const ProfilePage = ({ profile }) => {
  return (
    <div className='flex flex-1 justify-center gap-5'>
      <Card className='flex flex-col overflow-visible'>
        <CardHeader>
          <CardTitle className='text-xl'>{profile.username}</CardTitle>
          <CardDescription>Balance: {formatCurrency(profile.balance, false)}</CardDescription>
        </CardHeader>
        <CardContent>
          <Avatar className='h-96 w-96 border border-border'>
            <AvatarImage src={`${baseUrl}/${profile.image}`} alt='' />
            <AvatarFallback>
              <UserIcon className='h-56 w-56' />
            </AvatarFallback>
          </Avatar>
          <ChangeImageForm />
        </CardContent>
      </Card>
      <Card className='flex flex-col'>
        <CardHeader>
          <CardTitle className='text-xl'>Your Cards</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-1 flex-col items-center'>
          <div>
            <BankCard />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
