import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./Spinner";

const meta = {
  title: "Design System/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A spinning loader icon to indicate loading state",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isLoading: {
      control: "boolean",
      description: "Toggle spinner visibility",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof Spinner>;

// Default spinner
export const Default: Story = {
  args: {
    isLoading: true,
  },
  render: args => (
    <div className="flex items-center p-4">
      <Spinner {...args} />
      <span>Loading content...</span>
    </div>
  ),
};

// Spinner in disabled state
export const Hidden: Story = {
  args: {
    isLoading: false,
  },
  render: args => (
    <div className="flex items-center p-4">
      <Spinner {...args} />
      <span>Content loaded</span>
    </div>
  ),
};
