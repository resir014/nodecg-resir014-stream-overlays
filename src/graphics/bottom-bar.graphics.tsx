import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { OverlayRoot } from '~/components/overlay/overlay-root';
import { BottomBar } from '~/modules/bottom-bar';

import './bottom-bar.graphics.css';

function GraphicsRoot() {
  return (
    <OverlayRoot>
      <BottomBar />
    </OverlayRoot>
  );
}

ReactDOM.render(<GraphicsRoot />, document.getElementById('root'));
