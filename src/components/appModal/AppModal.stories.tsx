import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@designSystem/components/button";
import AppModal from "./AppModal";

const meta = {
  title: "Components/AppModal",
  component: AppModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A reusable modal dialog component built on top of Radix UI Dialog.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
      description: "Controls the width of the modal",
    },
    open: {
      control: "boolean",
      description: "Controls the open state of the modal",
    },
    title: {
      control: "text",
      description: "Modal title",
    },
    description: {
      control: "text",
      description: "Modal description text",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppModal>;

export default meta;
type Story = StoryObj<typeof AppModal>;

// Template for Modal wrapper with trigger button
const ModalTemplate = ({
  children,
  trigger = "Open Modal",
  ...args
}: React.ComponentProps<typeof AppModal> & { trigger?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>{trigger}</Button>
      <AppModal open={open} onOpenChange={setOpen} {...args}>
        {children}
      </AppModal>
    </div>
  );
};

// Basic Modal
export const Basic: Story = {
  render: args => (
    <ModalTemplate title="Basic Modal" {...args}>
      <div className="py-4">
        <p>This is a basic modal with just some text content.</p>
      </div>
    </ModalTemplate>
  ),
};

// Modal with Description
export const WithDescription: Story = {
  render: args => (
    <ModalTemplate
      title="Modal with Description"
      description="This is a more detailed description of what this modal does or shows to the user."
      {...args}
    >
      <div className="py-4">
        <p>Modal content goes here.</p>
      </div>
    </ModalTemplate>
  ),
};

// Modal with Footer
export const WithFooter: Story = {
  render: args => (
    <ModalTemplate
      title="Modal with Footer"
      {...args}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      }
    >
      <div className="py-4">
        <p>This modal includes footer actions.</p>
      </div>
    </ModalTemplate>
  ),
};

// Different Sizes
export const DifferentSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["sm", "md", "lg", "xl", "2xl", "full"] as const).map(size => (
        <ModalTemplate
          key={size}
          trigger={`${size.toUpperCase()} Modal`}
          title={`${size.toUpperCase()} Modal`}
          size={size}
        >
          <div className="py-4">
            <p>This is a modal with {size} size.</p>
          </div>
        </ModalTemplate>
      ))}
    </div>
  ),
};

// Nested Modals
export const NestedModals: Story = {
  render: args => {
    const FirstLevelModal = () => {
      const [secondOpen, setSecondOpen] = useState(false);

      return (
        <div className="py-4">
          <p>This is the first level modal.</p>
          <Button className="mt-4" onClick={() => setSecondOpen(true)}>
            Open Second Modal
          </Button>

          <AppModal
            open={secondOpen}
            onOpenChange={setSecondOpen}
            title="Second Level Modal"
            footer={
              <div className="flex justify-end">
                <Button onClick={() => setSecondOpen(false)}>Close</Button>
              </div>
            }
          >
            <div className="py-4">
              <p>This is the second level modal.</p>
            </div>
          </AppModal>
        </div>
      );
    };

    return (
      <ModalTemplate title="First Level Modal" {...args}>
        <FirstLevelModal />
      </ModalTemplate>
    );
  },
};
