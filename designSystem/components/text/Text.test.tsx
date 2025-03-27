import { screen } from "@testing-library/react";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithRef, createRef } from "react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import Text, { textVariants } from "./Text";

type TextPropsWithRef = ComponentPropsWithRef<typeof Text>;
type TextVariantProps = VariantProps<typeof textVariants>;
type TextVariant = NonNullable<TextVariantProps["variant"]>;

const defaultProps: Partial<TextPropsWithRef> = {
  variant: "default",
};

const renderComponent = (props: Partial<TextPropsWithRef> = {}) => {
  return renderWithTheme(<Text {...defaultProps} {...props} />);
};

describe("Text Component", () => {
  // Snapshot Tests
  it("should match snapshot with default props", () => {
    const { container } = renderComponent({ children: "Text content" });
    expect(container.firstChild).toMatchSnapshot();
  });

  // Test render
  it("should render text with default props", () => {
    renderComponent({ children: "Hello world" });

    const text = screen.getByText("Hello world");
    expect(text).toBeInTheDocument();
    expect(text.tagName.toLowerCase()).toBe("span");
    expect(text).toHaveClass("text-text-primary");
  });

  // Test className custom
  it("should merge custom className with default classes", () => {
    renderComponent({ className: "custom-class", children: "Text" });

    const text = screen.getByText("Text");
    expect(text).toHaveClass("custom-class");
    expect(text).toHaveClass("text-text-primary");
  });

  // Test asChild prop
  it("should render as child component when asChild is true", () => {
    renderComponent({ asChild: true, children: <a href="#">Link Text</a> });

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("text-text-primary");
  });

  // Test 'as' prop
  it("should render as different HTML element when 'as' prop is provided", () => {
    renderComponent({ as: "p", children: "Paragraph text" });

    const text = screen.getByText("Paragraph text");
    expect(text.tagName.toLowerCase()).toBe("p");
  });

  // Test htmlFor attribute for label variant
  it("should apply htmlFor attribute when variant is label", () => {
    renderComponent({
      variant: "label",
      htmlFor: "input-id",
      children: "Label text",
    });

    const label = screen.getByText("Label text");
    expect(label).toHaveAttribute("for", "input-id");
  });

  // Test ref forwarding
  it("should forward ref correctly", () => {
    const ref = createRef<HTMLSpanElement>();
    renderComponent({ ref, children: "Text with ref" });

    const text = screen.getByText("Text with ref");
    expect(ref.current).toBe(text);
  });

  // Test variants
  describe("Variants", () => {
    const variants: TextVariant[] = [
      "heading-1",
      "default",
      "secondary",
      "description",
      "label",
      "error",
      "required",
      "link",
    ] as const;

    variants.forEach(variant => {
      it(`should render ${variant} variant correctly`, () => {
        renderComponent({ variant, children: `${variant} text` });

        const text = screen.getByText(`${variant} text`);
        switch (variant) {
          case "heading-1":
            expect(text).toHaveClass("text-text-primary text-xl lg:text-2xl font-semibold tracking-tight");
            break;
          case "default":
            expect(text).toHaveClass("text-text-primary");
            break;
          case "secondary":
            expect(text).toHaveClass("text-text-muted-foreground");
            break;
          case "description":
            expect(text).toHaveClass("text-text-muted-foreground text-sm");
            break;
          case "label":
            expect(text).toHaveClass("text-sm font-medium text-text-primary");
            break;
          case "error":
            expect(text).toHaveClass("text-sm text-error");
            break;
          case "required":
            expect(text).toHaveClass("text-error");
            break;
          case "link":
            expect(text).toHaveClass("text-text-muted-foreground hover:text-primary hover:underline cursor-pointer");
            break;
        }
      });
    });
  });
});
