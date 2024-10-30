import DepositWithdrawWidget from '@/components/DepositWithdrawWidget';

function DashboardTransferPage() {
  return (
    <>
      <main className='relative flex h-full flex-col items-center justify-start'>
        <DepositWithdrawWidget className={'mt-32 flex min-w-[40rem] flex-col items-stretch'} />
      </main>
    </>
  );
}
export default DashboardTransferPage;
