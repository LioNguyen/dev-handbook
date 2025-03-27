import type { Meta, StoryObj } from "@storybook/react";
import Loader from "./Loader";

const meta = {
  title: "Design System/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A loader when waiting a page getting data",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isLoading: {
      control: "boolean",
      description: "Toggle loader",
    },
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof Loader>;

// Default horizontal separator
export const Default: Story = {
  args: {
    isLoading: true,
  },
  render: args => (
    <div className="h-[300px] w-[500px] py-2 px-5">
      <h1>Page Demo</h1>
      <Loader {...args} />
    </div>
  ),
};
