import React from "react";
import "./AlertFetcher.css";

// before trying to get data check if user typed a unitId 
// if user didn't type a unitId and clicked on the button to fetch this is an error

// if there's a unitId get the latest 10 readings that needs attention 

export const fetchAlerts = async (
  unitId: string,
  setAlerts: Function,
  setError: Function
) => {
  if (!unitId.trim()) {
    setError("Please enter a unit ID");
    return;
  }
  setError("");
  setAlerts([]);
  try {
    const res = await fetch(`http://localhost:5000/api/alerts?unitId=${unitId}`);
    const data = await res.json();
    console.log(data);
    if (data.status === "OK") {
      setAlerts(data.message);
    } else {
      setError(data.message || "Failed to fetch alerts");
    }
  } catch {
    setError("Network error");
  }
};


// display the readings data in a table : Timestamp Readings
// data is ordered in the table where the top rows hold the latest 
export const Table: React.FC<{ alerts: any[] }> = ({ alerts }) => (
  <table className="alerts-table">
    <thead>
      <tr>
        <th>Timestamp</th>
        <th>Readings</th>
      </tr>
    </thead>
    <tbody>
      {alerts
        .slice() 
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .map((alert, key) => {
        const isHealthy = alert.classification === "Healthy";
        return (
          <tr key={key}
            className={isHealthy ? "healthy-row" : "unhealthy-row"}>
            <td>{new Date(alert.timestamp).toLocaleString()}</td>
            <td>
              pH: {alert.readings.pH}, Temp: {alert.readings.temp}°C, EC: {alert.readings.ec}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default {
  fetchAlerts,
  Table,
};
