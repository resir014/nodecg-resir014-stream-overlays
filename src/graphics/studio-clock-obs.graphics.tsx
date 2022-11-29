import { useOnMount } from '@internal/common/use-on-mount';
import { OverlayRoot } from '@internal/components/overlay/overlay-root';
import { StudioClockInterface } from '@internal/modules/studio-clock/studio-clock-interface';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './studio-clock-obs.graphics.css';

function GraphicsRoot() {
  const [isClockRendered, setIsClockRendered] = React.useState(false);

  useOnMount(() => {
    setIsClockRendered(true);
  });

  return (
    <OverlayRoot>
      <div className="flex w-full h-screen items-center justify-center bg-chungking-black">
        {isClockRendered ? (
          <div className="scale-50">
            <StudioClockInterface hideTimezone />
          </div>
        ) : null}
      </div>
    </OverlayRoot>
  );
}

ReactDOM.render(<GraphicsRoot />, document.getElementById('root'));
