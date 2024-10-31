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
          className={'mt-32 flex flex-col items-stretch md:min-w-[20rem] lg:min-w-[40rem]'}
          user={user}
          me={me}
          users={allUsers}
        />
      </main>
    </>
  );
}
export default DashboardTransferPage;
