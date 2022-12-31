import type NodeCG from '@alvancamp/test-nodecg-types';
import { dequal } from 'dequal';
import { createDateMap } from '~/modules/clock/clock-utils';
import type { DateMap } from '~/modules/clock/types';

const MILLISECONDS_PER_FRAME = 1000 / 60;

export async function clockExtension(nodecg: NodeCG.ServerAPI) {
  const clockReplicant = nodecg.Replicant<DateMap>('clock-state');

  // mimicking requestAnimationFrame, we use the same interval as rAF
  // so clock updates as accurate as possible
  setInterval(() => {
    const newDateMap = createDateMap(new Date());

    // deep equality check to preventing updating where unnecessary
    if (!dequal(newDateMap, clockReplicant.value)) {
      clockReplicant.value = newDateMap;
    }
  }, MILLISECONDS_PER_FRAME);
}
