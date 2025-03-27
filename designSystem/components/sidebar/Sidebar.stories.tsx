import type { Meta, StoryObj } from "@storybook/react";
import { Bell, Home, Mail, Menu as MenuIcon, Settings, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "./Sidebar";

const meta = {
  title: "Design System/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A responsive sidebar navigation component with support for nested menus, groups, and various states.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  decorators: [
    Story => (
      <SidebarProvider>
        <Story />
        Main Content Area
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper để tạo Icon element
const IconWrapper = ({ icon: Icon }: { icon: React.ComponentType }) => {
  return <Icon />;
};

// Default content với icons đã fix
const DefaultContent = () => (
  <>
    <SidebarHeader className="p-4">
      <SidebarMenuButton className="flex items-center gap-2">
        <IconWrapper icon={MenuIcon} />
        <span className="font-semibold">My App</span>
      </SidebarMenuButton>
    </SidebarHeader>

    <SidebarContent className="px-2">
      <SidebarGroup>
        <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IconWrapper icon={Home} />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IconWrapper icon={Users} />
                <span>Users</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IconWrapper icon={Mail} />
                <span>Messages</span>
                <SidebarMenuBadge>3</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className="mt-4">
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IconWrapper icon={Settings} />
                <span>Preferences</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IconWrapper icon={Bell} />
                <span>Notifications</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter className="p-4 mt-auto border-t">
      <div className="flex items-center gap-2">
        <span>Admin</span>
      </div>
    </SidebarFooter>
  </>
);

// Stories
export const Basic: Story = {
  render: args => (
    <Sidebar collapsible="icon" {...args}>
      <DefaultContent />
    </Sidebar>
  ),
};

export const Expanded: Story = {
  render: args => (
    <Sidebar {...args}>
      <DefaultContent />
    </Sidebar>
  ),
};

export const Collapsed: Story = {
  render: args => (
    <Sidebar {...args} className="w-16">
      <DefaultContent />
    </Sidebar>
  ),
};

export const WithNestedMenus: Story = {
  render: args => (
    <Sidebar {...args}>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <IconWrapper icon={MenuIcon} />
          <span className="font-semibold">Nested Navigation</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <IconWrapper icon={Home} />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <IconWrapper icon={Settings} />
              <span>Settings</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>Profile</SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>Security</SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>Notifications</SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: args => (
    <Sidebar {...args}>
      <DefaultContent />
    </Sidebar>
  ),
};

export const States: Story = {
  render: args => (
    <Sidebar {...args}>
      <SidebarContent className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive>Active Item</SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton disabled>Disabled Item</SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              With Badge
              <SidebarMenuBadge>New</SidebarMenuBadge>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  ),
};
