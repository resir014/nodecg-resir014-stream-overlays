import { Grid } from '@mui/material';
import * as React from 'react';
import { Page } from '~/components/layout/page';
import { PrestreamSettings } from './widgets/prestream-settings-widget';

export function SettingsPage() {
  return (
    <Page>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PrestreamSettings />
        </Grid>
      </Grid>
    </Page>
  );
}
