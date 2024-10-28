import { getAllUsers } from '@/actions/users';
import GetAllUsers from '@/components/GetAllUser';

async function Users() {
  const allUsers = await getAllUsers();
  return <GetAllUsers users={allUsers} />;
}

export default Users;
