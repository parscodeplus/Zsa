'use client'
import React, { useState, useEffect } from 'react'
import AddToHomeScreen from '@/components/AddToHomeScreen/AddToHomeScreen'
import { motion } from 'framer-motion'


import useUserAgent from '@/hook/useUserAgent'

export default function AddHomeScreen() {
  const [welcomeMessage, setWelcomeMessage] = useState<string>('Checking device...');
  const { isMobile, userAgentString ,userAgent } = useUserAgent();

  useEffect(() => {
    const welcomeMessage = isMobile ? 'You are on a mobile device.' : 'You are on a desktop device. Please use a mobile device to view this app.';
    setWelcomeMessage(welcomeMessage);
  }, [isMobile]);

  return (
<div>
    <motion.h1
        className="text-4xl font-bold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >Welcome to Fancy PWA App!</motion.h1>
      <motion.p
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >{welcomeMessage}</motion.p>
      {userAgentString && <p className="text-center text-xs text-gray-400">{userAgentString}</p>}
      <AddToHomeScreen />
      </div>
  )
}