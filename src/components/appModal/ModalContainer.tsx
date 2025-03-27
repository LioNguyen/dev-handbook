import { memo } from "react";

import { useGlobal } from "@/domains/global";

const ModalContainer = () => {
  const { modals } = useGlobal();
  const { instances } = modals;

  // Modal component will be placed in here, use MODAL_NAME as key
  const MODAL_COMPONENTS: Record<string, React.FC<any>> = {
    // ... add other modals
  };

  return (
    <>
      {Object.keys(instances).map(name => {
        const modal = instances[name];
        if (!modal) return null;

        const ModalComponent = MODAL_COMPONENTS[name];
        if (!ModalComponent) return null;

        return <ModalComponent key={name} open={modal.isOpen} {...modal} />;
      })}
    </>
  );
};

export default memo(ModalContainer);
