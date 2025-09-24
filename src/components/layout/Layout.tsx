'use client'

import { useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        <main className="flex-1 md:ml-64 min-w-0">
          <div className="container mx-auto p-4 md:p-6 max-w-6xl">
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
