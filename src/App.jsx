import { useState } from "react";
import "./App.css";
import ConferenceEvent from "./ConferenceEvent";
import AboutUs from "./AboutUs";

function App() {
  const [showPlanner, setShowPlanner] = useState(false);

  return (
    <>
      <header className="landing" aria-hidden={showPlanner}>
        <div className="landing-overlay">
          <div className="landing-intro">
            <h1>Conference Expense Planner</h1>
            <p className="landing-tagline">Plan your next major event with us!</p>
            <button onClick={() => setShowPlanner(true)} className="get-started-btn">
              Get Started
            </button>
          </div>
          <AboutUs />
        </div>
      </header>

      <div className={`planner-container ${showPlanner ? "visible" : ""}`}>
        <ConferenceEvent onHomeClick={() => setShowPlanner(false)} />
      </div>
    </>
  );
}

export default App;
