import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isOk: undefined,
  place: [],
  amenity: [],
};

const listingSlice = createSlice({
  name: "listing",
  initialState: initState,
  reducers: {
    doGetListing() {},

    listingSuccess(state, action) {
      return action.payload;
    },
    listingFail(state, action) {
      return action.payload;
    },

    resetListing() {
      return initState;
    },
  },
});

export const { doGetListing, listingFail, listingSuccess, resetListing } =
  listingSlice.actions;

export default listingSlice.reducer;
