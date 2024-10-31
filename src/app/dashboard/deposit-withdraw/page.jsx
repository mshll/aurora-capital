import DepositWithdrawWidget from '@/components/DepositWithdrawWidget';

function DashboardTransferPage() {
  return (
    <>
      <main className='relative flex h-full flex-col items-center justify-start'>
        <DepositWithdrawWidget className={'mt-32 flex flex-col items-stretch md:min-w-[20rem] lg:min-w-[40rem]'} />
      </main>
    </>
  );
}
export default DashboardTransferPage;
