"use client "
import React, { useEffect, useState } from "react";

const Slide = ({ isActive, slide }: { isActive: boolean; slide: number }) => {
  if (isActive) {
    return (
      <div className="transition-transform duration-300">
        <div className="p-8 border border-gray-300 rounded-md shadow-md m-5">
          {slide}
        
        </div>
      </div>
    );
  }
  return null;
};

const Dots = ({
    slides,
    currentSlide,
    displayed,
    setActive,
  }: {
    slides: number[];
    currentSlide: number;
    displayed: boolean;
    setActive: (slide: number) => void;
  }) => {
    if (!displayed) return null;
  
    return (
      <div className="flex items-center">
        {slides.map((slide) => (
          <div key={slide} className="p-3">
            <div
              className={`h-5   w-5 cursor-pointer rounded-full transition-colors ${
                currentSlide === slide ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => setActive(slide)}
            />
          </div>
        ))}
      </div>
    );
  };
  
  
  const SlideShow = ({
    autoplay,
    delay,
  }: {
    autoplay: boolean;
    delay?: number;
  }) => {
    const slides = [1, 2, 3];
    const [active, setActive] = useState(1);
  
    const prev = () =>
      setActive(active > 1 ? active - 1 : slides[slides.length - 1]);
    const next = () => setActive(active < slides.length ? active + 1 : 1);
  
    useEffect(() => {
      if (autoplay) {
        setTimeout(() => {
          next();
        }, delay || 3000);
      }
    }, [active, next]);
  
    return (
      <div>
        {slides.map((slide) => (
          <Slide key={slide} isActive={active === slide} slide={slide} />
        ))}
        <Dots
          displayed
          currentSlide={active}
          slides={slides}
          setActive={setActive}
        />
        <p>active: {active} </p>
        <button onClick={prev}>prev</button>
        <button onClick={next}>next</button>
      </div>
    );
  };
  
  

export default SlideShow;
