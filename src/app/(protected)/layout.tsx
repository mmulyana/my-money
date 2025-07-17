import { redirect } from 'next/navigation'
import Sidebar from '@/components/common/sidebar'
import Navbar from '@/components/common/navbar'
import { menus } from '@/shared/constants/sidebar'
import { getServerSession } from '@/shared/lib/auth'

export default async function Layout({ children }: React.PropsWithChildren) {
  const session = await getServerSession()
  if (!session) {
    redirect('/login')
  }
  return (
    <>
      <Navbar />
      <Sidebar links={menus} />
      <div className="w-full pr-4 pl-4 md:pr-10 md:pl-10">{children}</div>
    </>
  )
}
