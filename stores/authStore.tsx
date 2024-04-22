import { StoreUserType } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  user: StoreUserType | null;
  token: string | null;
};

type AuthActions = {
  setUserData: (data: StoreUserType) => void;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      user: null,
      token: null,
      setUserData: (data) => set(() => ({ user: data })),
      setToken: (data) => set(() => ({ token: data })),
      logout: () => set(() => ({ user: null, token: null })),
    }),
    {
      name: "auth", // name of the item in the storage (must be unique)
    }
  )
);
