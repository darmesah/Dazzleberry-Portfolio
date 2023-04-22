import { useDispatch, useSelector } from "react-redux";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";

import search from "./components/images/search.svg";
import cancel from "./components/images/cancel.svg";
import sortImg from "./components/images/sort.svg";

import WorkList from "./components/WorkList/WorkList";

import { allActions } from "../../../store/all-slice";

import classes from "./components/Home.module.css";
import useInput from "../../../hooks/use-input";
import { useState } from "react";

const AdminHome = () => {
  const [searchForm, setSearchForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNotEmpty = (value) => value.length > 2;

  const {
    value: textValue,
    isValid: enteredTextIsValid,
    valueChangeHandler: textChangedHandler,
  } = useInput(isNotEmpty, "");

  const adminSort = () => {
    dispatch(allActions.adminSort());
  };

  const total = useSelector((state) => state.all.total);

  const searchHandler = (e) => {
    e.preventDefault();

    navigate(`?keyword=${textValue}`);
    dispatch(allActions.adminSearch());
  };

  const cancelSearchHandler = () => {
    setSearchForm(false);
    dispatch(allActions.adminCancelSearch());
    navigate("");
  };

  return (
    <>
      <main className={classes.container}>
        <div className={classes.all_cont}>
          <h4>All Projects</h4>
          <p className={classes.text1}>
            Create, edit, and manage the projects on the site.
          </p>
          <div className={classes.worklist}>
            <div className={classes.projects_add_sort}>
              <div>
                Projects <span className={classes.total}>{total}</span>
              </div>
              {!searchForm ? (
                <div>
                  <ul>
                    <li>
                      <Link to="add-workitem">ADD NEW</Link>
                    </li>
                    <li>
                      <img
                        onClick={() => setSearchForm(true)}
                        src={search}
                        alt="search"
                      />
                    </li>
                    <li onClick={adminSort}>
                      <img src={sortImg} alt="sort" />
                    </li>
                  </ul>
                </div>
              ) : (
                <div className={classes.search}>
                  <form onSubmit={searchHandler}>
                    <input
                      type="text"
                      name="search"
                      value={textValue}
                      onChange={textChangedHandler}
                      placeholder="Search work..."
                    />
                    <button
                      disabled={!enteredTextIsValid}
                      style={
                        !enteredTextIsValid
                          ? { cursor: "not-allowed" }
                          : { cursor: "pointer" }
                      }
                      type="submit"
                    >
                      <img src={search} alt="search" />
                    </button>
                  </form>
                  <img
                    onClick={cancelSearchHandler}
                    className={classes.cancel}
                    src={cancel}
                    alt="cancel"
                  />
                </div>
              )}
            </div>
            <WorkList inverse={true} />
          </div>
        </div>
      </main>
      <ScrollRestoration />
    </>
  );
};

export default AdminHome;
