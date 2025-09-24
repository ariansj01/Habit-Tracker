import { useState, useEffect } from 'react'

const COMPLETED_HABITS_KEY = 'completed-habits-today'

export function useLocalCompletedHabits() {
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  useEffect(() => {
    // Load from localStorage on mount
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(COMPLETED_HABITS_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          // Check if it's from today
          const today = new Date().toDateString()
          if (parsed.date === today) {
            setCompletedHabits(parsed.habits || [])
          } else {
            // Clear if it's from a different day
            setCompletedHabits([])
            localStorage.removeItem(COMPLETED_HABITS_KEY)
          }
        } catch {
          setCompletedHabits([])
        }
      }
    }
  }, [])

  const addCompletedHabit = (habitId: string) => {
    if (typeof window !== 'undefined') {
      // Check if habit is already completed
      if (completedHabits.includes(habitId)) {
        console.log('Habit already completed:', habitId)
        return
      }
      
      const newCompleted = [...completedHabits, habitId]
      setCompletedHabits(newCompleted)
      localStorage.setItem(COMPLETED_HABITS_KEY, JSON.stringify({
        date: new Date().toDateString(),
        habits: newCompleted
      }))
      console.log('Added habit to local storage:', habitId, newCompleted)
    }
  }

  const isCompleted = (habitId: string) => {
    const result = completedHabits.includes(habitId)
    console.log('Checking if habit is completed:', habitId, result, completedHabits)
    return result
  }

  return {
    completedHabits: completedHabits.map(id => ({ habitId: id })),
    addCompletedHabit,
    isCompleted,
    // Debug info
    rawCompletedHabits: completedHabits,
    // Force refresh function
    refresh: () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(COMPLETED_HABITS_KEY)
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            const today = new Date().toDateString()
            if (parsed.date === today) {
              setCompletedHabits(parsed.habits || [])
            }
          } catch {
            setCompletedHabits([])
          }
        }
      }
    }
  }
}
