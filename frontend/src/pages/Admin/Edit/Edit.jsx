import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import Loading from "../../../components/UIElements/Loading/Loading";
import Item from "./components/Item";

const Edit = () => {
  const { workitem } = useLoaderData();

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Await resolve={workitem}>
          {(data) => <Item items={data.workItem} />}
        </Await>
      </Suspense>
    </main>
  );
};

export default Edit;

export const loader = async ({ request, params }) => {
  const { id } = params;

  const workitem = fetch(
    `${process.env.REACT_APP_BACKEND_URL}/workitem/${id}`
  ).then((res) => {
    if (!res.ok) {
      return { error: "Something went wrong" };
    }
    return res.json();
  });

  return defer({ workitem });
};
