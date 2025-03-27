import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Design System/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A control that allows the user to toggle between checked and not checked.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "The controlled checked state of the checkbox",
    },
    defaultChecked: {
      control: "boolean",
      description: "The default checked state when initially rendered",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the checkbox is required in a form",
    },
    onCheckedChange: { action: "checked changed" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Default checkbox
export const Default: Story = {
  args: {},
};

// Controlled checkbox
export const Controlled: Story = {
  args: {
    checked: true,
    "aria-label": "Controlled Checkbox",
  },
};

// Disabled states
export const DisabledStates: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <label
          htmlFor="disabled"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Disabled
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <label
          htmlFor="disabled-checked"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Disabled Checked
        </label>
      </div>
    </div>
  ),
};

// Form integration
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};

// Form with error
export const WithError: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="error" className="border-red-500" />
        <label htmlFor="error" className="text-sm font-medium leading-none text-red-500">
          Accept terms and conditions
        </label>
      </div>
      <p className="text-xs text-red-500">Please accept the terms and conditions</p>
    </div>
  ),
};

// Complex form example
export const ComplexForm: Story = {
  render: () => (
    <form className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="emails" />
          <label
            htmlFor="emails"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Receive marketing emails
          </label>
        </div>
        <p className="text-xs text-muted-foreground">Get notified about new products and exclusive offers</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" defaultChecked />
          <label
            htmlFor="newsletter"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Weekly newsletter
          </label>
        </div>
        <p className="text-xs text-muted-foreground">Receive our weekly newsletter with the latest news and updates</p>
      </div>
    </form>
  ),
};

// List with checkboxes
export const CheckboxList: Story = {
  render: () => (
    <div className="space-y-3">
      <label className="text-sm font-medium">Select your interests:</label>
      {["Technology", "Design", "Business", "Marketing"].map(item => (
        <div key={item} className="flex items-center space-x-2">
          <Checkbox id={item.toLowerCase()} />
          <label
            htmlFor={item.toLowerCase()}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item}
          </label>
        </div>
      ))}
    </div>
  ),
};
