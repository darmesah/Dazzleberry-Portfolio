import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import edit from "../images/edit.svg";
import view from "../images/view.svg";
import copy from "../images/copy.svg";
import deleteImg from "../images/delete.svg";

import Modal from "../../../../../components/UIElements/Modal/Modal";

import classes from "./SubServIndItem.module.css";
import { allActions } from "../../../../../store/all-slice";

const SubServIndItem = ({ _id, title, workDesc, createdAt }) => {
  const day = new Date(createdAt).getDate();
  const month = new Date(createdAt).toLocaleDateString("default", {
    month: "long",
  });

  const [showOptions, setShowOptions] = useState(false);
  const [showInfoEdit, setShowInfoEdit] = useState(false);
  const [showInfoView, setShowInfoView] = useState(false);
  const [showInfoLink, setShowInfoLink] = useState(false);
  const [showInfoDelete, setShowInfoDelete] = useState(false);

  const [copyMsg, setCopyMsg] = useState("copy");

  const [showConfrimModal, setShowConfrimModal] = useState(false);

  const copyURLButton = () => {
    navigator.clipboard.writeText(`http://localhost:3000/work-item/${_id}`);

    setCopyMsg("copied");
  };

  const copyEnterHandler = () => {
    setCopyMsg("copy");
    setShowInfoLink("true");
  };

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
      <li
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        className={classes.list_item}
      >
        <div>{title}</div>
        <div>{workDesc.substring(0, 60)}...</div>

        {showOptions ? (
          <div>
            <ul className={classes.options}>
              <li>
                {showInfoEdit && (
                  <span className={classes.hover_icon}>edit</span>
                )}
                <Link to={`edit-workitem/${_id}`}>
                  <img
                    onMouseEnter={() => setShowInfoEdit(true)}
                    onMouseLeave={() => setShowInfoEdit(false)}
                    src={edit}
                    alt="edit"
                  />
                </Link>
              </li>
              <li>
                {showInfoView && (
                  <span className={classes.hover_icon}>view</span>
                )}
                <Link target="_blank" to={`/work-item/${_id}`}>
                  <img
                    onMouseEnter={() => setShowInfoView(true)}
                    onMouseLeave={() => setShowInfoView(false)}
                    src={view}
                    alt="view"
                  />
                </Link>
              </li>
              <li>
                {showInfoLink && (
                  <span className={classes.hover_icon}>{copyMsg}</span>
                )}
                <img
                  onMouseEnter={copyEnterHandler}
                  onMouseLeave={() => setShowInfoLink(false)}
                  onClick={copyURLButton}
                  src={copy}
                  alt="copy"
                />
              </li>
              <li onClick={showDeleteWarningHandler}>
                {showInfoDelete && (
                  <span className={classes.hover_icon}>delete</span>
                )}
                <img
                  onMouseEnter={() => setShowInfoDelete(true)}
                  onMouseLeave={() => setShowInfoDelete(false)}
                  src={deleteImg}
                  alt="deleteImg"
                />
              </li>
            </ul>
          </div>
        ) : (
          <div>{`${day} ${month}`}</div>
        )}
      </li>
    </>
  );
};

export default SubServIndItem;
