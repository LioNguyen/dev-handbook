import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentPropsWithRef, createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import RangeSlider from "./RangeSlider";

type RangeSliderPropsWithRef = ComponentPropsWithRef<typeof RangeSlider>;

const defaultProps: Partial<RangeSliderPropsWithRef> = {};

const renderComponent = (props: Partial<RangeSliderPropsWithRef> = {}) => {
  return renderWithTheme(<RangeSlider {...defaultProps} {...props} />);
};

const getRangeInput = () => screen.getByRole("slider");

describe("RangeSlider Component", () => {
  // Snapshot test
  it("should match snapshot with default props", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  // Test render
  it("should render range input with default values", () => {
    renderComponent();
    const input = getRangeInput();

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "range");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
    expect(input).toHaveAttribute("step", "1");
    expect(input).toHaveValue("0");
  });

  // Test custom props
  it("should apply custom className correctly", () => {
    const customClass = "custom-class";
    renderComponent({ className: customClass });

    const container = screen.getByRole("slider").parentElement?.parentElement?.parentElement?.parentElement;
    expect(container).toHaveClass(customClass);
  });

  it("should handle custom min/max values", () => {
    renderComponent({ min: 10, max: 200 });
    const input = getRangeInput();

    expect(input).toHaveAttribute("min", "10");
    expect(input).toHaveAttribute("max", "200");
  });

  it("should handle custom step value", () => {
    renderComponent({ step: 5 });
    expect(getRangeInput()).toHaveAttribute("step", "5");
  });

  it("should use defaultValue correctly", () => {
    renderComponent({ defaultValue: 50 });
    expect(getRangeInput()).toHaveValue("50");
  });

  // Test onChange
  it("should handle onChange events", async () => {
    const handleChange = vi.fn();
    renderComponent({ onChange: handleChange });

    const input = getRangeInput();
    await userEvent.type(input, "50");

    expect(handleChange).toHaveBeenCalled();
  });

  // Test ref forwarding
  it("should forward ref correctly", () => {
    const ref = createRef<HTMLDivElement>();
    renderComponent({ ref });

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
