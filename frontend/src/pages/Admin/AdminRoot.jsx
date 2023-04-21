import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

    dispatch(authActions.login(adminDataValues.token));
  }, [location, dispatch]);

  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <main>
      {isAuth && (
        <button onClick={() => dispatch(authActions.logout())}>Logout</button>
      )}
      <Outlet />
    </main>
  );
};

export default AdminRoot;
