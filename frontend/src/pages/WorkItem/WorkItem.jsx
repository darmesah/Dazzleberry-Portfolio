import {
  Await,
  ScrollRestoration,
  defer,
  useLoaderData,
} from "react-router-dom";

import { Suspense } from "react";
import Loading from "../../components/UIElements/Loading/Loading";
import Item from "./components/Item";

const WorkItem = () => {
  const { workitem } = useLoaderData();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={workitem}>
          {(data) => <Item items={data.workItem} />}
        </Await>
      </Suspense>
      <ScrollRestoration />
    </>
  );
};

export default WorkItem;

export const loader = async ({ request, params }) => {
  const { item } = params;

  const workitem = fetch(
    `${process.env.REACT_APP_BACKEND_URL}/workitem/${item}`
  ).then((res) => {
    if (!res.ok) {
      return { error: "Something went wrong" };
    }
    return res.json();
  });

  return defer({ workitem });
};
