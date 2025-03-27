import { screen } from "@testing-library/react";
import { VariantProps } from "class-variance-authority";
import { ComponentPropsWithRef } from "react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import { Badge, badgeVariants } from "./Badge";

type BadgePropsWithRef = ComponentPropsWithRef<typeof Badge>;
type BadgeVariantProps = VariantProps<typeof badgeVariants>;
type BadgeVariant = NonNullable<BadgeVariantProps["variant"]>;

const defaultProps: Partial<BadgePropsWithRef> = {
  variant: "default",
};

const renderComponent = (props: Partial<BadgePropsWithRef> = {}) => {
  return renderWithTheme(<Badge {...defaultProps} {...props} />);
};

describe("Badge Component", () => {
  const defaultClass =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2";

  // Snapshot Tests
  it("should match snapshot with default props", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  // Test render
  it("should render badge with default props", () => {
    const { container } = renderComponent({ children: "Status" });
    const badge = screen.getByText("Status");

    expect(badge).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(defaultClass);
  });

  // Test className custom
  it("should merge custom className with default classes", () => {
    const { container } = renderComponent({
      className: "custom-class",
      children: "Status",
    });

    const badge = container.firstChild;
    expect(badge).toHaveClass("custom-class");
    expect(badge).toHaveClass(defaultClass);
  });

  // Test HTML attributes
  it("should forward HTML attributes", () => {
    const { container } = renderComponent({
      children: "Status",
      "aria-label": "Status Badge",
    });

    expect(container.firstChild).toHaveAttribute("aria-label", "Status Badge");
  });

  // Test variants
  describe("Variants", () => {
    const variants: BadgeVariant[] = ["default", "secondary", "outline", "active", "inactive", "expired"] as const;

    variants.forEach(variant => {
      it(`should render ${variant} variant correctly`, () => {
        const { container } = renderComponent({
          variant,
          children: "Status",
        });

        const badge = container.firstChild;

        switch (variant) {
          case "default":
            expect(badge).toHaveClass("border-transparent bg-primary text-text-secondary shadow-sm hover:bg-primary/80");
            break;
          case "secondary":
            expect(badge).toHaveClass("border-transparent bg-secondary text-text-primary hover:bg-secondary/80");
            break;
          case "outline":
            expect(badge).toHaveClass("text-text-primary");
            break;
          case "active":
            expect(badge).toHaveClass(
              "border-badge-active-border bg-badge-active-background text-badge-active-foreground hover:bg-badge-active-background/50",
            );
            break;
          case "inactive":
            expect(badge).toHaveClass(
              "border-badge-inactive-border bg-badge-inactive-background text-badge-inactive-foreground hover:bg-badge-inactive-background/50",
            );
            break;
          case "expired":
            expect(badge).toHaveClass(
              "border-badge-expired-border bg-badge-expired-background text-badge-expired-foreground hover:bg-badge-expired-background/50",
            );
            break;
        }
      });
    });
  });

  // Test accessibility
  it("should have appropriate ARIA attributes", () => {
    const { container } = renderComponent({
      children: "Status",
      "aria-label": "Status Badge",
      role: "status",
    });

    const badge = container.firstChild;
    expect(badge).toHaveAttribute("role", "status");
    expect(badge).toHaveAttribute("aria-label", "Status Badge");
  });
});
