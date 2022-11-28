import type { NodeCG } from 'nodecg/types/server';
import { clockExtension } from './clock';
import { flightsimTelemetryExtension } from './flightsim-telemetry';

export = (nodecg: NodeCG) => {
  clockExtension(nodecg).catch(err => {
    nodecg.log.error('Failed to start Clock extension', err);
  });
  flightsimTelemetryExtension(nodecg).catch(err => {
    nodecg.log.error('Failed to start Flightsim Telemetry extension', err);
  });
};
