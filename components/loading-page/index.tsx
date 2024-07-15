'use client'
import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

export default function LoadingAnimation() {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationInstance: AnimationItem | null = null;

    if (animationContainer.current) {
      animationInstance = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/Animation-loading.json'
      });
    }

    return () => {
      if (animationInstance) {
        animationInstance.destroy();
      }
    };
  }, []);

  return (
    <div ref={animationContainer} style={{ width: '100%', height: '100%' }}></div>
  );
}
