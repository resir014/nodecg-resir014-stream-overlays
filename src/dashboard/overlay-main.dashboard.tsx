import {
  Container,
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from '~/components/layout';
import { PrestreamSettings } from '~/modules/overlay-main/prestream-settings';
import { StudioClockDashboard } from '~/modules/overlay-main/studio-clock-dashboard';

import './overlay-main.dashboard.css';

const theme = extendTheme({
  // ...
});

function DashboardRoot() {
  return (
    <CssVarsProvider theme={theme} defaultColorScheme="dark">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Root>
          <CssBaseline />
          <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <StudioClockDashboard />
              </Grid>
              <Grid item xs={9}>
                <PrestreamSettings />
              </Grid>
            </Grid>
          </Container>
        </Root>
      </LocalizationProvider>
    </CssVarsProvider>
  );
}

ReactDOM.render(<DashboardRoot />, document.getElementById('root'));
