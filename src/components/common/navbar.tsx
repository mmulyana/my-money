'use client'
import { Bell, MessageSquareText, Triangle, Wallet } from 'lucide-react'
import { authClient } from '~/lib/utils/auth-client'

export default function Navbar() {
  const { data } = authClient.useSession()
  return (
    <div className="flex w-full items-center justify-between px-4 py-3 md:px-10">
      <Logo />
      <div className="flex items-center gap-4">
        <MessageSquareText className="fill-gray-100" size={20} />
        <Bell className="fill-gray-800 stroke-gray-800" size={20} />
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-300 uppercase flex justify-center items-center">
            {data?.user.name.at(1)}
          </div>
          <p className="hidden md:block">{data?.user.name}</p>
          <Triangle
            className="rotate-180 fill-gray-300 stroke-gray-300"
            size={12}
          />
        </div>
      </div>
    </div>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 items-center justify-center rounded bg-[#31B9B5]">
        <Wallet size={18} className="text-white" />
      </div>
      <p className="font-medium text-gray-800">My Money</p>
    </div>
  )
}
