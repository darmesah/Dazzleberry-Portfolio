import classes from './MainHeader.module.css';

const MainHeader = ({ children }) => {
  return <header className={classes.main_header}>{children}</header>;
};

export default MainHeader;
