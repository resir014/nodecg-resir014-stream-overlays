import { Box, BoxProps } from '@mui/material';
import * as React from 'react';

export function LayoutRoot({ children, sx, ...rest }: BoxProps) {
  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
