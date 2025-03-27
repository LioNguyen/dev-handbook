import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IToastMessage, TOAST_TYPE } from "@/domains/global";
import { renderWithTheme } from "@/shared/utils";
import Toast, { IToastProps, TOAST_DURATION } from "./Toast";

const mockCloseToast = vi.fn();

const defaultProps: IToastProps = {
  toasts: [],
  closeToast: mockCloseToast,
};

// Helper function to render Toast with mocked data
const renderToast = (toasts: Partial<IToastMessage>[]) => {
  const toastProps = toasts.map((toast, index) => ({
    id: `toast-${index}`,
    type: TOAST_TYPE.success,
    message: "Default message",
    showIcon: true,
    ...toast,
  })) as IToastMessage[];

  return renderWithTheme(<Toast {...defaultProps} toasts={toastProps} />);
};

// Helper to get toast element by message
const getToastByMessage = (message: string) => {
  return screen.getByText(message).closest('[data-testid="toast-test"]');
};

describe("Toast Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    // Snapshot Tests
    it("should match snapshot", () => {
      const { container } = renderToast([]);
      expect(container).toMatchSnapshot();
    });

    it("should not render any toasts when empty", () => {
      renderToast([]);

      expect(screen.queryByTestId("toast-test")).not.toBeInTheDocument();
    });

    it("should render toast with empty message", () => {
      renderToast([{ message: "" }]);

      const toast = screen.getByTestId("toast-test");
      expect(toast).toBeInTheDocument();
    });

    it("should render toast correctly", () => {
      const toastId = "test-id";
      renderToast([{ id: toastId, message: "First toast" }]);

      expect(screen.getByText("First toast")).toBeInTheDocument();
      expect(screen.getByText("First toast").closest(`#toast-${toastId}`)).toBeInTheDocument();
    });

    it("should render multiple toasts", () => {
      renderToast([{ message: "First toast" }, { message: "Second toast" }]);

      expect(screen.getByText("First toast")).toBeInTheDocument();
      expect(screen.getByText("Second toast")).toBeInTheDocument();
    });
  });

  describe("Toast Types and Styling", () => {
    it.each([
      [TOAST_TYPE.success, "bg-primary"],
      [TOAST_TYPE.error, "bg-red-500"],
      [TOAST_TYPE.warning, "bg-yellow-200"],
      [TOAST_TYPE.info, "bg-blue-500"],
    ])("should render %s toast with correct styling", (type, expectedClass) => {
      renderToast([{ type, message: `${type} toast` }]);

      const toast = getToastByMessage(`${type} toast`);
      expect(toast).toHaveClass(expectedClass);
    });
  });

  describe("Icon Display", () => {
    it.each([
      [TOAST_TYPE.success, "CheckCircle"],
      [TOAST_TYPE.error, "XCircle"],
      [TOAST_TYPE.warning, "AlertTriangle"],
      [TOAST_TYPE.info, "Info"],
    ])("should render correct icon for %s toast", (type, iconName) => {
      renderToast([{ type, message: "Test toast" }]);

      const icon = document.querySelector(`[data-testid="${iconName}-icon"]`);
      expect(icon).toBeInTheDocument();
    });

    it("should not render icon when showIcon is false", () => {
      renderToast([
        {
          type: TOAST_TYPE.success,
          message: "No icon toast",
          showIcon: false,
        },
      ]);

      const toast = getToastByMessage("No icon toast");
      expect(toast?.querySelector('[data-testid$="-icon"]')).not.toBeInTheDocument();
    });
  });

  describe("Close Button", () => {
    it("should render close button for each toast", () => {
      renderToast([{ message: "First toast" }, { message: "Second toast" }]);

      const closeButtons = screen.getAllByTestId("close-button-test");
      expect(closeButtons).toHaveLength(2);
    });

    it("should handle close button click", async () => {
      const toastId = "test-id";
      renderToast([{ id: toastId, message: "Closing toast" }]);

      const closeButton = screen.getByTestId("close-button-test");
      await userEvent.click(closeButton);

      await waitFor(
        () => {
          expect(mockCloseToast).toHaveBeenCalledWith(toastId);
        },
        { timeout: TOAST_DURATION + 100 },
      );
    });
  });

  describe("Animation Behavior", () => {
    it("should have entry animation classes by default", () => {
      renderToast([{ message: "Animated toast" }]);

      const toast = getToastByMessage("Animated toast");
      expect(toast).toHaveClass("animate-slide-in-right");
    });

    it("should apply exit animation classes when closing", async () => {
      renderToast([{ message: "Closing toast" }]);

      const closeButton = screen.getByTestId("close-button-test");
      await userEvent.click(closeButton);

      const toast = getToastByMessage("Closing toast");
      expect(toast).toHaveClass("opacity-0", "translate-x-full");
    });

    it("should remove toast after animation completes", async () => {
      renderToast([{ message: "Disappearing toast" }]);

      const closeButton = screen.getByTestId("close-button-test");
      await userEvent.click(closeButton);

      await waitFor(
        () => {
          expect(mockCloseToast).toHaveBeenCalled();
        },
        { timeout: TOAST_DURATION + 100 },
      );
    });
  });
});
