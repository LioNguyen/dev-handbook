import type { Meta, StoryObj } from "@storybook/react";
import RangeSlider from "./RangeSlider";

const meta = {
  title: "Design System/RangeSlider",
  component: RangeSlider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable range slider component that allows users to select a value within a specified range.",
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
      description: "Step increment value",
    },
    defaultValue: {
      control: "number",
      description: "Default selected value",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    onChange: {
      description: "Callback function when value changes",
    },
  },
  decorators: [
    Story => (
      <div className="w-[400px] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof RangeSlider>;

// Default state
export const Default: Story = {
  args: {},
};

// Custom range
export const CustomRange: Story = {
  args: {
    min: 20,
    max: 80,
    defaultValue: 50,
  },
};

// Small steps
export const SmallSteps: Story = {
  args: {
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: 0.5,
  },
};

// Large steps
export const LargeSteps: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 30,
  },
};

// Multiple Examples
export const Examples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Audio Volume</label>
        <RangeSlider defaultValue={75} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Brightness</label>
        <RangeSlider defaultValue={50} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Zoom Level</label>
        <RangeSlider min={50} max={200} step={10} defaultValue={100} />
      </div>
    </div>
  ),
};
