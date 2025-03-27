import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle, Trash2 } from "lucide-react";

import { Button } from "@designSystem/components/button";
import { Input } from "@designSystem/components/input";
import { Text } from "@designSystem/components/text";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

const meta = {
  title: "Design System/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A modal dialog that interrupts the user with important content.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

// Basic Dialog
export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Text htmlFor="name" className="text-right">
              Name
            </Text>
            <Input id="name" defaultValue="Admin" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Text htmlFor="username" className="text-right">
              Username
            </Text>
            <Input id="username" defaultValue="@Admin" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Confirmation Dialog
export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Delete Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete Account
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="secondary">Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Alert Dialog
export const Alert: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Show Alert</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            System Update Required
          </DialogTitle>
          <DialogDescription>
            A new system update is available. The update will improve system stability and security.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Update Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
