import type NodeCG from '@alvancamp/test-nodecg-types';
import { FlyLiveFlightData } from '../types';

export const TELEMETRY_REPLICANT_NAMESPACE = 'resir014-flylive';

const defaultValue: FlyLiveFlightData = {};

export const telemetryReplicantOpts: NodeCG.Replicant.Options<FlyLiveFlightData> = {
  defaultValue,
};
