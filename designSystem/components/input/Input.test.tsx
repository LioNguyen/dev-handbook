import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentPropsWithRef, createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import Input from "./Input";

type InputPropsWithRef = ComponentPropsWithRef<typeof Input>;

const defaultProps: Partial<InputPropsWithRef> = {
  placeholder: "Enter text here",
};

const renderComponent = (props: Partial<InputPropsWithRef> = {}) => {
  return renderWithTheme(<Input {...defaultProps} {...props} />);
};

const getInput = () => screen.getByRole("textbox");

describe("Input Component", () => {
  // Snapshot Tests
  it("should match snapshot with default props", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  // Test render
  it("should render basic input correctly", () => {
    renderComponent();

    expect(getInput()).toBeInTheDocument();
    expect(getInput()).toHaveClass(
      "flex h-9 w-full rounded-md border border-input bg-transparent text-text px-3 py-1 text-base shadow-sm transition-colors",
    );
    expect(getInput()).toHaveClass(
      "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text placeholder:text-text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    );
  });

  // Test className custom
  it("should apply custom className correctly", () => {
    renderComponent({ className: "custom-class" });

    expect(getInput()).toHaveClass("custom-class");
  });

  // Test placeholder
  it("should handle placeholder text", () => {
    renderComponent();

    expect(getInput()).toHaveAttribute("placeholder", defaultProps.placeholder);
  });

  it("should handle required attribute", () => {
    renderComponent({ required: true });

    expect(getInput()).toBeRequired();
  });

  it("should handle disabled state", () => {
    renderComponent({ disabled: true });

    expect(getInput()).toBeDisabled();
  });

  // Test ref forwarding
  it("should forward ref correctly", () => {
    const ref = createRef<HTMLInputElement>();
    renderComponent({ ref });

    expect(ref.current).toBe(getInput());
  });

  describe("Input type", () => {
    it("should handle different input types", () => {
      renderComponent({
        type: "password",
        placeholder: "Enter password",
      });

      const input = screen.getByPlaceholderText("Enter password");
      expect(input).toHaveAttribute("type", "password");
    });

    it("should handle file input correctly", () => {
      renderComponent({
        type: "file",
        "aria-label": "Upload file",
      });

      const input = screen.getByLabelText("Upload file");
      expect(input).toHaveAttribute("type", "file");
    });
  });

  describe("Event handlers", () => {
    it("should handle focus states", () => {
      renderComponent();

      const input = getInput();

      input.focus();
      expect(input).toHaveFocus();

      input.blur();
      expect(input).not.toHaveFocus();
    });

    it("should handle onChange events", async () => {
      const handleChange = vi.fn();
      renderComponent({ onChange: handleChange });

      await userEvent.type(getInput(), "test");
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
