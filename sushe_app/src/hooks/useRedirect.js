import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function useRedirect(path, condition) {
  const navigate = useNavigate();
  useEffect(() => {
    if (condition) {
      navigate(path);
    }
  }, [navigate, condition]);
}
