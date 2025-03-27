import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SearchBox from "./SearchBox";

const meta = {
  title: "Components/Common/SearchBox",
  component: SearchBox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A debounced search input component with customizable styling and behavior.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof SearchBox>;

// Default SearchBox
export const Default: Story = {
  args: {
    placeholder: "Search...",
  },
};

// With Custom Styling
export const CustomStyling: Story = {
  args: {
    placeholder: "Search...",
    className: "shadow-lg",
    inputProps: {
      className: "border-2 border-primary hover:border-primary-dark",
    },
  },
};

// With Short Debounce
export const ShortDebounce: Story = {
  args: {
    placeholder: "Fast search...",
    inputDelay: 200,
  },
};

// With Long Debounce
export const LongDebounce: Story = {
  args: {
    placeholder: "Slow search...",
    inputDelay: 1000,
  },
};

// Interactive Example
const InteractiveComponent = () => {
  const [value, setValue] = useState("");
  return (
    <div className="space-y-4">
      <SearchBox value={value} onChange={setValue} placeholder="Type to search..." className="shadow-sm" />
      <div className="text-sm">
        Current value: <span className="font-medium">{value}</span>
      </div>
    </div>
  );
};
export const Interactive: Story = {
  render: InteractiveComponent,
};

// Disabled State
export const Disabled: Story = {
  args: {
    placeholder: "Disabled search",
    inputProps: {
      disabled: true,
    },
  },
};

// With Custom Input Props
export const WithCustomProps: Story = {
  args: {
    placeholder: "Custom search...",
    inputProps: {
      "aria-label": "Search products",
      autoComplete: "off",
      className: "border-dashed border-2",
    },
  },
};
