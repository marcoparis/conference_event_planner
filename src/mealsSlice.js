import { createSlice } from "@reduxjs/toolkit";

export const MAX_ATTENDEES = 1000;

const initialState = {
  attendees: 1,
  items: [
    { id: "breakfast", name: "Breakfast", cost: 50, selected: false },
    { id: "high-tea", name: "High Tea", cost: 25, selected: false },
    { id: "lunch", name: "Lunch", cost: 65, selected: false },
    { id: "dinner", name: "Dinner", cost: 70, selected: false },
  ],
};

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    toggleMealSelection: (state, { payload: id }) => {
      const meal = state.items.find((m) => m.id === id);
      if (meal) meal.selected = !meal.selected;
    },
    setAttendees: (state, { payload }) => {
      const n = Math.floor(Number(payload));
      state.attendees = Number.isFinite(n) ? Math.min(Math.max(n, 1), MAX_ATTENDEES) : 1;
    },
  },
});

export const { toggleMealSelection, setAttendees } = mealsSlice.actions;

export default mealsSlice.reducer;
