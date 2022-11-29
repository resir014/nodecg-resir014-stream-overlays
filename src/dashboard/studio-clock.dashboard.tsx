import { useOnMount } from '@internal/common/use-on-mount';
import { StudioClockInterface } from '@internal/modules/studio-clock/studio-clock-interface';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './studio-clock.dashboard.css';

function DashboardRoot() {
  const [isClockRendered, setIsClockRendered] = React.useState(false);

  useOnMount(() => {
    setIsClockRendered(true);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-chungking-black">
      {isClockRendered ? (
        <div className="flex items-center justify-center w-[208px] h-[240px]">
          <div className="scale-50">
            <StudioClockInterface hideTimezone />
          </div>
        </div>
      ) : null}
    </div>
  );
}

ReactDOM.render(<DashboardRoot />, document.getElementById('root'));
