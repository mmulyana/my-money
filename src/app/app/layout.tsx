import { Sidebar } from "@/shared/components/common/sidebar";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex">
      <div className="hidden lg:flex w-[240px]">
        <Sidebar />
      </div>
      <div className="flex-1 min-w-0 lg:pr-4 lg:pb-4">{children}</div>
    </div>
  );
}
