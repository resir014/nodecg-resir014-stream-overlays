import { Card, CardContent, CardHeader } from '@mui/material';
import * as React from 'react';
import { useOnMount } from '~/common/use-on-mount';
import { StudioClockInterface } from '../../studio-clock/studio-clock-interface';

export function StudioClockDashboard() {
  const [isClockRendered, setIsClockRendered] = React.useState(false);

  useOnMount(() => {
    setIsClockRendered(true);
  });

  return (
    <Card variant="outlined">
      <CardHeader title="Studio Clock" />
      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
        {isClockRendered ? (
          <div className="flex items-center justify-center w-[192px] h-[192px]">
            <div style={{ transform: 'scale(0.5)' }}>
              <StudioClockInterface transparent hideTimezone />
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
