import { useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return { user, isAuthenticated };
};


// The file is added by me < if you deleted this file then change your dashboard.jsx old code.