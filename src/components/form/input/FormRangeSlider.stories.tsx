import type { Meta, StoryObj } from "@storybook/react";

import FormRangeSlider from "./FormRangeSlider";

const meta = {
  title: "Components/Form/Input/FormRangeSlider",
  component: FormRangeSlider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A form range slider component with built-in label, tooltip, and customizable range values.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: "number",
      description: "Minimum value of the range",
    },
    max: {
      control: "number",
      description: "Maximum value of the range",
    },
    step: {
      control: "number",
      description: "Step value for the range slider",
    },
    value: {
      control: "number",
      description: "Current value of the range slider",
    },
    required: {
      control: "boolean",
      description: "Whether the range slider is required",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    tooltip: {
      control: "text",
      description: "Tooltip content",
    },
    disabled: {
      control: "boolean",
      description: "Whether the range slider is disabled",
    },
  },
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormRangeSlider>;

export default meta;
type Story = StoryObj<typeof FormRangeSlider>;

// Default Range Slider
export const Default: Story = {
  args: {
    label: "Volume",
    min: 0,
    max: 100,
    step: 1,
    value: 50,
  },
};

// With Required Label and Tooltip
export const WithTooltip: Story = {
  args: {
    label: "Brightness",
    min: 0,
    max: 100,
    step: 1,
    value: 75,
    required: true,
    tooltip: "Adjust screen brightness level",
  },
};

// With Error State
export const WithError: Story = {
  args: {
    label: "Temperature",
    min: 15,
    max: 30,
    step: 0.5,
    value: 35,
    error: "Temperature must be between 15°C and 30°C",
  },
};

// Custom Range
export const CustomRange: Story = {
  args: {
    label: "Price Range ($)",
    min: 100,
    max: 1000,
    step: 50,
    value: 500,
    tooltip: "Select your maximum budget",
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: "Progress",
    min: 0,
    max: 100,
    value: 30,
    disabled: true,
    tooltip: "This control is currently disabled",
  },
};

// Small Steps
export const SmallSteps: Story = {
  args: {
    label: "Fine Control",
    min: 0,
    max: 1,
    step: 0.1,
    value: 0.5,
    tooltip: "Adjust with precision of 0.1",
  },
};
