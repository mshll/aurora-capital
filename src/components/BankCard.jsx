// BankCard.jsx
"use client" 


import React, { useState } from 'react';
import { GlareCard } from '@/components/ui/glare-card';
import { Button } from '@/components/ui/button'

function BankCard() {
  const [selectedCard, setSelectedCard] = useState('debit');
  const cardDesigns = ['debit', 'credit']; 
  const [isPinVisible, setisPinVisible] = useState(false); 
  const pin = "1234"; 

  return (
    <div className="flex flex-col items-center justify-center">
    <div className="flex">
      <div className="card w-80 mt-[120px]">
        <div className="card__content text-center relative p-20 transition-transform duration-1000 text-white font-bold">
          <div className="card__front absolute top-0 bottom-0 right-0 left-0 p-8 flex items-center justify-center">
            <GlareCard className="z-0">
              <img src={`${selectedCard}_front.png`} alt="Selected Card" width={300} height={200} />
            </GlareCard>
          </div>
          <div className="card__back absolute top-0 bottom-0 right-0 left-0 p-8 flex items-center justify-center">
            <GlareCard className="z-0">
              <img src={`${selectedCard}_back.png`} alt="Selected Card" width={300} height={200} />
            </GlareCard>
          </div>
        </div>
      </div>

      <div className='side-menu ml-4 mt-2'>
        <div className='card-designs flex flex-col'>
          {cardDesigns.map((design) => (
            <img
              key={design}
              src={`${design}_front.png`}
              alt="Card design preview"
              className="w-20 h-auto cursor-pointer mb-3 rounded-md"
              onClick={() => setSelectedCard(design)}
            />
          ))}
        </div>
      </div>
    </div>
    <div className="mt-[150px] flex flex-col w-full">
        <Button
          onClick={() => setisPinVisible(!isPinVisible)}
          variant="outline"
        >
          {isPinVisible ? "Hide pin" : "Show pin"}
        </Button>
        {isPinVisible && (
          <p className="mt-2 text-lg font-semibold text-center text-muted-foreground">
            {pin}
          </p>
        )}
      </div>
    </div>
  );
}

export default BankCard;
