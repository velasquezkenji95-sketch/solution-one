import { useEffect, useRef, type VideoHTMLAttributes } from 'react';
import { useAnimationPlayback } from '../lib/useAnimationPlayback';

export function AnimatedVideo({ autoPlay = true, ...props }: VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);
  const playing = useAnimationPlayback(ref);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (playing && autoPlay) void video.play().catch(() => {});
    else video.pause();
  }, [playing, autoPlay]);
  return <video {...props} ref={ref} preload="metadata" data-animation-playing={playing} />;
}
