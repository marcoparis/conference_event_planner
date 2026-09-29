import { useSelector } from "react-redux";
import "./TotalCost.css";
import { selectGrandTotal, formatCurrency } from "./selectors";

const TotalCost = ({ onBack }) => {
  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const { attendees, items: mealItems } = useSelector((state) => state.meals);
  const grandTotal = useSelector(selectGrandTotal);

  const rows = [
    ...venueItems
      .filter((i) => i.quantity > 0)
      .map((i) => ({ key: i.id, name: i.name, unit: i.cost, quantity: i.quantity, total: i.cost * i.quantity })),
    ...avItems
      .filter((i) => i.quantity > 0)
      .map((i) => ({ key: i.id, name: i.name, unit: i.cost, quantity: i.quantity, total: i.cost * i.quantity })),
    ...mealItems
      .filter((m) => m.selected)
      .map((m) => ({
        key: m.id,
        name: `${m.name} (per person)`,
        unit: m.cost,
        quantity: attendees,
        total: m.cost * attendees,
      })),
  ];

  return (
    <div className="summary">
      <p className="summary-label">Total cost for the event</p>
      <p className="summary-total">{formatCurrency(grandTotal)}</p>

      {rows.length === 0 ? (
        <p className="summary-empty">Nothing selected yet. Pick a venue, add-ons or meals to see the breakdown.</p>
      ) : (
        <div className="summary-table-wrapper">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Unit cost</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key}>
                  <td>{r.name}</td>
                  <td>{formatCurrency(r.unit)}</td>
                  <td>{r.quantity}</td>
                  <td>{formatCurrency(r.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="summary-back" onClick={onBack}>Back to planning</button>
    </div>
  );
};

export default TotalCost;
