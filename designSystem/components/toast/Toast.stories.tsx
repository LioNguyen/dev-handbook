import type { Meta, StoryObj } from "@storybook/react";

import { TOAST_TYPE } from "@/domains/global";
import Toast from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Design System/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toast component for displaying feedback messages like success, error, warning, and info with animations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    toasts: {
      description: "Array of toast messages to display.",
      control: { type: "object" },
    },
    closeToast: {
      description: "Function to remove a toast by ID.",
    },
  },
  decorators: [
    Story => (
      <div className="h-[100px] w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    toasts: [
      {
        id: "1",
        message: "This is a success message!",
        type: TOAST_TYPE.success,
        showIcon: true,
      },
    ],
    closeToast: (id: string) => console.log(`Toast closed: ${id}`),
  },
};

export const Error: Story = {
  args: {
    toasts: [
      {
        id: "2",
        message: "This is an error message!",
        type: TOAST_TYPE.error,
        showIcon: true,
      },
    ],
    closeToast: (id: string) => console.log(`Toast closed: ${id}`),
  },
};

export const Info: Story = {
  args: {
    toasts: [
      {
        id: "3",
        message: "This is an info message!",
        type: TOAST_TYPE.info,
        showIcon: true,
      },
    ],
    closeToast: (id: string) => console.log(`Toast closed: ${id}`),
  },
};

export const Warning: Story = {
  args: {
    toasts: [
      {
        id: "4",
        message: "This is a warning message!",
        type: TOAST_TYPE.warning,
        showIcon: true,
      },
    ],
    closeToast: (id: string) => console.log(`Toast closed: ${id}`),
  },
};

export const HideIcon: Story = {
  args: {
    toasts: [
      {
        id: "5",
        message: "This is a hide icon message!",
        type: TOAST_TYPE.info,
        showIcon: false,
      },
    ],
    closeToast: (id: string) => console.log(`Toast closed: ${id}`),
  },
};

export const AllTypes: Story = {
  args: {
    toasts: [
      {
        id: "1",
        message: "This is a success message!",
        type: TOAST_TYPE.success,
        showIcon: true,
      },
      {
        id: "2",
        message: "This is an error message!",
        type: TOAST_TYPE.error,
        showIcon: true,
      },
      {
        id: "3",
        message: "This is an info message!",
        type: TOAST_TYPE.info,
        showIcon: true,
      },
      {
        id: "4",
        message: "This is a warning message!",
        type: TOAST_TYPE.warning,
        showIcon: true,
      },
      {
        id: "5",
        message: "This is a hide icon message!",
        type: TOAST_TYPE.success,
        showIcon: false,
      },
    ],
    closeToast: (id: string) => console.log(`Toast closed: ${id}`),
  },
};
