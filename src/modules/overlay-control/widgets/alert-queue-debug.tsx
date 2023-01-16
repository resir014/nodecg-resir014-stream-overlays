import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import * as React from 'react';
import { useReplicant } from '~/common/use-replicant';
import { StreamElementsEvent } from 'nodecg-io-streamelements/extension/StreamElementsEvent';
import { EventRenderer } from '~/modules/streamelements/dashboard/event-renderer';

export function AlertQueueDebugWidget() {
  const [events, setEvents] = useReplicant<StreamElementsEvent[]>('streamelements-event-queue');

  const handleResetQueue = () => {
    setEvents([]);
  };

  nodecg.log.info(events);

  return (
    <Card variant="outlined">
      <CardHeader
        title="Alert Queue Debug"
        action={
          <Tooltip title="Clear Queue">
            <IconButton aria-label="Clear Queue" onClick={handleResetQueue}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <List
          sx={{
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 480,
          }}
        >
          {events?.length && events.length > 0 ? (
            events.map(event => <EventRenderer key={event._id} eventData={event} />)
          ) : (
            <ListItem>
              <ListItemText secondary="No alerts in queue." />
            </ListItem>
          )}
        </List>
      </CardContent>
    </Card>
  );
}
