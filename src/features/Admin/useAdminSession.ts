import { create } from "zustand";

type State = {
  value: boolean;
};

type Action = {
  setValue: (value: State["value"]) => void;
};

export const useAdminSession = create<State & Action>((set) => ({
  value: false,
  setValue: (value) => set(() => ({ value })),
}));
