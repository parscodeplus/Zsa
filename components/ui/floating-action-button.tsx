/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UWtwWSIDg39
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import React from "react"

export default function FloatingActionButton() {
  return (
    <div className="relative inline-block text-left">
      <div
        className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1" role="none">
          <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
            Option 1
          </a>
          <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
            Option 2
          </a>
        </div>
      </div>
      <Button className="fixed bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
        <PlusIcon className="w-6 h-6" />
      </Button>
    </div>
  )
}

function PlusIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}