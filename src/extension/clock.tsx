import { createDateMap } from '@internal/modules/clock/clock-utils';
import type { DateMap } from '@internal/modules/clock/types';
import type { NodeCG } from 'nodecg/types/server';

export async function clockExtension(nodecg: NodeCG) {
  const clockReplicant = nodecg.Replicant<DateMap>('clock-state');

  setInterval(() => {
    const date = new Date();
    clockReplicant.value = createDateMap(date);
  }, 1000);
}
