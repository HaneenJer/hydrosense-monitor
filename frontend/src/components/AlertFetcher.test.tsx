import { render, screen } from "@testing-library/react";
import { Table } from "./AlertFetcher";
import '@testing-library/jest-dom';

const sampleAlerts = [
  {
    timestamp: "2010-05-30T10:00:00Z",
    classification: "Healthy",
    readings: { pH: 6.5, temp: 22.1, ec: 1.2 }
  },
  {
    timestamp: "2024-05-31T12:00:00Z",
    classification: "Needs Attention",
    readings: { pH: 9.2, temp: 28.3, ec: 2.5 }
  }
];

test("renders alerts table is in descending order with correct color logic ", () => {
  render(<Table alerts={sampleAlerts} />);
  const rows = screen.getAllByRole("row");
  expect(screen.getByText(/pH: 9.2/)).toBeInTheDocument();
  expect(screen.getByText(/pH: 6.5/)).toBeInTheDocument();
  expect(rows[1]).toHaveClass("unhealthy-row");
  expect(rows[2]).toHaveClass("healthy-row");
});
