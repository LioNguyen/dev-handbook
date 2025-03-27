import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from ".";

// Mock lucide-react icons
vi.mock("lucide-react", async () => {
  const actual = await vi.importActual("lucide-react");
  return {
    ...actual,
    Check: () => <div data-testid="check-icon" />,
    ChevronDown: () => <div data-testid="chevron-down-icon" />,
    ChevronUp: () => <div data-testid="chevron-up-icon" />,
  };
});

// Mock radix-ui select components
vi.mock("@radix-ui/react-select", () => ({
  Root: vi.fn(({ children }) => <div data-testid="select-root">{children}</div>),
  Trigger: vi.fn(({ className, children, ...props }) => (
    <button data-testid="select-trigger" className={className} {...props}>
      {children}
    </button>
  )),
  Value: vi.fn(({ children }) => <span data-testid="select-value">{children}</span>),
  Portal: vi.fn(({ children }) => <div data-testid="select-portal">{children}</div>),
  Content: vi.fn(({ className, children, ...props }) => (
    <div data-testid="select-content" className={className} {...props}>
      {children}
    </div>
  )),
  Viewport: vi.fn(({ className, children }) => (
    <div data-testid="select-viewport" className={className}>
      {children}
    </div>
  )),
  Item: vi.fn(({ className, children, ...props }) => (
    <div data-testid="select-item" className={className} {...props}>
      {children}
    </div>
  )),
  ItemText: vi.fn(({ children }) => <span data-testid="select-item-text">{children}</span>),
  ItemIndicator: vi.fn(({ children }) => <span data-testid="select-item-indicator">{children}</span>),
  Group: vi.fn(({ children }) => <div data-testid="select-group">{children}</div>),
  Label: vi.fn(({ className, children, ...props }) => (
    <div data-testid="select-label" className={className} {...props}>
      {children}
    </div>
  )),
  Separator: vi.fn(({ className, ...props }) => (
    <div data-testid="select-separator" className={className} {...props} />
  )),
  ScrollUpButton: vi.fn(({ className, ...props }) => (
    <div data-testid="select-scroll-up-button" className={className} {...props} />
  )),
  ScrollDownButton: vi.fn(({ className, ...props }) => (
    <div data-testid="select-scroll-down-button" className={className} {...props} />
  )),
  Icon: vi.fn(({ children }) => <span data-testid="select-icon">{children}</span>),
}));

describe("Select Component", () => {
  const renderSelect = (props = {}) => {
    return renderWithTheme(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent {...props}>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectSeparator />
            <SelectItem value="orange">Orange</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
  };

  // Basic Rendering Tests
  it("should render all select components", () => {
    renderSelect();

    expect(screen.getByTestId("select-root")).toBeInTheDocument();
    expect(screen.getByTestId("select-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("select-value")).toBeInTheDocument();
    expect(screen.getByTestId("select-content")).toBeInTheDocument();
    expect(screen.getByTestId("select-group")).toBeInTheDocument();
    expect(screen.getByTestId("select-label")).toBeInTheDocument();
    expect(screen.getAllByTestId("select-item")).toHaveLength(3);
    expect(screen.getByTestId("select-separator")).toBeInTheDocument();
  });

  // Snapshot Tests
  describe("Select Snapshots", () => {
    it("should match snapshot with default props", () => {
      const { container } = renderSelect();
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with custom content", () => {
      const { container } = renderWithTheme(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Custom Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">Custom Item</SelectItem>
          </SelectContent>
        </Select>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  // SelectTrigger Tests
  describe("SelectTrigger", () => {
    it("should render with correct classes", () => {
      renderSelect();

      const trigger = screen.getByTestId("select-trigger");
      expect(trigger).toHaveClass(
        "flex",
        "h-9",
        "w-full",
        "items-center",
        "justify-between",
        "whitespace-nowrap",
        "rounded-md",
        "border",
        "border-input",
        "bg-transparent",
        "px-3",
        "py-2",
        "text-sm",
        "shadow-xs",
        "ring-offset-background",
        "[&>span]:line-clamp-1",
      );
    });

    it("should render chevron-down icon", () => {
      renderSelect();
      expect(screen.getAllByTestId("chevron-down-icon")[0]).toBeInTheDocument();
    });
  });

  // SelectContent Tests
  describe("SelectContent", () => {
    it("should render with correct classes", () => {
      renderSelect();

      const content = screen.getByTestId("select-content");
      expect(content).toHaveClass(
        "relative",
        "z-50",
        "max-h-96",
        "min-w-[8rem]",
        "overflow-hidden",
        "rounded-md",
        "border",
        "bg-popover",
        "text-popover-foreground",
        "shadow-md",
      );
    });

    it("should render scroll buttons", () => {
      renderSelect();
      expect(screen.getByTestId("select-scroll-up-button")).toBeInTheDocument();
      expect(screen.getByTestId("select-scroll-down-button")).toBeInTheDocument();
    });
  });

  // SelectItem Tests
  describe("SelectItem", () => {
    it("should render with correct classes", () => {
      renderSelect();

      const items = screen.getAllByTestId("select-item");
      items.forEach(item => {
        expect(item).toHaveClass(
          "relative",
          "flex",
          "w-full",
          "cursor-default",
          "select-none",
          "items-center",
          "rounded-sm",
          "py-1.5",
          "pl-2",
          "pr-8",
          "text-sm",
          "outline-hidden",
          "focus:bg-secondary",
        );
      });
    });

    it("should render check icon when selected", () => {
      renderWithTheme(
        <Select defaultValue="apple">
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>,
      );

      expect(screen.getByTestId("check-icon")).toBeInTheDocument();
    });
  });

  // SelectLabel Tests
  describe("SelectLabel", () => {
    it("should render with correct classes", () => {
      renderSelect();

      const label = screen.getByTestId("select-label");
      expect(label).toHaveClass("px-2", "py-1.5", "text-sm", "font-semibold");
    });
  });

  // SelectSeparator Tests
  describe("SelectSeparator", () => {
    it("should render with correct classes", () => {
      renderSelect();

      const separator = screen.getByTestId("select-separator");
      expect(separator).toHaveClass("-mx-1", "my-1", "h-px", "bg-muted");
    });
  });

  // ScrollButton Tests
  describe("ScrollButton Components", () => {
    it("should render scroll up button with icon", () => {
      renderSelect();
      const scrollUpButton = screen.getByTestId("select-scroll-up-button");
      expect(scrollUpButton).toBeInTheDocument();
      const upIcon = within(scrollUpButton).getByTestId("chevron-up-icon");
      expect(upIcon).toBeInTheDocument();
    });

    it("should render scroll down button with icon", () => {
      renderSelect();
      const scrollDownButton = screen.getByTestId("select-scroll-down-button");
      expect(scrollDownButton).toBeInTheDocument();
      const downIcon = within(scrollDownButton).getByTestId("chevron-down-icon");
      expect(downIcon).toBeInTheDocument();
    });

    it("should have correct styling classes", () => {
      renderSelect();
      const scrollButtons = [
        screen.getByTestId("select-scroll-up-button"),
        screen.getByTestId("select-scroll-down-button"),
      ];

      scrollButtons.forEach(button => {
        expect(button).toHaveClass("flex", "cursor-default", "items-center", "justify-center", "py-1");
      });
    });
  });
});
