import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../BackDrop/BackDrop";
import "./Modal.css";

const Modal = (props) => {
  const nodeRef = useRef(null);

  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={300}
        classNames="modal"
      >
        <div ref={nodeRef}>{props.children}</div>
      </CSSTransition>
    </>
  );
};

export default Modal;
