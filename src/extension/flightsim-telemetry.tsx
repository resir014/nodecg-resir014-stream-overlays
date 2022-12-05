import type NodeCG from '@alvancamp/test-nodecg-types';
import { FlyLiveFlightData } from '~/modules/flightsim-telemetry/types';
import { getFlyliveData } from '~/modules/flightsim-telemetry/utils/get-flylive-data';
import {
  telemetryReplicantOpts,
  TELEMETRY_REPLICANT_NAMESPACE,
} from '~/modules/flightsim-telemetry/utils/telemetry-replicant';

export async function flightsimTelemetryExtension(nodecg: NodeCG.ServerAPI) {
  const isEnabledReplicant = nodecg.Replicant<boolean>('is-enabled', TELEMETRY_REPLICANT_NAMESPACE);
  const telemetryReplicant = nodecg.Replicant<FlyLiveFlightData>(
    'flight-telemetry',
    TELEMETRY_REPLICANT_NAMESPACE,
    telemetryReplicantOpts
  );
  let interval: NodeJS.Timer | null = null;

  const handleChange = (newValue: boolean) => {
    if (newValue) {
      nodecg.log.info('Flightsim Telemetry extension is enabled.');

      interval = setInterval(() => {
        void getFlyliveData()
          .then(data => {
            telemetryReplicant.value = data.flightData;
          })
          .catch(err => {
            nodecg.log.error('Failed to update flight data', err);
          });
      }, 1000);
    } else {
      nodecg.log.info('Flightsim Telemetry extension is disabled.');

      if (interval) {
        clearInterval(interval);
      }
    }
  };

  isEnabledReplicant.on('change', handleChange);
}
