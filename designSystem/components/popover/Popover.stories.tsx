import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

const meta = {
  title: "Design System/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A customizable popover component with multiple positions",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Popover position",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Alignment of the popover",
    },
  },
} satisfies Meta<typeof PopoverContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    side: "bottom",
    align: "center",
  },
  render: (args: any) => (
    <div className="p-10">
      <Popover>
        <PopoverTrigger className="btn">Open Popover</PopoverTrigger>
        <PopoverContent {...args}>
          <p>This is the popover content.</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-10">
      {["top", "right", "left", "bottom"].map(side => (
        <Popover key={side}>
          <PopoverTrigger className="btn">{side.charAt(0).toUpperCase() + side.slice(1)}</PopoverTrigger>
          <PopoverContent side={side as "top" | "right" | "left" | "bottom"}>
            <p>Popover on {side}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};
