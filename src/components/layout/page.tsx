import { Container, ContainerProps } from '@mui/material';
import * as React from 'react';

export function Page({ children, sx, ...rest }: ContainerProps) {
  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 4, ...sx }} {...rest}>
      {children}
    </Container>
  );
}
