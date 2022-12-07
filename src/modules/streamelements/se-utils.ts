import { StreamElementsEvent } from 'nodecg-io-streamelements/extension/StreamElementsEvent';

export interface StreamElementsReplicant {
  lastSubscriber?: StreamElementsEvent;
  lastSubBomb?: StreamElementsEvent;
  lastTip?: StreamElementsEvent;
  lastCheer?: StreamElementsEvent;
  lastGift?: StreamElementsEvent;
  lastFollow?: StreamElementsEvent;
  lastRaid?: StreamElementsEvent;
  lastHost?: StreamElementsEvent;
}

/**
 * Returns a formatted string of the Twitch sub tier based on the StreamElements sub event data.
 *
 * @param tier The tier string received from Twitch
 * @returns The formatted string of the Twitch sub tier.
 */
export function formatSubTier(tier: '1000' | '2000' | '3000' | 'prime'): string {
  if (tier === 'prime') {
    return 'Twitch Prime';
  }

  // We want to display the tier as 1, 2, 3
  // However StreamElements stores the sub tiers as 1000, 2000 and 3000.
  // So we divide the tier by 1000 to get the tier in our expected format.
  return `Tier ${(Number.parseInt(tier, 10) / 1000).toString()}`;
}
