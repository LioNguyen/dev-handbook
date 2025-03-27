import type { Meta, StoryObj } from "@storybook/react";
import FormInputMac from "./FormInputMac";

const meta = {
  title: "Components/Form/Input/FormInputMac",
  component: FormInputMac,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A specialized form input component for MAC addresses with six hexadecimal segments separated by colons. Supports auto-capitalization, validation, and paste functionality.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "MAC address value (format: XX:XX:XX:XX:XX:XX)",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
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
      description: "Whether the input is disabled",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the input is read-only",
    },
  },
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormInputMac>;

export default meta;
type Story = StoryObj<typeof FormInputMac>;

// Default Empty Input
export const Default: Story = {
  args: {
    label: "MAC Address",
    placeholder: "00",
    required: true,
  },
};

// With Initial Value
export const WithValue: Story = {
  args: {
    label: "Device MAC",
    value: "00:1A:2B:3C:4D:5E",
    required: true,
  },
};

// With Tooltip
export const WithTooltip: Story = {
  args: {
    label: "MAC Address",
    placeholder: "00",
    tooltip: "Enter a valid MAC address in format: XX:XX:XX:XX:XX:XX (hexadecimal values)",
    required: true,
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: "MAC Address",
    value: "GG:1A:2B:3C:4D:5E",
    error: "Invalid MAC address. Use hexadecimal values (0-9, A-F) only",
    required: true,
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: "Device MAC",
    value: "00:1A:2B:3C:4D:5E",
    disabled: true,
  },
};

// Read-only State
export const ReadOnly: Story = {
  args: {
    label: "Current MAC",
    value: "00:1A:2B:3C:4D:5E",
    readOnly: true,
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    label: "Custom MAC Input",
    placeholder: "00",
    className: "custom-container",
    inputProps: {
      className: "border-dashed border-2 focus:border-primary",
    },
  },
};

// Required with Label
export const RequiredWithLabel: Story = {
  args: {
    label: "Required MAC",
    placeholder: "00",
    required: true,
    tooltip: "MAC address is required in hexadecimal format",
  },
};

// With Validation Example
export const WithValidation: Story = {
  args: {
    label: "MAC Address",
    value: "1A:2B:3C:4D:5E:6F",
    tooltip: "Only hexadecimal characters (0-9, A-F) are allowed",
    required: true,
  },
};
