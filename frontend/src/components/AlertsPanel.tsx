import React, { useState } from "react";
import "./AlertsPanel.css"; 
import AlertFetcher from "./AlertFetcher";
import RandomReadingSender from "./RandomReadingSender";

// this interface defines the Reading shape 
interface Reading {
  timestamp: string;
  readings: {
    pH: number;
    temp: number;
    ec: number;
  };
  classification: string;
}

// small feature that counts the number of healthy plants and the non healthy 
const AlertSummary: React.FC<{ alerts: Reading[] }> = ({ alerts }) => {
  const healthyCount = alerts.filter((alert: Reading) => alert.classification === "Healthy").length;
  const unhealthyCount = alerts.length - healthyCount;

  return (
    <div className="alert-summary">
      <h4>Alert Summary</h4>
      <p className="healthy-count">Healthy: {healthyCount}</p>
      <p className="unhealthy-count">Needs Attention: {unhealthyCount}</p>
    </div>
  );
};

// The following states are used for re-rendering 
const AlertsPanel: React.FC = () => {
  const [unitId, setUnitId] = useState("");
  const [alerts, setAlerts] = useState<Reading[]>([]);
  const [error, setError] = useState("");

  // first ask user to type unit id, and change unitId state accrodingly
  // then display the buttons for the main features
  // first button to fetch (return latest need attention)
  // second button to generate a new random reading and add it to the table 

  return (
    <div className="alerts-panel">
      <label>
        Enter Unit ID:{" "}
        <input
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          className="unit-id-input"
        />
      </label>

      <div className="buttons-container">
        <button
          type="button" 
          onClick={() => AlertFetcher.fetchAlerts(unitId, setAlerts, setError)}
          className="fetch-button">
          Fetch Alerts
        </button>

        <button 
          type="button" 
          onClick={() => RandomReadingSender.send(unitId, setAlerts, setError)}>
          Send Random Reading
        </button>

        
      </div>

      {error && <p className="error-message">{error}</p>}
      {alerts.length > 0 && (
  <div style={{ display: "flex", alignItems: "flex-start", marginTop: "20px" }}>
    <AlertFetcher.Table alerts={alerts} />
    <AlertSummary alerts={alerts} />
  </div>
)}

    </div>
  );
};

export default AlertsPanel;
