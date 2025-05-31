import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";

describe("App component", () => {
  test("renders AlertsPanel component", () => {
    render(<App />);
    const featuresContainer = screen.getByText(/Enter Unit ID:/i);
    expect(featuresContainer).toBeInTheDocument();
  });
});