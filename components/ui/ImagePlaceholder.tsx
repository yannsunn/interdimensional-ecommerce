import React from 'react'

interface ImagePlaceholderProps {
  className?: string
  alt?: string
}

export function ImagePlaceholder({ className = '', alt = '画像準備中' }: ImagePlaceholderProps) {
  return (
    <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
      <div className="text-center p-4">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-gray-500 text-sm">画像準備中</p>
      </div>
    </div>
  )
}