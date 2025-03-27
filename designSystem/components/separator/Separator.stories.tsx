import type { Meta, StoryObj } from "@storybook/react";
import Separator from "./Separator";

const meta = {
  title: "Design System/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A visual divider that separates content using Radix UI Separator primitive.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator",
    },
    decorative: {
      control: "boolean",
      description: "Whether the separator is decorative or semantic",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof Separator>;

// Default horizontal separator
export const Default: Story = {
  args: {
    orientation: "horizontal",
  },
  render: args => (
    <div className="w-[300px] space-y-4">
      <div className="text-sm">First section</div>
      <Separator {...args} />
      <div className="text-sm">Second section</div>
    </div>
  ),
};

// Vertical separator
export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: args => (
    <div className="flex h-[100px] items-center space-x-4">
      <div className="text-sm">First</div>
      <Separator {...args} />
      <div className="text-sm">Second</div>
      <Separator {...args} />
      <div className="text-sm">Third</div>
    </div>
  ),
};

// With decorative patterns
export const Decorative: Story = {
  render: () => (
    <div className="flex flex-col items-center space-y-8">
      {/* Center aligned text with decorative separators */}
      <div className="relative flex items-center py-4">
        <Separator className="w-32" />
        <span className="mx-4 text-sm font-medium">OR</span>
        <Separator className="w-32" />
      </div>

      {/* Dots pattern */}
      <div className="flex items-center justify-center space-x-2">
        <Separator className="h-1 w-3 rounded-full" />
        <Separator className="h-1 w-3 rounded-full" />
        <Separator className="h-1 w-3 rounded-full" />
      </div>
    </div>
  ),
};
