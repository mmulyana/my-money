import { redirect } from 'next/navigation'
import Navbar from '~/components/common/navbar'
import Sidebar from '~/components/common/sidebar'
import { getServerSession } from '~/lib/auth'
import { menus } from '~/lib/constants/sidebar'

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
