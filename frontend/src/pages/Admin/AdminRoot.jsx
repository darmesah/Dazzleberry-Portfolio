import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import { authActions } from "../../store/auth-slice";

const AdminRoot = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");

    if (!adminData) {
      dispatch(authActions.logout());
      return;
    }

    const adminDataValues = JSON.parse(adminData);

    // Check token duration
    const storedTokenExpirationTime = adminDataValues.expiration;
    const expirationDate = new Date(storedTokenExpirationTime);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    console.log(duration);

    if (duration < 0) {
      localStorage.removeItem("adminData");
      return;
    }

    dispatch(authActions.login(adminDataValues));
  }, [location, dispatch]);

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AdminRoot;
