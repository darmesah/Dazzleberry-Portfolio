import Navigation from "../Navigation/Navigation";

import logo from "../images/logo.png";

import classes from "./SideBar.module.css";

const SideBar = () => {
  return (
    <main className={classes.container}>
      <div className={classes.fixed}>
        <div className={classes.img}>
          <img src={logo} alt="logo" />
        </div>
        <Navigation />
      </div>
    </main>
  );
};

export default SideBar;
