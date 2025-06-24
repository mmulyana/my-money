export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
