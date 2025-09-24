import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../api-client'

interface StreakData {
  currentStreak: number
  longestStreak: number
  lastCompletedDate: string | null
}

export function useHabitStreak(habitId: string) {
  return useQuery({
    queryKey: ['habit-streak', habitId],
    queryFn: async (): Promise<StreakData> => {
      try {
        const response = await apiClient.get(`/habits/${habitId}/streak`)
        return response.data.data
      } catch (e) {
        return { currentStreak: 0, longestStreak: 0, lastCompletedDate: null }
      }
    },
    enabled: !!habitId,
  })
}

export function useAllStreaks() {
  return useQuery({
    queryKey: ['all-streaks'],
    queryFn: async () => {
      const response = await apiClient.get('/habits/streaks')
      return response.data.data
    },
  })
}
