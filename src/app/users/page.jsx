import { getAllUsers } from '@/actions/users';
import GetAllUsers from '@/components/GetAllUser';
import { baseUrl } from '@/actions/config';
import MainLayout from '@/components/MainLayout';

async function Users() {
  const allUsers = await getAllUsers();
  return (
    <MainLayout>
      <GetAllUsers baseUrl={baseUrl} users={allUsers} />
    </MainLayout>
  );
}

export default Users;
