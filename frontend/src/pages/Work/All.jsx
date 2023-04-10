import { ScrollRestoration } from "react-router-dom";

import { allData } from "./components/data";
import WorkList from "./components/WorkList/WorkList";

import classes from "./components/All.module.css";

const All = () => {
  return (
    <>
      <div className={classes.all_cont}>
        <h4>All Projects</h4>
        <div className={classes.sort_cont}>
          <p>CHRONOLOGICAL</p>
          <p>ALPHABETICAL</p>
        </div>
      </div>
      <WorkList items={allData} inverse={true} />
      <ScrollRestoration />
    </>
  );
};

export default All;
