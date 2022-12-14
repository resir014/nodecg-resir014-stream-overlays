/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';
import { useClock } from '../clock/clock-utils';
import { ClockWatchTick } from './clock-watch-tick';

export interface StudioClockInterfaceProps extends React.ComponentPropsWithoutRef<'div'> {
  uiFont?: string;
  watchFaceFont?: string;
  watchFaceColor?: string;
  hideTimezone?: boolean;
  transparent?: boolean;
}

export function StudioClockInterface({
  className,
  style,
  uiFont = 'Inter',
  watchFaceFont = 'JetBrains Mono',
  watchFaceColor,
  hideTimezone,
  transparent,
  ...rest
}: StudioClockInterfaceProps) {
  const time = useClock();

  const ticks: undefined[] = Array<undefined>(60).fill(undefined);
  const timeZoneOptions = new Intl.DateTimeFormat().resolvedOptions();

  const [, , s] = React.useMemo(
    () => [time.getHours(), time.getMinutes(), time.getSeconds()] as const,
    [time]
  );

  const watchUIStyle = React.useMemo(
    () => ({
      fontFamily: `${uiFont}, system-ui, sans-serif`,
    }),
    [uiFont]
  );

  const watchFaceStyle = React.useMemo(
    () => ({
      fontFamily: `${watchFaceFont}, monospace`,
    }),
    [watchFaceFont]
  );

  React.useEffect(() => {
    if (typeof window !== 'undefined' && (uiFont || watchFaceFont)) {
      void import('webfontloader').then(mod => {
        mod.default.load({
          google: {
            families: [uiFont, watchFaceFont]
              .filter(Boolean)
              .map(font => `${font}:400,700,400italic,700italic`),
          },
        });
      });
    }
  }, [uiFont, watchFaceFont]);

  return (
    <div
      className={clsx(
        'inline-flex flex-col items-center space-y-8 rounded-xl',
        transparent ? null : 'bg-chungking-black px-4 py-8',
        className
      )}
      style={style}
      {...rest}
    >
      <div className="inline-block relative w-[384px] h-[384px] rounded-full overflow-hidden">
        <div className="ticks relative w-full h-full" style={{ transform: `rotate(-90deg)` }}>
          {ticks.map((_, i) => {
            const second = i + 1;
            return (
              <ClockWatchTick
                key={i}
                currentSecond={second}
                hasFace={second % 5 === 0}
                active={s >= second}
                watchFaceColor={watchFaceColor}
              />
            );
          })}
        </div>
        <div className="absolute top-0 left-0 w-full h-full p-8">
          <div className="flex flex-col items-center justify-center w-full h-full rounded-full overflow-hidden">
            <div className="flex items-end flex-auto mb-4 text-center text-chungking-white">
              <div className="space-y-2" style={watchUIStyle}>
                <span className="block m-0 text-2xl leading-none font-bold">
                  {format(time, 'EEEE')}
                </span>
                <span className="block m-0 text-2xl leading-none">
                  {format(time, 'dd MMMM yyyy')}
                </span>
              </div>
            </div>
            <div>
              <span
                className="m-0 text-8xl leading-none font-bold tabular-nums text-chungking-white"
                style={watchFaceStyle}
              >
                {format(time, 'HH:mm')}
              </span>
            </div>
            <div className="flex-auto mt-2">
              <span
                className="block m-0 text-6xl leading-none font-bold tabular-nums text-chungking-white"
                style={watchFaceStyle}
              >
                {format(time, 'ss')}
              </span>
            </div>
          </div>
        </div>
      </div>
      {hideTimezone ? null : (
        <div className="text-center space-y-2 text-chungking-white" style={watchUIStyle}>
          <span className="block m-0 text-2xl leading-none font-bold">
            {timeZoneOptions.timeZone}
          </span>
        </div>
      )}
    </div>
  );
}
