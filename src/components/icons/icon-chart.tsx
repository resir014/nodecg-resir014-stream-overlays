import * as React from 'react';

export const IconChart: React.FC<React.SVGAttributes<SVGSVGElement>> = props => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7 22H4a.975.975 0 01-.707-.308A1.081 1.081 0 013 20.947v-8.42c0-.28.105-.548.293-.745A.975.975 0 014 11.474h3c.265 0 .52.11.707.308.188.197.293.465.293.744v8.421c0 .28-.105.547-.293.745A.975.975 0 017 22zm7 0h-3a.975.975 0 01-.707-.308 1.082 1.082 0 01-.293-.745V3.053c0-.28.105-.547.293-.745A.975.975 0 0111 2h3c.265 0 .52.11.707.308.188.198.293.465.293.745v17.894c0 .28-.105.547-.293.745A.975.975 0 0114 22zm7 0h-3a.975.975 0 01-.707-.308 1.082 1.082 0 01-.293-.745V9.368c0-.279.105-.546.293-.744A.975.975 0 0118 8.316h3c.265 0 .52.11.707.308.188.198.293.465.293.744v11.58c0 .279-.105.546-.293.744A.975.975 0 0121 22z"
        fill="currentColor"
      />
    </svg>
  );
};