// BankCard.jsx
'use client';

import { Button } from '@/components/ui/button';
import { GlareCard } from '@/components/ui/glare-card';
import Image from 'next/image';
import { useState } from 'react';

function BankCard() {
  const [selectedCard, setSelectedCard] = useState('debit');
  const cardDesigns = ['debit', 'credit'];
  const [isPinVisible, setisPinVisible] = useState(false);
  const [pin] = useState(Math.floor(1000 + Math.random() * 9000).toString());

  return (
    <div className='mt-6 flex flex-col items-center justify-center'>
      <div className='flex'>
        <div className='card mt-[120px] scale-75 md:scale-100'>
          <div className='card__content relative min-w-[300px] p-20 text-center font-bold text-white transition-transform duration-1000'>
            <div className='card__front absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center p-8'>
              <GlareCard className='z-0'>
                <Image src={`/${selectedCard}_front.png`} alt='Selected Card' width={300} height={200} />
              </GlareCard>
            </div>
            <div className='card__back absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center p-8'>
              <GlareCard className='z-0'>
                <Image src={`/${selectedCard}_back.png`} alt='Selected Card' width={300} height={200} />
              </GlareCard>
            </div>
          </div>
        </div>

        <div className='side-menu ml-4 mt-2'>
          <div className='card-designs flex flex-col'>
            {cardDesigns.map((design) => (
              <Image
                key={design}
                src={`/${design}_front.png`}
                alt='Card design preview'
                className='mb-3 h-auto w-20 cursor-pointer rounded-md'
                onClick={() => setSelectedCard(design)}
                width={300}
                height={200}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='mt-[150px] flex flex-col'>
        <Button onClick={() => setisPinVisible(!isPinVisible)} variant='outline' className='md:px-32'>
          {isPinVisible ? 'Hide pin' : 'Show pin'}
        </Button>
        {isPinVisible && <p className='mt-2 text-center text-lg font-semibold text-muted-foreground'>{pin}</p>}
      </div>
    </div>
  );
}

export default BankCard;
