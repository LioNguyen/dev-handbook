import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

import { ICON } from "@/shared/constants";
import { IComponentBase } from "@/shared/types";
import { cn } from "@/shared/utils";
import { Image } from "@designSystem/components/image";
import { Text } from "@designSystem/components/text";

interface IAuthLayoutProps extends IComponentBase {
  className?: string;
}

const AuthLayout: FC<IAuthLayoutProps> = ({ className, ...restProps }) => {
  const { t } = useTranslation();

  return (
    <div
      id="auth-layout"
      data-testid="auth-layout-test"
      className={cn(
        "auth-layout",
        "w-full min-h-screen flex flex-col",
        // Desktop styles
        "lg:grid lg:grid-cols-2 lg:max-w-none",
        className,
      )}
      {...restProps}
    >
      {/* Logo Section - Hidden on mobile, shown on desktop */}
      <div
        data-testid="logo-section-test"
        className="bg-background-secondary hidden lg:flex flex-col justify-center items-center gap-4 bg-light-black-200 p-6 text-white relative h-full"
      >
        <Image
          className="logo w-full max-w-[200px]"
          src={ICON.logoNameDark}
          alt="logo"
          imgProps={{ className: "w-full h-auto" }}
        />
        <Text as="h1" variant="heading-1" className="text-white">
          {t("title")}
        </Text>
      </div>

      {/* Form Section */}
      <div className="flex-1 px-4 py-8 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default memo(AuthLayout);
export type { IAuthLayoutProps };
