'use client';

import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';

function HeroBg({ children, className }) {
  return (
    <AuroraBackground className={'w-full'}>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className='flex w-full flex-1 flex-col items-center justify-evenly gap-16 p-8 pb-20 text-foreground sm:p-20'
      >
        {/*  */}
        {children}
        {/*  */}
      </motion.div>
    </AuroraBackground>
  );
}
export default HeroBg;
