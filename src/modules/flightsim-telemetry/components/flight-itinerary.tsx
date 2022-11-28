import { InfoItemCard } from '@internal/components/info-item-card';
import * as React from 'react';

export interface FlightItineraryProps {
  origin: string;
  destination: string;
}

export const FlightItinerary: React.FC<FlightItineraryProps> = ({ origin, destination }) => {
  return <InfoItemCard content={`${origin} -> ${destination}`} />;
};
