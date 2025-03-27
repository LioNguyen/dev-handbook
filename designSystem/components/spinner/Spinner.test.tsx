import { screen } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import Spinner, { ISpinnerProps } from "./Spinner";

const defaultProps: ISpinnerProps = {
  isLoading: false,
};

// Helper function to render Spinner with mocked data
const renderSpinner = (props: Partial<ISpinnerProps> = {}) => {
  return renderWithTheme(<Spinner {...defaultProps} {...props} />);
};

describe("Spinner Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Snapshot Tests
  it("should match snapshot when loading", () => {
    const { container } = renderSpinner({ isLoading: true });
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot when not loading", () => {
    const { container } = renderSpinner({ isLoading: false });
    expect(container).toMatchSnapshot();
  });

  it("should not render spinner when isLoading = false", () => {
    renderSpinner({ isLoading: false });
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });

  it("should render spinner when isLoading = true", () => {
    renderSpinner({ isLoading: true });
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("should have correct spinner styles", () => {
    renderSpinner({ isLoading: true });
    const spinner = screen.getByTestId("spinner");

    expect(spinner).toHaveClass("spinner");
    expect(spinner).toHaveClass("h-4");
    expect(spinner).toHaveClass("w-4");
    expect(spinner).toHaveClass("mr-2");
  });

  it("should have correct SVG animation", () => {
    renderSpinner({ isLoading: true });
    const svg = screen.getByTestId("spinner").querySelector("svg");

    expect(svg).toHaveClass("animate-spin");
    expect(svg).toHaveClass("h-4");
    expect(svg).toHaveClass("w-4");
  });
});
