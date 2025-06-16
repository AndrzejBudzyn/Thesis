import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ShopListUserPanel from "../components/UserPanel/ShopListUserPanel";

describe("ShopListUserPanel", () => {
  test("renders recipe name and toggle button", () => {
    render(<ShopListUserPanel />);

    expect(screen.getByText("Listy zakupów")).toBeInTheDocument();
    expect(screen.getByText("Placki Ziemniaczne")).toBeInTheDocument();
    expect(screen.getByText("Pokaż listę")).toBeInTheDocument();
  });

  test("displays ingredients after clicking 'Pokaż listę'", () => {
    render(<ShopListUserPanel />);

    fireEvent.click(screen.getByText("Pokaż listę"));

    expect(screen.getByText("Składniki na Placki Ziemniaczne")).toBeInTheDocument();
    expect(screen.getByText("Ziemniaki 500 g")).toBeInTheDocument();
    expect(screen.getByText("Cebula 1 szt.")).toBeInTheDocument();
  });

  test("checks ingredient and applies strikethrough", () => {
    render(<ShopListUserPanel />);

    fireEvent.click(screen.getByText("Pokaż listę"));

    const ziemniakiText = screen.getByText("Ziemniaki 500 g");
    const ziemniakiCheckbox = ziemniakiText.closest("li").querySelector("input[type='checkbox']");

    fireEvent.click(ziemniakiCheckbox);

    expect(ziemniakiText).toHaveClass("line-through");
  });
});
