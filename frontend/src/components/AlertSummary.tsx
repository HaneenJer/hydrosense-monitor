import React from "react";

export const AlertSummary: React.FC<{ alerts: any[] }> = ({ alerts }) => {
  const healthyCount = alerts.filter(alert => alert.classification === "Healthy").length;
  const unhealthyCount = alerts.length - healthyCount;

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      marginLeft: "20px",
      borderRadius: "8px",
      width: "180px",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      backgroundColor: "#f9f9f9"
    }}>
      <h4>Alert Summary</h4>
      <p style={{ color: "#155724" }}>Healthy: {healthyCount}</p>
      <p style={{ color: "#721c24" }}>Needs Attention: {unhealthyCount}</p>
    </div>
  );
};
export default AlertSummary;
