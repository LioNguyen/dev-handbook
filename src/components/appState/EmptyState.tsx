import { FolderSearch, type LucideIcon } from "lucide-react";
import { type FC, memo } from "react";

import { IComponentBase } from "@/shared/types";
import { cn } from "@/shared/utils";
import { Text } from "@designSystem/components/text";

interface IEmptyStateProps extends IComponentBase {
  icon?: LucideIcon;
  iconSize?: number;
  iconClassName?: string;
  title?: string;
  description?: string;
}

const EmptyState: FC<IEmptyStateProps> = ({
  icon: Icon = FolderSearch,
  iconSize = 48,
  iconClassName,
  title,
  description,
  className,
  ...restProps
}) => {
  return (
    <div
      data-testid="empty-state"
      className={cn(
        "empty-state flex flex-col items-center justify-center gap-4 h-full w-full p-6 text-center",
        className,
      )}
      {...restProps}
    >
      <div>
        <Icon className={cn("text-text-muted-foreground/50", iconClassName)} size={iconSize} strokeWidth={1.5} />
      </div>

      {title && <Text variant="heading-1">{title}</Text>}

      {description && (
        <Text variant="description" className="max-w-md">
          {description}
        </Text>
      )}
    </div>
  );
};

export default memo(EmptyState);
export type { IEmptyStateProps };
