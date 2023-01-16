import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Favorite as HeartIcon } from '@mui/icons-material';
import { StreamElementsEvent } from 'nodecg-io-streamelements/extension/StreamElementsEvent';
import * as React from 'react';

export interface EventRendererProps {
  eventData: StreamElementsEvent;
}

export function EventRenderer({ eventData }: EventRendererProps) {
  // Unfortunately we need to handle each of these alert types differently because
  // the Websocket API docs is different compared to what was in reality.

  if ('listener' in eventData) {
    // Test event
    return (
      <ListItem alignItems="flex-start" disableGutters>
        <ListItemAvatar>
          <Avatar>
            <HeartIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={eventData.listener} secondary={eventData.event?.name} />
      </ListItem>
    );
  }

  if ('type' in eventData) {
    // Real event
    return (
      <ListItem alignItems="flex-start" disableGutters>
        <ListItemAvatar>
          <Avatar>
            <HeartIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={eventData.type} secondary={eventData.data.displayName} />
      </ListItem>
    );
  }

  return (
    <ListItem alignItems="flex-start" disableGutters>
      Unknown event type
    </ListItem>
  );
}
