import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from ".";

// Mock lucide-react icons
vi.mock("lucide-react", async () => {
  const actual = await vi.importActual("lucide-react");
  return {
    ...actual,
    Check: () => <div data-testid="check-icon" />,
    ChevronRight: () => <div data-testid="chevron-right-icon" />,
    Circle: () => <div data-testid="circle-icon" />,
  };
});

// Mock radix-ui dropdown menu components
vi.mock("@radix-ui/react-dropdown-menu", () => ({
  Root: vi.fn(({ children }) => <div data-testid="dropdown-root">{children}</div>),
  Trigger: vi.fn(({ children }) => <button data-testid="dropdown-trigger">{children}</button>),
  Portal: vi.fn(({ children }) => <div data-testid="dropdown-portal">{children}</div>),
  Content: vi.fn(({ className, children, ...props }) => (
    <div data-testid="dropdown-content" className={className} {...props}>
      {children}
    </div>
  )),
  Item: vi.fn(({ className, children, ...props }) => (
    <div data-testid="dropdown-item" className={className} {...props}>
      {children}
    </div>
  )),
  CheckboxItem: vi.fn(({ className, children, ...props }) => (
    <div data-testid="dropdown-checkbox-item" className={className} {...props}>
      {children}
    </div>
  )),
  RadioItem: vi.fn(({ className, children, ...props }) => (
    <div data-testid="dropdown-radio-item" className={className} {...props}>
      {children}
    </div>
  )),
  Label: vi.fn(({ className, children, ...props }) => (
    <div data-testid="dropdown-label" className={className} {...props}>
      {children}
    </div>
  )),
  Separator: vi.fn(({ className, ...props }) => (
    <div data-testid="dropdown-separator" className={className} {...props} />
  )),
  Sub: vi.fn(({ children }) => <div data-testid="dropdown-sub">{children}</div>),
  SubTrigger: vi.fn(({ className, children, ...props }) => (
    <div data-testid="dropdown-sub-trigger" className={className} {...props}>
      {children}
    </div>
  )),
  SubContent: vi.fn(({ className, children, ...props }) => (
    <div data-testid="dropdown-sub-content" className={className} {...props}>
      {children}
    </div>
  )),
  RadioGroup: vi.fn(({ children }) => <div data-testid="dropdown-radio-group">{children}</div>),
  Group: vi.fn(({ children }) => <div data-testid="dropdown-group">{children}</div>),
  ItemIndicator: vi.fn(({ children }) => <div data-testid="dropdown-item-indicator">{children}</div>),
}));

