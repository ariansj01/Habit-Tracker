'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Plus, List, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const navigation = [
  { name: 'خانه', href: ROUTES.HOME, icon: Home },
  { name: 'عادت‌ها', href: ROUTES.HABITS, icon: List },
  { name: 'افزودن عادت', href: ROUTES.ADD_HABIT, icon: Plus },
  { name: 'پیگیری', href: ROUTES.TRACKING, icon: BarChart3 },
]

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform md:relative md:top-0 md:z-auto md:h-screen md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <nav className="flex flex-col p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive 
                    ? "bg-accent text-accent-foreground" 
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Stats placeholder */}
        <div className="p-4 border-t mt-auto">
          <div className="text-sm text-muted-foreground mb-2">آمار امروز</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>عادت‌های فعال:</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span>انجام شده:</span>
              <span className="font-medium text-green-600">0</span>
            </div>
            <div className="flex justify-between">
              <span>درصد موفقیت:</span>
              <span className="font-medium">0%</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
