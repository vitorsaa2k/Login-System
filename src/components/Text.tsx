import { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import {clsx} from 'clsx'

interface TextProps {
  children: ReactNode;
  size?: 'sm' | 'md';
  className?: string;
  asChild?: boolean;
}


export function Text({size = 'md', children, className, asChild}: TextProps) {
  const Comp = asChild ? Slot : 'span'
  return (
    <Comp className={clsx(
      'text-black',
      {
        'text-my-xs': size == 'sm',
        'text-my-sm': size == 'md',
      },
      className
      )}
      >
        {children}
    </Comp>
  )
}