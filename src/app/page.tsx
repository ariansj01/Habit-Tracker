"use client"

import Link from 'next/link'
import { Plus, TrendingUp, Calendar, Target, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { useHabits, useCompleteHabit } from '@/lib/hooks/use-habits'

import DashboardLayout from './(dashboard)/layout'

export default function HomePage() {
  const { data: habits = [], isLoading: habitsLoading } = useHabits()
  const completeHabit = useCompleteHabit()

  // Calculate stats based on archived habits
  const activeHabits = habits.filter(habit => !habit.archived)
  const completedToday = habits.filter(habit => habit.archived === true).length
  const totalHabits = habits.length
  const totalToday = activeHabits.length + completedToday // equals habits.length
  const rawPct = totalToday > 0 ? (completedToday / totalToday) * 100 : 0
  const successRate = Math.max(0, Math.min(100, Math.round(rawPct)))

  const handleCompleteHabit = async (habitId: string, currentArchived?: boolean) => {
    console.log('Completing habit:', habitId)
    try {
      await completeHabit.mutateAsync({ id: habitId, currentArchived })
      console.log('Habit completed via API')
    } catch (error) {
      console.error('Error completing habit:', error)
    }
  }

  if (habitsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">در حال بارگذاری...</div>
      </div>
    )
  }

  const content = (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">خوش آمدید! 👋</h1>
        <p className="text-muted-foreground">
          امروز چطور پیش می‌رود؟ بیایید عادت‌هایتان را بررسی کنیم
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل عادت‌ها</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHabits}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">امروز انجام شده</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedToday}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">درصد موفقیت</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">باقی‌مانده</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.max(activeHabits.length - completedToday, 0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Habits */}
      <Card>
        <CardHeader>
          <CardTitle>عادت‌های امروز</CardTitle>
          <CardDescription>
            وضعیت عادت‌های امروز شما
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {habits.map((habit) => {
              // Check if habit is completed (archived: true)
              const isCompleted = habit.archived === true
              return (
                <div
                  key={(habit as any)._id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <span className={isCompleted ? "line-through text-muted-foreground" : ""}>
                      {habit.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      isCompleted ? 'text-green-600' : 'text-muted-foreground'
                    }`}>
                      {isCompleted ? 'انجام شده' : 'انجام نشده'}
                    </span>
                    {!isCompleted && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCompleteHabit((habit as any)._id, (habit as any).archived)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>پیشرفت امروز</span>
              <span>{completedToday} از {totalToday}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{
                  width: `${successRate}%`
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>عملیات سریع</CardTitle>
            <CardDescription>
              کارهای مهم امروز
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/add-habit" className="block">
              <Button className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                افزودن عادت جدید
              </Button>
            </Link>
            <Link href="/tracking" className="block">
              <Button variant="secondary" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                پیگیری روزانه
              </Button>
            </Link>
            <Link href="/habits" className="block">
              <Button variant="secondary" className="w-full justify-start">
                <Target className="mr-2 h-4 w-4" />
                مدیریت عادت‌ها
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>انگیزه‌بخش</CardTitle>
            <CardDescription>
              نکات مفید برای ادامه
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• عادت‌های کوچک، تغییرات بزرگ ایجاد می‌کنند</p>
            <p>• ثبات مهم‌تر از کمال است</p>
            <p>• هر روز یک قدم به هدف نزدیک‌تر می‌شوید</p>
            <p>• موفقیت حاصل تکرار است، نه کمال</p>
          </CardContent>
        </Card>
        </div>
    </div>
  )

  // Wrap with dashboard layout to ensure sidebar/header
  return (
    <DashboardLayout>
      {content}
    </DashboardLayout>
  )
}