'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function AddHabitPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Clear previous errors
    setErrors({})
    
    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = 'نام عادت الزامی است'
    }
    if (formData.name.trim().length < 2) {
      newErrors.name = 'نام عادت باید حداقل 2 کاراکتر باشد'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // TODO: API call will be implemented in Stage 6
      console.log('Creating habit:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to habits list
      router.push('/habits')
    } catch (error) {
      console.error('Error creating habit:', error)
      setErrors({ general: 'خطا در ایجاد عادت. لطفاً دوباره تلاش کنید.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">افزودن عادت جدید</h1>
        <p className="text-muted-foreground">
          عادت جدیدی برای پیگیری روزانه اضافه کنید
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>اطلاعات عادت</CardTitle>
          <CardDescription>
            جزئیات عادت جدید را وارد کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {errors.general}
              </div>
            )}
            
            <Input
              label="نام عادت *"
              placeholder="مثال: ورزش روزانه"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
              helperText="نام کوتاه و واضح برای عادت خود انتخاب کنید"
            />
            
            <Input
              label="توضیحات (اختیاری)"
              placeholder="مثال: 30 دقیقه ورزش صبحگاهی"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              helperText="توضیحات بیشتر در مورد این عادت"
            />
            
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'در حال ایجاد...' : 'ایجاد عادت'}
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                انصراف
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">نکات مفید</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• نام عادت را کوتاه و واضح انتخاب کنید</p>
          <p>• عادت‌های کوچک و قابل انجام را در اولویت قرار دهید</p>
          <p>• می‌توانید بعداً عادت را ویرایش یا حذف کنید</p>
        </CardContent>
      </Card>
    </div>
  )
}
