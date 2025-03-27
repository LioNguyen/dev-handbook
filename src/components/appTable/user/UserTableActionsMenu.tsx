import { Loader, MoreHorizontal } from "lucide-react";
import { type FC, memo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { useUser } from "@/domains/user";
import { Button } from "@designSystem/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@designSystem/components/dropdownMenu";

interface IUser {
  id: number;
  status: string;
}

interface IUserTableActionsMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editDisabled?: boolean;
  deleteDisabled?: boolean;
  children?: ReactNode;
  trigger?: ReactNode;
  user?: IUser;
}

const UserTableActionsMenu: FC<IUserTableActionsMenuProps> = ({
  onView,
  onEdit,
  onDelete,
  editDisabled = false,
  deleteDisabled = false,
  children,
  trigger,
  user,
}) => {
  const { t } = useTranslation();
  const { useActiveUser, useDeactiveUser } = useUser();
  const { mutate: activeUser, isPending: isActiveUserPending } = useActiveUser();
  const { mutate: deactiveUser, isPending: isDeactiveUserPending } = useDeactiveUser();

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
              {t("table.edit", { ns: "user" })}
            </DropdownMenuItem>
          )}

          {/* User Action Menu */}
          {user && user.status === "inactive" && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                activeUser(user.id);
              }}
              disabled={isActiveUserPending}
            >
              <div className="flex items-center gap-2">
                {t("table.active", { ns: "user" })}
                {isActiveUserPending && <Loader className="h-4 w-4 animate-spin" />}
              </div>
            </DropdownMenuItem>
          )}
          {user && user.status === "active" && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                deactiveUser(user.id);
              }}
              disabled={isDeactiveUserPending}
            >
              <div className="flex items-center gap-2">
                {t("table.deactive", { ns: "user" })}
                {isDeactiveUserPending && <Loader className="h-4 w-4 animate-spin" />}
              </div>
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

export default memo(UserTableActionsMenu);
export type { IUserTableActionsMenuProps };
