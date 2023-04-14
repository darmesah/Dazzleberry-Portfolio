import { ScrollRestoration, useNavigate } from "react-router-dom";

import WorkList from "./components/WorkList/All/WorkList";

import classes from "./components/All.module.css";

const All = () => {
  const navigate = useNavigate();

  const sortAlpha = () => {
    navigate("?sort=asc");
  };

  const noSort = () => {
    navigate("");
  };

  return (
    <>
      <div className={classes.all_cont}>
        <h4>All Projects</h4>
        <div className={classes.sort_cont}>
          <p onClick={noSort}>CHRONOLOGICAL</p>
          <p onClick={sortAlpha}>ALPHABETICAL</p>
        </div>
      </div>
      <WorkList inverse={true} />

      <ScrollRestoration />
    </>
  );
};
export default All;
