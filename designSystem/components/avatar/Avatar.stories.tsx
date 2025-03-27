import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";

const meta = {
  title: "Design System/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile avatar component that displays either an image or name initials as fallback. For single word names, shows first character. For multiple words, shows first character of first two words.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Source URL of the avatar image.",
    },
    name: {
      control: "text",
      description: "Name to display. Shows first character for single word, or first characters of first two words.",
      required: true,
    },
    size: {
      control: "number",
      description: "Size of the avatar in pixels.",
    },
    onClick: {
      action: "clicked",
      description: "Optional click handler for the avatar.",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

// Short Name Avatar
export const ShortName: Story = {
  args: {
    name: "Admin",
    size: 48,
    onClick: undefined,
  },
};

// Long Name Avatar
export const LongName: Story = {
  args: {
    name: "License Manager",
    size: 48,
    onClick: undefined,
  },
};

// Avatar with Image
export const WithImage: Story = {
  args: {
    src: "https://via.placeholder.com/150",
    name: "License Manager",
    size: 96,
    onClick: undefined,
  },
};

// Clickable Avatar
export const Clickable: Story = {
  args: {
    name: "License Manager",
    size: 96,
    onClick: () => alert("Avatar clicked!"),
  },
};
