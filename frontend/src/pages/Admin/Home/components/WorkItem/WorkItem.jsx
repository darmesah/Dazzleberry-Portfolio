import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../../../../../components/UIElements/Modal/Modal";

import classes from "./WorkItem.module.css";
import { allActions } from "../../../../../store/all-slice";

const WorkItem = ({ _id, title, imageUrl }) => {
  const [showConfrimModal, setShowConfrimModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfrimModal(true);
  };

  const hideDeleteWarningHandler = () => {
    setShowConfrimModal(false);
  };

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const confirmDeleteHandler = () => {
    setShowConfrimModal(false);
    const deleteWorkItem = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/workitem/${_id}`,
        {
          method: "delete",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok) {
        dispatch(allActions.removeItem(_id));
      }
    };

    deleteWorkItem();
  };

  return (
    <>
      <Modal onCancel={hideDeleteWarningHandler} show={showConfrimModal}>
        <div
          className={`${classes.confirm_cont} ${
            showConfrimModal ? classes.show : classes.hide
          }`}
        >
          <h2>Are you sure you want to delete?</h2>
          <div className={classes.confirm_cont_flex}>
            <div onClick={hideDeleteWarningHandler}>CANCEL</div>
            <div onClick={confirmDeleteHandler}>DELETE</div>
          </div>
        </div>
      </Modal>
      <li className={`${classes.list_item} `}>
        <Link to={`/work-item/${_id}`}>
          <h5>{title}</h5>
          <img
            src={`${process.env.REACT_APP_BACKEND_IMAGES}/${imageUrl[0]}`}
            alt={title}
            loading="lazy"
          />
        </Link>
        <div className={classes.edit_delete}>
          <Link to={`edit-workitem/${_id}`}>
            <div>Edit</div>
          </Link>
          <div onClick={showDeleteWarningHandler}>Delete</div>
        </div>
      </li>
    </>
  );
};

export default WorkItem;
