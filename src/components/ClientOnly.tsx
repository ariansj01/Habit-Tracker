"use client"

import { useMounted } from '@/lib/hooks/use-mounted'

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const mounted = useMounted()

  if (!mounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
