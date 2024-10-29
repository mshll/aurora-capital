import { getUser } from '@/actions/token';
import { getAllUsers, myProfile } from '@/actions/users';
import TransferLinkWidget from '@/components/TransferLinkWidget';

async function DashboardTransferPage() {
  const me = await myProfile();
  const user = await getUser();
  const allUsers = await getAllUsers();

  return (
    <>
      <main className='relative flex h-full flex-col items-center justify-start'>
        <TransferLinkWidget
          className={'mt-32 flex min-w-[40rem] flex-col items-stretch'}
          user={user}
          me={me}
          users={allUsers}
        />
      </main>
    </>
  );
}
export default DashboardTransferPage;
