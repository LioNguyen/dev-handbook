import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "./Switch";
import { Text } from "@designSystem/components/text";

const meta = {
  title: "Design System/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A control that allows the user to toggle between checked and unchecked states.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

// Different states
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch defaultChecked id="checked" />
        <Text htmlFor="checked">Checked</Text>
      </div>

      <div className="flex items-center gap-2">
        <Switch id="unchecked" />
        <Text htmlFor="unchecked">Unchecked</Text>
      </div>

      <div className="flex items-center gap-2">
        <Switch disabled id="disabled" />
        <Text htmlFor="disabled">Disabled</Text>
      </div>

      <div className="flex items-center gap-2">
        <Switch disabled checked id="disabled-checked" />
        <Text htmlFor="disabled-checked">Disabled Checked</Text>
      </div>
    </div>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => <Switch className="bg-blue-500 data-[state=checked]:bg-green-500" />,
};
