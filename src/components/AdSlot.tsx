import React, { useEffect } from 'react';

type AdSlotProps = {
  adClient?: string;
  adSlot?: string;
  adFormat?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function AdSlot({
  adClient = 'ca-pub-8063078781485185',
  adSlot,
  adFormat = 'auto',
  className,
  style,
}: AdSlotProps) {
  useEffect(() => {
    try {
      // push to adsbygoogle after the element is in the DOM
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      // Calling push even if no explicit ad-slot id is provided is fine for Auto Ads
      ;(window as any).adsbygoogle.push({});
    } catch (e) {
      // ignore errors — ads script may not be available in dev
    }
  }, []);

  return (
    <ins
      className={["adsbygoogle", className].filter(Boolean).join(' ')}
      style={style || { display: 'block' }}
      data-ad-client={adClient}
      {...(adSlot ? { 'data-ad-slot': adSlot } : {})}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}
