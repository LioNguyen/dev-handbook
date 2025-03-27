import type { Meta, StoryObj } from "@storybook/react";

import Text from "./Text";

const meta = {
  title: "Design System/Text",
  component: Text,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text component provides consistent typography styles with multiple variants for different use cases.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["heading-1", "default", "secondary", "description", "label", "error", "required", "link"],
      description: "Style variant of the text",
    },
    as: {
      control: "select",
      options: ["span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "label", "div"],
      description: "HTML element to render as",
    },
    asChild: {
      control: "boolean",
      description: "Render text as another element",
    },
    htmlFor: {
      control: "text",
      description: "For attribute for label variant",
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

// Variant stories
export const Default: Story = {
  args: {
    children: "Default text style",
    variant: "default",
  },
};

export const Heading1: Story = {
  args: {
    children: "Heading 1 Style",
    variant: "heading-1",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary text style",
    variant: "secondary",
  },
};

export const Description: Story = {
  args: {
    children: "Description text style - smaller and lighter",
    variant: "description",
  },
};

export const Label: Story = {
  args: {
    children: "Form label text",
    variant: "label",
    htmlFor: "input-example",
  },
};

export const Error: Story = {
  args: {
    children: "Error message text",
    variant: "error",
  },
};

export const Required: Story = {
  args: {
    children: "*",
    variant: "required",
  },
};

export const Link: Story = {
  args: {
    children: "Link style text",
    variant: "link",
  },
};

// Use case examples
export const AsCustomElement: Story = {
  args: {
    as: "h1",
    children: "Custom heading element",
    variant: "heading-1",
  },
};

export const AsChildExample: Story = {
  args: {
    asChild: true,
    children: <a href="#">Click me</a>,
    variant: "link",
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text variant="label" htmlFor="username">
        Username
      </Text>
      <input id="username" type="text" className="rounded border p-2" placeholder="Enter username" />
      <Text variant="description">Must be at least 4 characters long</Text>
      <Text variant="error">Username is required</Text>
    </div>
  ),
};

// Demo all variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Text variant="heading-1">Heading 1 Style</Text>
      <Text variant="default">Default text style</Text>
      <Text variant="secondary">Secondary text style</Text>
      <Text variant="description">Description text style</Text>
      <Text variant="label">Label text style</Text>
      <Text variant="error">Error text style</Text>
      <Text variant="required">*</Text>
      <Text variant="link">Link text style</Text>
    </div>
  ),
};
