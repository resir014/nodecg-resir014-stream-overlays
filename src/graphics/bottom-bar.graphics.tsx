import { OverlayRoot } from '@internal/components/overlay/overlay-root';
import { BottomBar } from '@internal/modules/bottom-bar';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './bottom-bar.graphics.css';

function GraphicsRoot() {
  return (
    <OverlayRoot>
      <BottomBar />
    </OverlayRoot>
  );
}

ReactDOM.render(<GraphicsRoot />, document.getElementById('root'));
