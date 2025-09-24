"use client"

import Link from 'next/link'
import { Plus, Edit, Trash2, CheckCircle, RefreshCw, Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { useHabits, useDeleteHabit, useCompleteHabit } from '@/lib/hooks/use-habits'
import { useHabitStreak } from '@/lib/hooks/use-streak'
import { type Habit } from '@/lib/api'

// Component to display habit streak information
function HabitStreakInfo({ habitId }: { habitId: string }) {
  const { data: streakData, isLoading } = useHabitStreak(habitId)

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>در حال بارگذاری...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <span>
        استریک فعلی: <strong className="text-foreground text-orange-600">
          {streakData?.currentStreak || 0} روز
        </strong>
      </span>
      <span>
        بهترین استریک: <strong className="text-foreground text-blue-600">
          {streakData?.longestStreak || 0} روز
        </strong>
      </span>
      <span className="text-green-600">
        🔥 {streakData?.currentStreak || 0}
      </span>
    </div>
  )
}

export default function HabitsPage() {
  const { data: habits = [], isLoading, error, refetch } = useHabits()
  const deleteHabit = useDeleteHabit()
  const completeHabit = useCompleteHabit()

  const handleDelete = async (id: string) => {
    try {
      await deleteHabit.mutateAsync(id)
    } catch (e: any) {
      console.error('Error deleting habit:', e)
    }
  }

  const handleEdit = (habit: Habit) => {
    // Navigate to edit page
    window.location.href = `/habits/${(habit as any)._id}/edit`
  }

  const handleComplete = async (id: string, currentArchived?: boolean) => {
    try {
      await completeHabit.mutateAsync({ id, currentArchived })
    } catch (e: any) {
      console.error('Error completing habit:', e)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">عادت‌های من</h1>
          <p className="text-muted-foreground">
            مدیریت و پیگیری عادت‌های روزانه
          </p>
        </div>
        <Link href="/add-habit">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            افزودن عادت
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل عادت‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{habits?.length ?? 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عادت‌های فعال</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{habits.filter(h => !h.archived).length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">میانگین استریک</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Habits List */}
      <div className="grid gap-4">
        {isLoading && (
          <Card>
            <CardContent className="p-6">
              در حال بارگذاری...
            </CardContent>
          </Card>
        )}

        {error && (
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <span className="text-destructive text-sm">{error.message || 'خطا در دریافت داده‌ها'}</span>
              <Button size="sm" variant="secondary" onClick={() => refetch()}>
                <RefreshCw className="h-4 w-4 mr-2" /> تلاش مجدد
              </Button>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && habits.map((habit) => (
          <Card key={(habit as any)._id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {habit.name}
                    {habit.archived === true && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        آرشیو شده
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{habit.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(habit)} title="ویرایش عادت">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleComplete((habit as any)._id, (habit as any).archived)}
                    title={habit.archived ? "بازگردانی از آرشیو" : "تکمیل عادت امروز"}
                    className={habit.archived ? "text-amber-600 hover:text-amber-700" : "text-green-600 hover:text-green-700"}
                  >
                    {habit.archived ? <Undo2 className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete((habit as any)._id)} title="حذف عادت">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <HabitStreakInfo habitId={(habit as any)._id} />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">رنگ:</span>
                  <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: (habit as any).color || '#e5e7eb' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isLoading && !error && habits.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">هنوز عادتی اضافه نکرده‌اید</h3>
              <p className="text-muted-foreground mb-4">
                اولین عادت خود را اضافه کنید تا شروع کنید
              </p>
              <Link href="/add-habit">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  افزودن اولین عادت
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
