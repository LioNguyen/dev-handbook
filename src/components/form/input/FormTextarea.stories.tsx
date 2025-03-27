import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import FormTextarea from "./FormTextarea";
import { Text } from "@designSystem/components/text";

const meta = {
  title: "Components/Form/Input/FormTextarea",
  component: FormTextarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A form textarea component with built-in label, validation, tooltip, and debounce support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the textarea",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    required: {
      control: "boolean",
      description: "Whether the textarea is required",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    tooltip: {
      control: "text",
      description: "Tooltip content for the label",
    },
    inputDelay: {
      control: "number",
      description: "Debounce delay in milliseconds",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    value: {
      control: "text",
      description: "Textarea value",
    },
  },
  decorators: [
    Story => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof FormTextarea>;

// Default Textarea
export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Enter your description here...",
    required: true,
  },
};

// With Error State
export const WithError: Story = {
  args: {
    label: "Comments",
    placeholder: "Enter your comments",
    error: "This field cannot be empty",
    value: "",
  },
};

// With Tooltip
export const WithTooltip: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    tooltip: "Your bio should be brief but informative",
    required: true,
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    label: "Readonly Content",
    value: "This content cannot be edited",
    textareaProps: {
      disabled: true,
    },
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    label: "Custom Textarea",
    placeholder: "Type here...",
    className: "custom-container",
    labelClassName: "text-primary",
    textareaProps: {
      className: "border-dashed border-2 focus:border-primary",
    },
  },
};

// With Character Count
const WithCharacterCountComponent = () => {
  const [value, setValue] = useState("");
  const maxLength = 200;

  return (
    <div className="space-y-1">
      <FormTextarea
        label="Limited Input"
        placeholder="Type here..."
        value={value}
        onChange={setValue}
        textareaProps={{
          maxLength: maxLength,
        }}
      />
      <Text className="text-sm text-right">
        {value.length}/{maxLength} characters
      </Text>
    </div>
  );
};

export const WithCharacterCount: Story = {
  render: () => <WithCharacterCountComponent />,
};
