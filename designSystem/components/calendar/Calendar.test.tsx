import { ComponentPropsWithRef } from "react";
import { DayPicker } from "react-day-picker";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/shared/utils";
import { Calendar } from "./Calendar";

// Mock DayPicker
vi.mock("react-day-picker", () => ({
  DayPicker: vi.fn(() => null),
}));

type CalendarPropsWithRef = ComponentPropsWithRef<typeof Calendar>;

const renderComponent = (props: Partial<CalendarPropsWithRef> = {}) => {
  return renderWithTheme(<Calendar {...props} />);
};

describe("Calendar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Snapshot Test
  it("should match snapshot with default props", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render DayPicker with default props", () => {
    renderComponent();

    expect(DayPicker).toHaveBeenCalledWith(
      expect.objectContaining({
        showOutsideDays: true,
        className: "p-3",
      }),
      expect.anything(),
    );
  });

  it("should merge custom className with default className", () => {
    renderComponent({ className: "custom-class" });

    expect(DayPicker).toHaveBeenCalledWith(
      expect.objectContaining({
        className: "p-3 custom-class",
      }),
      expect.anything(),
    );
  });

  it("should override showOutsideDays when provided", () => {
    renderComponent({ showOutsideDays: false });

    expect(DayPicker).toHaveBeenCalledWith(
      expect.objectContaining({
        showOutsideDays: false,
      }),
      expect.anything(),
    );
  });

  it("should pass correct classNames for default mode", () => {
    renderComponent();

    const dayPickerProps = vi.mocked(DayPicker).mock.calls[0][0];

    expect(dayPickerProps.classNames).toMatchObject({
      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
      caption: "flex justify-center pt-1 relative items-center",
      cell: expect.stringContaining("[&:has([aria-selected])]:rounded-md"),
    });
  });

  it("should modify cell className when mode is range", () => {
    renderComponent({ mode: "range" });

    const dayPickerProps = vi.mocked(DayPicker).mock.calls[0][0];

    expect(dayPickerProps.classNames?.cell).toContain("[&:has(>.day-range-end)]:rounded-r-md");
    expect(dayPickerProps.classNames?.cell).toContain("[&:has(>.day-range-start)]:rounded-l-md");
  });

  it("should merge custom classNames with default classNames", () => {
    const customClassNames = {
      months: "custom-months",
      caption: "custom-caption",
    };

    renderComponent({ classNames: customClassNames });

    const dayPickerProps = vi.mocked(DayPicker).mock.calls[0][0];

    expect(dayPickerProps.classNames?.months).toBe("custom-months");
    expect(dayPickerProps.classNames?.caption).toBe("custom-caption");
    expect(dayPickerProps.classNames?.table).toBe("w-full border-collapse space-y-1");
  });

  it("should pass through additional props to DayPicker", () => {
    const additionalProps = {
      disabled: true,
      fromDate: new Date(),
      toDate: new Date(),
    };

    renderComponent(additionalProps);

    expect(DayPicker).toHaveBeenCalledWith(expect.objectContaining(additionalProps), expect.anything());
  });
});
