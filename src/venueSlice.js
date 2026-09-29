import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "conference", name: "Conference Room", capacity: 15, cost: 3500, max: 10, quantity: 0 },
  { id: "auditorium", name: "Auditorium Hall", capacity: 200, cost: 5500, max: 3, quantity: 0 },
  { id: "presentation", name: "Presentation Room", capacity: 50, cost: 700, max: 10, quantity: 0 },
  { id: "large-meeting", name: "Large Meeting Room", capacity: 10, cost: 900, max: 10, quantity: 0 },
  { id: "small-meeting", name: "Small Meeting Room", capacity: 5, cost: 1100, max: 10, quantity: 0 },
];

export const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {
    incrementQuantity: (state, { payload: id }) => {
      const item = state.find((i) => i.id === id);
      if (item && item.quantity < item.max) item.quantity++;
    },
    decrementQuantity: (state, { payload: id }) => {
      const item = state.find((i) => i.id === id);
      if (item && item.quantity > 0) item.quantity--;
    },
  },
});

export const { incrementQuantity, decrementQuantity } = venueSlice.actions;

export default venueSlice.reducer;
