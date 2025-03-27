import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import ModalContainer from "@/components/appModal/ModalContainer";
import { SheetContainer } from "@/components/appSheet";
import { createContext } from "@/shared/utils";
import { Loader } from "@designSystem/components/loader";
import { Toast, TOAST_DURATION } from "@designSystem/components/toast";
import { GlobalService } from "./Global.service";
import {
  IGlobalStore,
  IOpenModalParams,
  IOpenSheetParams,
  IShowToastParams,
  IToastMessage,
  TGlobalContextValue,
} from "./Global.types";

const initialStore: IGlobalStore = {
  toasts: [],
  isLoading: false,
  modals: {
    instances: {},
    activeModals: [],
  },
  sheets: {
    instances: {},
    activeSheets: [],
  },
};

// Create context with custom utility
const [Provider, useGlobal] = createContext<TGlobalContextValue>();

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<IGlobalStore>(initialStore);

  // START: Toast handler
  const showToast = useCallback(({ type, message, duration = TOAST_DURATION, showIcon = true }: IShowToastParams) => {
    const id = Date.now().toString();
    const newToast: IToastMessage = {
      id,
      type,
      message,
      showIcon,
      duration,
    };

    setStore(prev => ({
      ...prev,
      toasts: [...prev.toasts, newToast],
    }));

    setTimeout(() => {
      closeToast(id);
    }, duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeToast = useCallback((id: string) => {
    setStore(prev => ({
      ...prev,
      toasts: prev.toasts.filter(toast => toast.id !== id),
    }));
  }, []);
  // END: Toast handler

  // START: Loader handler
  const showLoader = useCallback(() => {
    setStore(prev => ({ ...prev, isLoading: true }));
  }, []);

  const hideLoader = useCallback(() => {
    setStore(prev => ({ ...prev, isLoading: false }));
  }, []);
  // END: Loader handler

  // START: Modal handlers
  const openModal = useCallback(({ name, ...config }: IOpenModalParams) => {
    setStore(prev => {
      const activeModals = [...prev.modals.activeModals];

      if (!activeModals.includes(name)) {
        activeModals.push(name);
      }

      return {
        ...prev,
        modals: {
          instances: {
            ...prev.modals.instances,
            [name]: {
              ...config,
              isOpen: true,
            },
          },
          activeModals,
        },
      };
    });
  }, []);

  const closeModal = useCallback((name: string) => {
    setStore(prev => {
      const activeModals = prev.modals.activeModals.filter(modal => modal !== name);
      const instances = { ...prev.modals.instances };

      if (instances[name]) {
        instances[name] = {
          ...instances[name],
          isOpen: false,
        };
      }

      return {
        ...prev,
        modals: {
          instances,
          activeModals,
        },
      };
    });

    // Clean up after animation
    setTimeout(() => {
      setStore(prev => {
        const instances = { ...prev.modals.instances };
        delete instances[name];

        return {
          ...prev,
          modals: {
            ...prev.modals,
            instances,
          },
        };
      });
    }, 200);
  }, []);

  const closeAllModals = useCallback(() => {
    setStore(prev => ({
      ...prev,
      modals: {
        instances: Object.keys(prev.modals.instances).reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              ...prev.modals.instances[key],
              isOpen: false,
            },
          }),
          {},
        ),
        activeModals: [],
      },
    }));
  }, []);
  // END: Modal handlers

  // START: Sheet handlers
  const openSheet = useCallback(({ name, ...config }: IOpenSheetParams) => {
    setStore(prev => {
      const activeSheets = [...prev.sheets.activeSheets];
      const sheetExists = name in prev.sheets.instances;

      if (!activeSheets.includes(name)) {
        activeSheets.push(name);
      }

      // Update all existing sheets to increase their order by 1
      const updatedInstances = Object.entries(prev.sheets.instances).reduce(
        (acc, [key, sheet]) => ({
          ...acc,
          [key]: {
            ...sheet,
            order: sheetExists ? sheet.order : sheet.order + 1,
          },
        }),
        {},
      );

      return {
        ...prev,
        sheets: {
          instances: {
            ...updatedInstances,
            [name]: {
              ...config,
              isOpen: true,
              order: 0, // New sheet always gets order 0
            },
          },
          activeSheets,
        },
      };
    });
  }, []);

  const closeSheet = useCallback((name: string) => {
    setStore(prev => {
      const closedSheetOrder = prev.sheets.instances[name]?.order || 0;
      const activeSheets = prev.sheets.activeSheets.filter(sheet => sheet !== name);
      const instances = { ...prev.sheets.instances };

      // Decrease order for sheets that were after the closed sheet
      Object.keys(instances).forEach(sheetName => {
        if (instances[sheetName].order > closedSheetOrder) {
          instances[sheetName] = {
            ...instances[sheetName],
            order: instances[sheetName].order - 1,
          };
        }
      });

      if (instances[name]) {
        instances[name] = {
          ...instances[name],
          isOpen: false,
        };
      }

      return {
        ...prev,
        sheets: {
          instances,
          activeSheets,
        },
      };
    });

    setTimeout(() => {
      setStore(prev => {
        const activeSheets = prev.sheets.activeSheets.filter(sheet => sheet !== name);
        const instances = { ...prev.sheets.instances };

        if (instances[name]) {
          delete instances[name];
        }

        return {
          ...prev,
          sheets: {
            instances,
            activeSheets,
          },
        };
      });
    }, 200);
  }, []);

  const closeAllSheets = useCallback(() => {
    setStore(prev => ({
      ...prev,
      sheets: {
        instances: Object.keys(prev.sheets.instances).reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              ...prev.sheets.instances[key],
              isOpen: false,
            },
          }),
          {},
        ),
        activeSheets: [],
      },
    }));
  }, []);
  // END: Sheet handlers

  // Register handlers with service
  useEffect(() => {
    const handlers = { closeAllModals, closeAllSheets, showToast, closeToast, showLoader, hideLoader };

    GlobalService.setHandlers(handlers);
  }, [closeAllModals, closeAllSheets, showToast, closeToast, showLoader, hideLoader]);

  const contextValue: TGlobalContextValue = useMemo(
    () => ({
      ...store,
      showToast,
      closeToast,
      showLoader,
      hideLoader,

      // Modal
      openModal,
      closeModal,
      closeAllModals,

      // Sheet
      openSheet,
      closeSheet,
      closeAllSheets,
    }),
    [
      store,
      showToast,
      closeToast,
      showLoader,
      hideLoader,
      openModal,
      closeModal,
      closeAllModals,
      openSheet,
      closeSheet,
      closeAllSheets,
    ],
  );

  return (
    <Provider value={contextValue}>
      <Loader isLoading={store.isLoading} />
      <Toast toasts={store.toasts} closeToast={closeToast} />
      <ModalContainer />
      <SheetContainer />

      {children}
    </Provider>
  );
};

export { GlobalProvider, useGlobal };
