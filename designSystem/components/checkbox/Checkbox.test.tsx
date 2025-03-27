import { screen, fireEvent } from "@testing-library/react";
import { ComponentPropsWithRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "@/shared/utils";
import { Checkbox } from "./Checkbox";

// Mock radix-ui checkbox with proper event handling
vi.mock("@radix-ui/react-checkbox", () => ({
  Root: vi.fn(({ children, className, checked, disabled, onCheckedChange, ...props }) => (
    <button
      type="button"
      data-testid="checkbox-root"
      data-state={checked ? "checked" : "unchecked"}
      disabled={disabled}
      className={className}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      {children}
    </button>
  )),
  Indicator: vi.fn(({ children, className }) => (
    <span data-testid="checkbox-indicator" className={className}>
      {children}
    </span>
  )),
}));

// Mock lucide-react
vi.mock("lucide-react", async () => {
  const actual = await vi.importActual("lucide-react");
  return {
    ...actual,
    Check: () => <div data-testid="check-icon" />,
  };
});

type CheckboxProps = ComponentPropsWithRef<typeof Checkbox>;

const defaultProps: Partial<CheckboxProps> = {};

const renderComponent = (props: Partial<CheckboxProps> = {}) => {
  return renderWithTheme(<Checkbox {...defaultProps} {...props} />);
};

describe("Checkbox Component", () => {
  const defaultClass =
    "peer h-4 w-4 shrink-0 rounded-sm border border-secondary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-background-secondary data-[state=checked]:text-primary-foreground";

  // Snapshot Tests
  it("should match snapshot with default props", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  // Basic Rendering
  it("should render checkbox with default props", () => {
    renderComponent();
    const checkbox = screen.getByTestId("checkbox-root");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass(defaultClass);
  });

  // States
  it("should render in unchecked state by default", () => {
    renderComponent();
    const checkbox = screen.getByTestId("checkbox-root");
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
  });

  it("should render in checked state when checked prop is true", () => {
    renderComponent({ checked: true });
    const checkbox = screen.getByTestId("checkbox-root");
    expect(checkbox).toHaveAttribute("data-state", "checked");
    const indicator = screen.getByTestId("checkbox-indicator");
    expect(indicator).toBeInTheDocument();
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
  });

  it("should render in disabled state", () => {
    renderComponent({ disabled: true });
    const checkbox = screen.getByTestId("checkbox-root");
    expect(checkbox).toBeDisabled();
  });

  // Event Handlers
  it("should call onCheckedChange when clicked", () => {
    const handleChange = vi.fn();
    renderComponent({ onCheckedChange: handleChange });

    const checkbox = screen.getByTestId("checkbox-root");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  // Custom Styling
  it("should merge custom className with default classes", () => {
    const customClass = "custom-class";
    renderComponent({ className: customClass });
    const checkbox = screen.getByTestId("checkbox-root");
    expect(checkbox).toHaveClass(customClass);
    expect(checkbox).toHaveClass(defaultClass);
  });

  // Accessibility
  it("should have appropriate ARIA attributes", () => {
    const ariaLabel = "Terms and Conditions";
    renderComponent({
      "aria-label": ariaLabel,
      "aria-required": true,
    });

    const checkbox = screen.getByTestId("checkbox-root");
    expect(checkbox).toHaveAttribute("aria-label", ariaLabel);
    expect(checkbox).toHaveAttribute("aria-required", "true");
  });
});
