import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const useAppLocation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (location.pathname !== "/" && location.pathname.endsWith("/")) {
      const newPath = location.pathname.slice(0, -1);
      navigate(newPath, { replace: true });
    }
  }, [location.pathname, navigate]);

  return { location, navigate, params };
};

export { useAppLocation };
