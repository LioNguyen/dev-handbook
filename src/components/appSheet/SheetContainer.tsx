import { type FC, memo } from "react";

import { useGlobal } from "@/domains/global";

interface ISheetContainerProps {}

const SheetContainer: FC<ISheetContainerProps> = () => {
  const { sheets } = useGlobal();
  const { instances } = sheets;

  // Sheet component will be placed in here, use SHEET_NAME as key
  const SHEET_COMPONENTS: Record<string, React.FC<any>> = {
    // ... add other sheets
  };

  return (
    <>
      {Object.keys(instances).map(name => {
        const sheet = instances[name];
        if (!sheet) return null;

        const SheetComponent = SHEET_COMPONENTS[name];
        if (!SheetComponent) return null;

        return <SheetComponent key={name} open={sheet.isOpen} {...sheet} />;
      })}
    </>
  );
};

export default memo(SheetContainer);
export type { ISheetContainerProps };
