"use client"

import { Layout } from '@/components/layout/Layout'
import { useAuth } from '@/components/providers/AuthProvider'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">در حال بارگذاری...</div>
      </div>
    )
  }

  return <Layout>{children}</Layout>
}
