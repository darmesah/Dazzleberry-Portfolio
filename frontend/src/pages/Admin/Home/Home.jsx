import { useDispatch, useSelector } from "react-redux";
import { ScrollRestoration } from "react-router-dom";

import WorkList from "./components/WorkList/WorkList";

import { allActions } from "../../../store/all-slice";

import classes from "./components/Home.module.css";

const AdminHome = () => {
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
      <main className={classes.container}>
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
      </main>
      <ScrollRestoration />
    </>
  );
};

export default AdminHome;
