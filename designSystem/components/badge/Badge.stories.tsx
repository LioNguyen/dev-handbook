import type { Meta, StoryObj } from "@storybook/react";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { Badge } from "./Badge";

const meta = {
  title: "Design System/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Display a short piece of information or status.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "active", "inactive", "expired"],
      description: "Style variant of the badge",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

// Basic variants
export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

// New Status Variants
export const Active: Story = {
  args: {
    variant: "active",
    children: "Active",
  },
};

export const Inactive: Story = {
  args: {
    variant: "inactive",
    children: "Inactive",
  },
};

export const Expired: Story = {
  args: {
    variant: "expired",
    children: "Expired",
  },
};

// With icons
export const WithLeadingIcon: Story = {
  args: {
    children: (
      <>
        <ShieldCheck className="mr-1 h-3 w-3" /> Verified
      </>
    ),
  },
};

export const WithTrailingIcon: Story = {
  args: {
    variant: "secondary",
    children: (
      <>
        Warning <ShieldAlert className="ml-1 h-3 w-3" />
      </>
    ),
  },
};

// All Variants Example
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="active">Active</Badge>
      <Badge variant="inactive">Inactive</Badge>
      <Badge variant="expired">Expired</Badge>
      <Badge>
        <Shield className="mr-1 h-3 w-3" /> With Icon
      </Badge>
    </div>
  ),
};
