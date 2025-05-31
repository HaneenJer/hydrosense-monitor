import React from "react";
import "./App.css"
import AlertsPanel from "./components/AlertsPanel";

// main content to hold the design of the first page 
// left side an image 
// right side is welcoming 
// AlertsPanel implements the main features and renders the table

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="header-row">
        <span data-testid="app-header" className="heading">HydroSense Monitor</span>
      </div>
      <div className="main-content">
          <div className="first-half">
            <img src="/plant-image.png" alt="Green Plant" className="plant-image" />
          </div>  
          <div className="sec-half">
            <h2>Welcome to HydroSense Monitor</h2>
            <p>
              Track your plants' health effortlessly and stay connected with nature.
            </p>
            <p>
              Our system ensures your garden thrives with smart monitoring and real-time data.
            </p>
          </div>
      </div>
      <div className="features">
        <AlertsPanel/>
      </div>
    </div>
  );
};

export default App;
