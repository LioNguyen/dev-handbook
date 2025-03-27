import type { Meta, StoryObj } from "@storybook/react";
import { Camera, ChevronDown, Menu, User } from "lucide-react";
import AppPopover from "./AppPopover";
import { ALIGN, SIDE } from "@/shared/constants";

const meta = {
  title: "Components/AppPopover",
  component: AppPopover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible dropdown menu component that supports various triggers, alignments, and content types.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: Object.values(ALIGN),
      description: "Alignment of the dropdown content",
    },
    side: {
      control: "select",
      options: Object.values(SIDE),
      description: "Side position of the dropdown content",
    },
  },
  decorators: [
    Story => (
      <div className="h-[400px] w-[400px] flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppPopover>;

export default meta;
type Story = StoryObj<typeof AppPopover>;

const ExampleContent = () => (
  <div className="flex flex-col gap-2">
    <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded">
      <User size={16} />
      <span>Profile</span>
    </button>
    <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded">
      <Camera size={16} />
      <span>Photos</span>
    </button>
  </div>
);

// Default with Button Trigger
export const Default: Story = {
  args: {
    trigger: (
      <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded">
        Menu
        <ChevronDown size={16} />
      </button>
    ),
    content: <ExampleContent />,
  },
};

// Icon Trigger
export const IconTrigger: Story = {
  args: {
    trigger: (
      <button className="p-2 hover:bg-gray-100 rounded">
        <Menu size={20} />
      </button>
    ),
    content: <ExampleContent />,
  },
};

// Different Alignments
export const AlignmentCenter: Story = {
  args: {
    ...Default.args,
    align: ALIGN.center,
  },
};

export const AlignmentEnd: Story = {
  args: {
    ...Default.args,
    align: ALIGN.end,
  },
};

// Different Sides
export const SideBottom: Story = {
  args: {
    ...Default.args,
    side: SIDE.bottom,
  },
};

export const SideLeft: Story = {
  args: {
    ...Default.args,
    side: SIDE.left,
  },
};

// With Form Content
export const WithFormContent: Story = {
  args: {
    ...Default.args,
    content: (
      <form className="w-[200px] p-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded" placeholder="Enter email" />
        </div>
        <button type="submit" className="w-full mt-4 px-4 py-2 bg-primary text-white rounded">
          Submit
        </button>
      </form>
    ),
  },
};
