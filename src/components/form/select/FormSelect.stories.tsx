import type { Meta, StoryObj } from "@storybook/react";
import FormSelect from "./FormSelect";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

const meta = {
  title: "Components/Form/Select/FormSelect",
  component: FormSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A form select component with built-in label, validation, and tooltip support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text",
    },
    required: {
      control: "boolean",
      description: "Whether the select is required",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    tooltip: {
      control: "text",
      description: "Tooltip content",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    options: {
      control: "object",
      description: "Array of select options",
    },
  },
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof FormSelect>;

export const Default: Story = {
  args: {
    label: "Select Option",
    placeholder: "Choose an option",
    options: options,
    required: true,
  },
};

export const WithTooltip: Story = {
  args: {
    label: "Select with Tooltip",
    placeholder: "Choose an option",
    options: options,
    tooltip: "This is a helpful tooltip message",
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Invalid Select",
    placeholder: "Choose an option",
    options: options,
    error: "Please select a valid option",
    value: "",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Select",
    placeholder: "Cannot select",
    options: options,
    value: "option1",
    selectProps: {
      disabled: true,
    },
  },
};

export const WithValue: Story = {
  args: {
    label: "Preselected Option",
    placeholder: "Choose an option",
    options: options,
    value: "option2",
  },
};
