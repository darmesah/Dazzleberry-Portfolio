import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authActions } from "../../../../../store/auth-slice";
import { allActions } from "../../../../../store/all-slice";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <div className={classes.container}>
      <div className={classes.project}>
        <h3>Projects</h3>
        <NavLink
          to=""
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
          onClick={() => dispatch(allActions.adminCancelSearch())}
        >
          All Projects
        </NavLink>
        <NavLink
          to="add-workitem"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Add New
        </NavLink>
        <NavLink
          to="categories"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Categories
        </NavLink>
      </div>
      <div className={classes.account}>
        <h3>Account</h3>
        <NavLink
          to="settings"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Settings
        </NavLink>
        <p onClick={() => dispatch(authActions.logout())}>Logout</p>
      </div>
    </div>
  );
};

export default Navigation;
