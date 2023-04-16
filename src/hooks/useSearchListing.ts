import { create } from "zustand";
import { type FormSearchListingProps } from "../types";

type State = {
  value: FormSearchListingProps & {
    latitude?: number;
    longitude?: number;
  };
};

type Action = {
  setValue: (value: State["value"]) => void;
};

export const useSearchListing = create<State & Action>((set) => ({
  value: {
    checkIn: undefined,
    checkOut: undefined,
    guest: undefined,
    latitude: undefined,
    longitude: undefined,
  },
  setValue: (value) => set(() => ({ value })),
}));
