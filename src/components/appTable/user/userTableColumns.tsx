import { Column, ColumnDef } from "@tanstack/react-table";

import { AppTableCell, AppTableHeader, UserTableActionsMenu } from "@/components/appTable";
import { IUserItem } from "@/domains/user";
import { ISortDirection } from "@/shared/hooks/useTable";
import { i18n } from "@/shared/locale";
import { Badge, BadgeProps } from "@designSystem/components/badge";

const formatTitle = ({
  title,
  column,
  sortState,
  onSort,
}: {
  title: string;
  column?: Column<any>;
  sortState?: Array<{ id: string; desc: boolean }>;
  onSort?: (direction: ISortDirection | null) => void;
}) => {
  return (
    <AppTableHeader
      title={title}
      column={column}
      sortDirection={column && sortState ? sortState.find(sort => sort.id === column.id) : undefined}
      onSort={onSort}
    />
  );
};

const formatValue = (value: any, type?: string) => {
  if (value === null || value === undefined) return "-";

  if (type === "badge") {
    return <Badge variant={value as BadgeProps["variant"]}>{i18n.t(`status.${value}`)}</Badge>;
  }

  return <AppTableCell value={value} />;
};

interface IUserColumnsProps {
  columnWidth?: number;
  onUpdateUser: (item: IUserItem) => void;
  sortState: Array<{ id: string; desc: boolean }>;
  onSort: (direction: ISortDirection | null) => void;
}

const getUserColumns = ({
  columnWidth,
  onUpdateUser,
  sortState,
  onSort,
}: IUserColumnsProps): ColumnDef<IUserItem>[] => [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <div className="px-2">
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
  //         onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     </div>
  //   ),
  //   cell: ({ row }) => (
  //     <div className="px-2">
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={value => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  //   meta: {
  //     width: 50,
  //   },
  // },
  {
    accessorKey: "email",
    header: () => formatTitle({ title: i18n.t("key.email", { ns: "user" }) }),
    cell: ({ getValue }) => formatValue(getValue()),
    meta: {
      width: columnWidth,
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) =>
      formatTitle({
        title: i18n.t("key.username", { ns: "user" }),
        column,
      }),
    cell: ({ getValue }) => formatValue(getValue()),
    meta: {
      width: columnWidth,
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) =>
      formatTitle({
        title: i18n.t("key.role", { ns: "user" }),
        column,
        sortState,
        onSort,
      }),
    cell: ({ getValue }) => formatValue(i18n.t(`role.${getValue()}`, { ns: "user" })),
    meta: {
      width: columnWidth,
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) =>
      formatTitle({
        title: i18n.t("key.department", { ns: "user" }),
        column,
        sortState,
        onSort,
      }),
    cell: ({ getValue }) => formatValue(getValue()),
    meta: {
      width: columnWidth,
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) =>
      formatTitle({
        title: i18n.t("key.status", { ns: "user" }),
        column,
        sortState,
        onSort,
      }),
    cell: ({ getValue }) => formatValue(getValue(), "badge"),
    meta: {
      label: i18n.t("key.status", { ns: "user" }),
      width: columnWidth,
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <UserTableActionsMenu user={user} onEdit={() => onUpdateUser(user)} />;
    },
    meta: {
      width: 50,
    },
  },
];

export { getUserColumns };
export type { IUserColumnsProps };
