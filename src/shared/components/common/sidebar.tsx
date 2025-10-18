"use client";

import { usePathname } from "next/navigation";
import { ComponentType } from "react";
import Link from "next/link";
import {
  IconMap,
  IconStack2,
  IconWallet,
  IconCategory,
  IconPigFilled,
  IconSmartHome,
  IconShoppingBag,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

import { cn } from "@/shared/lib/utils";

import { Button } from "../ui/button";

const menuItems = [
  { icon: IconSmartHome, label: "Home", href: "/app" },
  { icon: IconStack2, label: "Transaction", href: "/app/transaction" },
  { icon: IconMap, label: "Budget", href: "/app/budget" },
  { icon: IconShoppingBag, label: "Wishlist", href: "/app/wishlist" },
  {
    icon: IconCategory,
    label: "Category",
    href: "/app/category",
  },
  {
    icon: IconWallet,
    label: "Wallet",
    href: "/app/wallet",
  },
];
export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full w-[240px] p-4 hidden lg:flex flex-col fixed -z-10 lg:z-10">
      <div className="flex gap-2 items-center">
        <div className="h-7 w-7 rounded-full bg-primary flex justify-center items-center text-white">
          <IconPigFilled className="w-[18px] h-[18px]" />
        </div>
        <p className="text-primary font-medium text-[15px]">MyMoney</p>
      </div>

      <nav className="flex flex-col gap-4 mt-6">
        {menuItems.map((item) => (
          <SideLink
            key={item.label}
            href={item.href}
            icon={item.icon}
            label={item.label}
            pathname={pathname}
          />
        ))}
      </nav>

      <div className="space-y-4 mt-auto">
        <Button
          className="flex justify-start gap-2 w-full rounded py-1.5 px-2 text-muted-foreground hover:bg-foreground/10 hover:text-primary"
          variant={"secondary"}
        >
          <IconSettings />
          Setting
        </Button>
        <Button
          className="flex justify-start gap-2 w-full rounded py-1.5 px-2 text-muted-foreground hover:bg-foreground/10 hover:text-red-500"
          variant={"secondary"}
        >
          <IconLogout />
          Logout
        </Button>
      </div>
    </div>
  );
}

function SideLink({
  href,
  icon: Icon,
  label,
  pathname,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  pathname: string;
}) {
  const isActive = pathname === href.toString();
  return (
    <Link
      href={href}
      className={cn(
        "flex gap-2 w-full rounded py-1.5 px-2 text-muted-foreground hover:bg-foreground/10 hover:text-primary",
        isActive && "bg-foreground/5 text-primary",
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
