import type { Meta, StoryObj } from "@storybook/react";
import FormCheckBox from "./FormCheckbox";

const meta = {
  title: "Components/Form/Input/FormCheckBox",
  component: FormCheckBox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A form checkbox group component with built-in label, tooltip, and multiple checkbox support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Main label for the checkbox group",
    },
    checkboxes: {
      control: {
        type: "object",
      },
      description: "Array of checkbox labels",
    },
    required: {
      control: "boolean",
      description: "Whether the checkbox group is required",
    },
    disabled: {
      control: "boolean",
      description: "Disable all checkboxes in the group",
    },
    tooltip: {
      control: "text",
      description: "Tooltip content for the main label",
    },
    value: {
      control: "object",
      description: "Object containing checkbox values {[label]: boolean}",
    },
  },
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormCheckBox>;

export default meta;
type Story = StoryObj<typeof FormCheckBox>;

// Default Checkbox Group
export const Default: Story = {
  args: {
    label: "Select Options",
    checkboxes: ["Option 1", "Option 2", "Option 3"],
    required: true,
  },
};

// With Initial Values
export const WithInitialValues: Story = {
  args: {
    label: "Preferences",
    checkboxes: ["Email Notifications", "SMS Alerts", "Push Notifications"],
    value: {
      "Email Notifications": true,
      "SMS Alerts": false,
      "Push Notifications": true,
    },
  },
};

// With Tooltip
export const WithTooltip: Story = {
  args: {
    label: "Permission Settings",
    checkboxes: ["Read", "Write", "Execute"],
    tooltip: "Select the permissions you want to grant",
    required: true,
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: "Disabled Options",
    checkboxes: ["Option 1", "Option 2"],
    disabled: true,
    value: {
      "Option 1": true,
      "Option 2": false,
    },
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    label: "Custom Checkboxes",
    checkboxes: ["Custom 1", "Custom 2"],
    className: "custom-container",
    checkboxWrapperClassName: "space-y-4",
    checkboxProps: {
      className: "border-dashed border-2",
    },
  },
};
