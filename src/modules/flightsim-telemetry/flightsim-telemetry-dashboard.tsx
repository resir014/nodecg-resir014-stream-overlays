import {
  Box,
  Chip,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import * as React from 'react';
import { useReplicant } from '~/common/use-replicant';
import { FlyLiveFlightData } from './types';
import { telemetryReplicantOpts } from './utils/telemetry-replicant';

export function FlightsimTelemetryDashboard() {
  const [showDebugData, setShowDebugData] = React.useState(false);
  const [isEnabled, setIsEnabled] = useReplicant('flylive-is-enabled', {
    defaultValue: false,
  });
  const [flightData] = useReplicant<FlyLiveFlightData>(
    'flylive-flight-telemetry',
    telemetryReplicantOpts
  );

  const isConnected = flightData?.isConnected && isEnabled;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Stack direction="row" spacing={2}>
          <FormControlLabel
            label="Enabled"
            control={
              <Switch checked={!!isEnabled} onChange={e => setIsEnabled(e.target.checked)} />
            }
          />
          <FormControlLabel
            label="Show debug data"
            control={
              <Switch
                checked={!!showDebugData}
                onChange={e => setShowDebugData(e.target.checked)}
              />
            }
          />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ ml: 2 }}>
          <Chip
            label={isConnected ? 'Connected' : 'Disconnected'}
            color={isConnected ? 'success' : 'error'}
          />
        </Stack>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="Telemetry dashboard data table">
          <TableHead>
            <TableRow>
              <TableCell>Route</TableCell>
              <TableCell>ATC</TableCell>
              <TableCell>AC</TableCell>
              <TableCell align="right">GSPD</TableCell>
              <TableCell align="right">IAS</TableCell>
              <TableCell align="right">HDG</TableCell>
              <TableCell align="right">VSPD</TableCell>
              <TableCell align="right">ALT</TableCell>
              <TableCell align="right">ETA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {flightData?.dep && flightData.arr ? (
                  <>
                    {flightData.dep} &rarr; {flightData.arr}
                  </>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>{flightData?.callsign ?? '-'}</TableCell>
              <TableCell>{flightData?.aircraftType ?? '-'}</TableCell>
              <TableCell align="right">{flightData?.groundSpeed ?? 'N/A'}</TableCell>
              <TableCell align="right">{flightData?.airSpeed ?? 'N/A'}</TableCell>
              <TableCell align="right">{flightData?.heading ?? 'N/A'}</TableCell>
              <TableCell align="right">{flightData?.vSpeed ?? 'N/A'}</TableCell>
              <TableCell align="right">{flightData?.altitude ?? 'N/A'}</TableCell>
              <TableCell align="right">{flightData?.eta ?? 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {showDebugData ? (
        <Box
          sx={{
            mt: 2,
          }}
        >
          <Paper component="pre" sx={{ p: 1 }}>
            {JSON.stringify(flightData, null, 2)}
          </Paper>
        </Box>
      ) : null}
    </>
  );
}
