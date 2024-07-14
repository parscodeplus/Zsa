import { Pagination } from '@/components/slideshow'
import Head from 'next/head'
import { ReactNode, SetStateAction, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"

import { FinishSlideshowBtn } from './AppBtn'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import React from 'react'

const backgroundColors = ['blue', 'red', 'green']

// style for every slide
export const slideStyles = cn`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  color: #fff;
  position: relative;
  .content {
    margin-top: -32px;
  }
`

export function Slideshow({ slides }: { slides: ReactNode[] }) {
  const [index, setIndex] = useState(0)
  const totalSlides = slides.length
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <>
      {/* <Head>
        <meta
          name="theme-color"
          key="theme-color"
          content={backgroundColors[index]}
        />
      </Head> */}
      <div
      className={cn(`bg-[${backgroundColors[index]}] ease-out duration-500`)}
        // css={{
        //   backgroundColor: backgroundColors[index],
        //   transition: 'background-color 1s ease-out'
        // }}
      >
        <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
{slide}
<div
        className='absolute flex flex-col items-center bottom-5 w-full'
          // css={{
          //   position: 'absolute',
          //   width: '100%',
          //   bottom: 20,
          //   alignItems: 'center',
          //   display: 'flex',
          //   flexDirection: 'column'
          // }}
        >
          <FinishSlideshowBtn
            text={index === totalSlides - 1 ? `Let's go` : 'Skip'}
          />
          <Pagination
            dots={3}
            index={index}
            onChangeIndex={(i) => setIndex(i)}
          />
        </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
        
       
      </div>
    </>
  )
}
