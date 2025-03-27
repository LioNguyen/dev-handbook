import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentPropsWithRef, createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import { Textarea } from "./Textarea";

type TextareaPropsWithRef = ComponentPropsWithRef<typeof Textarea>;

const defaultProps: Partial<TextareaPropsWithRef> = {
  placeholder: "Enter your text here",
};

const renderComponent = (props: Partial<TextareaPropsWithRef> = {}) => {
  return renderWithTheme(<Textarea {...defaultProps} {...props} />);
};

const getTextarea = () => screen.getByRole("textbox");

describe("Textarea Component", () => {
  // Snapshot Test
  it("should match snapshot with default props", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  // Basic Render Test
  it("should render textarea correctly", () => {
    renderComponent();

    const textarea = getTextarea();
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass(
      "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    );
  });

  // Custom ClassName Test
  it("should apply custom className correctly", () => {
    renderComponent({ className: "custom-textarea" });

    expect(getTextarea()).toHaveClass("custom-textarea");
  });

  // Placeholder Test
  it("should handle placeholder text", () => {
    renderComponent();

    expect(getTextarea()).toHaveAttribute("placeholder", defaultProps.placeholder);
  });

  // Disabled State Test
  it("should handle disabled state", () => {
    renderComponent({ disabled: true });

    expect(getTextarea()).toBeDisabled();
  });

  // Ref Forwarding Test
  it("should forward ref correctly", () => {
    const ref = createRef<HTMLTextAreaElement>();
    renderComponent({ ref });

    expect(ref.current).toBe(getTextarea());
  });

  // Basic Interaction Test
  describe("Interaction Tests", () => {
    it("should handle onChange events", async () => {
      const handleChange = vi.fn();
      renderComponent({ onChange: handleChange });

      await userEvent.type(getTextarea(), "test textarea content");
      expect(handleChange).toHaveBeenCalled();
    });

    it("should handle focus and blur states", () => {
      renderComponent();

      const textarea = getTextarea();
      textarea.focus();
      expect(textarea).toHaveFocus();

      textarea.blur();
      expect(textarea).not.toHaveFocus();
    });
  });
});
