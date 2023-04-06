import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import './Animation.css';
import classes from './SideDrawer.module.css';

const SideDrawer = ({ children, show, onClick }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      timeout={200}
      classNames="slide-in-left"
      unmountOnExit
    >
      <aside
        ref={nodeRef}
        className={`${classes.side_drawer} ${show ? classes.slide : ''}`}
        onClick={onClick}
      >
        {children}
      </aside>
    </CSSTransition>
  );
};

export default SideDrawer;
