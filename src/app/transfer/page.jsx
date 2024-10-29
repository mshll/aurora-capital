import { getUser } from '@/actions/token';
import MainLayout from '@/components/MainLayout';
import TransferPageWidget from '@/components/TransferPageWidget';

const EditableAmount = async () => {
  const user = await getUser();

  // useEffect(() => {
  //   if (amountParam) {
  //     setAmount(amountParam);
  //   }
  // }, [amountParam]);

  // const handleChange = (e) => {
  //   const newAmount = e.target.value;
  //   setAmount(newAmount);

  //   // Update the URL with the new amount without reloading the page
  //   const newUrl = `${pathname}?amount=${newAmount}`;
  //   router.push(newUrl);
  // };

  return (
    <MainLayout>
      <TransferPageWidget user={user} />
    </MainLayout>
  );
};

export default EditableAmount;
