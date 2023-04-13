import {
  Await,
  ScrollRestoration,
  defer,
  useLoaderData,
} from "react-router-dom";

import SubList from "../components/SubItems/SubList/SubList";
import { Suspense } from "react";
import Loading from "../../../components/UIElements/Loading/Loading";

const IndustrySub = () => {
  const { industry } = useLoaderData();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={industry}>
          {(data) =>
            data.error ? (
              <p>{data.error}</p>
            ) : (
              <SubList items={data.workItems} />
            )
          }
        </Await>
      </Suspense>
      <ScrollRestoration />
    </>
  );
};

export default IndustrySub;

export const loader = async ({ request, params }) => {
  const { item } = params;

  const industry = fetch(
    `${process.env.REACT_APP_BACKEND_URL}/industry/${item}`
  ).then((res) => {
    if (!res.ok) {
      return { error: "Something went wrong" };
    }
    return res.json();
  });

  return defer({ industry });
};
