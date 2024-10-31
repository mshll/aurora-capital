import { updateProfile } from '@/actions/users';
import ChangeImageForm from './ChangeImageForm';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { baseUrl } from '@/actions/config';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { UserIcon } from 'lucide-react';
import { GlareCard } from '@/components/ui/glare-card';
import BankCard from '@/components/BankCard';

const ProfilePage = ({ profile }) => {
  return (
    // <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
    //   <h1>{profile.username}</h1>
    //   <h2>Balance: {formatCurrency(profile.balance)}</h2>
    //   <ChangeImageForm />
    // </div>
    <div className='flex flex-row h-full w-3/5 justify-center gap-5 p-8 pb-20 sm:p-20'>
      <Card className='w-auto'>
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
      <Card className="flex flex-1 flex-col">
      <CardHeader>
        <CardTitle className='text-xl'>Your Cards</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center">
      <div>
        <BankCard />
      </div>
      </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
