import { render, screen } from "@testing-library/react";
import AlertsPanel from "./AlertsPanel";
import '@testing-library/jest-dom';

test("Render AlertsPanel", () => {
  render(<AlertsPanel />);
  expect(screen.getByLabelText(/Enter Unit ID/i)).toBeInTheDocument();

  // Test buttons
  expect(screen.getByRole("button", { name: /Fetch Alerts/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Send Random Reading/i })).toBeInTheDocument();
});
