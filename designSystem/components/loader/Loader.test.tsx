import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import Loader, { ILoaderProps } from "./Loader";

const defaultProps: ILoaderProps = {
  isLoading: false,
};

// Helper function to render Loader with mocked data
const renderLoader = (props: Partial<ILoaderProps>) => {
  return renderWithTheme(<Loader {...defaultProps} {...props} />);
};

describe("Toast Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Snapshot Tests
  it("should match snapshot", () => {
    const { container } = renderLoader({ isLoading: true });
    expect(container).toMatchSnapshot();
  });

  it("should not render when isLoading = false", () => {
    renderLoader({});

    expect(screen.queryByTestId("loader-test")).toBeNull();
  });

  it("should render when isLoading = true", () => {
    renderLoader({ isLoading: true });

    expect(screen.queryByTestId("loader-test")).toBeInTheDocument();
  });

  it("should render style correctly", () => {
    renderLoader({ isLoading: true });

    const loader = screen.queryByTestId("loader-test");
    const spinner = screen.queryByTestId("spinner-test");

    expect(loader).toHaveClass("fixed inset-0 bg-black bg-opacity-25 z-50");
    expect(loader).toHaveClass("flex items-center justify-center");

    expect(spinner).toHaveClass("animate-spin");
    expect(spinner).toHaveClass("rounded-full h-12 w-12 border-t-2 border-b-2 border-white");
  });
});
