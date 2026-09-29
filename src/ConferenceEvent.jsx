import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Armchair, Coffee, Croissant, DoorOpen, Mic, Presentation, Projector,
  Sandwich, Signpost, Speaker, Theater, Users, UtensilsCrossed,
} from "lucide-react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { toggleMealSelection, setAttendees, MAX_ATTENDEES } from "./mealsSlice";
import {
  selectVenueTotal, selectAvTotal, selectMealsTotal, formatCurrency,
} from "./selectors";

const VENUE_ICONS = {
  conference: Users,
  auditorium: Theater,
  presentation: Presentation,
  "large-meeting": Armchair,
  "small-meeting": DoorOpen,
};
const AV_ICONS = {
  speakers: Speaker,
  microphones: Mic,
  whiteboards: Presentation,
  projectors: Projector,
  signage: Signpost,
};
const MEAL_ICONS = {
  breakfast: Croissant,
  "high-tea": Coffee,
  lunch: Sandwich,
  dinner: UtensilsCrossed,
};

const QuantityCard = ({ icon: Icon, title, subtitle, cost, quantity, max, onIncrement, onDecrement }) => (
  <div className="item-card">
    <div className="item-icon"><Icon size={40} strokeWidth={1.5} /></div>
    <div className="item-title">{title}</div>
    {subtitle && <div className="item-subtitle">{subtitle}</div>}
    <div className="item-cost">{formatCurrency(cost)}</div>
    <div className="stepper">
      <button className="stepper-btn" onClick={onDecrement} disabled={quantity === 0} aria-label={`Remove one ${title}`}>
        &minus;
      </button>
      <span className="stepper-value" aria-live="polite">{quantity}</span>
      <button className="stepper-btn" onClick={onIncrement} disabled={quantity >= max} aria-label={`Add one ${title}`}>
        +
      </button>
    </div>
    {quantity >= max && <div className="item-limit">Maximum {max} reached</div>}
  </div>
);

const Section = ({ id, title, total, sectionRef, children }) => (
  <section id={id} ref={sectionRef} className="planner-section">
    <h2 className="section-title">{title}</h2>
    {children}
    <div className="section-total">Subtotal: <strong>{formatCurrency(total)}</strong></div>
  </section>
);

const ConferenceEvent = ({ onHomeClick }) => {
  const [showSummary, setShowSummary] = useState(false);
  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const { attendees, items: mealItems } = useSelector((state) => state.meals);
  const venueTotal = useSelector(selectVenueTotal);
  const avTotal = useSelector(selectAvTotal);
  const mealsTotal = useSelector(selectMealsTotal);
  const dispatch = useDispatch();

  const sectionRefs = { venue: useRef(null), addons: useRef(null), meals: useRef(null) };

  const goToSection = (key) => {
    setShowSummary(false);
    // wait for the sections to be rendered again before scrolling
    requestAnimationFrame(() => sectionRefs[key].current?.scrollIntoView({ behavior: "smooth" }));
  };

  return (
    <>
      <nav className="planner-navbar">
        <button className="brand" onClick={onHomeClick}>Conference Expense Planner</button>
        <div className="nav-links">
          <button onClick={() => goToSection("venue")}>Venue</button>
          <button onClick={() => goToSection("addons")}>Add-ons</button>
          <button onClick={() => goToSection("meals")}>Meals</button>
        </div>
        <button className="details-button" onClick={() => setShowSummary(!showSummary)}>
          {showSummary ? "Back to planning" : "Show Details"}
        </button>
      </nav>

      <main className="planner-main">
        {showSummary ? (
          <TotalCost onBack={() => setShowSummary(false)} />
        ) : (
          <>
            <Section id="venue" title="Venue Room Selection" total={venueTotal} sectionRef={sectionRefs.venue}>
              <div className="item-grid">
                {venueItems.map((item) => (
                  <QuantityCard
                    key={item.id}
                    icon={VENUE_ICONS[item.id]}
                    title={item.name}
                    subtitle={`Capacity: ${item.capacity}`}
                    cost={item.cost}
                    quantity={item.quantity}
                    max={item.max}
                    onIncrement={() => dispatch(incrementQuantity(item.id))}
                    onDecrement={() => dispatch(decrementQuantity(item.id))}
                  />
                ))}
              </div>
            </Section>

            <Section id="addons" title="Add-ons Selection" total={avTotal} sectionRef={sectionRefs.addons}>
              <div className="item-grid">
                {avItems.map((item) => (
                  <QuantityCard
                    key={item.id}
                    icon={AV_ICONS[item.id]}
                    title={item.name}
                    cost={item.cost}
                    quantity={item.quantity}
                    max={item.max}
                    onIncrement={() => dispatch(incrementAvQuantity(item.id))}
                    onDecrement={() => dispatch(decrementAvQuantity(item.id))}
                  />
                ))}
              </div>
            </Section>

            <Section id="meals" title="Meals Selection" total={mealsTotal} sectionRef={sectionRefs.meals}>
              <label className="attendees-input">
                Number of people
                <input
                  type="number"
                  min="1"
                  max={MAX_ATTENDEES}
                  value={attendees}
                  onChange={(e) => dispatch(setAttendees(e.target.value))}
                />
              </label>
              <div className="item-grid">
                {mealItems.map((meal) => {
                  const Icon = MEAL_ICONS[meal.id];
                  return (
                    <label key={meal.id} className={`item-card meal-card ${meal.selected ? "selected" : ""}`}>
                      <input
                        type="checkbox"
                        checked={meal.selected}
                        onChange={() => dispatch(toggleMealSelection(meal.id))}
                      />
                      <div className="item-icon"><Icon size={40} strokeWidth={1.5} /></div>
                      <div className="item-title">{meal.name}</div>
                      <div className="item-cost">{formatCurrency(meal.cost)} <span className="per-person">/ person</span></div>
                    </label>
                  );
                })}
              </div>
            </Section>
          </>
        )}
      </main>
    </>
  );
};

export default ConferenceEvent;
