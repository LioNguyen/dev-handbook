import type { Meta, StoryObj } from "@storybook/react";

import FormDatePicker from "./FormDatePicker";

const meta = {
  title: "Components/Form/Date/FormDatePicker",
  component: FormDatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A form date picker component with built-in label, validation, tooltip, quick select options, and calendar interface.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the date picker",
    },
    required: {
      control: "boolean",
      description: "Whether the date picker is required",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    tooltip: {
      control: "text",
      description: "Tooltip content for the label",
    },
    disabled: {
      control: "boolean",
      description: "Whether the date picker is disabled",
    },
    value: {
      control: "date",
      description: "Selected date value (Date object or ISO string)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no date is selected",
    },
  },
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormDatePicker>;

export default meta;
type Story = StoryObj<typeof FormDatePicker>;

// Default Date Picker
export const Default: Story = {
  args: {
    label: "Select Date",
    placeholder: "Pick a date",
    required: true,
  },
};

// With Initial Value
export const WithInitialValue: Story = {
  args: {
    label: "Start Date",
    value: new Date("2024-01-01"),
    required: true,
  },
};

// With Tooltip
export const WithTooltip: Story = {
  args: {
    label: "Event Date",
    tooltip: "Select the date when the event will take place",
    required: true,
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: "Deadline",
    error: "Please select a future date",
    value: new Date("2023-01-01"),
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: "Fixed Date",
    value: new Date(),
    disabled: true,
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    label: "Custom Date Picker",
    className: "custom-container",
    labelClassName: "text-primary",
    datePickerClassName: "custom-wrapper",
  },
};
