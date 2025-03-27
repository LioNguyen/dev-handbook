import { Lock } from "lucide-react";
import { type FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { IComponentBase } from "@/shared/types";
import { cn } from "@/shared/utils";
import { Text } from "@designSystem/components/text";

interface INoPermissionStateProps extends IComponentBase {}

const NoPermissionState: FC<INoPermissionStateProps> = ({ className, ...restProps }) => {
  const { t } = useTranslation();

  return (
    <div
      data-testid="no-permission-state-test"
      className={cn(
        "no-permission-state flex flex-col items-center justify-center gap-4 h-full min-h-[400px] p-6 text-center",
        className,
      )}
      {...restProps}
    >
      <div>
        <Lock className="w-16 h-16 text-text-muted-foreground" strokeWidth={1.5} />
      </div>

      <Text variant="heading-1">{t("noPermission.title")}</Text>

      <Text variant="description" className="max-w-md">
        {t("noPermission.description")}
      </Text>
    </div>
  );
};

export default memo(NoPermissionState);
export type { INoPermissionStateProps };
