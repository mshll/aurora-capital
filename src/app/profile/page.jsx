import { myProfile } from '@/actions/users';
import ProfilePage from '@/components/ProfilePage';

export default async function Profile() {
  const profile = await myProfile();
  return (
    <div>
      <ProfilePage profile={profile} />
    </div>
  );
}
