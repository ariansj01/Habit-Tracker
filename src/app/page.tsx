import Link from 'next/link'
import { Plus, TrendingUp, Calendar, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

// Mock data for demonstration
const mockStats = {
  totalHabits: 3,
  completedToday: 2,
  weeklyStreak: 5,
  successRate: 76
}

const mockTodayHabits = [
  { id: '1', name: 'ورزش روزانه', completed: true },
  { id: '2', name: 'مطالعه', completed: false },
  { id: '3', name: 'مدیتیشن', completed: true },
]

export default function HomePage() {
  return (
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
            <div className="text-2xl font-bold">{mockStats.totalHabits}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">امروز انجام شده</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.completedToday}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">استریک هفتگی</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.weeklyStreak}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">درصد موفقیت</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.successRate}%</div>
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
            {mockTodayHabits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    habit.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <span className={habit.completed ? "line-through text-muted-foreground" : ""}>
                    {habit.name}
                  </span>
                </div>
                <span className={`text-sm font-medium ${
                  habit.completed ? 'text-green-600' : 'text-muted-foreground'
                }`}>
                  {habit.completed ? 'انجام شده' : 'انجام نشده'}
                </span>
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>پیشرفت امروز</span>
              <span>{mockStats.completedToday} از {mockStats.totalHabits}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{
                  width: `${(mockStats.completedToday / mockStats.totalHabits) * 100}%`
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
}