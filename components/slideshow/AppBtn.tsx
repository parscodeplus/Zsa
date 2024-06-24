'use client'
import Link from 'next/link'
export function FinishSlideshowBtn({ text }: { text: string }) {
  return (
    <Link href="/contact" >
      {/* <a className='mb-6 cursor-pointer border p-4 '
        // css={{
        //   marginBottom: 24,
        //   cursor: 'pointer',
        //   border: '2px solid #fff',
        //   padding: 8,
        //   color: '#fff',
        //   textDecoration: 'none',
        //   userSelect: 'none'
        // }}
      > */}
        {text}
      {/* </a> */}
    </Link>
  )
}
