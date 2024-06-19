'use client';
import { motion } from 'framer-motion';
const SplashScreen = ({ finishLoading }: { finishLoading: Function }) => {
  const blackBox = {
    initial: {
      height: '100vh',
      bottom: 0,
    },
    animate: {
      height: 0,
      transition: {
        when: 'afterChildren',
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };
  const text = {
    initial: {
      y: 40,
    },
    animate: {
      y: 80,
      transition: {
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };
  const textContainer = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 0,
      transition: {
        duration: 0.25,
        when: 'afterChildren',
      },
    },
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setTimeout(() => {
  //       finishLoading(false);
  //     }, 1000); // ????? ?????? ???? ????
  //   }, 2000); // ?? ?????? ???? ??? SplashScreen

  //   return () => clearTimeout(timeout);
  // }, [finishLoading]);

  return (
    <motion.div
      exit={{opacity:0}}
      className='absolute z-50 flex w-full items-center justify-center bg-black'
      initial='initial'
      animate='animate'
      variants={blackBox}
      onAnimationStart={() => document.body.classList.add('overflow-hidden')}
      onAnimationComplete={() =>
        document.body.classList.remove('overflow-hidden')
      }
    >
      <motion.svg variants={textContainer} className='absolute z-50 flex'>
        <pattern
          id='pattern'
          patternUnits='userSpaceOnUse'
          width={750}
          height={800}
          className='text-white'
        >
          <rect className='h-full w-full fill-current' />
          <motion.rect
            variants={text}
            className='h-full w-full fill-current text-gray-600'
          />
        </pattern>
        <text
          className='text-2xl font-bold'
          text-anchor='middle'
          x='50%'
          y='50%'
          style={{ fill: 'url(#pattern)' }}
        >
          به سامانه تایم یاد خوش آمدید{' '}
        </text>
      </motion.svg>
    </motion.div>
  );
};

export default SplashScreen;
