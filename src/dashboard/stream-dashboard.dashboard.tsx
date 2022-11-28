import { useReplicant } from '@internal/common/use-replicant';
import type { DateMap } from '@internal/modules/clock/types';
import {
  Box,
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const theme = extendTheme({
  // ...
});

function DashboardRoot() {
  const [clockState] = useReplicant<DateMap>('clock-state');

  // You can access the NodeCG api anytime from the `window.nodecg` object
  // Or just `nodecg` for short. Like this!:
  nodecg.log.info("Here's an example of using NodeCG's logging API!");

  return (
    <CssVarsProvider theme={theme} defaultColorScheme="dark">
      <Box>{JSON.stringify(clockState, null, 2)}</Box>
    </CssVarsProvider>
  );
}

ReactDOM.render(<DashboardRoot />, document.getElementById('root'));
