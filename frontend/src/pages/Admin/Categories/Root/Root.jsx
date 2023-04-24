import { NavLink, Outlet } from "react-router-dom";
import classes from "./Root.module.css";

const CategoryRoot = () => {
  return (
    <main className={classes.container}>
      <h1>Categories</h1>
      <p>Manage the projects in various categories on the site.</p>
      <div className={classes.item_cont}>
        <div className={classes.category_links}>
          <NavLink
            to="industry"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            BY INDUSTRY
          </NavLink>
          <NavLink
            to="service"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            BY SERVICE
          </NavLink>
        </div>
        <Outlet />
      </div>
    </main>
  );
};

export default CategoryRoot;
