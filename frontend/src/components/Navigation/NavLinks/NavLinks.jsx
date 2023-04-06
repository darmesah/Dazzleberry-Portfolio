import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import search from '../images/search.svg';
import classes from './NavLinks.module.css';
import { uiActions } from '../../../store/ui-slice';

const Navlinks = () => {
  const dispatch = useDispatch();

  const showSearchBar = () => {
    dispatch(uiActions.showSearchBar());
  };

  return (
    <ul className={classes.nav_links}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/work"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          WORK
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          ABOUT
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          CONTACT
        </NavLink>
      </li>
      <li onClick={showSearchBar} className={classes.search}>
        <img src={search} alt="search" /> <span>SEARCH</span>
      </li>
    </ul>
  );
};

export default Navlinks;
