import clsx from 'clsx';
import * as React from 'react';

export function OverlayRoot({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx('flex flex-col w-full h-screen bg-transparent overflow-hidden', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
