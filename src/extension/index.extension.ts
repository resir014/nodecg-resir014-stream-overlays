import type NodeCG from '@alvancamp/test-nodecg-types';
import { clockExtension } from './clock';
import { flightsimTelemetryExtension } from './flightsim-telemetry';
import { streamElementsExtension } from './streamelements';

export = (nodecg: NodeCG.ServerAPI) => {
  clockExtension(nodecg).catch(err => {
    nodecg.log.error('Failed to start Clock extension', err);
  });
  streamElementsExtension(nodecg).catch(err => {
    nodecg.log.error('Failed to start StreamElements extension', err);
  });
  flightsimTelemetryExtension(nodecg).catch(err => {
    nodecg.log.error('Failed to start Flightsim Telemetry extension', err);
  });
};
