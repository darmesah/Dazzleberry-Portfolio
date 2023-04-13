import {
  Await,
  defer,
  json,
  ScrollRestoration,
  useLoaderData,
} from "react-router-dom";

import WorkList from "./components/WorkList/All/WorkList";

import classes from "./components/All.module.css";
import { Suspense } from "react";
import Loading from "../../components/UIElements/Loading/Loading";

const All = () => {
  const { workItems } = useLoaderData();

  return (
    <>
      <div className={classes.all_cont}>
        <h4>All Projects</h4>
        <div className={classes.sort_cont}>
          <p>CHRONOLOGICAL</p>
          <p>ALPHABETICAL</p>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <Await resolve={workItems}>
          {(loadedWorkItems) => (
            <WorkList items={loadedWorkItems} inverse={true} />
          )}
        </Await>
      </Suspense>

      <ScrollRestoration />
    </>
  );
};

export default All;

export const loadWorkItems = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/workitems`
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch workitems." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.workItems;
  }
};

export const loader = () => {
  return defer({
    workItems: loadWorkItems(),
  });
};
