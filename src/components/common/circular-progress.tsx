import { useEffect, useState } from 'react'
import { cn } from '~/lib/utils'

type props = {
  icon: React.ReactNode
  progress: number
  color: string
  size?: number
  strokeWidth?: number
  className?: string
}

export default function CircularProgress({
  icon,
  progress,
  color,
  size = 80,
  strokeWidth = 8,
  className,
}: props) {
  const radius = 40
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI

  return (
    <div
      className={cn(
        'relative flex items-center justify-center p-[28px]',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        className="absolute"
        height={size}
        width={size}
        viewBox="0 0 100 100"
      >
        <circle
          stroke={color}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          r={normalizedRadius}
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
          strokeDashoffset={circumference - (progress / 100) * circumference}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-out',
          }}
        />
      </svg>

      <div
        className="relative z-10 h-full w-full rounded-full"
        style={{
          background: color,
          opacity: 0.1,
        }}
      ></div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ color }}
      >
        {icon}
      </div>
    </div>
  )
}
