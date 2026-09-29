import { configureStore } from "@reduxjs/toolkit";
import venueReducer from "./venueSlice";
import avReducer from "./avSlice";
import mealsReducer from "./mealsSlice";

export const createStore = (preloadedState) =>
  configureStore({
    reducer: {
      venue: venueReducer,
      av: avReducer,
      meals: mealsReducer,
    },
    preloadedState,
  });

export default createStore();
