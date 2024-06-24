import { slideStyles } from '@/components/slideshow'
import Image from 'next/image'

export function SlideTwo() {
  return (
    <div className={slideStyles}>
      <div className="content">
        <Image
          priority={true}
          alt="slideshow image"
          src="/slideshow/team-meeting.svg"
          width={400}
          height={300}
        />
        <div className='text-center'>
          <h1>Material Design</h1>
          <p>Built with Material design system</p>
        </div>
      </div>
    </div>
  )
}
