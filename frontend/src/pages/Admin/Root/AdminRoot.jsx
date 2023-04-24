import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import logo from "./components/images/logo.png";

import { authActions } from "../../../store/auth-slice";

import SideBar from "./components/SideBar/SideBar";

import classes from "./components/AdminRoot.module.css";

const AdminRoot = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/admin/login");
      localStorage.removeItem("adminData");
      return;
    }

    dispatch(authActions.login(adminDataValues.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, dispatch]);

  return (
    <>
      <div className={classes.mobile}>
        <img src={logo} alt="logo" />
        <h1>Kindly open in desktop</h1>
      </div>
      <main className={classes.container}>
        <SideBar />
        <div className={classes.main}>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AdminRoot;
