import { redirect } from "next/navigation";
import { getServerSession } from "~/lib/auth";

export default async function Layout({ children }: React.PropsWithChildren) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return <>{children}</>;
}
