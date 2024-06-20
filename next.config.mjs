import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from 'next/constants.js';

/** @type {import('next').NextConfig} */
import withPWAInit from '@ducanh2912/next-pwa';
const nextConfig = {
  reactStrictMode: true,
};

const nextConfigFunction = async (phase) => {
  // if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
  //   const withPWA = (await import('@ducanh2912/next-pwa')).default({
  //     dest: 'public',
  //     // scope: '/app',
  //     sw: 'service-worker.js',
  //     extendDefaultRuntimeCaching: true,
  //     workboxOptions: {
  //       runtimeCaching: [
  //         // Your runtimeCaching array
  //       ],
  //     },
  //     // runtimeCaching: [
  //     //   {
  //     //     urlPattern: /^https?.*/, // Change the regex to match the routes you want
  //     //     handler: 'StaleWhileRevalidate',
  //     //     options: {
  //     //       cacheName: 'http-cache',
  //     //       expiration: {
  //     //         maxEntries: 100,
  //     //         maxAgeSeconds: 24 * 60 * 60, // 24 hours
  //     //       },
  //     //     },
  //     //   },
        
  //     // ],
  //     cacheOnFrontEndNav: true,
  //     aggresiveFrontEndNavCaching: true,
  //     reloadOnOnline: true,
  //     swcMinify: true,
  //     disable: false,
  //     workboxOptions: {
  //       disableDevLogs: true,
  //     },
  //     // fallbacks: {

  //     //   // Failed page requests fallback to this.
  //     //   document: "/offline",
  //     //   // This is for /_next/.../.json files.
  //     //   //data: '/fallback.json',
  //     //   // This is for images.
  //     //   //image: '/fallback.webp',
  //     //   // This is for audio files.
  //     //   // audio: '/fallback.mp3',
  //     //   // This is for video files.
  //     //   // video: '/fallback.mp4',
  //     //   // This is for fonts.
  //     //   // font: '/fallback-font.woff2',
  //     // },
  //   });
  //   return withPWA(nextConfig);
  // }
 
  return nextConfig;
};
 
export default nextConfigFunction;
// Your Next.js config
