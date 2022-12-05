import { createDateMap } from '@internal/modules/clock/clock-utils';
import type { DateMap } from '@internal/modules/clock/types';
import type NodeCG from '@alvancamp/test-nodecg-types';

export async function clockExtension(nodecg: NodeCG.ServerAPI) {
  const clockReplicant = nodecg.Replicant<DateMap>('clock-state');

  setInterval(() => {
    const date = new Date();
    clockReplicant.value = createDateMap(date);
  }, 1000);
}
