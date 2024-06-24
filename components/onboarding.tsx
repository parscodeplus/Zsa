"use client"
import { Slideshow, SlideOne, SlideTwo, SlideThree } from '@/components/slideshow'

export default function Onboarding() {
  return (
    <>
     
      <Slideshow
        slides={[
          <SlideOne key="1" />,
          <SlideTwo key="2" />,
          <SlideThree key="3" />
        ]}
      />
    </>
  )
}
