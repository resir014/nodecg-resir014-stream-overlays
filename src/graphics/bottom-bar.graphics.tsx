import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { OverlayRoot } from '~/components/overlay/overlay-root';
import { BottomBar, SidewaysChat } from '~/modules/bottom-bar';

import './bottom-bar.graphics.css';

function GraphicsRoot() {
  return (
    <OverlayRoot>
      <SidewaysChat />
      <BottomBar />
    </OverlayRoot>
  );
}

ReactDOM.render(<GraphicsRoot />, document.getElementById('root'));
