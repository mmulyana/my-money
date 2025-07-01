import {
  ArrowLeftRight,
  Box,
  Database,
  House,
  PieChart,
  RefreshCcw,
  ShoppingBag,
  Wallet,
} from 'lucide-react'

export const menus = [
  {
    name: 'Home',
    path: '/dashboard',
    icon: <House size={20} />,
  },
  {
    name: 'Transaction',
    path: '/dashboard/transaction',
    icon: <ArrowLeftRight size={20} />,
  },
  {
    name: 'Budget',
    path: '/dashboard/budget',
    icon: <PieChart size={20} />,
  },
  {
    name: 'Wishlist',
    path: '/dashboard/wishlist',
    icon: <ShoppingBag size={20} />,
  },
  {
    name: 'Savings',
    path: '/dashboard/savings',
    icon: <Database size={20} />,
  },
  {
    name: 'Recurring',
    path: '/dashboard/recurring',
    icon: <RefreshCcw size={20} />,
  },
  {
    name: 'Wallet',
    path: '/dashboard/wallet',
    icon: <Wallet size={20} />,
  },
  {
    name: 'Category',
    path: '/dashboard/category',
    icon: <Box size={20} />,
  },
]
