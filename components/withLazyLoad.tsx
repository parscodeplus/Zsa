// withLazyLoad.tsx
import React, { ComponentType, useEffect, useState } from 'react';
import useIntersectionObserver from '@/hook/useIntersectionObserver';const withLazyLoad = <P extends object>(
  WrappedComponent: ComponentType<P>,
  threshold = 0.5
): React.FC<P> => {
  // eslint-disable-next-line react/display-name
  return (props: P) => {
    const [isInView, ref] = useIntersectionObserver(threshold);
    const [hasLoaded, setHasLoaded] = useState(false);
useEffect(() => {
      if (isInView && !hasLoaded) {
        setHasLoaded(true);
      }
    }, [isInView, hasLoaded]);
    return (
      <div ref={ref}>
        {hasLoaded ? <WrappedComponent {...props} /> : <div>Loading...</div>}
      </div>
    );
  };
};
withLazyLoad.displayName = "withLazyLoad"
export default withLazyLoad;

// import withLazyLoad from '../withLazyLoad';
// import LazyComponent from '../components/LazyComponent';

// const LazyComponentWithLazyLoad = withLazyLoad(LazyComponent);
// const HomePage: React.FC = () => {
//   return (
//     <div>
//       {/* Your existing components */}
//       <LazyComponentWithLazyLoad />
//     </div>
//   );
// };
// export default HomePage;