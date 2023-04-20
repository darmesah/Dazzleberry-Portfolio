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
        timeout={100}
        classNames="modal"
      >
        <div ref={nodeRef}>
          <div className="modal_container">{props.children}</div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Modal;
