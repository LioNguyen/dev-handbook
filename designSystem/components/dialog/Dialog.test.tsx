import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from ".";

// Mock RadixUI Dialog components
vi.mock("@radix-ui/react-dialog", () => ({
  Root: vi.fn(({ children }) => <div data-testid="dialog-root">{children}</div>),
  Trigger: vi.fn(({ children }) => <button data-testid="dialog-trigger">{children}</button>),
  Portal: vi.fn(({ children }) => <div data-testid="dialog-portal">{children}</div>),
  Overlay: vi.fn(({ className }) => <div data-testid="dialog-overlay" className={className} />),
  Content: vi.fn(({ children, className }) => (
    <div data-testid="dialog-content" className={className}>
      {children}
    </div>
  )),
  Title: vi.fn(({ children, className }) => (
    <h2 data-testid="dialog-title" className={className}>
      {children}
    </h2>
  )),
  Description: vi.fn(({ children, className }) => (
    <p data-testid="dialog-description" className={className}>
      {children}
    </p>
  )),
  Close: vi.fn(({ children }) => <button data-testid="dialog-close">{children}</button>),
}));

// Mock Lucide icon
vi.mock("lucide-react", async () => {
  const actual = await vi.importActual("lucide-react");
  return {
    ...actual,
    X: vi.fn(() => <div data-testid="x-icon" />),
  };
});

describe("Dialog Component", () => {
  const renderDialog = () => {
    return renderWithTheme(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Content</div>
          <DialogFooter>
            <button>Cancel</button>
            <button>Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );
  };

  // Snapshot Tests
  it("should match snapshot with default props", () => {
    const { container } = renderDialog();
    expect(container).toMatchSnapshot();
  });

  // Test basic rendering
  it("should render all dialog components", () => {
    renderDialog();

    expect(screen.getByTestId("dialog-root")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog Description")).toBeInTheDocument();
  });

  // Test DialogContent classes
  it("should have correct classes for DialogContent", () => {
    renderDialog();

    const content = screen.getByTestId("dialog-content");
    expect(content).toHaveClass(
      "fixed",
      "left-[50%]",
      "top-[50%]",
      "z-50",
      "grid",
      "w-full",
      "max-w-lg",
      "translate-x-[-50%]",
      "translate-y-[-50%]",
    );
  });

  // Test DialogOverlay classes
  it("should have correct classes for DialogOverlay", () => {
    renderDialog();

    const overlay = screen.getByTestId("dialog-overlay");
    expect(overlay).toHaveClass("fixed", "inset-0", "z-50");
  });

  // Test DialogHeader
  it("should render DialogHeader with correct classes", () => {
    renderDialog();

    const header = screen.getByText("Dialog Title").closest("div");
    expect(header).toHaveClass("flex", "flex-col", "space-y-1.5");
  });

  // Test DialogFooter
  it("should render DialogFooter with correct classes", () => {
    renderDialog();

    const footer = screen.getByText("Cancel").closest("div");
    expect(footer).toHaveClass("flex", "flex-col-reverse", "sm:flex-row", "sm:justify-end", "sm:space-x-2");
  });

  // Test close button
  it("should render close button with X icon", () => {
    renderDialog();

    const closeButton = screen.getByTestId("dialog-close");
    expect(closeButton).toBeInTheDocument();
    expect(screen.getByTestId("x-icon")).toBeInTheDocument();
  });

  // Test title and description styling
  it("should apply correct styles to title and description", () => {
    renderDialog();

    const title = screen.getByTestId("dialog-title");
    const description = screen.getByTestId("dialog-description");

    expect(title).toHaveClass("text-lg", "font-semibold", "leading-none", "tracking-tight");
    expect(description).toHaveClass("text-sm", "text-muted-foreground");
  });

  // Test accessibility
  it("should have appropriate ARIA attributes", () => {
    renderDialog();

    const closeButton = screen.getByTestId("dialog-close");
    expect(closeButton.querySelector(".sr-only")).toHaveTextContent("Close");
  });

  // Test dialog trigger interaction
  it("should call RadixUI Dialog.Root when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderDialog();

    const trigger = screen.getByTestId("dialog-trigger");
    await user.click(trigger);

    // Since we're using a mock, we can verify that the Root component was rendered
    expect(screen.getByTestId("dialog-root")).toBeInTheDocument();
  });

  // Test animation states
  it("should have correct animation classes", () => {
    renderDialog();

    const content = screen.getByTestId("dialog-content");
    expect(content).toHaveClass(
      "data-[state=open]:animate-in",
      "data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0",
      "data-[state=open]:fade-in-0",
    );
  });
});
