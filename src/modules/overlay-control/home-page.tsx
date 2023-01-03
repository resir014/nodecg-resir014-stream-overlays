import { Grid } from '@mui/material';
import * as React from 'react';
import { Page } from '~/components/layout/page';
import { StudioClockDashboard } from './widgets/studio-clock-dashboard';

export function HomePage() {
  return (
    <Page>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <StudioClockDashboard />
        </Grid>
      </Grid>
    </Page>
  );
}
