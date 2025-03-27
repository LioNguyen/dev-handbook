import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import Skeleton from "./Skeleton";

const renderComponent = (props = {}) => {
  return renderWithTheme(<Skeleton {...props} />);
};

describe("Skeleton Component", () => {
  // Snapshot test
  it("should match snapshot", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  // Render test
  it("should render correctly with default props", () => {
    renderComponent();
    const skeleton = screen.getByTestId("skeleton-test");

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-background-skeleton");
  });

  // Custom className test
  it("should apply custom className correctly", () => {
    const customClass = "custom-class";
    renderComponent({ className: customClass });

    const skeleton = screen.getByTestId("skeleton-test");
    expect(skeleton).toHaveClass(customClass);
    expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-background-skeleton");
  });

  // HTML attributes test
  it("should forward HTML attributes", () => {
    renderComponent({
      "aria-label": "loading",
      style: { width: "100px" },
    });

    const skeleton = screen.getByTestId("skeleton-test");
    expect(skeleton).toHaveAttribute("aria-label", "loading");
    expect(skeleton).toHaveStyle({ width: "100px" });
  });
});
