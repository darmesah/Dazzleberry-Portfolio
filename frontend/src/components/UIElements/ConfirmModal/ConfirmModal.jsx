import classes from "./ConfirmModal.module.css";

const ConfirmModal = (props) => {
  return (
    <div
      className={`${classes.confirm_cont} ${
        props.showConfrimModal ? classes.show : classes.hide
      }`}
    >
      <h2>{props.modalQuestion}</h2>
      <div className={classes.confirm_cont_flex}>
        <div onClick={props.confirmAction}>{props.actionName}</div>
        <div onClick={props.hideConfirmModal}>CANCEL</div>
      </div>
    </div>
  );
};

export default ConfirmModal;
