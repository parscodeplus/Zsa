"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RVWQ6EQrWoY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import { motion } from 'framer-motion';

export default function Component() {
  return (
    <header className="flex w-full items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-gray-950 sm:px-6 md:px-8 lg:px-10">
      <Link href="#" className="flex items-center" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
        <Link href="#" className="hover:underline hover:underline-offset-4" prefetch={false}>
          Home
        </Link>
        <Link href="#" className="hover:underline hover:underline-offset-4" prefetch={false}>
          About
        </Link>
        <Link href="#" className="hover:underline hover:underline-offset-4" prefetch={false}>
          Services
        </Link>
        <Link href="#" className="hover:underline hover:underline-offset-4" prefetch={false}>
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <form className="relative hidden lg:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search..."
            className="h-9 w-[200px] rounded-md border border-gray-300 bg-gray-100 pl-10 text-sm focus:border-gray-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-gray-600"
          />
        </form>
        <Button variant="ghost" size="icon" className="rounded-full lg:hidden">
          <SearchIcon className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      <motion.div 
       initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
       whileFocus={{ scale: 1.1 }}
       whileHover={{ scale: 1.1, rotate: 10 }}
      
      className="fixed bottom-0 left-0 z-10 flex w-full items-center justify-around bg-white py-3 shadow-t dark:bg-gray-950 lg:hidden">
        <Link
          href="#"
          className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          <HomeIcon className="h-6 w-6" />
          Home
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          <InfoIcon className="h-6 w-6" />
          About
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          <BriefcaseIcon className="h-6 w-6" />
          Services
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          <MailIcon className="h-6 w-6" />
          Contact
        </Link>
      </motion.div>
    </header>
  )
}

function BriefcaseIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function InfoIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}