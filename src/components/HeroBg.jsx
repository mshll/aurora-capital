'use client';

import { AuroraBackground } from '@/components/ui/aurora-background';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

function HeroBg({ children, className }) {
  return (
    <AuroraBackground className={cn('w-full', className)}>
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
