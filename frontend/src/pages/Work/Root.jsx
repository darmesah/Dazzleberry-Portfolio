import { Outlet } from 'react-router-dom';

import WorkNavigation from './components/Navigation/WorkNavigation';

import classes from './components/Root.module.css';

const WorkRoot = () => {
  return (
    <main className={classes.container}>
      <h1>Work</h1>
      <WorkNavigation />
      <Outlet />
    </main>
  );
};

export default WorkRoot;
