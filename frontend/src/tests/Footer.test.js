import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  test("Display footer", () => {
    render(<Footer />);
    expect(screen.getByText("Przepisi")).toBeInTheDocument();
    expect(screen.getByText("Twoja baza kulinarnych inspiracji.")).toBeInTheDocument();
  });

  test("Got navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Kontakt")).toBeInTheDocument();
    expect(screen.getByText("Regulamin")).toBeInTheDocument();
    expect(screen.getByText("Polityka prywatności")).toBeInTheDocument();
  });
});
