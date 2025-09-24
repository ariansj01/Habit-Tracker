"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useHabit, useUpdateHabit } from '@/lib/hooks/use-habits'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { ArrowRight, Save, X } from 'lucide-react'
import Link from 'next/link'

export default function EditHabitPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const { data: habit, isLoading, error } = useHabit(id)
  const updateHabit = useUpdateHabit()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#4CAF50',
    frequency: 'daily' as const,
  })

  useEffect(() => {
    if (habit) {
      setFormData({
        name: habit.name,
        description: habit.description || '',
        color: habit.color || '#4CAF50',
        frequency: habit.frequency || 'daily',
      })
    }
  }, [habit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateHabit.mutateAsync({ id, data: formData })
      router.push('/habits')
    } catch (error) {
      console.error('Error updating habit:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">در حال بارگذاری...</div>
      </div>
    )
  }

  if (error || !habit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">عادت یافت نشد</h2>
          <Link href="/habits">
            <Button>بازگشت به لیست عادت‌ها</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ویرایش عادت</h1>
          <p className="text-muted-foreground">
            جزئیات عادت خود را ویرایش کنید
          </p>
        </div>
        <Link href="/habits">
          <Button variant="ghost" size="sm">
            <X className="h-4 w-4 mr-2" />
            انصراف
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>جزئیات عادت</CardTitle>
          <CardDescription>
            اطلاعات عادت خود را به‌روزرسانی کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                نام عادت
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: ورزش روزانه"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                توضیحات
              </label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="توضیحات اختیاری"
              />
            </div>

            <div>
              <label htmlFor="color" className="block text-sm font-medium mb-2">
                رنگ
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-12 h-10 rounded border"
                />
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="#4CAF50"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-medium mb-2">
                فرکانس
              </label>
              <select
                id="frequency"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value as 'daily' })}
                className="w-full p-2 border rounded-md"
              >
                <option value="daily">روزانه</option>
              </select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={updateHabit.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {updateHabit.isPending ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
              </Button>
              <Link href="/habits">
                <Button type="button" variant="secondary">
                  انصراف
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
