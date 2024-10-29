import MainLayout from '@/components/MainLayout';

import { myProfile } from '@/actions/users';
import ProfilePage from '@/components/ProfilePage';

export default async function Profile() {
  const profile = await myProfile();
  return (
    <MainLayout>
      <ProfilePage profile={profile} />
    </MainLayout>
  );
}
