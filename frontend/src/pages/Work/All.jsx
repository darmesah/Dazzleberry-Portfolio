import { useDispatch, useSelector } from "react-redux";
import { ScrollRestoration } from "react-router-dom";

import WorkList from "./components/WorkList/All/WorkList";

import { allActions } from "../../store/all-slice";

import classes from "./components/All.module.css";

const All = () => {
  const dispatch = useDispatch();

  const sortAlpha = () => {
    dispatch(allActions.sortAlpha());
  };

  const sortChro = () => {
    dispatch(allActions.sortChro());
  };

  const sort = useSelector((state) => state.all.sort);
  const total = useSelector((state) => state.all.total);
  console.log(total);

  return (
    <>
      <div className={classes.all_cont}>
        <h4>
          All Projects <span className={classes.total}>{total}</span>
        </h4>
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
