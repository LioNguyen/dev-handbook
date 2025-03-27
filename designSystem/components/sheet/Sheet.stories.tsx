import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@designSystem/components/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./Sheet";

const meta = {
  title: "Design System/Sheet",
  component: SheetContent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A slide-out sheet dialog that supports different positions and customizable content.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "The side the sheet appears from",
      defaultValue: "right",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  decorators: [
    Story => (
      <div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SheetContent>;

export default meta;
type Story = StoryObj<typeof SheetContent>;

// Basic usage
export const Default: Story = {
  render: ({ side }) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <div className="py-4">Sheet content goes here.</div>
        <SheetFooter>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Different sides
export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Side Sheet</SheetTitle>
          <SheetDescription>This sheet slides in from the left</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const TopSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Top Sheet</SheetTitle>
          <SheetDescription>This sheet slides in from the top</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

// With Form
export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input id="name" className="col-span-3 rounded-md border p-2" placeholder="Enter name" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input id="username" className="col-span-3 rounded-md border p-2" placeholder="Enter username" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Custom Content
export const CustomContent: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View Details</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Product Details</SheetTitle>
          <SheetDescription>View detailed information about the product.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-secondary p-4">
            <h4 className="mb-2 font-medium">Product Stats</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Views</div>
              <div className="text-right">1,234</div>
              <div>Sales</div>
              <div className="text-right">123</div>
              <div>Rating</div>
              <div className="text-right">4.5/5</div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Close</Button>
          <Button>Purchase</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
