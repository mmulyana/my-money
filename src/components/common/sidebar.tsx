'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '~/lib/utils'

interface LinkItem {
  name: string
  path: string
  icon: React.ReactNode
}

interface SidebarProps {
  links: LinkItem[]
}

export default function Sidebar(props: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="w-fit pl-8 absolute hidden md:block">
      <ul className="space-y-4">
        {props.links.map((link) => {
          const isActive = pathname === link.path

          return (
            <li key={link.path}>
              <Link
                href={link.path}
                className="group flex items-center space-x-3 rounded-md p-2 transition-colors duration-200"
              >
                <span
                  className={cn(
                    'text-xl group-hover:text-gray-900',
                    isActive ? 'text-gray-900' : 'text-gray-400',
                  )}
                >
                  {link.icon}
                </span>
                <span
                  className={cn(
                    'group-hover:text-gray-800',
                    isActive ? 'text-gray-900' : 'text-gray-400',
                  )}
                >
                  {link.name}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
