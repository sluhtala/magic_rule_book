import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import Contents from "./Contents";

test("if renders the page header", () => {
    render(<App />);
    const text = screen.getByText(
        "An unofficial Magic: The Gathering -rulebook"
    );
    expect(text).toBeInTheDocument();
});

test("if rules can be rendered", () => {
    const rbook = {
        rules: [{ id: 1, text: "101.1 test rule", headerNum: 1, subNum: 101 }],
        headers: [{ id: 2, text: "1 header" }],
        subHeaders: [{ id: 3, text: "101 sub" }],
    };
    render(
        <>
            {rbook.rules && rbook.headers && rbook.subHeaders && (
                <Contents rBook={rbook} />
            )}
        </>
    );
    const header = screen.getByText("1 header");
    const sub = screen.getByText("101 sub");
    const rule = screen.getByText("test rule");
    expect(header).toBeInTheDocument();
    expect(sub).toBeInTheDocument();
    expect(rule).toBeInTheDocument();
});
