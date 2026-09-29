const sumQuantities = (items) => items.reduce((total, i) => total + i.cost * i.quantity, 0);

export const selectVenueTotal = (state) => sumQuantities(state.venue);

export const selectAvTotal = (state) => sumQuantities(state.av);

export const selectMealsTotal = (state) =>
  state.meals.items.filter((m) => m.selected).reduce((total, m) => total + m.cost, 0) *
  state.meals.attendees;

export const selectGrandTotal = (state) =>
  selectVenueTotal(state) + selectAvTotal(state) + selectMealsTotal(state);

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
