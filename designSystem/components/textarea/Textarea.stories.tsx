import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Design System/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible textarea component that supports various states with consistent styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state of the textarea",
    },
    readOnly: {
      control: "boolean",
      description: "Read-only state of the textarea",
    },
    rows: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of visible text lines",
    },
  },
  decorators: [
    Story => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof Textarea>;

// Default state
export const Default: Story = {
  args: {
    placeholder: "Enter your text here...",
  },
};

// Different sizes
export const Small: Story = {
  args: {
    placeholder: "Short description...",
    rows: 3,
  },
};

export const Large: Story = {
  args: {
    placeholder: "Detailed description...",
    rows: 6,
  },
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled textarea",
    value: "You cannot edit this text",
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: "This text can be copied but not edited",
  },
};

// With Label
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label
        htmlFor="textarea-with-label"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Description
      </label>
      <Textarea id="textarea-with-label" placeholder="Enter detailed description" rows={4} />
    </div>
  ),
};
