import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithRef, createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import Button, { buttonVariants } from "./Button";

type ButtonPropsWithRef = ComponentPropsWithRef<typeof Button>;
type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type ButtonVariant = NonNullable<ButtonVariantProps["variant"]>;
type ButtonSize = NonNullable<ButtonVariantProps["size"]>;

const defaultProps: Partial<ButtonPropsWithRef> = {
  size: "default",
  variant: "default",
};

const renderComponent = (props: Partial<ButtonPropsWithRef> = {}) => {
  return renderWithTheme(<Button {...defaultProps} {...props} />);
};

describe("Button Component", () => {
  const defaultClass =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

  // Snapshot Tests
  it("should match snapshot with default props", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  // Test render
  it("should render button with default props", () => {
    renderComponent({ children: "Click me" });

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(defaultClass);
  });

  // Test className custom
  it("should merge custom className with default classes", () => {
    renderComponent({ className: "custom-class" });

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
    expect(button).toHaveClass(defaultClass);
  });

  // Test asChild prop
  it("should render as child component when asChild is true", () => {
    renderComponent({ asChild: true, children: <a href="#">Link Button</a> });

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass(defaultClass);
  });

  // Test HTML attributes
  it("should forward HTML attributes", () => {
    renderComponent({ type: "submit", "aria-label": "Submit form" });

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("aria-label", "Submit form");
  });

  // Test disabled state
  it("should be disabled when disabled prop is true", () => {
    renderComponent({ disabled: true });

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:pointer-events-none");
  });

  // Test ref forwarding
  it("should forward ref correctly", () => {
    const ref = createRef<HTMLButtonElement>();
    renderComponent({ ref });

    const button = screen.getByRole("button");
    expect(ref.current).toBe(button);
  });

  // Test variants
  describe("Variants", () => {
    const variants: ButtonVariant[] = ["default", "secondary", "outline", "ghost", "link"] as const;

    variants.forEach(variant => {
      it(`should render ${variant} variant correctly`, () => {
        renderComponent({ variant });

        const button = screen.getByRole("button");
        switch (variant) {
          case "default":
            expect(button).toHaveClass(defaultClass);
            break;
          case "secondary":
            expect(button).toHaveClass(
              "border-none bg-button-secondary text-button-foreground shadow-sm hover:bg-button-secondary/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
            );
            break;
          case "outline":
            expect(button).toHaveClass(
              "border border-input bg-none shadow-sm hover:bg-accent hover:text-accent-foreground",
            );
            break;
          case "ghost":
            expect(button).toHaveClass("hover:bg-accent hover:text-accent-foreground");
            break;
          case "link":
            expect(button).toHaveClass("text-primary underline-offset-4 hover:underline");
            break;
        }
      });
    });
  });

  // Test sizes
  describe("Sizes", () => {
    const sizes: ButtonSize[] = ["default", "sm", "lg", "icon"] as const;

    sizes.forEach(size => {
      it(`should render ${size} size correctly`, () => {
        renderComponent({ size });

        const button = screen.getByRole("button");
        switch (size) {
          case "default":
            expect(button).toHaveClass("h-9 px-4 py-2");
            break;
          case "sm":
            expect(button).toHaveClass("h-8 rounded-md px-3 text-xs");
            break;
          case "lg":
            expect(button).toHaveClass("h-10 rounded-md px-8");
            break;
          case "icon":
            expect(button).toHaveClass("h-9 w-9");
            break;
        }
      });
    });
  });

  // Test event handlers
  describe("Event handlers", () => {
    it("should handle click events", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      renderComponent({ onClick: handleClick });

      const button = screen.getByRole("button");
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Test cho loading state
  describe("Loading State", () => {
    it("should show spinner and hide children when isLoading is true", () => {
      renderComponent({
        children: "Click me",
        isLoading: true,
      });

      const button = screen.getByRole("button");
      const spinner = screen.queryByTestId("loading-spinner");
      const text = screen.queryByText("Click me");

      expect(button).toBeDisabled();
      expect(spinner).toBeInTheDocument();
      expect(text).not.toBeInTheDocument();
    });

    it("should not show spinner and show children when isLoading is false", () => {
      renderComponent({
        children: "Click me",
        isLoading: false,
      });

      const button = screen.getByRole("button");
      const spinner = screen.queryByTestId("loading-spinner");
      const text = screen.queryByText("Click me");

      expect(button).not.toBeDisabled();
      expect(spinner).not.toBeInTheDocument();
      expect(text).toBeInTheDocument();
    });

    it("should disable button and prevent click events when loading", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      renderComponent({
        onClick: handleClick,
        isLoading: true,
        children: "Click me",
      });

      const button = screen.getByRole("button");

      expect(button).toBeDisabled();
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should maintain button variants when loading", () => {
      renderComponent({
        variant: "secondary",
        isLoading: true,
        children: "Click me",
      });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-button-secondary");
    });
  });
});
