import { fireEvent, screen } from "@testing-library/react";
import { ComponentPropsWithRef } from "react";
import { vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import Image from "./Image";

type ImagePropsWithRef = ComponentPropsWithRef<typeof Image>;

const defaultProps = {
  src: "./logo-path.svg",
  alt: "logo",
};

const renderComponent = (props: Partial<ImagePropsWithRef>) => {
  return renderWithTheme(<Image {...defaultProps} {...props} />);
};

describe("Image test suite", () => {
  // Snapshot Tests
  it("should match snapshot with default props", () => {
    const { container } = renderComponent({});
    expect(container).toMatchSnapshot();
  });

  it("should render correctly", () => {
    renderComponent({});

    const img = screen.getByAltText(defaultProps.alt);
    expect(img).toBeInTheDocument();
    expect(img.closest("div")).toBeInTheDocument();
    expect(img.closest("div")).toBeInTheDocument();
  });

  it("should render class correctly", () => {
    const className = "custom-class";
    renderComponent({ className });

    const img = screen.getByAltText("logo");
    expect(img.closest("div")).toHaveClass("image");
    expect(img.closest("div")).toHaveClass(className);
  });

  it("should render src correctly", async () => {
    const src = "custom-src";
    renderComponent({ src });

    const img = screen.getByAltText(defaultProps.alt);

    // Trigger load event
    fireEvent.load(img);

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", src);
    expect(img).toHaveClass("block");
    expect(img).not.toHaveClass("hidden");
  });

  it("should render no image when src is error -> onLoad not run", () => {
    const src = "";
    renderComponent({ src });

    const img = screen.queryByAltText(defaultProps.alt);

    expect(img).toBeNull();
  });

  it("should render alt correctly when alt prop is falsy", () => {
    const alt = "";
    const src = "src-test";
    renderComponent({ alt, src });

    const img = screen.getByAltText(src);
    expect(img).toHaveAttribute("alt", src);
  });

  it("should render size correctly", () => {
    const size = "25px";
    renderComponent({ size });

    const img = screen.getByAltText(defaultProps.alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("width", size);
    expect(img).toHaveAttribute("height", size);
  });

  it("should handle onClick correctly", () => {
    const onClick = vi.fn();
    renderComponent({ onClick });

    const image = screen.getByTestId("image-test");
    fireEvent.click(image);

    expect(image).toHaveClass("cursor-pointer");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should render imgProps correctly", () => {
    const imgProps = {
      className: "w-full",
    };
    renderComponent({ imgProps });

    const img = screen.getByAltText(defaultProps.alt);
    expect(img).toHaveClass(imgProps.className);
  });
});
