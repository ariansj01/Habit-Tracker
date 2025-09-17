import Link from 'next/link'
import { Plus, Edit, Trash2, Archive } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

// Mock data for demonstration
const mockHabits = [
  {
    id: '1',
    name: 'ورزش روزانه',
    description: '30 دقیقه ورزش صبحگاهی',
    streak: 5,
    isActive: true,
  },
  {
    id: '2',
    name: 'مطالعه',
    description: 'خواندن 20 صفحه کتاب',
    streak: 12,
    isActive: true,
  },
  {
    id: '3',
    name: 'مدیتیشن',
    description: '10 دقیقه مدیتیشن',
    streak: 0,
    isActive: false,
  },
]

export default function HabitsPage() {
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
            <div className="text-2xl font-bold">{mockHabits.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عادت‌های فعال</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockHabits.filter(h => h.isActive).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">میانگین استریک</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockHabits.reduce((acc, h) => acc + h.streak, 0) / mockHabits.length)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Habits List */}
      <div className="grid gap-4">
        {mockHabits.map((habit) => (
          <Card key={habit.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {habit.name}
                    {!habit.isActive && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        آرشیو شده
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{habit.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>استریک فعلی: <strong className="text-foreground">{habit.streak}</strong></span>
                <span>وضعیت: <strong className={habit.isActive ? "text-green-600" : "text-muted-foreground"}>
                  {habit.isActive ? "فعال" : "غیرفعال"}
                </strong></span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockHabits.length === 0 && (
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
