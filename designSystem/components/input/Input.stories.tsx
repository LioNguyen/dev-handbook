import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta = {
  title: "Design System/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible input component that supports various types and states with consistent styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url", "file"],
      description: "Type of the input field",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state of the input",
    },
    readOnly: {
      control: "boolean",
      description: "Read-only state of the input",
    },
  },
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

// Default state
export const Default: Story = {
  args: {
    placeholder: "Enter text here...",
  },
};

// Different types
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter email...",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter number...",
  },
};

export const File: Story = {
  args: {
    type: "file",
  },
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
    value: "Disabled value",
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: "Read-only value",
  },
};

// With Label
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label
        htmlFor="with-label"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Email
      </label>
      <Input id="with-label" type="email" placeholder="Enter your email" />
    </div>
  ),
};

// Form Example
export const FormExample: Story = {
  render: () => (
    <form className="flex flex-col space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Full Name</label>
        <Input placeholder="Admin" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Email</label>
        <Input type="email" placeholder="admin@example.com" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Password</label>
        <Input type="password" />
      </div>
    </form>
  ),
};
