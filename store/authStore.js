import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useUserInfoStorage = create(
  persist(
    (set) => ({
      token: null,
      userInfo: null,
      setToken: (token) => set({ token }),
      setUserInfo: (userInfo) => set({ userInfo }),
      clearAll: () => set({ token: null, userInfo: null }),
    }),
    {
      name: 'user-storage',
      getStorage: () => AsyncStorage, 
    }
  )
)
