import * as PopoverPrimitive from "@radix-ui/react-popover";
import { screen } from "@testing-library/react";
import type { ForwardedRef } from "react";
import { ComponentPropsWithRef, createRef, forwardRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

const mockContent = vi.fn();

type ContentProps = ComponentPropsWithRef<typeof PopoverPrimitive.Content>;

vi.mock("@radix-ui/react-popover", async () => {
  const actual = await vi.importActual("@radix-ui/react-popover");
  return {
    ...(actual as any),
    Content: forwardRef((props: Omit<ContentProps, "ref">, ref: ForwardedRef<HTMLDivElement>) => {
      const { children, ...restProps } = props;
      mockContent(restProps);
      return (
        <div data-testid="mocked-popover-content" ref={ref} {...restProps}>
          {children}
        </div>
      );
    }),
  };
});

const renderPopover = (props: Partial<ContentProps>) => {
  return renderWithTheme(
    <Popover open={true}>
      <PopoverTrigger>Click me</PopoverTrigger>
      <PopoverContent {...props}>Content</PopoverContent>
    </Popover>,
  );
};

describe("Popover Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Snapshot Tests
  it("should match snapshot with default props", () => {
    const { container } = renderPopover({});
    expect(container).toMatchSnapshot();
  });

  it("should render trigger button", () => {
    renderPopover({});

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should pass default props correctly to PopoverContent", () => {
    renderPopover({});

    expect(mockContent).toHaveBeenCalledWith(
      expect.objectContaining({
        align: "center",
        sideOffset: 4,
        className: expect.stringContaining("z-50"),
      }),
    );
  });

  it("should pass ref prop correctly", () => {
    const ref = createRef<HTMLDivElement>();
    renderPopover({ ref });

    const content = screen.getByTestId("mocked-popover-content");
    expect(ref.current).toBe(content);
  });

  it("should pass custom side prop correctly", () => {
    const sides = ["top", "right", "bottom", "left"] as const;

    sides.forEach(side => {
      renderPopover({ side });

      expect(mockContent).toHaveBeenCalledWith(expect.objectContaining({ side }));
    });
  });

  it("should pass custom align prop correctly", () => {
    const alignments = ["start", "center", "end"] as const;

    alignments.forEach(align => {
      renderPopover({ align });

      expect(mockContent).toHaveBeenCalledWith(expect.objectContaining({ align }));
    });
  });

  it("should pass custom sideOffset prop correctly", () => {
    const sideOffset = 10;
    renderPopover({ sideOffset });

    expect(mockContent).toHaveBeenCalledWith(expect.objectContaining({ sideOffset }));
  });

  it("should merge custom className with default classes", () => {
    const customClass = "custom-class";
    renderPopover({ className: customClass });

    expect(mockContent).toHaveBeenCalledWith(
      expect.objectContaining({
        className: expect.stringContaining(customClass),
      }),
    );
  });

  it("should pass multiple props correctly", () => {
    const props = {
      side: "top" as const,
      align: "start" as const,
      sideOffset: 8,
      className: "custom-class",
    };

    renderPopover(props);

    expect(mockContent).toHaveBeenCalledWith(
      expect.objectContaining({
        ...props,
        className: expect.stringContaining(props.className),
      }),
    );
  });

  it("should handle undefined props gracefully", () => {
    renderPopover({
      side: undefined,
      align: undefined,
      sideOffset: undefined,
    });

    expect(mockContent).toHaveBeenCalledWith(
      expect.objectContaining({
        align: "center", // default value
        sideOffset: 4, // default value
      }),
    );
  });

  // Test that className properly combines default and custom classes
  it("should properly combine default and custom classes", () => {
    const customClass = "my-custom-class";

    renderPopover({ className: customClass });

    const callArgs = mockContent.mock.calls[0][0];
    const classNames = callArgs.className.split(" ");

    // Check for both default and custom classes
    expect(classNames).toContain(customClass);
    expect(classNames).toContain("z-50");
    expect(classNames).toContain("rounded-md");
  });
});
