import { GlareCard } from '@/components/ui/glare-card';
import Image from 'next/image';

function BankCard() {
  return (
    <div className='card mt-20 w-80'>
      <div className='card__content relative p-20 text-center font-bold text-white transition-transform duration-1000'>
        <div className='card__front absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center p-8'>
          <GlareCard>
            <Image src='/aziz3.png' alt='Aziz' width={300} height={200} />
          </GlareCard>
        </div>
        <div className='card__back absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center p-8'>
          <GlareCard>
            <Image src='/aziz3.png' alt='Aziz' width={300} height={200} />
          </GlareCard>
        </div>
      </div>
    </div>
  );
}

export default BankCard;
