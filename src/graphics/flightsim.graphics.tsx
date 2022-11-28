import { useReplicant } from '@internal/common/use-replicant';
import { InfoItemCard } from '@internal/components/info-item-card';
import { OverlayRoot } from '@internal/components/overlay/overlay-root';
import { FlightItinerary } from '@internal/modules/flightsim-telemetry/components/flight-itinerary';
import { FlightProgress } from '@internal/modules/flightsim-telemetry/components/flight-progress';
import { InfoCardWrapper } from '@internal/modules/flightsim-telemetry/components/info-card-wrapper';
import { FlyLiveFlightData } from '@internal/modules/flightsim-telemetry/types';
import {
  telemetryReplicantOpts,
  TELEMETRY_REPLICANT_NAMESPACE,
} from '@internal/modules/flightsim-telemetry/utils/telemetry-replicant';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './flightsim.graphics.css';

function GraphicsRoot() {
  const [isEnabled] = useReplicant('is-enabled', TELEMETRY_REPLICANT_NAMESPACE, {
    defaultValue: false,
  });
  const [flightData] = useReplicant<FlyLiveFlightData>(
    'flight-telemetry',
    TELEMETRY_REPLICANT_NAMESPACE,
    telemetryReplicantOpts
  );

  if (isEnabled) {
    return (
      <OverlayRoot>
        <FlightProgress value={flightData?.flightPercent ?? 0} max={100} />
        <InfoCardWrapper>
          {flightData?.dep && flightData.arr ? (
            <FlightItinerary origin={flightData.dep} destination={flightData.arr} />
          ) : null}
          {flightData?.callsign ? <InfoItemCard title="ATC" content={flightData.callsign} /> : null}
          {flightData?.aircraftType ? (
            <InfoItemCard title="AC" content={flightData.aircraftType} />
          ) : null}
          {flightData?.groundSpeed ? (
            <InfoItemCard title="GSPD" content={flightData.groundSpeed} />
          ) : null}
          {flightData?.airSpeed ? <InfoItemCard title="IAS" content={flightData.airSpeed} /> : null}
          {flightData?.heading ? <InfoItemCard title="HDG" content={flightData.heading} /> : null}
          {flightData?.vSpeed ? <InfoItemCard title="VSPD" content={flightData.vSpeed} /> : null}
          {flightData?.altitude ? <InfoItemCard title="ALT" content={flightData.altitude} /> : null}
          {flightData?.eta ? <InfoItemCard title="ETA" content={flightData.eta} /> : null}
        </InfoCardWrapper>
      </OverlayRoot>
    );
  }

  return null;
}

ReactDOM.render(<GraphicsRoot />, document.getElementById('root'));
