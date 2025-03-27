import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";

// Mock lucide-react
vi.mock("lucide-react", async () => {
  const actual = await vi.importActual("lucide-react");
  return {
    ...actual,
    X: () => null,
  };
});

// Mock dialog
vi.mock("@radix-ui/react-dialog", () => ({
  __esModule: true,
  default: vi.fn(),
  Root: vi.fn(({ children }) => <div data-testid="sheet-root">{children}</div>),
  Trigger: vi.fn(({ children }) => <button data-testid="sheet-trigger">{children}</button>),
  Close: vi.fn(({ children, className }) => (
    <button data-testid="sheet-close-button" className={className}>
      {children}
    </button>
  )),
  Portal: vi.fn(({ children }) => <div data-testid="sheet-portal">{children}</div>),
  Overlay: vi.fn(({ className, ...props }) => <div data-testid="sheet-overlay" className={className} {...props} />),
  Content: vi.fn(({ className, children, ...props }) => (
    <div data-testid="sheet-content" className={className} {...props}>
      {children}
    </div>
  )),
  Title: vi.fn(({ className, children, ...props }) => (
    <div data-testid="sheet-title" className={className} {...props}>
      {children}
    </div>
  )),
  Description: vi.fn(({ className, children, ...props }) => (
    <div data-testid="sheet-description" className={className} {...props}>
      {children}
    </div>
  )),
}));

describe("Sheet Component", () => {
  const renderSheet = (props = {}) => {
    return renderWithTheme(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent {...props}>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
          <div>Content</div>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>,
    );
  };

  // Basic Rendering Tests
  it("should render all sheet components", () => {
    renderSheet();

    expect(screen.getByTestId("sheet-root")).toBeInTheDocument();
    expect(screen.getByTestId("sheet-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("sheet-content")).toBeInTheDocument();
    expect(screen.getByTestId("sheet-title")).toBeInTheDocument();
    expect(screen.getByTestId("sheet-description")).toBeInTheDocument();
  });

  // Snapshot Tests
  describe("Sheet Snapshots", () => {
    it("should match snapshot with default props", () => {
      const { container } = renderSheet();
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with custom side", () => {
      const { container } = renderSheet({ side: "left" });
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with custom content", () => {
      const { container } = renderWithTheme(
        <Sheet>
          <SheetTrigger>Custom Trigger</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Custom Title</SheetTitle>
              <SheetDescription>Custom Description</SheetDescription>
            </SheetHeader>
            <div>Custom Content</div>
          </SheetContent>
        </Sheet>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  // SheetOverlay Tests
  describe("SheetOverlay", () => {
    it("should render with correct default classes", () => {
      renderWithTheme(<SheetOverlay />);

      const overlay = screen.getByTestId("sheet-overlay");
      expect(overlay).toHaveClass(
        "fixed",
        "inset-0",
        "z-50",
        "data-[state=open]:animate-in",
        "data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0",
        "data-[state=open]:fade-in-0",
      );
    });
  });

  // SheetContent Tests
  describe("SheetContent", () => {
    it.each([["top"], ["bottom"], ["left"], ["right"]])("should render with correct classes for %s side", side => {
      renderSheet({ side });

      const content = screen.getByTestId("sheet-content");
      expect(content).toHaveClass(
        "fixed",
        "z-50",
        "gap-4",
        "bg-background",
        "p-6",
        "shadow-lg",
        "transition",
        "ease-in-out",
      );
    });

    it("should render close button with correct classes", () => {
      renderSheet();

      const closeButton = screen.getAllByTestId("sheet-close-button")[0];

      expect(closeButton).toHaveClass("absolute", "right-4", "top-4", "rounded-sm", "opacity-70");
    });
  });

  // SheetHeader Tests
  describe("SheetHeader", () => {
    it("should render with correct default classes", () => {
      renderWithTheme(
        <SheetHeader data-testid="sheet-header">
          <div>Header Content</div>
        </SheetHeader>,
      );

      const header = screen.getByTestId("sheet-header");
      expect(header).toHaveClass("flex", "flex-col", "space-y-2", "text-center", "sm:text-left");
    });
  });

  // SheetFooter Tests
  describe("SheetFooter", () => {
    it("should render with correct default classes", () => {
      renderWithTheme(
        <SheetFooter data-testid="sheet-footer">
          <button>Action</button>
        </SheetFooter>,
      );

      const footer = screen.getByTestId("sheet-footer");
      expect(footer).toHaveClass("flex", "flex-col-reverse", "sm:flex-row", "sm:justify-end", "sm:space-x-2");
    });
  });

  // SheetTitle and SheetDescription Tests
  describe("SheetTitle and SheetDescription", () => {
    it("should render title with correct classes", () => {
      renderWithTheme(<SheetTitle>Test Title</SheetTitle>);

      const title = screen.getByTestId("sheet-title");
      expect(title).toHaveClass("text-lg", "font-semibold", "text-foreground");
    });

    it("should render description with correct classes", () => {
      renderWithTheme(<SheetDescription>Test Description</SheetDescription>);

      const description = screen.getByTestId("sheet-description");
      expect(description).toHaveClass("text-sm", "text-muted-foreground");
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("should have close button with sr-only text", () => {
      renderSheet();

      const closeButton = screen.getAllByTestId("sheet-close-button")[0];
      expect(closeButton).toHaveTextContent("Close");
    });
  });
});
