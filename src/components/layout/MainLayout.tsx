import { type FC, memo } from "react";

import { useAppLocation } from "@/shared/hooks/useAppLocation";

interface IMainLayoutProps {}

const MainLayout: FC<IMainLayoutProps> = () => {
  // Page hooks
  useAppLocation();
  return <main className="w-full overflow-hidden">Main Layout</main>;
};

export default memo(MainLayout);
export type { IMainLayoutProps };
