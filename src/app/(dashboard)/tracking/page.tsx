"use client"

import { CheckCircle, Circle, Calendar, Flame, Target, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { useHabits, useCompleteHabit } from '@/lib/hooks/use-habits'
import { useHabitStreak } from '@/lib/hooks/use-streak'
import { type Habit } from '@/lib/api'

// Component for individual habit tracking with streak info
function HabitTrackingCard({ 
  habit, 
  isCompleted, 
  onComplete 
}: { 
  habit: Habit
  isCompleted: boolean
  onComplete: () => void
}) {
  const { data: streakData } = useHabitStreak((habit as any)._id)

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
      <div className="flex items-center gap-4">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300'
        }`}>
          {isCompleted && <CheckCircle className="w-4 h-4 text-white" />}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`font-medium ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
              {habit.name}
            </span>
            {habit.description && (
              <span className="text-sm text-muted-foreground">- {habit.description}</span>
            )}
          </div>
          
          {/* Streak Information */}
          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500" />
              استریک: <strong className="text-orange-600">{streakData?.currentStreak || 0}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4 text-blue-500" />
              بهترین: <strong className="text-blue-600">{streakData?.longestStreak || 0}</strong>
            </span>
          </div>
        </div>
      </div>
      
      <Button
        variant={isCompleted ? "secondary" : "primary"}
        size="sm"
        onClick={() => {
          console.log('Button clicked for habit:', habit.name)
          onComplete()
        }}
        disabled={isCompleted}
        className={isCompleted ? "text-green-600" : ""}
      >
        {isCompleted ? (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            انجام شده
          </>
        ) : (
          <>
            <Circle className="h-4 w-4 mr-2" />
            تکمیل کن
          </>
        )}
      </Button>
    </div>
  )
}

export default function TrackingPage() {
  const { data: habits = [], isLoading: habitsLoading } = useHabits()
  const completeHabit = useCompleteHabit()

  // Calculate stats based on archived habits
  const activeHabits = habits.filter(habit => !habit.archived)
  const completedToday = habits.filter(habit => habit.archived === true).length
  const totalToday = activeHabits.length + completedToday // equals habits.length
  const progressPercentage = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0

  console.log('Total habits:', habits.length)
  console.log('Completed habits:', completedToday)
  console.log('Active habits:', activeHabits.length)

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">پیگیری روزانه</h1>
        <p className="text-muted-foreground">
          وضعیت عادت‌های امروز
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">پیشرفت امروز</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {completedToday} از {activeHabits.length} عادت
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">انجام شده</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedToday}</div>
            <p className="text-xs text-muted-foreground">عادت امروز</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">باقی‌مانده</CardTitle>
            <Circle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{Math.max(activeHabits.length - completedToday, 0)}</div>
            <p className="text-xs text-muted-foreground">عادت باقی‌مانده</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>پیشرفت امروز</span>
              <span>{completedToday} از {totalToday}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.max(0, Math.min(100, progressPercentage))}%`
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Habits with Detailed Info */}
      <Card>
        <CardHeader>
          <CardTitle>عادت‌های امروز</CardTitle>
          <CardDescription>
            وضعیت عادت‌های امروز شما با جزئیات استریک
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeHabits.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>هنوز عادتی اضافه نکرده‌اید</p>
                <p className="text-sm">اولین عادت خود را اضافه کنید</p>
              </div>
            ) : (
              activeHabits.map((habit) => {
                const habitId = (habit as any)._id
                // Check if habit is completed (archived: true)
                const isCompleted = habit.archived === true
                console.log('Checking habit completion:', habit.name, habitId, isCompleted, 'archived:', habit.archived)
                return (
                  <HabitTrackingCard 
                    key={(habit as any)._id} 
                    habit={habit} 
                    isCompleted={isCompleted}
                    onComplete={() => handleCompleteHabit((habit as any)._id, (habit as any).archived)}
                  />
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}