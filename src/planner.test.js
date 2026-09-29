import { describe, it, expect, beforeEach } from "vitest";
import { createStore } from "./store";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity } from "./avSlice";
import { toggleMealSelection, setAttendees, MAX_ATTENDEES } from "./mealsSlice";
import {
  selectVenueTotal, selectAvTotal, selectMealsTotal, selectGrandTotal, formatCurrency,
} from "./selectors";

let store;
const venue = (id) => store.getState().venue.find((v) => v.id === id);

beforeEach(() => {
  store = createStore();
});

describe("venue selection", () => {
  it("never goes below zero", () => {
    store.dispatch(decrementQuantity("conference"));
    expect(venue("conference").quantity).toBe(0);
  });

  it("caps the auditorium at 3 bookings", () => {
    for (let i = 0; i < 5; i++) store.dispatch(incrementQuantity("auditorium"));
    expect(venue("auditorium").quantity).toBe(3);
    expect(selectVenueTotal(store.getState())).toBe(3 * 5500);
  });

  it("ignores unknown ids", () => {
    const before = store.getState().venue;
    store.dispatch(incrementQuantity("does-not-exist"));
    expect(store.getState().venue).toEqual(before);
  });
});

describe("meals", () => {
  it("multiplies selected meals by the number of attendees", () => {
    store.dispatch(setAttendees("20"));
    store.dispatch(toggleMealSelection("lunch"));
    store.dispatch(toggleMealSelection("dinner"));
    expect(selectMealsTotal(store.getState())).toBe((65 + 70) * 20);
  });

  it("toggles a meal off again", () => {
    store.dispatch(toggleMealSelection("lunch"));
    store.dispatch(toggleMealSelection("lunch"));
    expect(selectMealsTotal(store.getState())).toBe(0);
  });

  it.each([
    ["", 1],
    ["-5", 1],
    ["abc", 1],
    ["12.7", 12],
    ["999999", MAX_ATTENDEES],
  ])("sanitises attendees input %j to %i", (input, expected) => {
    store.dispatch(setAttendees(input));
    expect(store.getState().meals.attendees).toBe(expected);
  });
});

describe("grand total", () => {
  it("sums venue, add-ons and meals", () => {
    store.dispatch(incrementQuantity("auditorium"));
    store.dispatch(incrementAvQuantity("projectors"));
    store.dispatch(incrementAvQuantity("projectors"));
    store.dispatch(setAttendees(10));
    store.dispatch(toggleMealSelection("breakfast"));

    const state = store.getState();
    expect(selectAvTotal(state)).toBe(400);
    expect(selectGrandTotal(state)).toBe(5500 + 400 + 50 * 10);
  });
});

describe("formatCurrency", () => {
  it("formats dollars with thousands separators", () => {
    expect(formatCurrency(18000)).toBe("$18,000");
  });
});
