import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: "Nepal",
  topNumber: "10",
};
export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.country =  action.payload.country;
      state.topNumber = action.payload.topNumber;
    },
  },
});
export const { setForm } = formSlice.actions;

export default formSlice.reducer;
