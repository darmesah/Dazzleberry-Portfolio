import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../../../../store/auth-slice";
import { allActions } from "../../../../../store/all-slice";

import classes from "./Navigation.module.css";
import { useState } from "react";
import ConfirmModal from "../../../../../components/UIElements/ConfirmModal/ConfirmModal";
import Modal from "../../../../../components/UIElements/Modal/Modal";
import { uiActions } from "../../../../../store/ui-slice";

const Navigation = () => {
  const [showConfrimModal, setShowConfrimModal] = useState(false);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const logoutHandler = () => {
    dispatch(uiActions.toggleModalbg());
    setShowConfrimModal(false);
    dispatch(authActions.logout());
  };

  const showWarningHandler = () => {
    setShowConfrimModal(true);
    dispatch(uiActions.toggleModalbg());
  };

  const hideWarningHandler = () => {
    setShowConfrimModal(false);
    dispatch(uiActions.toggleModalbg());
  };

  return (
    <>
      <div className={classes.logoutMoadalbg}>
        <Modal onCancel={hideWarningHandler} show={showConfrimModal}>
          <ConfirmModal
            modalQuestion="Are you sure you wish to logout?"
            actionName="LOGOUT"
            showConfrimModal={showConfrimModal}
            hideConfirmModal={hideWarningHandler}
            confirmAction={logoutHandler}
          />
        </Modal>
      </div>
      <div className={classes.container}>
        <div className={classes.project}>
          <h3>Projects</h3>
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
            onClick={() => dispatch(allActions.adminCancelSearch())}
          >
            All Projects
          </NavLink>
          <NavLink
            to="add-workitem"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Add New
          </NavLink>
          <NavLink
            to="categories"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Categories
          </NavLink>
        </div>
        <div className={classes.account}>
          <h3>Account</h3>
          <NavLink
            to={`settings/${userId}`}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Settings
          </NavLink>
          {isAuth && <p onClick={showWarningHandler}>Logout</p>}
        </div>
      </div>
    </>
  );
};

export default Navigation;
