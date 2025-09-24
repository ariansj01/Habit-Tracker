export interface Habit {
  _id: string
  userId: string
  name: string
  description?: string
  archived?: boolean
  color?: string
  frequency?: 'daily'
  startDate?: string
  order?: number
}

export interface CreateHabitRequest {
  name: string
  description?: string
  userId?: string
  color?: string
  frequency?: 'daily'
  startDate?: string
  order?: number
}

export interface User {
  _id: string
  email: string
  displayName: string
  avatarUrl?: string
  timezone?: string
}

export interface CreateUserRequest {
  email: string
  password: string
  displayName: string
  avatarUrl?: string
  timezone?: string
  settings?: {
    weekStart?: number
    locale?: string
    notificationsEmailEnabled?: boolean
  }
}

import { apiClient } from './api-client'
import { getUserId } from './auth'

// Habits
export const HabitsAPI = {
  list: async () => {
    const response = await apiClient.get<{success: boolean, message: string, data: Habit[]}>(`/habits/`)
    return response.data.data
  },
  get: async (id: string) => {
    const response = await apiClient.get<{success: boolean, message: string, data: Habit}>(`/habits/${id}`)
    return response.data.data
  },
  create: (data: CreateHabitRequest) => {
    const userId = data.userId || getUserId() || process.env.NEXT_PUBLIC_USER_ID
    if (!userId) {
      return Promise.reject(new Error('USER_ID_NOT_SET'))
    }
    return apiClient.post<{success: boolean, message: string, data: Habit}>(`/habits/`, { ...data, userId }).then(r => r.data.data)
  },
  update: async (id: string, data: Partial<CreateHabitRequest>) => {
    const response = await apiClient.put<{success: boolean, message: string, data: Habit}>(`/habits/${id}`, data)
    return response.data.data
  },
  delete: async (id: string) => { await apiClient.delete(`/habits/${id}`) },
  count: async () => {
    const response = await apiClient.get<{success: boolean, message: string, data: number}>(`/habits/count`)
    return response.data.data
  },
}

// Users (placeholders if needed later)
export const UsersAPI = {
  get: async (id: string) => {
    const response = await apiClient.get<{success: boolean, message: string, data: User}>(`/users/${id}`)
    return response.data.data
  },
  create: (data: CreateUserRequest) => {
    const timezone = data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || undefined
    const settings = {
      weekStart: data.settings?.weekStart ?? 6,
      locale: data.settings?.locale ?? 'fa-IR',
      notificationsEmailEnabled: data.settings?.notificationsEmailEnabled ?? false,
    }
    const body = { ...data, timezone, settings }
    return apiClient.post<{success: boolean, message: string, data: User}>(`/users/`, body).then(r => r.data.data)
  },
  update: async (id: string, data: Partial<CreateUserRequest>) => {
    const response = await apiClient.put<{success: boolean, message: string, data: User}>(`/users/${id}`, data)
    return response.data.data
  },
  delete: async (id: string) => { await apiClient.delete(`/users/${id}`) },
  count: async () => {
    const response = await apiClient.get<{success: boolean, message: string, data: number}>(`/users/count`)
    return response.data.data
  },
}


