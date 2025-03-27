import type { Meta, StoryObj } from "@storybook/react";
import FormInputIp from "./FormInputIp";

const meta = {
  title: "Components/Form/Input/FormInputIp",
  component: FormInputIp,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A specialized form input component for IP addresses with four number segments separated by dots. Supports validation, paste functionality, and various states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "IP address value (format: xxx.xxx.xxx.xxx)",
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
} satisfies Meta<typeof FormInputIp>;

export default meta;
type Story = StoryObj<typeof FormInputIp>;

// Default Empty Input
export const Default: Story = {
  args: {
    label: "IP Address",
    placeholder: "000",
    required: true,
  },
};

// With Initial Value
export const WithValue: Story = {
  args: {
    label: "Server IP",
    value: "192.168.1.1",
    required: true,
  },
};

// With Tooltip
export const WithTooltip: Story = {
  args: {
    label: "IP Address",
    placeholder: "000",
    tooltip: "Enter a valid IPv4 address in format: xxx.xxx.xxx.xxx",
    required: true,
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: "IP Address",
    value: "256.1.2.3",
    error: "Invalid IP address. Each number must be between 0 and 255",
    required: true,
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: "Network IP",
    value: "10.0.0.1",
    disabled: true,
  },
};

// Read-only State
export const ReadOnly: Story = {
  args: {
    label: "Current IP",
    value: "192.168.0.1",
    readOnly: true,
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    label: "Custom IP Input",
    placeholder: "000",
    className: "custom-container",
    inputProps: {
      className: "border-dashed border-2 focus:border-primary",
    },
  },
};

// Required with Label
export const RequiredWithLabel: Story = {
  args: {
    label: "Required IP",
    placeholder: "000",
    required: true,
    tooltip: "This field cannot be left empty",
  },
};
