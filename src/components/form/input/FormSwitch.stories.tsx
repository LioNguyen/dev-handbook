import type { Meta, StoryObj } from "@storybook/react";
import FormSwitch from "./FormSwitch";

const meta = {
  title: "Components/Form/Input/FormSwitch",
  component: FormSwitch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A form switch component with support for labels, tooltip, and customizable styling. Provides both a main label and a switch-specific label.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Main label text above the switch",
    },
    switchLabel: {
      control: "text",
      description: "Label text next to the switch",
    },
    required: {
      control: "boolean",
      description: "Whether the switch selection is required",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    value: {
      control: "boolean",
      description: "Controlled value of the switch",
    },
    tooltip: {
      control: "text",
      description: "Tooltip content for the main label",
    },
    className: {
      control: "text",
      description: "Custom class name for the container",
    },
    switchWrapperClassName: {
      control: "text",
      description: "Custom class name for the switch wrapper",
    },
  },
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormSwitch>;

export default meta;
type Story = StoryObj<typeof FormSwitch>;

// Default Switch
export const Default: Story = {
  args: {
    label: "Notifications",
    switchLabel: "Enable notifications",
    value: false,
  },
};

// With Required Label
export const WithRequired: Story = {
  args: {
    label: "Terms and Conditions",
    switchLabel: "I agree to the terms",
    required: true,
    value: false,
  },
};

// With Tooltip
export const WithTooltip: Story = {
  args: {
    label: "Dark Mode",
    switchLabel: "Enable dark theme",
    tooltip: "Switch between light and dark color schemes",
    value: true,
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: "Maintenance Mode",
    switchLabel: "System under maintenance",
    disabled: true,
    value: true,
  },
};

// Only Main Label
export const MainLabelOnly: Story = {
  args: {
    label: "Enable Feature",
    value: false,
  },
};

// Only Switch Label
export const SwitchLabelOnly: Story = {
  args: {
    switchLabel: "Active",
    value: true,
  },
};

// With All Features
export const FullFeatured: Story = {
  args: {
    label: "Advanced Settings",
    switchLabel: "Enable experimental features",
    required: true,
    tooltip: "Enable additional features that are still in development",
    value: false,
    className: "bg-slate-50 p-4 rounded-lg",
    switchWrapperClassName: "mt-2",
  },
};
