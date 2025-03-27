import { fireEvent, screen } from "@testing-library/react";
import { ComponentPropsWithRef } from "react";
import { vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import Avatar from "./Avatar";

type AvatarPropsWithRef = ComponentPropsWithRef<typeof Avatar>;

const defaultProps = {
  name: "License Manager",
  src: "./avatar.jpg",
};

const renderComponent = (props: Partial<AvatarPropsWithRef>) => {
  return renderWithTheme(<Avatar {...defaultProps} {...props} />);
};

describe("Avatar test suite", () => {
  // Snapshot Tests
  it("should match snapshot with default props", () => {
    const { container } = renderComponent({});
    expect(container).toMatchSnapshot();
  });

  it("should render correctly", () => {
    renderComponent({});
    const avatar = screen.getByTestId("avatar-test");
    expect(avatar).toBeInTheDocument();
  });

  it("should render class correctly", () => {
    const className = "custom-class";
    renderComponent({ className });

    const avatar = screen.getByTestId("avatar-test");
    expect(avatar).toHaveClass("avatar");
    expect(avatar).toHaveClass(
      "relative flex items-center justify-center rounded-full bg-background-secondary overflow-hidden",
    );
    expect(avatar).not.toHaveClass("cursor-pointer");
    expect(avatar).toHaveClass(className);
  });

  it("should show first character for single word name", () => {
    renderComponent({ name: "Admin" });
    const char = screen.getByText("A");
    expect(char).toBeInTheDocument();
    expect(char).toHaveClass("block");
  });

  it("should show first two characters for multi-word name", () => {
    renderComponent({ name: "License Manager" });
    const chars = screen.getByText("LM");
    expect(chars).toBeInTheDocument();
    expect(chars).toHaveClass("block");
  });

  it("should show image when src is provided and image loads successfully", () => {
    renderComponent({});
    const img = screen.getByAltText(defaultProps.name);

    fireEvent.load(img);

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", defaultProps.src);
    expect(screen.queryByText("LM")).toHaveClass("hidden");
  });

  it("should show name fallback when src is not provided", () => {
    renderComponent({ src: "" });

    const chars = screen.getByText("LM");
    expect(chars).toBeInTheDocument();
    expect(screen.queryByRole("img")).toHaveClass("hidden");
  });

  it("should render size correctly", () => {
    const size = 60;
    renderComponent({ size });

    const avatar = screen.getByTestId("avatar-test");
    expect(avatar).toHaveStyle({ width: `${size}px`, height: `${size}px` });
  });

  it("should handle onClick correctly", () => {
    const onClick = vi.fn();
    renderComponent({ onClick });

    const avatar = screen.getByTestId("avatar-test");
    fireEvent.click(avatar);

    expect(avatar).toHaveClass("cursor-pointer");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should render imgProps correctly when image is shown", () => {
    const imgProps = {
      className: "custom-img-class",
    };
    renderComponent({ imgProps });

    const img = screen.getByAltText(defaultProps.name);
    fireEvent.load(img);

    expect(img).toHaveClass(imgProps.className);
  });
});
