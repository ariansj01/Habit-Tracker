import { CheckCircle, Circle, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

// Mock data for demonstration
const mockHabits = [
  { id: '1', name: 'ورزش روزانه', completed: true },
  { id: '2', name: 'مطالعه', completed: false },
  { id: '3', name: 'مدیتیشن', completed: true },
]

const mockCalendarData = [
  { date: '2024-01-01', habits: { '1': true, '2': false, '3': true } },
  { date: '2024-01-02', habits: { '1': true, '2': true, '3': false } },
  { date: '2024-01-03', habits: { '1': false, '2': true, '3': true } },
]

export default function TrackingPage() {
  const today = new Date().toLocaleDateString('fa-IR')
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">پیگیری روزانه</h1>
        <p className="text-muted-foreground">
          وضعیت عادت‌های امروز: {today}
        </p>
      </div>

      {/* Today's Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            امروز
          </CardTitle>
          <CardDescription>
            وضعیت عادت‌های امروز
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockHabits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {habit.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className={habit.completed ? "line-through text-muted-foreground" : ""}>
                    {habit.name}
                  </span>
                </div>
                <Button
                  variant={habit.completed ? "secondary" : "default"}
                  size="sm"
                >
                  {habit.completed ? "انجام شده" : "انجام نشده"}
                </Button>
              </div>
            ))}
          </div>
          
          {/* Progress Summary */}
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span>پیشرفت امروز:</span>
              <span className="font-medium">
                {mockHabits.filter(h => h.completed).length} از {mockHabits.length}
              </span>
            </div>
            <div className="mt-2 w-full bg-background rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{
                  width: `${(mockHabits.filter(h => h.completed).length / mockHabits.length) * 100}%`
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>تقویم هفتگی</CardTitle>
          <CardDescription>
            وضعیت عادت‌ها در هفته جاری
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockCalendarData.map((day) => (
              <div key={day.date} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">
                    {new Date(day.date).toLocaleDateString('fa-IR')}
                  </span>
                  <div className="flex gap-1">
                    {Object.entries(day.habits).map(([habitId, completed]) => (
                      <div
                        key={habitId}
                        className={`w-3 h-3 rounded-full ${
                          completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                        title={mockHabits.find(h => h.id === habitId)?.name}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {Object.values(day.habits).filter(Boolean).length} از {Object.keys(day.habits).length}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">میانگین روزانه</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3</div>
            <p className="text-xs text-muted-foreground">عادت انجام شده</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">بهترین استریک</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">روز متوالی</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">درصد موفقیت</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">این هفته</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
