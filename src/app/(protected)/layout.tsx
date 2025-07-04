import { redirect } from 'next/navigation'
import Sidebar from '@/components/common/sidebar'
import Navbar from '@/components/common/navbar'
import { menus } from '@/lib/constants/sidebar'
import { getServerSession } from '@/lib/auth'

export default async function Layout({ children }: React.PropsWithChildren) {
  const session = await getServerSession()
  if (!session) {
    redirect('/login')
  }
  return (
    <>
      <Navbar />
      <Sidebar links={menus} />
      <div className="w-full">{children}</div>
    </>
  )
}
