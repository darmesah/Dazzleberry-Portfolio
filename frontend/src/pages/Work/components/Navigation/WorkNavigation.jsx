import { NavLink } from 'react-router-dom';

import classes from './WorkNavigation.module.css';

const WorkNavigation = () => {
  return (
    <ul className={classes.nav}>
      <li>
        <NavLink
          to="industry"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          BY INDUSTRY
        </NavLink>
      </li>
      <li>
        <NavLink
          to="service"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          BY SERVICE
        </NavLink>
      </li>
      <li>
        <NavLink
          to="all"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          ALL PROJECTS
        </NavLink>
      </li>
    </ul>
  );
};

export default WorkNavigation;
