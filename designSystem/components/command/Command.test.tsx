import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./Command";

// Mock CMDK
vi.mock("cmdk", () => {
  const CommandComponent = vi.fn(({ children, className, ...props }) => (
    <div data-testid="command" className={className} {...props}>
      {children}
    </div>
  ));

  return {
    Command: Object.assign(CommandComponent, {
      displayName: "Command",
      Input: vi.fn(({ className, ...props }) => (
        <div data-testid="command-input-wrapper" className="flex items-center border-b px-3">
          <input data-testid="command-input" className={className} {...props} />
        </div>
      )),
      List: vi.fn(({ className, children, ...props }) => (
        <div data-testid="command-list" className={className} {...props}>
          {children}
        </div>
      )),
      Empty: vi.fn(({ className, children, ...props }) => (
        <div data-testid="command-empty" className={className} {...props}>
          {children}
        </div>
      )),
      Group: vi.fn(({ className, children, ...props }) => (
        <div data-testid="command-group" className={className} {...props}>
          {children}
        </div>
      )),
      Separator: vi.fn(({ className, ...props }) => (
        <div data-testid="command-separator" className={className} {...props} />
      )),
      Item: vi.fn(({ className, children, ...props }) => (
        <div data-testid="command-item" className={className} {...props}>
          {children}
        </div>
      )),
    }),
  };
});

// Mock lucide-react
vi.mock("lucide-react", async () => {
  const actual = await vi.importActual("lucide-react");
  return {
    ...actual,
    Search: vi.fn(() => <div data-testid="search-icon" />),
  };
});

// Mock Dialog components
vi.mock("@designSystem/components/dialog", () => ({
  Dialog: vi.fn(({ children, ...props }) => (
    <div data-testid="dialog" {...props}>
      {children}
    </div>
  )),
  DialogContent: vi.fn(({ children, className, ...props }) => (
    <div data-testid="dialog-content" className={className} {...props}>
      {children}
    </div>
  )),
}));

describe("Command Components", () => {
  describe("Command Snapshots", () => {
    it("basic command", () => {
      const { container } = renderWithTheme(
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>Profile</CommandItem>
              <CommandItem>Billing</CommandItem>
              <CommandItem>
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>,
      );
      expect(container).toMatchSnapshot();
    });

    it("command dialog", () => {
      const { container } = renderWithTheme(
        <CommandDialog>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Command 1</CommandItem>
              <CommandItem>Command 2</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>,
      );
      expect(container).toMatchSnapshot();
    });

    it("command with shortcuts", () => {
      const { container } = renderWithTheme(
        <Command>
          <CommandList>
            <CommandGroup heading="Actions">
              <CommandItem>
                New File
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Save
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Command", () => {
    it("should render with default props", () => {
      renderWithTheme(<Command />);

      const command = screen.getByTestId("command");
      expect(command).toBeInTheDocument();
      expect(command).toHaveClass(
        "flex",
        "h-full",
        "w-full",
        "flex-col",
        "overflow-hidden",
        "rounded-md",
        "bg-popover",
        "text-popover-foreground",
      );
    });

    it("should merge custom className", () => {
      renderWithTheme(<Command className="custom-class" />);

      const command = screen.getByTestId("command");
      expect(command).toHaveClass("custom-class");
    });
  });

  describe("CommandDialog", () => {
    it("should render dialog with command component", () => {
      renderWithTheme(
        <CommandDialog>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
          </CommandList>
        </CommandDialog>,
      );

      expect(screen.getByTestId("dialog")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-content")).toHaveClass("overflow-hidden", "p-0");
      expect(screen.getByTestId("command")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });
  });

  describe("CommandInput", () => {
    it("should render input with search icon", () => {
      renderWithTheme(<CommandInput placeholder="Search..." />);

      expect(screen.getByTestId("search-icon")).toBeInTheDocument();
      const inputWrapper = screen.getByTestId("command-input-wrapper");
      expect(inputWrapper).toHaveClass("flex", "items-center", "border-b", "px-3");

      const input = screen.getByPlaceholderText("Search...");
      expect(input).toHaveClass(
        "flex",
        "h-10",
        "w-full",
        "rounded-md",
        "bg-transparent",
        "py-3",
        "text-sm",
        "outline-none",
      );
    });

    it("should handle user input", async () => {
      const user = userEvent.setup();
      renderWithTheme(<CommandInput placeholder="Search..." />);

      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "test");
      expect(input).toHaveValue("test");
    });
  });

  describe("CommandList", () => {
    it("should render list with correct classes", () => {
      renderWithTheme(
        <CommandList>
          <CommandItem>Test Item</CommandItem>
        </CommandList>,
      );

      const list = screen.getByTestId("command-list");
      expect(list).toHaveClass("max-h-[300px]", "overflow-y-auto", "overflow-x-hidden");
      expect(screen.getByText("Test Item")).toBeInTheDocument();
    });
  });

  describe("CommandEmpty", () => {
    it("should render empty state", () => {
      renderWithTheme(<CommandEmpty>No results found</CommandEmpty>);

      const empty = screen.getByTestId("command-empty");
      expect(empty).toHaveClass("py-6", "text-center", "text-sm");
      expect(empty).toHaveTextContent("No results found");
    });
  });

  describe("CommandGroup", () => {
    it("should render group with heading", () => {
      renderWithTheme(
        <CommandGroup heading="Group Title">
          <CommandItem>Group Item</CommandItem>
        </CommandGroup>,
      );

      const group = screen.getByTestId("command-group");
      expect(group).toHaveClass("overflow-hidden", "p-1", "text-foreground");
      expect(screen.getByText("Group Item")).toBeInTheDocument();
    });
  });

  describe("CommandSeparator", () => {
    it("should render separator with correct styles", () => {
      renderWithTheme(<CommandSeparator />);

      const separator = screen.getByTestId("command-separator");
      expect(separator).toHaveClass("-mx-1", "h-px", "bg-border");
    });
  });

  describe("CommandItem", () => {
    it("should render item with correct styles", () => {
      renderWithTheme(<CommandItem>Item Text</CommandItem>);

      const item = screen.getByTestId("command-item");
      expect(item).toHaveClass(
        "relative",
        "flex",
        "cursor-default",
        "gap-2",
        "select-none",
        "items-center",
        "rounded-sm",
        "px-2",
        "py-1.5",
        "text-sm",
        "outline-none",
      );
    });

    it("should handle selected state", () => {
      renderWithTheme(<CommandItem data-selected={true}>Selected Item</CommandItem>);

      const item = screen.getByTestId("command-item");
      expect(item).toHaveClass("data-[selected=true]:bg-secondary", "data-[selected=true]:text-text-primary");
    });

    it("should handle disabled state", () => {
      renderWithTheme(<CommandItem data-disabled={true}>Disabled Item</CommandItem>);

      const item = screen.getByTestId("command-item");
      expect(item).toHaveClass("data-[disabled=true]:pointer-events-none", "data-[disabled=true]:opacity-50");
    });
  });

  describe("CommandShortcut", () => {
    it("should render shortcut with correct styles", () => {
      renderWithTheme(<CommandShortcut>⌘K</CommandShortcut>);

      const shortcut = screen.getByText("⌘K");
      expect(shortcut).toHaveClass("ml-auto", "text-xs", "tracking-widest", "text-text-muted-foreground");
    });
  });
});
