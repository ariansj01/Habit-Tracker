"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { setAuth } from '@/lib/auth'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || 'Login failed')
      }
      const data = await res.json()
      console.log('Login response:', data)
      // Expecting: { success, data: user, accessToken, refreshToken }
      if (!data?.success || !data?.accessToken || !data?.data?._id) {
        throw new Error('Invalid login response')
      }
      setAuth({ accessToken: data.accessToken, refreshToken: data.refreshToken, user: data.data })
      console.log('Auth set, redirecting...')
      router.replace('/habits')
    } catch (err: any) {
      setError(err?.message || 'خطا در ورود')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>ورود</CardTitle>
          <CardDescription>ایمیل و رمز عبور خود را وارد کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">{error}</div>
            )}
            <Input label="ایمیل" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input label="رمز عبور" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button type="submit" loading={isLoading} disabled={isLoading} className="w-full">ورود</Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            حساب ندارید؟ <Link href="/register" className="underline">ثبت‌نام</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


