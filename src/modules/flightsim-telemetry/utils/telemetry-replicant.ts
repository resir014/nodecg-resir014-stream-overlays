import type { ReplicantOptions } from 'nodecg/types/browser';
import { FlyLiveFlightData } from '../types';

export const TELEMETRY_REPLICANT_NAMESPACE = 'resir014-flylive';

const defaultValue: FlyLiveFlightData = {};

export const telemetryReplicantOpts: ReplicantOptions<FlyLiveFlightData> = {
  defaultValue,
};
