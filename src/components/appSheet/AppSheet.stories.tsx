import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@designSystem/components/button";
import { Input } from "@designSystem/components/input";
import AppSheet from "./AppSheet";
import { Text } from "@designSystem/components/text";

const meta = {
  title: "Components/AppSheet",
  component: AppSheet,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A slide-in sheet component built on top of Radix UI Sheet, perfect for side panels and drawers.",
      },
    },
  },
  argTypes: {
    side: {
      control: "radio",
      options: ["left", "right"],
      description: "The side from which the sheet appears",
    },
    title: {
      control: "text",
      description: "Sheet title",
    },
    description: {
      control: "text",
      description: "Sheet description",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppSheet>;

export default meta;
type Story = StoryObj<typeof AppSheet>;

// Template for Sheet wrapper with trigger button
const SheetTemplate = ({
  children,
  trigger = "Open Sheet",
  ...args
}: React.ComponentProps<typeof AppSheet> & { trigger?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>{trigger}</Button>
      <AppSheet open={open} onOpenChange={setOpen} {...args}>
        {children}
      </AppSheet>
    </div>
  );
};

// Basic Sheet
export const Basic: Story = {
  render: args => (
    <SheetTemplate {...args}>
      <div className="py-4">
        <p>Basic sheet content goes here.</p>
      </div>
    </SheetTemplate>
  ),
};

// Sheet with Header
export const WithHeader: Story = {
  render: args => (
    <SheetTemplate
      title="Sheet Title"
      description="This is a detailed description of what this sheet does or shows."
      {...args}
    >
      <div className="py-4">
        <p>Sheet content with header.</p>
      </div>
    </SheetTemplate>
  ),
};

// Left Side Sheet
export const LeftSide: Story = {
  render: args => (
    <SheetTemplate side="left" title="Left Sheet" description="This sheet slides in from the left side" {...args}>
      <div className="py-4">
        <p>Left side sheet content.</p>
      </div>
    </SheetTemplate>
  ),
};

// Right Side Sheet
export const RightSide: Story = {
  render: args => (
    <SheetTemplate side="right" title="Right Sheet" description="This sheet slides in from the right side" {...args}>
      <div className="py-4">
        <p>Right side sheet content.</p>
      </div>
    </SheetTemplate>
  ),
};

// Sheet with Form
export const WithForm: Story = {
  render: args => (
    <SheetTemplate title="Edit Profile" description="Make changes to your profile settings." {...args}>
      <div className="py-4 space-y-4">
        <div className="space-y-2">
          <Text htmlFor="name">Name</Text>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div className="space-y-2">
          <Text htmlFor="email">Email</Text>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="pt-4 flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </SheetTemplate>
  ),
};

// Sheet with Long Content
export const WithLongContent: Story = {
  render: args => (
    <SheetTemplate title="Long Content" description="This sheet demonstrates scrolling behavior" {...args}>
      <div className="py-4 space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-md">
            <h3 className="font-semibold">Section {i + 1}</h3>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        ))}
      </div>
    </SheetTemplate>
  ),
};
