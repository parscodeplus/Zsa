import React from 'react';
import { cn } from '../../lib/utils';
import { useId } from 'react';
import { motion } from 'framer-motion';

interface DotPatternProps {
  width?: any;
  height?: any;
  x?: any;
  y?: any;
  cx?: any;
  cy?: any;
  cr?: any;
  className?: string;
  [key: string]: any;
}
export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80',
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits='userSpaceOnUse'
          patternContentUnits='userSpaceOnUse'
          x={x}
          y={y}
        >
          <circle id='pattern-circle' cx={cx} cy={cy} r={cr} />
          <animate
            attributeName='r'
            values={`${cr}; ${cr + 0.5}; ${cr};`}
            dur='2s'
            repeatCount='indefinite'
          />
        </pattern>
      </defs>
      <motion.rect
        width='100%'
        height='100%'
        strokeWidth={0}
        fill={`url(#${id})`}
        animate={{
          x: [0, 20, 0], // Animate x position from 0 to 20 and back to 0
          y: [0, 40, 0], // Animate y position from 0 to 10 and back to 0
          scale: [1, 4, 1], // Animate scale from 1 to 1.2 and back to 1
          rotate: [0, 45, 0], // Animate rotation from 0 to 45 degrees and back to 0
        }}
      />
    </svg>
  );
}

export default DotPattern;
