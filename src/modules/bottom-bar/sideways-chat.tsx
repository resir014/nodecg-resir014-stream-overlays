/* eslint-disable react/iframe-missing-sandbox */
import * as React from 'react';

export function SidewaysChat() {
  return (
    <div className="bg-[#0d1116] h-8">
      <iframe
        className="w-full overflow-hidden"
        title="sideways-chat"
        sandbox="allow-scripts allow-same-origin"
        scrolling="no"
        height={32}
        src="https://streamelements.com/overlay/6265292ba85c98522326c170/MbN-mTApifysw7SmdFWUTlxZSdTquypOyxxWP979m3Re6lLn"
      />
    </div>
  );
}
