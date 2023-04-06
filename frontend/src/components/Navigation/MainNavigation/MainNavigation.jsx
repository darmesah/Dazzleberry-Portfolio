import { useState } from 'react';
import { Link } from 'react-router-dom';
import BackDrop from '../../UIElements/BackDrop/BackDrop';

import logo from '../images/logo.png';
import menu from '../images/nav.svg';

import MainHeader from '../MainHeader/MainHeader';
import Navlinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const [sideNavIsOpen, setSideNavIsOpen] = useState(false);

  const openSideNavHandler = () => {
    setSideNavIsOpen(true);
  };

  const closeSideNavHandler = () => {
    setSideNavIsOpen(false);
  };

  return (
    <>
      {sideNavIsOpen && <BackDrop onClick={closeSideNavHandler} />}
      <SideDrawer onClick={closeSideNavHandler} show={sideNavIsOpen}>
        <div className={classes.side_nav}>
          <Navlinks />
        </div>
      </SideDrawer>
      <MainHeader>
        <div className={classes.header}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          {!sideNavIsOpen && (
            <button
              className={classes.mobile_menu}
              onClick={openSideNavHandler}
            >
              <img src={menu} alt="menu" />
            </button>
          )}
          <nav className={classes.main_nav}>
            <Navlinks />
          </nav>
        </div>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
