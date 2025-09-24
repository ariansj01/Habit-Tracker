import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../api-client'
import { Habit, CreateHabitRequest } from '../api'

// Types for API responses
interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

// Fetch all habits
export function useHabits() {
  return useQuery({
    queryKey: ['habits'],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Habit[]>>('/habits')
      return response.data.data
    },
  })
}

// Fetch single habit
export function useHabit(id: string) {
  return useQuery({
    queryKey: ['habits', id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Habit>>(`/habits/${id}`)
      return response.data.data
    },
    enabled: !!id,
  })
}

// Create habit
export function useCreateHabit() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateHabitRequest) => {
      const response = await apiClient.post<ApiResponse<Habit>>('/habits', data)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
    },
  })
}

// Update habit
export function useUpdateHabit() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateHabitRequest> }) => {
      const response = await apiClient.put<ApiResponse<Habit>>(`/habits/${id}`, data)
      return response.data.data
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
      queryClient.invalidateQueries({ queryKey: ['habits', id] })
    },
  })
}

// Delete habit
export function useDeleteHabit() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/habits/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
    },
  })
}

// Complete habit (mark as done for today)
export function useCompleteHabit() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (params: { id: string; currentArchived?: boolean }) => {
      const { id, currentArchived } = params
      try {
        // Use dedicated complete endpoint
        const nextComplete = currentArchived ? false : true
        const response = await apiClient.post<ApiResponse<Habit>>(`/habits/${id}/complete`, { complete: nextComplete })
        return response.data.data
      } catch (error) {
        console.warn('Complete habit endpoint not available:', error)
        return { _id: id, archived: !currentArchived } as Partial<Habit>
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
      queryClient.invalidateQueries({ queryKey: ['completed-habits'] })
    },
  })
}

// Get completed habits for today (habits with archived: true)
export function useCompletedHabits() {
  return useQuery({
    queryKey: ['completed-habits'],
    queryFn: async () => {
      try {
        // Get all habits and filter for archived ones
        const response = await apiClient.get<ApiResponse<any[]>>('/habits')
        const allHabits = response.data.data || []
        const completedHabits = allHabits.filter(habit => habit.archived === true)
        return completedHabits
      } catch (error) {
        console.warn('Completed habits endpoint not available:', error)
        return []
      }
    },
    retry: false,
  })
}
