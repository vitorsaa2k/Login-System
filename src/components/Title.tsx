import {clsx} from 'clsx'
import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  size?: 'sm' | 'lg';
  className?: string;
}


export function Title({size = 'sm', children, className}: TextProps) {
  return (
    <span className={clsx(
      'text-black font-medium',
      {
        'text-my-lg': size == 'sm',
        'text-my-4xl': size == 'lg',
      },
      className
      )}
      >
        {children}
      </span>
  )
}