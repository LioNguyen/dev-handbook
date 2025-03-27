import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FormInput from "./FormInput";

const meta = {
  title: "Components/Form/Input/FormInput",
  component: FormInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A form input component with built-in label, validation, tooltip, and various input types support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url"],
      description: "Input type",
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
  },
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof FormInput>;

// Default Text Input
export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    required: true,
  },
};

// Password Input
export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    required: true,
  },
};

// With Tooltip
export const WithTooltip: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    tooltip: "We'll never share your email with anyone else.",
    required: true,
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    error: "Please enter a valid email address",
    value: "invalid-email",
  },
};

// With Custom Styling
export const CustomStyling: Story = {
  args: {
    label: "Custom Input",
    placeholder: "Enter text",
    className: "custom-container",
    inputProps: {
      className: "border-dashed border-2 focus:border-primary",
    },
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit",
    value: "Disabled value",
    inputProps: {
      disabled: true,
    },
  },
};

// With Debounce
const WithDebounceComponent = () => {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-4">
      <FormInput
        label="Debounced Input"
        placeholder="Type here..."
        value={value}
        onChange={setValue}
        inputDelay={1000}
      />
      <div className="text-sm">
        <p>Value: {value}</p>
      </div>
    </div>
  );
};
export const WithDebounce: Story = {
  render: WithDebounceComponent,
};
