"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { UsersAPI } from '@/lib/api'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [timezone, setTimezone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await UsersAPI.create({
        email,
        password,
        displayName,
        timezone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        settings: { weekStart: 6, locale: 'fa-IR', notificationsEmailEnabled: false },
      })
      router.replace('/login')
    } catch (err: any) {
      const msg = String(err?.message || '')
      if (msg.includes('duplicate key') || msg.includes('E11000')) {
        setError('این ایمیل قبلاً ثبت شده است')
      } else {
        setError(msg || 'ثبت‌نام ناموفق بود')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>ثبت‌نام</CardTitle>
          <CardDescription>برای ایجاد حساب جدید فرم را پر کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">{error}</div>
            )}
            <Input label="ایمیل" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input label="نام نمایشی" value={displayName} onChange={e => setDisplayName(e.target.value)} required />
            <Input label="رمز عبور" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <Input label="منطقه زمانی (اختیاری)" placeholder="Asia/Tehran" value={timezone} onChange={e => setTimezone(e.target.value)} />
            <Button type="submit" loading={isLoading} disabled={isLoading} className="w-full">ثبت‌نام</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


