import { getUser } from '@/actions/token';
import MainLayout from '@/components/MainLayout';
import TransferPageWidget from '@/components/TransferPageWidget';
import { redirect } from 'next/navigation';

const EditableAmount = async () => {
  const user = await getUser();

  return (
    <MainLayout>
      <TransferPageWidget user={user} />
    </MainLayout>
  );
};

export default EditableAmount;
