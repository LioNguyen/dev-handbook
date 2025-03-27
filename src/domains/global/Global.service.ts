import { IGlobalActions, IShowToastParams } from "./Global.types";

class GlobalService {
  private static handlers: Partial<IGlobalActions> = {};

  static setHandlers(actions: Partial<IGlobalActions>) {
    this.handlers = actions;
  }

  static closeAllModals() {
    this.handlers.closeAllModals?.();
  }

  static closeAllSheets() {
    this.handlers.closeAllModals?.();
  }

  static showToast(params: IShowToastParams) {
    this.handlers.showToast?.(params);
  }

  static showLoader() {
    this.handlers.showLoader?.();
  }

  static hideLoader() {
    this.handlers.hideLoader?.();
  }
}

export { GlobalService };
