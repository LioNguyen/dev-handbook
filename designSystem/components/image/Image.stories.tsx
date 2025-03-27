import type { Meta, StoryObj } from "@storybook/react";
import Image from "./Image";

const meta = {
  title: "Design System/Image",
  component: Image,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible and customizable image component with support for additional props.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Source URL of the image.",
    },
    alt: {
      control: "text",
      description: "Alternative text for the image.",
    },
    size: {
      control: "number",
      description: "Size of the image (width and height).",
    },
    className: {
      control: "text",
      description: "Additional class name for custom styling.",
    },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof Image>;

// Default Image
export const Default: Story = {
  args: {
    src: "https://via.placeholder.com/150",
    alt: "Placeholder image",
    size: 150,
  },
};

// Custom Size
export const CustomSize: Story = {
  args: {
    src: "https://via.placeholder.com/300",
    alt: "Large placeholder image",
    size: 300,
  },
};

export const Clickable: Story = {
  args: {
    src: "https://via.placeholder.com/300",
    alt: "Large placeholder image",
    size: 300,
    onClick: () => alert("Image clicked!"),
  },
};

// Example with Missing Image
export const MissingImage: Story = {
  args: {
    src: "",
    alt: "Missing image fallback",
    size: 150,
  },
};
