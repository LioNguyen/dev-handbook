import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { useAuth } from "@/domains/auth";
import { useGlobal } from "@/domains/global";
import { ICON, NAV_ITEMS } from "@/shared/constants";
import { useAppPermission } from "@/shared/hooks/useAppPermission";
import { cn } from "@/shared/utils";
import { Button } from "@designSystem/components/button";
import { Image } from "@designSystem/components/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@designSystem/components/sidebar";
import { Text } from "@designSystem/components/text";

function AppSidebar() {
  const { t } = useTranslation();

  const { useLogout } = useAuth();
  const { mutate: logout, isPending } = useLogout();

  const { closeAllModals, closeAllSheets } = useGlobal();
  const location = useLocation();
  const { open } = useSidebar();

  const { accessibleRoutes } = useAppPermission();

  const PERMISSIBLE_NAV_ITEMS = useMemo(() => {
    return NAV_ITEMS.filter(item => accessibleRoutes.includes(item.id));
  }, [accessibleRoutes]);

  const handleNavigate = () => {
    closeAllModals();
    closeAllSheets();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar id="sidebar" className="shadow-lg" collapsible="icon">
      <SidebarHeader className="h-[60px] justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="cursor-auto justify-center active:bg-unset hover:bg-unset hover:font-normal">
              <Image className="min-w-[18px]" src={ICON.logoLight} />
              <Text
                as="span"
                className={cn("text-sm 3xl:text-xl text-primary block lg:hidden xl:block", !open && "xl:hidden")}
              >
                {t("title")}
              </Text>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3 py-6">
              {PERMISSIBLE_NAV_ITEMS.map(item => {
                const isActive = location.pathname.includes(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={t(item.title)} isActive={isActive}>
                      <Link
                        className="flex items-center gap-4 text-text-menu h-[40px] 3xl:h-[50px] w-full"
                        to={item.url}
                        onClick={handleNavigate}
                      >
                        <Image
                          icon={item.icon}
                          className={cn(isActive ? "text-black" : "text-text-menu group-hover/menu-item:text-black")}
                        />
                        <span className="text-sm 3xl:text-base">{t(item.title)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild tooltip="Logout">
          <Button
            variant="secondary"
            className="bg-button-tertiary 3xl:h-[50px] text-white justify-start p-2 text-base hover:bg-button-tertiary hover:text-white"
            isLoading={isPending}
            onClick={handleLogout}
          >
            <Image src={ICON.logout} size={24} className="min-w-[24px]" />
            {t("logout", { ns: "auth" })}
          </Button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
