import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "speakers", name: "Speakers", cost: 35, max: 20, quantity: 0 },
  { id: "microphones", name: "Microphones", cost: 45, max: 20, quantity: 0 },
  { id: "whiteboards", name: "Whiteboards", cost: 80, max: 20, quantity: 0 },
  { id: "projectors", name: "Projectors", cost: 200, max: 20, quantity: 0 },
  { id: "signage", name: "Signage", cost: 80, max: 20, quantity: 0 },
];

export const avSlice = createSlice({
  name: "av",
  initialState,
  reducers: {
    incrementAvQuantity: (state, { payload: id }) => {
      const item = state.find((i) => i.id === id);
      if (item && item.quantity < item.max) item.quantity++;
    },
    decrementAvQuantity: (state, { payload: id }) => {
      const item = state.find((i) => i.id === id);
      if (item && item.quantity > 0) item.quantity--;
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

export default avSlice.reducer;
