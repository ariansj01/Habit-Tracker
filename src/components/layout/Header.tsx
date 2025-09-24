'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Menu } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { APP_NAME } from '@/lib/constants'
import { clearAuth, getAccessToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <h1 className="text-xl font-bold">{APP_NAME}</h1>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-9 w-9 p-0"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {getAccessToken() && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => { clearAuth(); router.replace('/login') }}
            >
              خروج
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
