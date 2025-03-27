import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { vi } from "vitest";

import { useIsMobile } from "@/shared/hooks/useMobile";
import { renderWithTheme } from "@/shared/utils";
import {
  Sidebar,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SidebarContent,
  SidebarContext,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./Sidebar";

// Mock tooltip components
const mockTooltipProvider = vi.fn();
vi.mock("@designSystem/components/tooltip", () => {
  const TooltipProvider = ({ children, ...props }: { children: React.ReactNode } & Record<string, any>) => {
    mockTooltipProvider(props);
    return <div data-testid="tooltip-provider">{children}</div>;
  };

  const Tooltip = ({ children, ...props }: { children: React.ReactNode } & Record<string, any>) => (
    <div data-testid="tooltip" data-props={JSON.stringify(props)}>
      {children}
    </div>
  );

  const TooltipTrigger = ({ children, ...props }: { children: React.ReactNode } & Record<string, any>) => (
    <div data-testid="tooltip-trigger" data-props={JSON.stringify(props)}>
      {children}
    </div>
  );

  const TooltipContent = ({ children, ...props }: { children: React.ReactNode } & Record<string, any>) => (
    <div data-testid="tooltip-content" data-props={JSON.stringify(props)}>
      {children}
    </div>
  );

  return {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  };
});

// Mock hooks
vi.mock("@/shared/hooks/useMobile", () => ({
  useIsMobile: vi.fn(),
}));

const mockUseIsMobile = useIsMobile as jest.Mock;

// Mock context default values
const mockSidebarContext = {
  state: "expanded" as const,
  open: true,
  setOpen: vi.fn(),
  openMobile: false,
  setOpenMobile: vi.fn(),
  isMobile: false,
  toggleSidebar: vi.fn(),
};

const BasicSidebar = () => (
  <Sidebar>
    <SidebarHeader>
      <div>Logo</div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>Dashboard</SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>Settings</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
    <SidebarFooter>
      <div>Footer</div>
    </SidebarFooter>
  </Sidebar>
);

const TestWrapper = ({
  children,
  sidebarState = "expanded" as const,
  isMobile = false,
  contextOverrides = {},
}: {
  children: React.ReactNode;
  sidebarState?: "expanded" | "collapsed";
  isMobile?: boolean;
  contextOverrides?: Partial<typeof mockSidebarContext>;
}) => {
  const contextValue = {
    ...mockSidebarContext,
    state: sidebarState,
    isMobile,
    ...contextOverrides,
  };

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
};

describe("Sidebar Snapshots", () => {
  it("should match expanded sidebar snapshot", () => {
    const { container } = renderWithTheme(
      <TestWrapper sidebarState="expanded">
        <BasicSidebar />
      </TestWrapper>,
    );

    expect(container).toMatchSnapshot();
  });

  it("should match collapsed sidebar snapshot", () => {
    const { container } = renderWithTheme(
      <TestWrapper sidebarState="collapsed">
        <BasicSidebar />
      </TestWrapper>,
    );

    expect(container).toMatchSnapshot();
  });

  it("should match mobile sidebar snapshot", () => {
    const { container } = renderWithTheme(
      <TestWrapper sidebarState="expanded" isMobile={true}>
        <BasicSidebar />
      </TestWrapper>,
    );

    expect(container).toMatchSnapshot();
  });
});

describe("Sidebar Core Components", () => {
  beforeEach(() => {
    mockUseIsMobile.mockReturnValue(false);
    vi.clearAllMocks();
  });

  // Core Provider Tests
  describe("SidebarProvider", () => {
    it("should provide default values", () => {
      const TestComponent = () => {
        const context = useSidebar();
        return (
          <div data-testid="test">
            <span>{context.state}</span>
          </div>
        );
      };

      renderWithTheme(
        <SidebarProvider>
          <TestComponent />
        </SidebarProvider>,
      );

      expect(screen.getByTestId("test")).toHaveTextContent("expanded");
    });

    it("should handle controlled state", async () => {
      const onOpenChange = vi.fn();

      renderWithTheme(
        <SidebarProvider defaultOpen={false} onOpenChange={onOpenChange}>
          <SidebarTrigger />
        </SidebarProvider>,
      );

      await userEvent.click(screen.getByRole("button"));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it("should render correctly", () => {
      renderWithTheme(
        <SidebarProvider>
          <div data-testid="test">Test Content</div>
        </SidebarProvider>,
      );

      expect(screen.getByText("Test Content")).toBeInTheDocument();

      const wrapper = screen.getByText("Test Content").parentElement;
      expect(wrapper).toHaveClass("bg-white group/sidebar-wrapper flex min-h-svh w-full");
      expect(wrapper).toHaveStyle({
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
      });
    });

    // Cookie tests
    it("should set cookie when toggling sidebar", () => {
      renderWithTheme(
        <SidebarProvider>
          <div data-testid="test">Test Content</div>
        </SidebarProvider>,
      );

      fireEvent.keyDown(window, {
        key: SIDEBAR_KEYBOARD_SHORTCUT,
        ctrlKey: true,
      });

      expect(document.cookie).toContain(`${SIDEBAR_COOKIE_NAME}=false`);
    });

    // Mobile behavior tests
    it("should handle mobile behavior", () => {
      // Mock useIsMobile to return true
      vi.mocked(useIsMobile).mockReturnValue(true);
      const onOpenChange = vi.fn();

      renderWithTheme(
        <SidebarProvider onOpenChange={onOpenChange}>
          <div data-testid="test">Test Content</div>
        </SidebarProvider>,
      );

      fireEvent.keyDown(window, {
        key: SIDEBAR_KEYBOARD_SHORTCUT,
        ctrlKey: true,
      });

      // Should not call onOpenChange for mobile toggle
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    // TooltipProvider tests
    it("should render TooltipProvider with correct props", () => {
      renderWithTheme(
        <SidebarProvider>
          <div data-testid="test">Test Content</div>
        </SidebarProvider>,
      );

      expect(mockTooltipProvider).toHaveBeenCalledWith(
        expect.objectContaining({
          delayDuration: 0,
        }),
      );
    });

    it("should throw error when useSidebar is used outside provider", () => {
      const TestComponent = () => {
        useSidebar();
        return null;
      };

      expect(() => renderWithTheme(<TestComponent />)).toThrow();
    });
  });

  // Core Sidebar Component Tests
  describe("Sidebar Component", () => {
    it("should render basic sidebar", () => {
      renderWithTheme(
        <TestWrapper>
          <Sidebar>
            <SidebarContent>Content</SidebarContent>
          </Sidebar>
        </TestWrapper>,
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
      expect(screen.getByText("Content")).toHaveClass(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
      );
    });

    it("should handle different collapsible modes", () => {
      renderWithTheme(
        <TestWrapper sidebarState="collapsed">
          <Sidebar collapsible="icon">
            <SidebarContent>Content</SidebarContent>
          </Sidebar>
        </TestWrapper>,
      );

      const sidebar = screen.getByText("Content").closest("[data-collapsible]");
      expect(sidebar).toHaveAttribute("data-collapsible", "icon");
    });

    it("should render collapsible 'none' variant", () => {
      renderWithTheme(
        <TestWrapper>
          <Sidebar collapsible="none">
            <SidebarContent>None Collapsible Content</SidebarContent>
          </Sidebar>
        </TestWrapper>,
      );

      expect(screen.getByText("None Collapsible Content")).toBeInTheDocument();
      expect(screen.getByText("None Collapsible Content").parentElement).toHaveClass(
        "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
      );
    });

    it("should render mobile variant", () => {
      mockUseIsMobile.mockReturnValue(true);

      renderWithTheme(
        <TestWrapper
          isMobile={true}
          contextOverrides={{
            openMobile: true,
          }}
        >
          <Sidebar>
            <SidebarContent>Mobile Content</SidebarContent>
          </Sidebar>
        </TestWrapper>,
      );

      expect(screen.getByText("Mobile Content")).toBeInTheDocument();
      expect(screen.getByText("Mobile Content")?.parentElement).toHaveClass("flex h-full w-full flex-col");
      expect(screen.getByText("Mobile Content")?.parentElement?.parentElement).toHaveClass(
        "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
      );
    });

    it("should render classname correctly when side is left and variant is floating", () => {
      renderWithTheme(
        <TestWrapper>
          <Sidebar side="left" variant="floating">
            <SidebarContent>Test Content</SidebarContent>
          </Sidebar>
        </TestWrapper>,
      );

      const content = screen.getByText("Test Content");
      expect(content).toBeInTheDocument();
      expect(content?.parentElement?.parentElement).toHaveClass(
        "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
        "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
        "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]",
      );

      expect(screen.queryByTestId("sidebar-handles-test")).toHaveClass(
        "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
        "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]",
      );
    });

    it("should render classname correctly when side is right", () => {
      renderWithTheme(
        <TestWrapper>
          <Sidebar side="right">
            <SidebarContent>Test Content</SidebarContent>
          </Sidebar>
        </TestWrapper>,
      );

      const content = screen.getByText("Test Content");
      expect(content).toBeInTheDocument();
      expect(content?.parentElement?.parentElement).toHaveClass(
        "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
        "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
      );
    });
  });

  // Trigger Component Tests
  describe("SidebarTrigger", () => {
    it("should render trigger button", () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarTrigger />
        </TestWrapper>,
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("data-sidebar", "trigger");
    });

    it("should call custom onClick handler", async () => {
      const onClick = vi.fn();

      renderWithTheme(
        <TestWrapper>
          <SidebarTrigger onClick={onClick} />
        </TestWrapper>,
      );

      await userEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalled();
    });
  });

  // Rail Component Tests
  describe("SidebarRail", () => {
    it("should render rail element", () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarRail />
        </TestWrapper>,
      );

      expect(screen.getByRole("button")).toHaveAttribute("data-sidebar", "rail");
    });

    it("should handle rail click", async () => {
      const onClick = vi.fn();

      renderWithTheme(
        <TestWrapper>
          <SidebarRail onClick={onClick} />
        </TestWrapper>,
      );

      await userEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalled();
    });
  });

  // Inset Component Tests
  describe("SidebarInset", () => {
    it("should render rail element", () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarInset />
        </TestWrapper>,
      );

      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("main")).toHaveClass(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
      );
    });

    it("should handle rail click", async () => {
      const onClick = vi.fn();

      renderWithTheme(
        <TestWrapper>
          <SidebarRail onClick={onClick} />
        </TestWrapper>,
      );

      await userEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalled();
    });
  });

  // Input Component Tests
  describe("SidebarInput", () => {
    it("should render input", async () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarInput placeholder="Search..." />
        </TestWrapper>,
      );

      const input = screen.getByPlaceholderText("Search...");
      await userEvent.type(input, "test");
      expect(input).toHaveValue("test");
    });
  });

  // Input Component Tests
  describe("SidebarSeparator", () => {
    it("should render input", async () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarSeparator />
        </TestWrapper>,
      );

      const seperator = screen.queryByTestId("sidebar-seperator-test");
      expect(seperator).toHaveClass("mx-2 w-auto bg-sidebar-border");
      expect(seperator).toHaveAttribute("data-sidebar", "separator");
    });
  });

  // Layout Components Tests
  describe("Layout Components", () => {
    it("should render header and footer", () => {
      renderWithTheme(
        <TestWrapper>
          <Sidebar>
            <SidebarHeader>Header</SidebarHeader>
            <SidebarContent>Main Content</SidebarContent>
            <SidebarFooter>Footer</SidebarFooter>
          </Sidebar>
        </TestWrapper>,
      );

      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Main Content")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });

  // Mobile Behavior Tests
  describe("Mobile Behavior", () => {
    beforeEach(() => {
      mockUseIsMobile.mockReturnValue(true);
    });

    it("should render mobile sheet", () => {
      renderWithTheme(
        <TestWrapper
          isMobile={true}
          contextOverrides={{
            openMobile: true,
          }}
        >
          <Sidebar>
            <SidebarContent>Mobile Content</SidebarContent>
          </Sidebar>
        </TestWrapper>,
      );

      expect(screen.getByText("Mobile Content").closest("[data-mobile]")).toHaveAttribute("data-mobile", "true");
    });
  });
});

describe("Sidebar Menu System", () => {
  beforeEach(() => {
    mockUseIsMobile.mockReturnValue(false);
    vi.clearAllMocks();
  });

  // Menu System Tests
  describe("Menu Components", () => {
    it("should render menu structure", () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Item 1</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </TestWrapper>,
      );

      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });

    it("should handle nested menus", () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Parent</SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>Child</SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </TestWrapper>,
      );

      expect(screen.getByText("Parent")).toBeInTheDocument();
      expect(screen.getByText("Child")).toBeInTheDocument();
    });

    it("should handle menu skeleton loading state", () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarMenuSkeleton showIcon />
        </TestWrapper>,
      );

      expect(screen.getAllByTestId("skeleton-test")).toHaveLength(2);
    });
  });

  describe("MenuButton Variants", () => {
    it("should handle different variants", () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarMenuButton variant="outline">Outline Button</SidebarMenuButton>
        </TestWrapper>,
      );

      const button = screen.getByText("Outline Button");
      expect(button).toHaveClass("bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))]");
      expect(button).toHaveClass(
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      );
    });

    it("should handle active state", () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarMenuButton isActive>Active Item</SidebarMenuButton>
        </TestWrapper>,
      );

      const button = screen.getByText("Active Item");
      expect(button).toHaveAttribute("data-active", "true");
    });

    it("should handle disabled state", () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarMenuButton disabled>Disabled Item</SidebarMenuButton>
        </TestWrapper>,
      );

      expect(screen.getByText("Disabled Item")).toBeDisabled();
    });
  });

  // Group System Tests
  describe("Group System", () => {
    it("should render group structure", () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarGroup>
            <SidebarGroupLabel>Group Title</SidebarGroupLabel>
            <SidebarGroupContent>Group Content</SidebarGroupContent>
          </SidebarGroup>
        </TestWrapper>,
      );

      expect(screen.getByText("Group Title")).toBeInTheDocument();
      expect(screen.getByText("Group Content")).toBeInTheDocument();
    });

    it("should handle group actions", async () => {
      const onAction = vi.fn();

      renderWithTheme(
        <TestWrapper>
          <SidebarGroup>
            <SidebarGroupAction onClick={onAction}>Group Action</SidebarGroupAction>
          </SidebarGroup>
        </TestWrapper>,
      );

      await userEvent.click(screen.getByText("Group Action"));
      expect(onAction).toHaveBeenCalled();
    });
  });

  // Tooltip Tests
  describe("Tooltip Tests", () => {
    it("should pass correct props for complex tooltip config", () => {
      const tooltipConfig = {
        children: "Complex Tooltip",
        side: "left" as const,
        align: "start" as const,
        className: "custom-tooltip",
      };

      renderWithTheme(
        <TestWrapper sidebarState="collapsed">
          <SidebarMenuButton tooltip={tooltipConfig}>Menu Item</SidebarMenuButton>
        </TestWrapper>,
      );

      const content = screen.getByTestId("tooltip-content");

      // Verify content
      expect(content).toHaveTextContent("Complex Tooltip");

      // Verify custom props
      const contentProps = JSON.parse(content.dataset.props || "{}");
      expect(contentProps).toEqual(
        expect.objectContaining({
          side: "left",
          align: "start",
          className: expect.stringContaining("custom-tooltip"),
        }),
      );
    });

    it("should handle conditional tooltip rendering", () => {
      const { rerender } = renderWithTheme(
        <TestWrapper sidebarState="collapsed">
          <SidebarMenuButton tooltip={""}>Menu Item</SidebarMenuButton>
        </TestWrapper>,
      );

      expect(screen.queryByTestId("tooltip")).not.toBeInTheDocument();

      rerender(
        <TestWrapper sidebarState="collapsed">
          <SidebarMenuButton tooltip="Now Visible">Menu Item</SidebarMenuButton>
        </TestWrapper>,
      );

      expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    });
  });

  // Action and Badge Tests
  describe("Menu Actions and Badges", () => {
    it("should render menu action className correctly", async () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarMenuItem>
            <SidebarMenuButton>Item</SidebarMenuButton>
            <SidebarMenuAction showOnHover>Action</SidebarMenuAction>
          </SidebarMenuItem>
        </TestWrapper>,
      );

      const actionButton = screen.getByText("Action");
      expect(actionButton).toHaveAttribute("data-sidebar", "menu-action");
      expect(actionButton).toHaveClass(
        "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
      );
    });

    it("should call menu action when click", async () => {
      const onAction = vi.fn();

      renderWithTheme(
        <TestWrapper>
          <SidebarMenuItem>
            <SidebarMenuButton>Item</SidebarMenuButton>
            <SidebarMenuAction onClick={onAction}>Action</SidebarMenuAction>
          </SidebarMenuItem>
        </TestWrapper>,
      );

      await userEvent.click(screen.getByText("Action"));
      expect(onAction).toHaveBeenCalled();
    });

    it("should render badge", () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarMenuItem>
            <SidebarMenuButton>Item</SidebarMenuButton>
            <SidebarMenuBadge>5</SidebarMenuBadge>
          </SidebarMenuItem>
        </TestWrapper>,
      );

      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("should handle keyboard navigation", async () => {
      const onKeyDown = vi.fn();

      renderWithTheme(
        <TestWrapper>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onKeyDown={onKeyDown}>Menu Item</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </TestWrapper>,
      );

      const button = screen.getByText("Menu Item");
      await userEvent.type(button, "{enter}");
      expect(onKeyDown).toHaveBeenCalled();
    });

    it("should have proper ARIA attributes", () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton aria-label="Navigation Item">Menu Item</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </TestWrapper>,
      );

      expect(screen.getByLabelText("Navigation Item")).toBeInTheDocument();
    });

    it("should handle focus management", async () => {
      renderWithTheme(
        <TestWrapper>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Item 1</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Item 2</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </TestWrapper>,
      );

      const firstItem = screen.getByText("Item 1");
      const secondItem = screen.getByText("Item 2");

      firstItem.focus();
      expect(document.activeElement).toBe(firstItem);

      await userEvent.tab();
      expect(document.activeElement).toBe(secondItem);
    });
  });
});
