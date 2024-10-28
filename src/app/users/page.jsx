import { getAllUsers } from '@/actions/users';
import GetAllUsers from '@/components/GetAllUser';
import { baseUrl } from '@/actions/config';

async function Users() {
  const allUsers = await getAllUsers();
  return <GetAllUsers baseUrl={baseUrl} users={allUsers} />;
}

export default Users;
