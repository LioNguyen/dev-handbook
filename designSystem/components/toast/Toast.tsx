import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { useState } from "react";

import { IToastMessage, TOAST_TYPE, TToastTypeValue } from "@/domains/global";
import { TOAST_DURATION } from "@/shared/constants";

interface IToastProps {
  toasts: IToastMessage[];
  closeToast: (id: string) => void;
  duration?: number;
}

const Toast = ({ toasts, closeToast }: IToastProps) => {
  const [exitingToasts, setExitingToasts] = useState<string[]>([]);

  // Handle close toast with animation
  const handleClose = (id: string, duration: number = TOAST_DURATION) => {
    // Add toast into trigger exit animation list
    setExitingToasts(prev => [...prev, id]);

    // Wait animation complete before remove toast
    setTimeout(() => {
      closeToast(id);
      // Remove toast from list
      setExitingToasts(prev => prev.filter(toastId => toastId !== id));
    }, duration);
  };

  // Icon Component for toast
  const ToastIcon = ({ toast }: { toast: IToastMessage }) => {
    if (toast.showIcon === false) return null;

    const iconProps = {
      className: "shrink-0",
      size: 20,
    };

    switch (toast.type) {
      case TOAST_TYPE.success:
        return <CheckCircle data-testid="CheckCircle-icon" {...iconProps} />;
      case TOAST_TYPE.error:
        return <XCircle data-testid="XCircle-icon" {...iconProps} />;
      case TOAST_TYPE.warning:
        return <AlertTriangle data-testid="AlertTriangle-icon" {...iconProps} />;
      case TOAST_TYPE.info:
        return <Info data-testid="Info-icon" {...iconProps} />;
    }
  };

  // Style classes dựa trên type của toast
  const getTypeStyles = (type: TToastTypeValue): string => {
    switch (type) {
      case TOAST_TYPE.success:
        return "bg-primary text-white";
      case TOAST_TYPE.error:
        return "bg-red-500 text-white";
      case TOAST_TYPE.warning:
        return "bg-yellow-200 text-text";
      case TOAST_TYPE.info:
        return "bg-blue-500 text-white";
    }
  };

  // Classes cho animation
  const getAnimationClasses = (toastId: string, duration: number = TOAST_DURATION): string => {
    const isExiting = exitingToasts.includes(toastId);

    const baseClasses = [
      // Base transition settings
      "transform",
      `transition-all duration-${duration} ease-in-out`,

      // Entry animation (slide from right)
      "animate-slide-in-right",

      // Container styles
      "rounded-lg p-4 shadow-lg",
      "min-w-[300px] max-w-[400px]",
    ];

    // Exit animation classes
    const animationClasses = isExiting
      ? "opacity-0 translate-x-full" // Fade out + slide right
      : "opacity-100 translate-x-0"; // Normal state

    return [...baseClasses, animationClasses].join(" ");
  };

  return (
    // Container cho tất cả toasts
    <div className="fixed top-4 right-4 z-60 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          data-testid="toast-test"
          id={`toast-${toast.id}`}
          key={toast.id}
          className={`
            ${getAnimationClasses(toast.id, toast?.duration)}
            ${getTypeStyles(toast.type)}
          `}
        >
          {/* Toast content */}
          <div className="flex items-center gap-3">
            <ToastIcon toast={toast} />

            {/* Message */}
            <div className="flex-1 text-sm break-words">{toast.message}</div>

            {/* Close button */}
            <button
              data-testid="close-button-test"
              onClick={() => handleClose(toast.id, toast?.duration)}
              className="shrink-0 rounded-full p-1 transition-colors duration-200
                hover:bg-black/10 focus:bg-black/10 focus:outline-hidden"
            >
              <XCircle size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
export { TOAST_DURATION };
export type { IToastProps };
