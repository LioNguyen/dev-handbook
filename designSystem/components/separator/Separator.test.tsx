import { screen } from "@testing-library/react";
import { createRef, forwardRef, type ComponentPropsWithRef } from "react";
import { vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import Separator from "./Separator";

type SeparatorPropsWithRef = ComponentPropsWithRef<typeof Separator>;

const defaultProps: Partial<SeparatorPropsWithRef> = {};

const renderComponent = (props: Partial<SeparatorPropsWithRef> = {}) => {
  return renderWithTheme(<Separator {...defaultProps} {...props} />);
};

const getSeparator = () => screen.queryByTestId("radix-separator-test");

// Mock separator module
const mockSeparatorProps = vi.fn();
vi.mock("@radix-ui/react-separator", () => ({
  Root: forwardRef((props: any, ref) => {
    mockSeparatorProps(props);
    return <div ref={ref} data-testid="radix-separator-test" {...props} />;
  }),
}));

describe("Separator component", () => {
  beforeEach(() => {
    mockSeparatorProps.mockClear();
  });

  // Snapshot Tests
  it("should match snapshot with default props", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  // Test render
  it("should render correctly", () => {
    renderComponent({});

    expect(getSeparator()).toBeInTheDocument();
    expect(getSeparator()).toHaveClass("shrink-0 bg-border");
  });

  // Test className custom
  it("should merge classes correctly", () => {
    const className = "custom-class";
    renderComponent({ className });

    expect(getSeparator()).toHaveClass("shrink-0 bg-border");
    expect(getSeparator()).toHaveClass("custom-class");
  });

  it("should render with horizontal orientation by default", () => {
    renderComponent({});

    expect(getSeparator()).toHaveClass("h-[1px]", "w-full");
    expect(mockSeparatorProps).toHaveBeenCalledWith(expect.objectContaining({ orientation: "horizontal" }));
  });

  it("should render with vertical orientation correctly", () => {
    renderComponent({ orientation: "vertical" });

    expect(getSeparator()).toHaveClass("h-full", "w-[1px]");
    expect(mockSeparatorProps).toHaveBeenCalledWith(expect.objectContaining({ orientation: "vertical" }));
  });

  it("should be decorative by default", () => {
    renderComponent({});

    expect(mockSeparatorProps).toHaveBeenCalledWith(expect.objectContaining({ decorative: true }));
  });

  it("should not be decorative when specified", () => {
    renderComponent({ decorative: false });

    expect(mockSeparatorProps).toHaveBeenCalledWith(expect.objectContaining({ decorative: false }));
  });

  it("should handle ref correctly", () => {
    const ref = createRef<HTMLDivElement>();
    renderComponent({ ref });

    expect(ref.current).toBe(getSeparator());
  });
});
