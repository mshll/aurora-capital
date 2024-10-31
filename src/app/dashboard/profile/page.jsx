import { myProfile } from '@/actions/users';
import ProfilePage from '@/components/ProfilePage';

export default async function Profile() {
  const profile = await myProfile();
  return <ProfilePage profile={profile} />;
}
