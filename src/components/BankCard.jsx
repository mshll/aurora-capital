import React from 'react'
import { GlareCard } from '@/components/ui/glare-card'

function BankCard() {
  return (
    <div className="card w-80 mt-20">
  <div class="card__content text-center relative p-20 transition-transform duration-1000 text-white font-bold">
    <div class="card__front absolute top-0 bottom-0 right-0 left-0 p-8 flex items-center justify-center">
    <GlareCard>
        <img src='aziz3.png' alt="Aziz" width={300} height={200} />
    </GlareCard>
    </div>
    <div class="card__back absolute top-0 bottom-0 right-0 left-0 p-8 flex items-center justify-center">
    <GlareCard>

    <img src='aziz3.png' alt="Aziz" width={300} height={200} />
    </GlareCard>
    </div>
  </div>
  </div>
  )
}

export default BankCard
