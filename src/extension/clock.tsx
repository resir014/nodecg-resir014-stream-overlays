import type NodeCG from '@alvancamp/test-nodecg-types';
import { createDateMap } from '~/modules/clock/clock-utils';
import type { DateMap } from '~/modules/clock/types';

export async function clockExtension(nodecg: NodeCG.ServerAPI) {
  const clockReplicant = nodecg.Replicant<DateMap>('clock-state');

  setInterval(() => {
    const date = new Date();
    clockReplicant.value = createDateMap(date);
  }, 1000);
}
