import { useUser } from "@/domains/user";
import { useAppLocation } from "@/shared/hooks/useAppLocation";

function useAppPermission() {
  const { useGetUserPermissions } = useUser();
  const { accessibleRoutes } = useGetUserPermissions();
  const { location } = useAppLocation();

  const isRouteAuthorized = accessibleRoutes.find(route => location.pathname.includes(route));

  return {
    accessibleRoutes,
    currentPath: location.pathname,
    isRouteAuthorized,
  };
}

export { useAppPermission };
