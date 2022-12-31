import { subSeconds } from 'date-fns';
import * as React from 'react';
import { useReplicantValue } from '~/common/use-replicant';
import { useClock } from '../clock/clock-utils';
import { PrestreamSettingsReplicant } from '../overlay-main/types';

export interface TimeSignalWrapperProps {
  startH: number;
  startM: number;
}

export default function TimeSignalWrapper() {
  const time = useClock();
  const settings = useReplicantValue<PrestreamSettingsReplicant>('prestream-settings');
  const playButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    console.log(settings);
  }, [settings]);

  const startOfTimeSignal = React.useMemo(
    () => (settings?.timeSignal ? subSeconds(new Date(settings.timeSignal), 5) : undefined),
    [settings?.timeSignal]
  );

  React.useEffect(() => {
    console.log(
      time.toISOString(),
      startOfTimeSignal?.toISOString(),
      time.toISOString() === startOfTimeSignal?.toISOString()
    );

    if (time.toISOString() === startOfTimeSignal?.toISOString()) {
      // Fake a click event on a hidden button which plays the audio file.
      playButtonRef.current?.click();
    }
  }, [startOfTimeSignal, time]);

  return (
    <button
      ref={playButtonRef}
      className="hidden"
      type="button"
      onClick={() => nodecg.playSound('time-signal')}
    >
      Play
    </button>
  );
}
