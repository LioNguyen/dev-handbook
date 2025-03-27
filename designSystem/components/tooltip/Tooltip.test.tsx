import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";

// Mock Radix UI Tooltip
vi.mock("@radix-ui/react-tooltip", () => ({
  Provider: ({ children }: { children: React.ReactNode }) => <div data-testid="tooltip-provider">{children}</div>,
  Root: ({ children }: { children: React.ReactNode }) => <div data-testid="tooltip-root">{children}</div>,
  Trigger: ({ children }: { children: React.ReactNode }) => <button data-testid="tooltip-trigger">{children}</button>,
  Content: vi.fn().mockImplementation(({ children, className, sideOffset, ...props }) => (
    <div data-testid="tooltip-content" className={className} data-side-offset={sideOffset} {...props}>
      {children}
    </div>
  )),
  Portal: ({ children }: { children: React.ReactNode }) => <div data-testid="tooltip-portal">{children}</div>,
}));

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip";

const renderTooltip = (props = {}) => {
  return renderWithTheme(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent {...props}>Tooltip content</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );
};

describe("Tooltip Component", () => {
  // Snapshot test
  it("should match snapshot", () => {
    const { container } = renderTooltip();
    expect(container.firstChild).toMatchSnapshot();
  });

  // Structure tests
  it("should render all tooltip components", () => {
    renderTooltip();

    expect(screen.getByTestId("tooltip-provider")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip-root")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
  });

  // Content tests
  it("should render trigger and content text correctly", () => {
    renderTooltip();

    expect(screen.getByText("Hover me")).toBeInTheDocument();
    expect(screen.getByText("Tooltip content")).toBeInTheDocument();
  });

  // Props tests
  it("should apply correct default props to TooltipContent", () => {
    renderTooltip();

    const content = screen.getByTestId("tooltip-content");
    expect(content).toHaveClass(
      "z-50",
      "overflow-hidden",
      "rounded-md",
      "bg-primary",
      "px-3",
      "py-1.5",
      "text-xs",
      "text-text-secondary",
    );
    expect(content).toHaveAttribute("data-side-offset", "4");
  });

  // Custom props tests
  it("should apply custom className to TooltipContent", () => {
    const customClass = "custom-tooltip";
    renderTooltip({ className: customClass });

    const content = screen.getByTestId("tooltip-content");
    expect(content).toHaveClass(customClass);
  });

  it("should apply custom sideOffset", () => {
    renderTooltip({ sideOffset: 8 });

    const content = screen.getByTestId("tooltip-content");
    expect(content).toHaveAttribute("data-side-offset", "8");
  });

  // Animation classes
  it("should have animation classes", () => {
    renderTooltip();

    const content = screen.getByTestId("tooltip-content");
    expect(content).toHaveClass(
      "animate-in",
      "fade-in-0",
      "zoom-in-95",
      "data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0",
      "data-[state=closed]:zoom-out-95",
    );
  });

  // Slide animation classes
  it("should have slide animation classes for all sides", () => {
    renderTooltip();

    const content = screen.getByTestId("tooltip-content");
    expect(content).toHaveClass(
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
    );
  });
});
