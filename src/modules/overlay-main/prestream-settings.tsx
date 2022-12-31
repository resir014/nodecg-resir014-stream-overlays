import { Card, CardContent, CardHeader, FormControl, FormGroup, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import * as React from 'react';
import { useReplicant } from '~/common/use-replicant';
import { PrestreamSettingsReplicant } from './types';

const defaultDate = new Date();
// MUI datetime picker doesn't automatically reset seconds to 0, so we do this instead.
defaultDate.setSeconds(0);

const defaultValue: PrestreamSettingsReplicant = {
  streamStart: defaultDate.toISOString(),
  timeSignal: defaultDate.toISOString(),
  breakReturnTime: defaultDate.toISOString(),
};

export function PrestreamSettings() {
  const [settings, setSettings] = useReplicant<PrestreamSettingsReplicant>('prestream-settings', {
    defaultValue,
  });

  return (
    <Card variant="outlined">
      <CardHeader title="Overlay Settings" />
      <CardContent>
        <FormGroup>
          <FormControl margin="normal">
            <DateTimePicker
              renderInput={props => <TextField {...props} />}
              label="Stream start"
              value={settings?.streamStart}
              onChange={newValue => {
                const newDate = new Date(newValue ?? Date.now());
                // MUI datetime picker doesn't automatically reset seconds to 0, so we do this instead.
                newDate.setSeconds(0);

                if (settings) {
                  setSettings({
                    ...settings,
                    streamStart: newDate.toISOString(),
                  });
                }
              }}
            />
          </FormControl>
          <FormControl margin="normal">
            <DateTimePicker
              renderInput={props => <TextField {...props} />}
              label="Break return time"
              value={settings?.breakReturnTime}
              onChange={newValue => {
                const newDate = new Date(newValue ?? Date.now());
                // MUI datetime picker doesn't automatically reset seconds to 0, so we do this instead.
                newDate.setSeconds(0);

                if (settings) {
                  setSettings({
                    ...settings,
                    breakReturnTime: newDate.toISOString(),
                  });
                }
              }}
            />
          </FormControl>
          <FormControl margin="normal">
            <DateTimePicker
              renderInput={props => <TextField {...props} />}
              label="Time signal"
              value={settings?.timeSignal}
              onChange={newValue => {
                const newDate = new Date(newValue ?? Date.now());
                // MUI datetime picker doesn't automatically reset seconds to 0, so we do this instead.
                newDate.setSeconds(0);

                if (settings) {
                  setSettings({
                    ...settings,
                    timeSignal: newDate.toISOString(),
                  });
                }
              }}
            />
          </FormControl>
        </FormGroup>
      </CardContent>
    </Card>
  );
}
