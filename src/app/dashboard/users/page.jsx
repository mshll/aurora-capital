import { getAllUsers } from '@/actions/users';
import GetAllUsers from '@/components/GetAllUser';
import { baseUrl } from '@/actions/config';
import MainLayout from '@/components/MainLayout';

async function Users() {
  const allUsers = await getAllUsers();
  return (
    <div className='row-span-2 flex max-h-[calc(100vh-6.5rem)] flex-1 flex-col items-stretch'>
      <div className='mb-3 flex w-full items-center justify-between px-2'>
        <h2 className='text-xl font-semibold'>User List</h2>
      </div>
      <GetAllUsers baseUrl={baseUrl} users={allUsers} colsNum={3} />
    </div>
  );
}

export default Users;