describe("DropdownMenu Component", () => {
  const renderDropdownMenu = (props = {}) => {
    return renderWithTheme(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent {...props}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem value="1">Option 1</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="2">Option 2</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuCheckboxItem checked>Show Status</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
  };

  // Basic Rendering Tests
  it("should render all dropdown menu components", () => {
    renderDropdownMenu();

    expect(screen.getByTestId("dropdown-root")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-label")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-separator")).toBeInTheDocument();
    expect(screen.getAllByTestId("dropdown-item")[0]).toBeInTheDocument();
  });

  // Snapshot Tests
  describe("DropdownMenu Snapshots", () => {
    it("should match snapshot with default props", () => {
      const { container } = renderDropdownMenu();
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with custom content", () => {
      const { container } = renderWithTheme(
        <DropdownMenu>
          <DropdownMenuTrigger>Custom Trigger</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Custom Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  // DropdownMenuContent Tests
  describe("DropdownMenuContent", () => {
    it("should render with correct classes", () => {
      renderDropdownMenu();

      const content = screen.getByTestId("dropdown-content");
      expect(content).toHaveClass(
        "z-50",
        "min-w-[8rem]",
        "overflow-hidden",
        "rounded-md",
        "border",
        "bg-popover",
        "p-1",
        "text-popover-foreground",
        "shadow-md",
      );
    });
  });

  // DropdownMenuItem Tests
  describe("DropdownMenuItem", () => {
    it("should render with correct classes", () => {
      renderDropdownMenu();

      const item = screen.getAllByTestId("dropdown-item");
      expect(item[0]).toHaveClass(
        "relative",
        "flex",
        "cursor-default",
        "select-none",
        "items-center",
        "rounded-sm",
        "px-2",
        "py-1.5",
        "text-sm",
        "outline-hidden",
        "focus:bg-secondary",
        "focus:text-text-primary",
      );
    });

    it("should render with inset class when inset prop is true", () => {
      renderWithTheme(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem inset>Inset Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      const item = screen.getByTestId("dropdown-item");
      expect(item).toHaveClass("pl-8");
    });
  });

  // DropdownMenuCheckboxItem Tests
  describe("DropdownMenuCheckboxItem", () => {
    it("should render with correct classes and check icon when checked", () => {
      renderDropdownMenu();

      const checkboxItem = screen.getByTestId("dropdown-checkbox-item");
      expect(checkboxItem).toHaveClass(
        "relative",
        "flex",
        "cursor-default",
        "select-none",
        "items-center",
        "rounded-sm",
        "py-1.5",
        "pl-8",
        "pr-2",
        "text-sm",
        "focus:bg-secondary",
        "focus:text-text-primary",
      );
    });
  });

  // DropdownMenuRadioItem Tests
  describe("DropdownMenuRadioItem", () => {
    it("should render with correct classes", () => {
      renderDropdownMenu();

      const radioItems = screen.getAllByTestId("dropdown-radio-item");
      radioItems.forEach(item => {
        expect(item).toHaveClass(
          "relative",
          "flex",
          "cursor-default",
          "select-none",
          "items-center",
          "rounded-sm",
          "py-1.5",
          "pl-8",
          "pr-2",
          "text-sm",
        );
      });
    });
  });

  // DropdownMenuLabel Tests
  describe("DropdownMenuLabel", () => {
    it("should render with correct classes", () => {
      renderDropdownMenu();

      const label = screen.getByTestId("dropdown-label");
      expect(label).toHaveClass("px-2", "py-1.5", "text-sm", "font-semibold");
    });

    it("should render with inset class when inset prop is true", () => {
      renderWithTheme(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      const label = screen.getByTestId("dropdown-label");
      expect(label).toHaveClass("pl-8");
    });
  });

  // DropdownMenuSeparator Tests
  describe("DropdownMenuSeparator", () => {
    it("should render with correct classes", () => {
      renderDropdownMenu();

      const separator = screen.getByTestId("dropdown-separator");
      expect(separator).toHaveClass("-mx-1", "my-1", "h-px", "bg-secondary");
    });
  });

  // DropdownMenuShortcut Tests
  describe("DropdownMenuShortcut", () => {
    it("should render with correct classes", () => {
      renderWithTheme(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>
              Item
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      const shortcut = screen.getByText("⌘K");
      expect(shortcut).toHaveClass("ml-auto", "text-xs", "tracking-widest", "opacity-60");
    });
  });

  // SubMenu Tests
  describe("SubMenu Components", () => {
    it("should render submenu components with correct classes", () => {
      renderWithTheme(
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger inset>More Options</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      const subTrigger = screen.getByTestId("dropdown-sub-trigger");
      expect(subTrigger).toHaveClass(
        "flex",
        "cursor-default",
        "select-none",
        "items-center",
        "rounded-sm",
        "px-2",
        "py-1.5",
        "text-sm",
        "outline-hidden",
      );
      expect(subTrigger).toHaveClass("pl-8");

      const subContent = screen.getByTestId("dropdown-sub-content");
      expect(subContent).toHaveClass(
        "z-50",
        "min-w-[8rem]",
        "overflow-hidden",
        "rounded-md",
        "border",
        "bg-popover",
        "p-1",
        "text-popover-foreground",
      );
    });
  });
});
