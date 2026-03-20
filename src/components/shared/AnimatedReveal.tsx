'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface AnimatedRevealProps {
  children: ReactNode;
  delay?: number;
}

export default function AnimatedReveal({ children, delay = 0 }: AnimatedRevealProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
