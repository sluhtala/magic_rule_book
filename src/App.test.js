import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("if renders the page header", () => {
    render(<App />);
    const text = screen.getByText(
        "An unofficial Magic: The Gathering -rulebook"
    );
    expect(text).toBeInTheDocument();
});
