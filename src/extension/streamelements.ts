import type NodeCG from '@alvancamp/test-nodecg-types';
import { StreamElementsServiceClient } from 'nodecg-io-streamelements';
import { requireService } from 'nodecg-io-core';
import { formatSubTier } from '~/modules/streamelements/se-utils';

export async function streamElementsExtension(nodecg: NodeCG.ServerAPI) {
  nodecg.log.info('Sample bundle for StreamElements started');

  const streamElements = requireService<StreamElementsServiceClient>(nodecg, 'streamelements');

  streamElements?.onAvailable(client => {
    nodecg.log.info('SE client has been updated, registering handlers now.');

    client.onCheer(data => {
      nodecg.log.info(
        `${data.data.displayName} just cheered ${data.data.amount} bit(s). Message: ${data.data.message}`
      );
    });

    client.onFollow(data => {
      nodecg.log.info(`${data.data.displayName} just followed.`);
    });

    client.onSubscriber(data => {
      if (data.data.tier) {
        const tier = formatSubTier(data.data.tier);
        nodecg.log.info(
          `${data.data.displayName} just subscribed for ${data.data.amount} months (${tier}).`
        );
      }
    });

    client.onGift(data => {
      if (data.data.tier) {
        const tier = formatSubTier(data.data.tier);
        if (data.data.sender) {
          nodecg.log.info(
            `${data.data.displayName} just got a ${tier} subscription from ${data.data.sender}! It's ${data.data.displayName}'s ${data.data.amount} month.`
          );
        } else {
          nodecg.log.info(
            `${data.data.displayName} just got a ${tier} subscription! It's ${data.data.displayName}'s ${data.data.amount} month.`
          );
        }
      }
    });

    client.onHost(data => {
      nodecg.log.info(
        `${data.data.displayName} just hosted the stream for ${data.data.amount} viewer(s).`
      );
    });

    client.onRaid(data => {
      nodecg.log.info(
        `${data.data.displayName} just raided the stream with ${data.data.amount} viewers.`
      );
    });

    client.onTip(data => {
      if (data.data.currency) {
        nodecg.log.info(
          `${data.data.username} just donated ${data.data.amount} ${data.data.currency}. Message. ${data.data.message}`
        );
      }
    });

    client.onTest(data => {
      nodecg.log.info(JSON.stringify(data));
    });
  });

  streamElements?.onUnavailable(() => nodecg.log.info('SE client has been unset.'));
}
