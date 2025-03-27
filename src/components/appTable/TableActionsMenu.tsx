import { MoreHorizontal } from "lucide-react";
import { type FC, memo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@designSystem/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@designSystem/components/dropdownMenu";

interface ITableActionsMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editDisabled?: boolean;
  deleteDisabled?: boolean;
  label?: string;
  children?: ReactNode;
  trigger?: ReactNode;
}

const TableActionsMenu: FC<ITableActionsMenuProps> = ({
  onView,
  onEdit,
  onDelete,
  editDisabled = false,
  deleteDisabled = false,
  children,
  trigger,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
          {trigger || (
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">{t("table.open_menu")}</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onView && (
            <DropdownMenuItem
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onView();
              }}
              disabled={editDisabled}
            >
              {t("table.view")}
            </DropdownMenuItem>
          )}
          {onEdit && (
            <DropdownMenuItem
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onEdit();
              }}
              disabled={editDisabled}
            >
              {t("table.edit")}
            </DropdownMenuItem>
          )}
          {onDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete();
                }}
                disabled={deleteDisabled}
                className="text-error focus:text-error"
              >
                {t("table.delete")}
              </DropdownMenuItem>
            </>
          )}
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default memo(TableActionsMenu);
export type { ITableActionsMenuProps };
