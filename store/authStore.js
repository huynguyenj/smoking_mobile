import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';
const USER_INFO = 'user-info';

export const useUserInfoStorage = create((set, get) => ({
  token: null,
  userInfo: null,

  // Store token in AsyncStorage and Zustand state
  storeToken: async (token) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      set({ token });
    } catch (e) {
      console.error('Error storing token:', e);
    }
  },

  // Get token from AsyncStorage and update Zustand state
  getToken: async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      set({ token });
      return token;
    } catch (e) {
      console.error('Error getting token:', e);
      return null;
    }
  },

  // Store userInfo in AsyncStorage and Zustand state
  storeUserInfo: async (userInfo) => {
    try {
      await AsyncStorage.setItem(USER_INFO, JSON.stringify(userInfo));
      set({ userInfo });
    } catch (e) {
      console.error('Error storing user info:', e);
    }
  },

  // Get userInfo from AsyncStorage and update Zustand state
  getUserInfo: async () => {
    try {
      const userInfoStr = await AsyncStorage.getItem(USER_INFO);
      const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
      set({ userInfo });
      return userInfo;
    } catch (e) {
      console.error('Error getting user info:', e);
      return null;
    }
  },

  // Clear all AsyncStorage and reset Zustand state
  clearAllStorage: async () => {
    try {
      await AsyncStorage.clear();
      set((state) => ({...state, token: null, userInfo: null}));
      await AsyncStorage.clear()
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
  }
}));