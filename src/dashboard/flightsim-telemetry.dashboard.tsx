import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FlightsimTelemetryDashboard } from '~/modules/flightsim-telemetry/flightsim-telemetry-dashboard';

const theme = extendTheme({
  // ...
});

function DashboardRoot() {
  return (
    <CssVarsProvider theme={theme} defaultColorScheme="dark">
      <FlightsimTelemetryDashboard />
    </CssVarsProvider>
  );
}

ReactDOM.render(<DashboardRoot />, document.getElementById('root'));
