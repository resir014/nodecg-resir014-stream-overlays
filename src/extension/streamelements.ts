import type NodeCG from '@alvancamp/test-nodecg-types';
import { nanoid } from 'nanoid';
import { StreamElementsServiceClient } from 'nodecg-io-streamelements';
import type { StreamElementsEvent } from 'nodecg-io-streamelements/extension/StreamElementsEvent';
import { requireService } from 'nodecg-io-core';
import { formatSubTier, isEventProcessable } from '~/modules/streamelements/events/formatter';

export async function streamElementsExtension(nodecg: NodeCG.ServerAPI) {
  nodecg.log.info('Sample bundle for StreamElements started');

  const eventsQueueReplicant = nodecg.Replicant<StreamElementsEvent[]>(
    'streamelements-event-queue',
    {
      defaultValue: [],
    }
  );

  const streamElements = requireService<StreamElementsServiceClient>(nodecg, 'streamelements');

  const addEvents = (eventData: StreamElementsEvent) => {
    eventsQueueReplicant.value = [eventData, ...eventsQueueReplicant.value];
  };

  streamElements?.onAvailable(client => {
    nodecg.log.info('SE client has been updated, registering handlers now.');

    client.onCheer(eventData => {
      nodecg.log.info(
        `${eventData.data.displayName} just cheered ${eventData.data.amount} bit(s). Message: ${eventData.data.message}`
      );

      if (isEventProcessable(eventData.type)) {
        addEvents({
          ...eventData,
          _id: eventData._id || nanoid(),
        } as StreamElementsEvent);
      }
    });

    client.onFollow(eventData => {
      nodecg.log.info(`${eventData.data.displayName} just followed.`);

      if (isEventProcessable(eventData.type)) {
        addEvents({
          ...eventData,
          _id: eventData._id || nanoid(),
        } as StreamElementsEvent);
      }
    });

    client.onSubscriber(eventData => {
      if (eventData.data.tier) {
        const tier = formatSubTier(eventData.data.tier);
        nodecg.log.info(
          `${eventData.data.displayName} just subscribed for ${eventData.data.amount} months (${tier}).`
        );

        if (isEventProcessable(eventData.type)) {
          addEvents({
            ...eventData,
            _id: eventData._id || nanoid(),
          } as StreamElementsEvent);
        }
      }
    });

    client.onGift(eventData => {
      if (eventData.data.tier) {
        const tier = formatSubTier(eventData.data.tier);
        if (eventData.data.sender) {
          nodecg.log.info(
            `${eventData.data.displayName} just got a ${tier} subscription from ${eventData.data.sender}! It's ${eventData.data.displayName}'s ${eventData.data.amount} month.`
          );
        } else {
          nodecg.log.info(
            `${eventData.data.displayName} just got a ${tier} subscription! It's ${eventData.data.displayName}'s ${eventData.data.amount} month.`
          );
        }

        if (isEventProcessable(eventData.type)) {
          addEvents({
            ...eventData,
            _id: eventData._id || nanoid(),
          } as StreamElementsEvent);
        }
      }
    });

    client.onHost(eventData => {
      nodecg.log.info(
        `${eventData.data.displayName} just hosted the stream for ${eventData.data.amount} viewer(s).`
      );

      if (isEventProcessable(eventData.type)) {
        addEvents({
          ...eventData,
          _id: eventData._id || nanoid(),
        } as StreamElementsEvent);
      }
    });

    client.onRaid(eventData => {
      nodecg.log.info(
        `${eventData.data.displayName} just raided the stream with ${eventData.data.amount} viewers.`
      );

      if (isEventProcessable(eventData.type)) {
        addEvents({
          ...eventData,
          _id: eventData._id || nanoid(),
        } as StreamElementsEvent);
      }
    });

    client.onTip(eventData => {
      if (eventData.data.currency) {
        nodecg.log.info(
          `${eventData.data.username} just donated ${eventData.data.amount} ${eventData.data.currency}. Message. ${eventData.data.message}`
        );

        if (isEventProcessable(eventData.type)) {
          addEvents({
            ...eventData,
            _id: eventData._id || nanoid(),
          } as StreamElementsEvent);
        }
      }
    });

    client.onTest(eventData => {
      nodecg.log.info(JSON.stringify(eventData));

      if (isEventProcessable(eventData.listener)) {
        // Add unique id to allow for removal when the alert is stale
        addEvents({
          ...eventData,
          _id: eventData._id || nanoid(),
        } as StreamElementsEvent);
      }
    });
  });

  streamElements?.onUnavailable(() => nodecg.log.info('SE client has been unset.'));
}
