import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollRestoration } from "react-router-dom";

import WorkList from "./components/WorkList/All/WorkList";

import { allActions } from "../../store/all-slice";

import classes from "./components/All.module.css";

const All = () => {
  useEffect(() => {
    dispatch(allActions.loadWorkItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();

  const sortAlpha = () => {
    dispatch(allActions.sortAlpha());
  };

  const sortChro = () => {
    dispatch(allActions.sortChro());
  };

  const sort = useSelector((state) => state.all.sort);

  return (
    <>
      <div className={classes.all_cont}>
        <h4>All Projects</h4>
        <div className={classes.sort_cont}>
          <p onClick={sortChro} className={!sort ? classes.bold : ""}>
            CHRONOLOGICAL
          </p>
          <p onClick={sortAlpha} className={sort ? classes.bold : ""}>
            ALPHABETICAL
          </p>
        </div>
      </div>
      <WorkList inverse={true} />

      <ScrollRestoration />
    </>
  );
};
export default All;
