import { Grid } from '@mui/material';
import * as React from 'react';
import { Page } from '~/components/layout/page';
import { AlertQueueDebugWidget } from './widgets/alert-queue-debug';
import { StudioClockDashboard } from './widgets/studio-clock-dashboard';

export function HomePage() {
  return (
    <Page>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <StudioClockDashboard />
        </Grid>
        <Grid item xs={9}>
          <AlertQueueDebugWidget />
        </Grid>
      </Grid>
    </Page>
  );
}
