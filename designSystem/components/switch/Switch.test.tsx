import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import { Switch } from "./Switch";

const renderSwitch = (props = {}) => {
  return renderWithTheme(<Switch {...props} />);
};

describe("Switch Component", () => {
  // Snapshot test
  it("should match snapshot", () => {
    const { container } = renderSwitch();
    expect(container.firstChild).toMatchSnapshot();
  });

  // Basic rendering and structure
  it("should render switch component", () => {
    renderSwitch();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  // Default state
  it("should have correct default state (unchecked)", () => {
    renderSwitch();
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("data-state", "unchecked");
    expect(switchElement).toHaveClass("data-[state=unchecked]:bg-input");
  });

  // Checked state
  it("should have correct checked state when checked prop is true", () => {
    renderSwitch({ checked: true });
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("data-state", "checked");
    expect(switchElement).toHaveClass("data-[state=checked]:bg-background-secondary");
  });

  // Custom className
  it("should apply custom className", () => {
    const customClass = "custom-switch";
    renderSwitch({ className: customClass });
    expect(screen.getByRole("switch")).toHaveClass(customClass);
  });

  // Disabled state
  it("should have disabled styles when disabled prop is true", () => {
    renderSwitch({ disabled: true });
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeDisabled();
    expect(switchElement).toHaveClass("disabled:cursor-not-allowed", "disabled:opacity-50");
  });
});
